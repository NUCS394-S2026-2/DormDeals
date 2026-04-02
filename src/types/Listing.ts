export interface Listing {
  id: string;
  image: string; // URL or base64
  price: number;
  neighborhood: string;
  condition: 'New' | 'Like New' | 'Good' | 'Fair' | 'Poor';
  tags: string[];
  description: string;
  userId: string;
  createdAt: Date;
  isAuction?: boolean;
  auctionEnd?: Date;
}
