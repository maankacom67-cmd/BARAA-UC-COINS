import { 
  collection, 
  addDoc, 
  query, 
  where, 
  orderBy, 
  getDocs, 
  doc, 
  updateDoc, 
  onSnapshot, 
  serverTimestamp 
} from 'firebase/firestore';
import { db } from './firebase';
import { OrderItem } from '../types';

export const createOrderInFirestore = async (orderData: Omit<OrderItem, 'createdAt' | 'id'>) => {
  const ordersRef = collection(db, 'orders');
  const docRef = await addDoc(ordersRef, {
    ...orderData,
    createdAt: serverTimestamp(),
    status: orderData.status || 'pending'
  });
  return docRef.id;
};

export const subscribeUserOrders = (userId: string, callback: (orders: OrderItem[]) => void) => {
  const ordersRef = collection(db, 'orders');
  const q = query(ordersRef, where('userId', '==', userId), orderBy('createdAt', 'desc'));
  
  return onSnapshot(q, (snapshot) => {
    const orders: OrderItem[] = snapshot.docs.map((docSnap) => ({
      id: docSnap.id,
      ...docSnap.data()
    } as OrderItem));
    callback(orders);
  }, (error) => {
    console.error('Error fetching user orders from Firestore:', error);
  });
};

export const subscribeAllOrders = (callback: (orders: OrderItem[]) => void) => {
  const ordersRef = collection(db, 'orders');
  const q = query(ordersRef, orderBy('createdAt', 'desc'));
  
  return onSnapshot(q, (snapshot) => {
    const orders: OrderItem[] = snapshot.docs.map((docSnap) => ({
      id: docSnap.id,
      ...docSnap.data()
    } as OrderItem));
    callback(orders);
  }, (error) => {
    console.error('Error fetching all orders from Firestore:', error);
  });
};

export const updateOrderStatus = async (orderId: string, status: OrderItem['status']) => {
  const orderRef = doc(db, 'orders', orderId);
  await updateDoc(orderRef, {
    status,
    updatedAt: serverTimestamp()
  });
};
