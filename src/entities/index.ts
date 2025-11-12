/**
 * Auto-generated entity types
 * Contains all CMS collection interfaces in a single file 
 */

/**
 * Collection ID: educationalcontent
 * Interface for EducationalContent
 */
export interface EducationalContent {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  title?: string;
  /** @wixFieldType text */
  slug?: string;
  /** @wixFieldType text */
  category?: string;
  /** @wixFieldType image */
  mainImage?: string;
  /** @wixFieldType text */
  author?: string;
  /** @wixFieldType date */
  publishDate?: Date | string;
  /** @wixFieldType text */
  content?: string;
  /** @wixFieldType text */
  metaDescription?: string;
}


/**
 * Collection ID: frequentlyaskedquestions
 * Interface for FrequentlyAskedQuestions
 */
export interface FrequentlyAskedQuestions {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  question?: string;
  /** @wixFieldType text */
  answer?: string;
  /** @wixFieldType text */
  category?: string;
  /** @wixFieldType boolean */
  isPublished?: boolean;
  /** @wixFieldType number */
  displayOrder?: number;
}


/**
 * Collection ID: jewelryproducts
 * Interface for JewelryProducts
 */
export interface JewelryProducts {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  productName?: string;
  /** @wixFieldType text */
  productDescription?: string;
  /** @wixFieldType image */
  mainImage?: string;
  /** @wixFieldType number */
  price?: number;
  /** @wixFieldType text */
  category?: string;
  /** @wixFieldType text */
  segmentation?: string;
  /** @wixFieldType text */
  productType?: string;
  /** @wixFieldType text */
  occasion?: string;
  /** @wixFieldType text */
  metalType?: string;
  /** @wixFieldType boolean */
  isTrending?: boolean;
  /** @wixFieldType boolean */
  isCustomizable?: boolean;
  /** @wixFieldType boolean */
  isBudgetOption?: boolean;
  /** @wixFieldType boolean */
  isInvestmentProduct?: boolean;
  /** @wixFieldType text */
  sku?: string;
  /** @wixFieldType number */
  weight?: number;
  /** @wixFieldType text */
  certification?: string;
  /** @wixFieldType text */
  materialDetails?: string;
  /** @wixFieldType image */
  additionalImage1?: string;
  /** @wixFieldType image */
  additionalImage2?: string;
}


/**
 * Collection ID: offers
 * Interface for Offers
 */
export interface Offers {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  offerTitle?: string;
  /** @wixFieldType text */
  offerDescription?: string;
  /** @wixFieldType image */
  offerImage?: string;
  /** @wixFieldType datetime */
  startDate?: Date | string;
  /** @wixFieldType datetime */
  endDate?: Date | string;
  /** @wixFieldType number */
  discountValue?: number;
  /** @wixFieldType text */
  couponCode?: string;
  /** @wixFieldType url */
  offerUrl?: string;
  /** @wixFieldType boolean */
  isActive?: boolean;
}


/**
 * Collection ID: productguides
 * Interface for ProductGuides
 */
export interface ProductGuides {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  guideTitle?: string;
  /** @wixFieldType text */
  guideCategory?: string;
  /** @wixFieldType text */
  shortDescription?: string;
  /** @wixFieldType image */
  mainImage?: string;
  /** @wixFieldType text */
  fullContent?: string;
  /** @wixFieldType date */
  publicationDate?: Date | string;
}


/**
 * Collection ID: testimonials
 * Interface for Testimonials
 */
export interface Testimonials {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  customerName?: string;
  /** @wixFieldType text */
  testimonialText?: string;
  /** @wixFieldType number */
  rating?: number;
  /** @wixFieldType date */
  submissionDate?: Date | string;
  /** @wixFieldType image */
  customerPhoto?: string;
  /** @wixFieldType text */
  productReviewed?: string;
}
