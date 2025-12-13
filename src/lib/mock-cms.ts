// Mock CMS service to replace Wix Data
export interface WixDataItem {
  _id: string
  _createdDate?: Date
  _updatedDate?: Date
}

export interface WixDataResult<T> {
  items: T[]
  totalCount?: number
}

// Mock data storage
const mockData: Record<string, any[]> = {
  testimonials: [],
  productguides: [],
  frequentlyaskedquestions: [],
  educationalcontent: [],
  goldsilverrates: [],
}

export class BaseCrudService {
  static async create<T extends WixDataItem>(
    collectionId: string,
    itemData: T
  ): Promise<T> {
    const newItem = {
      ...itemData,
      _id: `${collectionId}_${Date.now()}`,
      _createdDate: new Date(),
      _updatedDate: new Date(),
    }
    
    if (!mockData[collectionId]) {
      mockData[collectionId] = []
    }
    
    mockData[collectionId].push(newItem)
    return newItem as T
  }

  static async getAll<T extends WixDataItem>(
    collectionId: string,
    includeReferencedItems?: string[]
  ): Promise<WixDataResult<T>> {
    const items = mockData[collectionId] || []
    return {
      items: items as T[],
      totalCount: items.length,
    }
  }

  static async getById<T extends WixDataItem>(
    collectionId: string,
    itemId: string,
    includeReferencedItems?: string[]
  ): Promise<T | null> {
    const items = mockData[collectionId] || []
    const item = items.find((i) => i._id === itemId)
    return item ? (item as T) : null
  }

  static async update<T extends WixDataItem>(
    collectionId: string,
    itemData: T
  ): Promise<T> {
    if (!itemData._id) {
      throw new Error(`${collectionId} ID is required for update`)
    }

    const items = mockData[collectionId] || []
    const index = items.findIndex((i) => i._id === itemData._id)
    
    if (index !== -1) {
      const updated = {
        ...items[index],
        ...itemData,
        _updatedDate: new Date(),
      }
      items[index] = updated
      return updated as T
    }

    throw new Error(`${collectionId} not found`)
  }

  static async remove(collectionId: string, itemId: string): Promise<void> {
    const items = mockData[collectionId] || []
    const index = items.findIndex((i) => i._id === itemId)
    
    if (index !== -1) {
      items.splice(index, 1)
    }
  }
}
