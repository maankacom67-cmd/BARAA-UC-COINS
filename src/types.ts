export interface UserProfile {
  uid: string;
  email: string;
  phone?: string;
  displayName?: string;
  playerId?: string;
  role?: 'user' | 'admin';
  createdAt?: any;
  updatedAt?: any;
}

export interface OrderItem {
  id?: string;
  userId?: string;
  userEmail?: string;
  userPhone?: string;
  playerId: string;
  productId: string;
  productName: string;
  amount: string;
  price: string;
  paymentMethod: 'EVC' | 'Card' | 'Free Promo';
  evcNumber?: string;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  notes?: string;
  createdAt: any;
}
