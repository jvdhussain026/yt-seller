export type Niche = 'Gaming' | 'Finance' | 'Vlog' | 'Tech' | 'Entertainment' | 'Education' | 'Other';

export interface ChannelListing {
  id: string;
  name: string;
  niche: Niche;
  subscribers: number;
  monetized: boolean;
  monthlyRevenue?: number;
  askingPrice: number;
  description: string;
  watchHours: number;
  imageUrl: string;
  growthData: { month: string; subs: number }[];
  contactEmail: string;
  
  // New detailed fields
  status: 'Available' | 'Sold';
  listingId: string;
  creationDate: string;
  language: string;
  channelType: string;
  contentType: string;
  realTimeViews: number;
  viewsLast28Days: number;
  lifetimeViews: number;
  copyrightStrikes: number;
  communityStrikes: number;
  revenueLast28Days: number;
  lifetimeRevenue: number;
}

export interface Review {
  id: string;
  name: string;
  role: 'Buyer' | 'Seller';
  rating: number;
  text: string;
  avatar?: string;
}
