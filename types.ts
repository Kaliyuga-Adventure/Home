
export interface TravelPackage {
  id: number;
  title: string;
  destination: string;
  description: string;
  longDescription: string;
  price: number;
  duration: number; // in days
  imageUrl: string;
  rating: number;
  itinerary: { id: number; day: number; activity: string }[];
  tags: string[];
  isFeatured?: boolean;
  featuredOrder?: number;
}

export type Page = 'home' | 'packages' | 'about' | 'contact' | 'login' | 'admin' | 'privacy-policy' | 'terms-and-conditions' | 'payment-policy' | 'cancellation-policy' | 'customer-login' | 'signup' | 'basic-details';

export interface Testimonial {
  name: string;
  location: string;
  avatarUrl: string;
  text: string;
}

export interface Customer {
    id: number;
    name: string;
    email: string;
    mobile?: string;
    age?: number;
    sex?: 'Male' | 'Female' | 'Other' | 'Prefer not to say';
}