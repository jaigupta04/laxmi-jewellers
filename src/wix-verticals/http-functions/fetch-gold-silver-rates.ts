import { response } from 'wix-http-functions';
import { getSecret } from 'wix-secrets-backend';
import { query } from 'wix-data';

const CACHE_DURATION_MARKET_HOURS = 5 * 60 * 1000; // 5 minutes
const CACHE_DURATION_OFF_HOURS = 30 * 60 * 1000; // 30 minutes
const MAX_RETRIES = 3;
const INITIAL_BACKOFF = 1000; // 1 second

interface RatesData {
  city: string;
  gold24k: number;
  gold22k: number;
  gold18k: number;
  silverPerGram: number;
  silverPerKg: number;
  timestamp: string;
  source: string;
}

interface CacheEntry {
  data: RatesData;
  timestamp: number;
}

let cache: CacheEntry | null = null;

function isMarketHours(): boolean {
  const now = new Date();
  const istTime = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
  const hours = istTime.getHours();
  const minutes = istTime.getMinutes();
  const dayOfWeek = istTime.getDay();

  // Market hours: Monday-Friday, 9:30 AM - 5:00 PM IST
  if (dayOfWeek === 0 || dayOfWeek === 6) return false; // Sunday or Saturday
  if (hours < 9 || (hours === 9 && minutes < 30)) return false;
  if (hours >= 17) return false;

  return true;
}

async function fetchWithBackoff(url: string, apiKey: string, retries = 0): Promise<any> {
  try {
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`API responded with status ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    if (retries < MAX_RETRIES) {
      const backoffDelay = INITIAL_BACKOFF * Math.pow(2, retries);
      await new Promise(resolve => setTimeout(resolve, backoffDelay));
      return fetchWithBackoff(url, apiKey, retries + 1);
    }
    throw error;
  }
}

async function getLastSuccessfulRates(): Promise<RatesData | null> {
  try {
    const results = await query('goldsilverrates')
      .eq('isActive', true)
      .descending('_updatedDate')
      .limit(1)
      .find();

    if (results.items.length > 0) {
      const item = results.items[0];
      return {
        city: item.city || 'Mumbai',
        gold24k: item.gold24k || 0,
        gold22k: item.gold22k || 0,
        gold18k: item.gold18k || 0,
        silverPerGram: item.silverPerGram || 0,
        silverPerKg: item.silverPerKg || 0,
        timestamp: item._updatedDate instanceof Date ? item._updatedDate.toISOString() : (item._updatedDate || new Date().toISOString()),
        source: item.source || 'IBJA',
      };
    }
  } catch (error) {
    console.error('Error fetching last successful rates:', error);
  }
  return null;
}

async function saveRatesToDatabase(data: RatesData): Promise<void> {
  try {
    const existingResults = await query('goldsilverrates')
      .eq('city', data.city)
      .limit(1)
      .find();

    if (existingResults.items.length > 0) {
      await query('goldsilverrates').updateItem({
        _id: existingResults.items[0]._id,
        city: data.city,
        gold24k: data.gold24k,
        gold22k: data.gold22k,
        gold18k: data.gold18k,
        silverPerGram: data.silverPerGram,
        silverPerKg: data.silverPerKg,
        timestamp: new Date(data.timestamp),
        source: data.source,
        isActive: true,
      });
    } else {
      await query('goldsilverrates').insertItem({
        _id: `${data.city}-${Date.now()}`,
        city: data.city,
        gold24k: data.gold24k,
        gold22k: data.gold22k,
        gold18k: data.gold18k,
        silverPerGram: data.silverPerGram,
        silverPerKg: data.silverPerKg,
        timestamp: new Date(data.timestamp),
        source: data.source,
        isActive: true,
      });
    }
  } catch (error) {
    console.error('Error saving rates to database:', error);
  }
}

export async function get_fetch_gold_silver_rates(request: any) {
  try {
    const now = Date.now();
    const cacheDuration = isMarketHours() ? CACHE_DURATION_MARKET_HOURS : CACHE_DURATION_OFF_HOURS;

    // Check cache
    if (cache && (now - cache.timestamp) < cacheDuration) {
      return response({
        status: 200,
        body: {
          success: true,
          data: cache.data,
          cached: true,
        },
      });
    }

    // Get API key from Wix Secrets Manager
    const apiKey = await getSecret('GOLD_RATES_API_KEY');
    if (!apiKey) {
      throw new Error('API key not configured');
    }

    // Fetch from API
    const apiUrl = 'https://api.indiagoldratesapi.com/latest';
    const apiData = await fetchWithBackoff(apiUrl, apiKey);

    // Parse API response
    const ratesData: RatesData = {
      city: apiData.city || 'Mumbai',
      gold24k: parseFloat(apiData.gold24k) || 0,
      gold22k: parseFloat(apiData.gold22k) || 0,
      gold18k: parseFloat(apiData.gold18k) || 0,
      silverPerGram: parseFloat(apiData.silverPerGram) || 0,
      silverPerKg: parseFloat(apiData.silverPerKg) || 0,
      timestamp: new Date().toISOString(),
      source: 'IBJA',
    };

    // Update cache
    cache = {
      data: ratesData,
      timestamp: now,
    };

    // Save to database
    await saveRatesToDatabase(ratesData);

    return response({
      status: 200,
      body: {
        success: true,
        data: ratesData,
        cached: false,
      },
    });
  } catch (error) {
    console.error('Error fetching gold/silver rates:', error);

    // Fallback to last successful rates
    const lastRates = await getLastSuccessfulRates();
    if (lastRates) {
      return response({
        status: 200,
        body: {
          success: true,
          data: lastRates,
          cached: true,
          fallback: true,
        },
      });
    }

    return response({
      status: 500,
      body: {
        success: false,
        error: 'Unable to fetch rates',
      },
    });
  }
}
