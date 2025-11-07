export interface Blog {
  _id: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  category: string;
  comments: number;
  image: string;
  alt?: string;
  content?: string;
  slug?: string;
}
