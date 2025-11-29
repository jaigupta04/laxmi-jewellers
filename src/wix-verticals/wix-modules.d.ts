// Type declarations for Wix Velo backend modules

declare module 'wix-http-functions' {
  export interface WixHttpFunctionRequest {
    path?: string[];
    headers?: Record<string, string>;
    body?: any;
    query?: Record<string, string>;
    method?: string;
  }

  export interface WixHttpFunctionResponse {
    status: number;
    body?: any;
    headers?: Record<string, string>;
  }

  export function response(options: WixHttpFunctionResponse): WixHttpFunctionResponse;
  export function ok(body?: any): WixHttpFunctionResponse;
  export function notFound(): WixHttpFunctionResponse;
  export function serverError(message?: string): WixHttpFunctionResponse;
  export function badRequest(message?: string): WixHttpFunctionResponse;
  export function forbidden(): WixHttpFunctionResponse;
}

declare module 'wix-secrets-backend' {
  export function getSecret(secretName: string): Promise<string>;
}

declare module 'wix-data' {
  export interface WixDataItem {
    _id?: string;
    _owner?: string;
    _createdDate?: Date | string;
    _updatedDate?: Date | string;
    [key: string]: any;
  }

  export interface WixDataQueryResult {
    items: WixDataItem[];
    length: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
    currentPage: number;
  }

  export interface WixDataQuery {
    eq(propertyName: string, value: any): WixDataQuery;
    ne(propertyName: string, value: any): WixDataQuery;
    lt(propertyName: string, value: any): WixDataQuery;
    le(propertyName: string, value: any): WixDataQuery;
    gt(propertyName: string, value: any): WixDataQuery;
    ge(propertyName: string, value: any): WixDataQuery;
    hasSome(propertyName: string, value: any[]): WixDataQuery;
    contains(propertyName: string, value: string): WixDataQuery;
    startsWith(propertyName: string, value: string): WixDataQuery;
    endsWith(propertyName: string, value: string): WixDataQuery;
    isEmpty(propertyName: string): WixDataQuery;
    isNotEmpty(propertyName: string): WixDataQuery;
    ascending(propertyName: string): WixDataQuery;
    descending(propertyName: string): WixDataQuery;
    limit(limit: number): WixDataQuery;
    skip(skip: number): WixDataQuery;
    find(): Promise<WixDataQueryResult>;
    insertItem(item: WixDataItem): Promise<WixDataItem>;
    updateItem(item: WixDataItem): Promise<WixDataItem>;
    removeItem(itemId: string): Promise<void>;
  }

  export function query(collectionName: string): WixDataQuery;
  export function get(collectionName: string, itemId: string): Promise<WixDataItem>;
  export function insert(collectionName: string, item: WixDataItem): Promise<WixDataItem>;
  export function update(collectionName: string, item: WixDataItem): Promise<WixDataItem>;
  export function remove(collectionName: string, itemId: string): Promise<void>;
  export function bulkInsert(collectionName: string, items: WixDataItem[]): Promise<{ inserted: number; errors: any[] }>;
  export function bulkUpdate(collectionName: string, items: WixDataItem[]): Promise<{ updated: number; errors: any[] }>;
  export function bulkRemove(collectionName: string, itemIds: string[]): Promise<{ removed: number; errors: any[] }>;
}
