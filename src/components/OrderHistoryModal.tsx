import React, { useEffect, useState } from 'react';
import { X, Package, Clock, CheckCircle, AlertCircle, RefreshCw, User, ShieldAlert } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../context/AuthContext';
import { subscribeUserOrders, subscribeAllOrders, updateOrderStatus } from '../lib/orders';
import { OrderItem } from '../types';

interface OrderHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function OrderHistoryModal({ isOpen, onClose }: OrderHistoryModalProps) {
  const { user, userProfile, isAdmin } = useAuth();
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'my' | 'admin'>('my');

  useEffect(() => {
    if (!isOpen) return;
    setLoading(true);

    if (isAdmin && activeTab === 'admin') {
      const unsub = subscribeAllOrders((fetchedOrders) => {
        setOrders(fetchedOrders);
        setLoading(false);
      });
      return () => unsub();
    } else if (user) {
      const unsub = subscribeUserOrders(user.uid, (fetchedOrders) => {
        setOrders(fetchedOrders);
        setLoading(false);
      });
      return () => unsub();
    } else {
      setOrders([]);
      setLoading(false);
    }
  }, [isOpen, user, isAdmin, activeTab]);

  if (!isOpen) return null;

  const handleStatusChange = async (orderId: string, newStatus: OrderItem['status']) => {
    try {
      await updateOrderStatus(orderId, newStatus);
    } catch (err) {
      console.error('Error updating order status:', err);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[85vh]"
        >
          {/* Header */}
          <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center text-brand-primary">
                <Package className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Dalabaadkaaga (Firebase Live)</h3>
                <p className="text-xs text-slate-400">Xogta tooska ah ee ku jirta Firestore Database</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Admin Tabs */}
          {isAdmin && (
            <div className="flex border-b border-slate-800 bg-slate-950/30 px-5 pt-3 gap-3">
              <button
                onClick={() => setActiveTab('my')}
                className={`pb-2.5 px-3 text-xs font-bold transition-colors border-b-2 ${
                  activeTab === 'my' ? 'border-brand-primary text-brand-primary' : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                Dalabkayga
              </button>
              <button
                onClick={() => setActiveTab('admin')}
                className={`pb-2.5 px-3 text-xs font-bold transition-colors border-b-2 flex items-center gap-1.5 ${
                  activeTab === 'admin' ? 'border-emerald-400 text-emerald-400' : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <ShieldAlert className="w-3.5 h-3.5" />
                Dhammaan Dalabaadka (Admin Panel)
              </button>
            </div>
          )}

          {/* Body */}
          <div className="p-5 overflow-y-auto flex-1 space-y-4">
            {loading ? (
              <div className="py-16 text-center text-slate-400 flex flex-col items-center gap-2">
                <RefreshCw className="w-6 h-6 animate-spin text-brand-primary" />
                <span className="text-xs">Ka soo raraya Firebase Database...</span>
              </div>
            ) : !user && activeTab === 'my' ? (
              <div className="py-12 text-center text-slate-400">
                <User className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                <p className="text-sm font-semibold text-slate-300 mb-2">Fadlan marka hore gal koontadaada</p>
                <p className="text-xs text-slate-500 mb-4">Si aad u aragto taariikhda dalabaadkaaga ku xiran Firebase.</p>
              </div>
            ) : orders.length === 0 ? (
              <div className="py-12 text-center text-slate-400">
                <Package className="w-12 h-12 text-slate-700 mx-auto mb-3" />
                <p className="text-sm font-medium text-slate-300">Weli wax dalab ah laguma darin</p>
                <p className="text-xs text-slate-500 mt-1">Dalab kasta oo aad dhiibato halkan ayuu toos uga soo muuqanayaa.</p>
              </div>
            ) : (
              orders.map((order) => (
                <div
                  key={order.id}
                  className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-slate-700 transition-colors"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-amber-400">#{order.id?.slice(0, 7)}</span>
                      <span className="text-xs font-bold text-white">{order.productName || order.amount}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-bold">
                        {order.paymentMethod}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-400">
                      <span>🎮 PUBG ID: <strong className="text-slate-200">{order.playerId}</strong></span>
                      {order.userPhone && <span>📞 Tel: <strong className="text-slate-200">{order.userPhone}</strong></span>}
                      <span>💰 <strong className="text-emerald-400">{order.price}</strong></span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 self-end sm:self-center">
                    {order.status === 'completed' ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold">
                        <CheckCircle className="w-3.5 h-3.5" />
                        Waa La Shubay
                      </span>
                    ) : order.status === 'cancelled' ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold">
                        <AlertCircle className="w-3.5 h-3.5" />
                        La Joojiyay
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold">
                        <Clock className="w-3.5 h-3.5 animate-spin" />
                        Pending...
                      </span>
                    )}

                    {isAdmin && activeTab === 'admin' && order.id && (
                      <div className="flex gap-1.5">
                        {order.status !== 'completed' && (
                          <button
                            onClick={() => handleStatusChange(order.id!, 'completed')}
                            className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-[11px] font-bold transition-all"
                          >
                            Dhammee
                          </button>
                        )}
                        {order.status !== 'cancelled' && (
                          <button
                            onClick={() => handleStatusChange(order.id!, 'cancelled')}
                            className="px-2 py-1 bg-slate-800 hover:bg-red-950 text-red-400 rounded text-[11px] font-bold transition-all"
                          >
                            Jooji
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
