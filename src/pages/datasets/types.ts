
export interface Dataset {
  id: string;
  title: string;
  description: string;
  itemCount: number;
  category: string;
  contentType: 'photos' | 'videos' | 'mixed';
  price: number;
  thumbnailUrl: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}
