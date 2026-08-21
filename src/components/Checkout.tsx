import React, { useState } from 'react';
import { ArrowLeft, CreditCard, Smartphone, ShieldCheck, Zap, Headphones, Lock, CheckCircle2, Copy, Check } from 'lucide-react';
import { motion } from 'motion/react';
import { useAuth } from '../context/AuthContext';
import { createOrderInFirestore } from '../lib/orders';
import { Product } from '../constants';

interface CheckoutProps {
  product?: Product | null;
  onBack: () => void;
}

export default function Checkout({ product, onBack }: CheckoutProps) {
  const { user, userProfile } = useAuth();
  const [paymentMethod, setPaymentMethod] = useState<'EVC' | 'Card'>('EVC');
  const [playerId, setPlayerId] = useState(userProfile?.playerId || '');
  const [evcNumber, setEvcNumber] = useState(userProfile?.phone || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<{ id: string; playerId: string; amount: string; price: string } | null>(null);
  const [copied, setCopied] = useState(false);

  const defaultProduct = {
    id: '660-uc',
    name: '660 PUBG UC',
    amount: '600 + 60 UC',
    price: '$9.99',
    category: 'PUBG' as const
  };

  const currentProduct = product || defaultProduct;

  const handleCompleteOrder = async () => {
    if (!playerId.trim()) {
      alert('Fadlan geli Player ID-gaaga.');
      return;
    }

    setIsSubmitting(true);

    try {
      const orderId = await createOrderInFirestore({
        userId: user?.uid || '',
        userEmail: user?.email || '',
        userPhone: evcNumber,
        playerId: playerId.trim(),
        productId: currentProduct.id,
        productName: currentProduct.name,
        amount: currentProduct.amount,
        price: currentProduct.price,
        paymentMethod: paymentMethod,
        evcNumber: evcNumber,
        status: 'pending'
      });

      setCompletedOrder({
        id: orderId,
        playerId: playerId.trim(),
        amount: currentProduct.amount,
        price: currentProduct.price
      });

      // Send to WhatsApp
      const tel_number = "252771909054";
      const message = `Asc Maanka, waxaan soo diray dalab cusub oo ku jira Firebase Database:\n🆔 Order ID: #${orderId.slice(0, 7)}\n🎮 Player ID: ${playerId.trim()}\n💎 Xirmo: ${currentProduct.amount} (${currentProduct.price})\n📞 EVC: ${evcNumber || 'N/A'}`;
      const whatsappUrl = `https://wa.me/${tel_number}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');

      if (paymentMethod === 'EVC') {
        window.location.href = "tel:*712*771909054%23";
      }
    } catch (err: any) {
      console.error('Error creating order in Firestore:', err);
      alert('Khalad ayaa dhacay xilliga dalabka: ' + (err.message || 'Isku day mar kale'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyOrderId = () => {
    if (completedOrder) {
      navigator.clipboard.writeText(completedOrder.id);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (completedOrder) {
    return (
      <section className="pt-32 pb-24 bg-brand-bg min-h-screen flex items-center justify-center px-4" id="checkout-completed">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full glass-card p-8 rounded-2xl border-t-4 border-t-emerald-500 text-center"
        >
          <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-500/30">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          
          <h2 className="text-2xl font-black text-white mb-2">Dalabkaaga Waa La Keydiyay!</h2>
          <p className="text-slate-400 text-xs mb-6">
            Dalabkaaga si toos ah ayaa loogu keydiyay Firebase Firestore Database. Maamulaha ayaa ku shubaya ilbiriqsiyo gudahood.
          </p>

          <div className="bg-slate-900/80 rounded-xl p-4 border border-slate-800 text-left space-y-2 mb-6">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-500">Order ID:</span>
              <div className="flex items-center gap-1">
                <span className="font-mono font-bold text-amber-400">#{completedOrder.id.slice(0, 8)}</span>
                <button onClick={copyOrderId} className="text-slate-400 hover:text-white p-1">
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-slate-500">Player ID:</span>
              <span className="font-bold text-white">{completedOrder.playerId}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-slate-500">Xirmada:</span>
              <span className="font-bold text-white">{completedOrder.amount}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-slate-500">Qiimaha:</span>
              <span className="font-bold text-emerald-400">{completedOrder.price}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-slate-500">Xaaladda:</span>
              <span className="inline-flex items-center gap-1 font-bold text-amber-400">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
                Waa la diyaarinayaa (Pending)
              </span>
            </div>
          </div>

          <button 
            onClick={onBack}
            className="w-full bg-brand-primary text-brand-bg py-3.5 rounded-xl font-bold hover:bg-brand-primary-hover transition-all"
          >
            Ku laabo Hoyga
          </button>
        </motion.div>
      </section>
    );
  }

  return (
    <section className="pt-32 pb-24 bg-brand-bg min-h-screen" id="checkout-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-slate-400 hover:text-slate-100 mb-8 transition-colors group"
          id="back-to-shop-btn"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Jooji oo Noqo
        </button>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black mb-2">
          Lacag-bixinta <span className="text-brand-primary">Ammaanka ah</span>
        </h1>
        <p className="text-slate-400 text-sm mb-8">
          Dhammaystir iibkaaga si degdeg ah. Xogtaada waxaa si toos ah loogu kaydinayaa Firebase Database.
        </p>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Form */}
          <div className="lg:col-span-8 space-y-6 sm:space-y-8">
            {/* Step 1 */}
            <div className="glass-card rounded-2xl p-6 sm:p-8 border-l-4 border-l-brand-primary">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 rounded-full bg-brand-primary text-brand-bg flex items-center justify-center font-black text-xl">1</div>
                <h2 className="text-xl sm:text-2xl font-bold">Macluumaadka Ciyaarta</h2>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
                    ID-ga Ciyaartoyga (Player ID) <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <input 
                      type="text" 
                      required
                      placeholder="Geli ID-gaaga ciyaarta (tusaale: 5123456789)"
                      value={playerId}
                      onChange={(e) => setPlayerId(e.target.value)}
                      className="w-full bg-slate-800/40 border border-slate-700 rounded-xl py-3.5 px-4 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-brand-primary transition-all text-sm"
                      id="player-id-input"
                    />
                  </div>
                  <p className="mt-2 text-xs text-slate-500 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    Hubi in ID-gaagu sax yahay si lacagtu ugu dhacdo akoonkaaga saxda ah.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="glass-card rounded-2xl p-6 sm:p-8 border-l-4 border-l-brand-primary/30">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 rounded-full bg-brand-primary/20 text-brand-primary flex items-center justify-center font-black text-xl">2</div>
                <h2 className="text-xl sm:text-2xl font-bold">Qaabka Lacag-bixinta</h2>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 mb-6">
                <button 
                  type="button"
                  onClick={() => setPaymentMethod('EVC')}
                  className={`flex items-center justify-between p-5 rounded-xl border-2 transition-all ${
                    paymentMethod === 'EVC' ? 'border-brand-primary bg-brand-primary/5' : 'border-slate-800 bg-slate-800/20 hover:border-slate-700'
                  }`}
                  id="evc-method-btn"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                      paymentMethod === 'EVC' ? 'border-brand-primary' : 'border-slate-700'
                    }`}>
                      {paymentMethod === 'EVC' && <div className="w-2.5 h-2.5 rounded-full bg-brand-primary" />}
                    </div>
                    <div className="text-left">
                      <div className="font-bold text-slate-100 text-sm">EVC Plus</div>
                      <div className="text-xs text-slate-500">Lacagta moobilka degdeg ah</div>
                    </div>
                  </div>
                  <Smartphone className="w-5 h-5 text-slate-400" />
                </button>

                <button 
                  type="button"
                  onClick={() => setPaymentMethod('Card')}
                  className={`flex items-center justify-between p-5 rounded-xl border-2 transition-all ${
                    paymentMethod === 'Card' ? 'border-brand-primary bg-brand-primary/5' : 'border-slate-800 bg-slate-800/20 hover:border-slate-700'
                  }`}
                  id="card-method-btn"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                      paymentMethod === 'Card' ? 'border-brand-primary' : 'border-slate-700'
                    }`}>
                      {paymentMethod === 'Card' && <div className="w-2.5 h-2.5 rounded-full bg-brand-primary" />}
                    </div>
                    <div className="text-left">
                      <div className="font-bold text-slate-100 text-sm">Credit / Debit Card</div>
                      <div className="text-xs text-slate-500">Hawlgal ammaan ah</div>
                    </div>
                  </div>
                  <CreditCard className="w-5 h-5 text-slate-400" />
                </button>
              </div>

              {paymentMethod === 'EVC' && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <div className="p-4 bg-brand-primary/10 border border-brand-primary/20 rounded-xl flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-brand-primary uppercase tracking-wider mb-1">Ku dir lacagta lambarkan:</p>
                      <p className="text-2xl font-black text-slate-100 tracking-widest">0771909054</p>
                    </div>
                    <div className="text-xs text-slate-400 font-mono">Maanka Service</div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Lambarkaaga EVC Plus (Kaaga lacagta laga diray)</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">+252</span>
                      <input 
                        type="tel" 
                        placeholder="61XXXXXXX"
                        value={evcNumber}
                        onChange={(e) => setEvcNumber(e.target.value)}
                        className="w-full bg-slate-800/40 border border-slate-700 rounded-xl py-3 pl-16 pr-4 text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-brand-primary transition-all text-sm"
                        id="evc-number-input"
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>

          {/* Summary */}
          <div className="lg:col-span-4">
            <div className="glass-card rounded-2xl p-6 sm:p-8 sticky top-32 bg-slate-900/60 border-slate-800 overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-brand-primary" />
              
              <h3 className="text-xl font-bold mb-6">Koobitaanka Dalabka</h3>
              
              <div className="flex gap-4 p-4 rounded-xl bg-slate-800/40 mb-6 border border-white/5 items-center">
                <div className="w-12 h-12 bg-brand-primary rounded-lg flex items-center justify-center flex-shrink-0">
                  <Zap className="w-6 h-6 text-brand-bg" />
                </div>
                <div>
                  <div className="font-bold text-slate-100 text-sm">{currentProduct.name}</div>
                  <div className="text-xs text-slate-400">{currentProduct.amount}</div>
                </div>
                <div className="ml-auto font-black text-slate-100">{currentProduct.price}</div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Qiimaha xirmada</span>
                  <span className="text-slate-100 font-medium">{currentProduct.price}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Lacagta adeegga</span>
                  <span className="text-brand-primary font-medium">$0.00</span>
                </div>
                <div className="h-px bg-slate-800" />
                <div className="flex justify-between text-lg font-black">
                  <span className="text-slate-100">Warta Guud</span>
                  <span className="text-brand-primary">{currentProduct.price}</span>
                </div>
              </div>

              <button 
                onClick={handleCompleteOrder}
                disabled={isSubmitting}
                className={`w-full bg-brand-primary text-brand-bg py-4 rounded-xl font-black text-base hover:bg-brand-primary-hover transition-all flex items-center justify-center gap-2 gaming-glow cursor-pointer active:scale-98 ${isSubmitting ? 'opacity-60 cursor-not-allowed' : ''}`} 
                id="confirm-payment-btn"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-brand-bg border-t-transparent rounded-full animate-spin" />
                    Waa la keydinayaa...
                  </div>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    Dhammaystir libka {paymentMethod === 'EVC' ? '(EVC Plus)' : ''}
                  </>
                )}
              </button>

              <div className="mt-6 grid grid-cols-3 gap-2">
                <div className="text-center flex flex-col items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span className="text-[9px] text-slate-400 font-bold uppercase">Ammaan</span>
                </div>
                <div className="text-center flex flex-col items-center gap-1">
                  <Zap className="w-4 h-4 text-brand-primary" />
                  <span className="text-[9px] text-slate-400 font-bold uppercase">Degdeg</span>
                </div>
                <div className="text-center flex flex-col items-center gap-1">
                  <Headphones className="w-4 h-4 text-slate-400" />
                  <span className="text-[9px] text-slate-400 font-bold uppercase">24/7 Taageero</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
