export interface Item {
  id: string;
  title: string;
  description: string;
  category: string;
  condition: 'Baru' | 'Seperti Baru' | 'Bekas Bagus' | 'Bekas';
  image: string;
  ownerId: string;
  ownerName: string;
  location: string;
  desiredExchange: string;
  rating: number;
  createdAt: number;
}

export interface SwapRequest {
  id: string;
  fromItemId: string;
  toItemId: string;
  status: 'pending' | 'accepted' | 'rejected';
  message: string;
  createdAt: number;
}

export type Category = 'Elektronik' | 'Pakaian' | 'Hobi' | 'Rumah Tangga' | 'Buku' | 'Lainnya';

export const CATEGORIES: Category[] = ['Elektronik', 'Pakaian', 'Hobi', 'Rumah Tangga', 'Buku', 'Lainnya'];
