export interface ContractorServiceGroup {
  ServiceHeading: string;
  ServiceList: {
    ServiceListHeader: string;
    ServiceListItems: string[];
  }[];
}

export interface ContractorServiceSubGroup {
  ServiceListHeader: string;
  ServiceListItems: string[];
}

export interface ServiceArea {
  city: string;
  state: string;
  zip: string;
}

export interface GoogleReview {
  title: string;
  url: string;
  rating: number;
  count: number;
  visible: boolean;
}

export interface FacebookReview {
  url: string;
  recommended: number;
  count: number;
  visible: boolean;
}

export interface YelpReview {
  url: string;
  rating: number;
  count: number;
  visible: boolean;
}

export interface AngiReview {
  url: string;
  rating: number;
  count: number;
  visible: boolean;
}

export interface HomeAdvisorReview {
  url: string;
  rating: number;
  count: number;
  visible: boolean;
}

export interface BBBReview {
  url: string;
  rating: number;
  grade: string;
  accredited: string;
  count: number;
  visible: boolean;
}

export interface Scores {
  score: number;
  visible: boolean;
}

export interface Awards {
  award: string;
  visible: boolean;
}

export interface FAQ {
  visible: boolean;
  content: string;
}

export interface Logo {
  url: string;
  alt: string;
}

export interface Gallery {
  url: string;
  alt: string;
}

export interface Video {
  url: string;
  title: string;
}

export interface Contractor {
  _id: string;
  seo_title: string;
  seo_description: string;
  title: string;
  description: string;
  description_last_edited: string;
  date_last_updated_about: string;
  date_last_updated_qa: string;
  question_answer: string;
  faq: FAQ[];
  company_phone: string;
  company_email: string;
  category: string;
  address: string;
  country: string;
  state: string;
  city: string;
  post_code: string;
  location_latitude: number;
  location_longitude: number;
  website: string;
  google_bp: string;
  facebook: string;
  instagram: string;
  google_review_title: string;
  google_review_url: string;
  google_review_count: number;
  google_review_star_rating: number;
  google_reviews: GoogleReview[];
  facebook_reviews: FacebookReview[];
  yelp_reviews: YelpReview[];
  angi_reviews: AngiReview[];
  homeadvisor_reviews: HomeAdvisorReview[];
  bbb_reviews: BBBReview[];
  reviews_last_checked: string;
  awards: Awards[];
  scores: Scores[];
  platform_reviews: Scores[];
  review_qe: Scores[];
  website_dp: Scores[];
  business_credibility: Scores[];
  date_score_created: string;
  services?: ContractorServiceGroup[];
  service_area: ServiceArea[];
  logo: Logo[];
  gallery: Gallery[];
  video: Video[];
  company_logo: string; // this need to remove later
  company_logo_alt?: string; // this need to remove later
  company_images: string[]; // this need to remove later
  company_images_alt?: string[]; // this need to remove later
  slug: string;
  claimed: boolean;
  not_claimed: boolean;
  claim_profile: boolean; // this need to remove later
  createdAt?: string;
  updatedAt?: string;
}
