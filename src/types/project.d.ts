export interface Project {
  id: string;
  title: string;
  image: string;
  description: string;
  url: string;
  repo?: string;
  github?: string;
  tags: string[];
  category: 'frontend' | 'backend' | 'fullstack';
  date?: string;
  lastUpdated?: string;
   caseStudy?: {
    problem?: string;
    solution?: string;
    impact?: string;
  };
  // Selling fields
  forSale?: boolean;
  price?: number;
}