export interface Recipe {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];
  createdAt: number;
  userId: string;
} 