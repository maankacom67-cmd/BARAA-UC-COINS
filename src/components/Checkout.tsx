import { ArrowLeft, CreditCard, Smartphone, ShieldCheck, Zap, Headphones, Lock } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';

interface CheckoutProps {
  onBack: () => void;
}

export default function Checkout({ onBack }: CheckoutProps) {
  const [paymentMethod, setPaymentMethod] = useState<'EVC' | 'Card'>('EVC');

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

        <h1 className="text-4xl lg:text-5xl font-display font-black mb-2">Lacag-bixinta <span className="text-brand-primary">Ammaanka ah</span></h1>
        <p className="text-slate-500 mb-12">Dhammaystir iibkaaga si degdeg ah oo ammaan ah.</p>

        <div className="grid lg:grid-cols-12 gap-12">
          {/* Form */}
          <div className="lg:col-span-8 space-y-8">
            {/* Step 1 */}
            <div className="glass-card rounded-2xl p-8 border-l-4 border-l-brand-primary">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-10 h-10 rounded-full bg-brand-primary text-brand-bg flex items-center justify-center font-black text-xl">1</div>
                <h2 className="text-2xl font-bold">Macluumaadka Ciyaarta</h2>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-slate-400 uppercase tracking-widest mb-3">ID-ga Ciyaartoyga</label>
                  <div className="relative">
                    <input 
                      type="text" 
                      placeholder="Gali ID-gaaga 10-ka nambar ah"
                      className="w-full bg-slate-800/30 border border-slate-700 rounded-xl py-4 px-5 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-brand-primary transition-all"
                      id="player-id-input"
                    />
                  </div>
                  <p className="mt-3 text-xs text-slate-500 flex items-center gap-2">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Tan ka hel qaybta hore ee ciyaartaada.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="glass-card rounded-2xl p-8 border-l-4 border-l-brand-primary/30">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-10 h-10 rounded-full bg-brand-primary/20 text-brand-primary flex items-center justify-center font-black text-xl">2</div>
                <h2 className="text-2xl font-bold">Qaabka Lacag-bixinta</h2>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                <button 
                  onClick={() => setPaymentMethod('EVC')}
                  className={`flex items-center justify-between p-6 rounded-xl border-2 transition-all ${
                    paymentMethod === 'EVC' ? 'border-brand-primary bg-brand-primary/5' : 'border-slate-800 bg-slate-800/20 hover:border-slate-700'
                  }`}
                  id="evc-method-btn"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                      paymentMethod === 'EVC' ? 'border-brand-primary' : 'border-slate-700'
                    }`}>
                      {paymentMethod === 'EVC' && <div className="w-2.5 h-2.5 rounded-full bg-brand-primary" />}
                    </div>
                    <div className="text-left">
                      <div className="font-bold text-slate-100">EVC Plus</div>
                      <div className="text-xs text-slate-500">Lacagta moobilka degdeg ah</div>
                    </div>
                  </div>
                  <Smartphone className="w-6 h-6 text-slate-500" />
                </button>

                <button 
                  onClick={() => setPaymentMethod('Card')}
                  className={`flex items-center justify-between p-6 rounded-xl border-2 transition-all ${
                    paymentMethod === 'Card' ? 'border-brand-primary bg-brand-primary/5' : 'border-slate-800 bg-slate-800/20 hover:border-slate-700'
                  }`}
                  id="card-method-btn"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                      paymentMethod === 'Card' ? 'border-brand-primary' : 'border-slate-700'
                    }`}>
                      {paymentMethod === 'Card' && <div className="w-2.5 h-2.5 rounded-full bg-brand-primary" />}
                    </div>
                    <div className="text-left">
                      <div className="font-bold text-slate-100">Credit / Debit Card</div>
                      <div className="text-xs text-slate-500">Hawlgal ammaan ah</div>
                    </div>
                  </div>
                  <CreditCard className="w-6 h-6 text-slate-500" />
                </button>
              </div>

              {paymentMethod === 'EVC' && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <div className="p-4 bg-brand-primary/10 border border-brand-primary/20 rounded-xl">
                    <p className="text-sm font-bold text-brand-primary mb-1 uppercase tracking-wider">Ku dir lacagta lambarkan:</p>
                    <p className="text-2xl font-black text-slate-100 tracking-widest">0771909054</p>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-400 uppercase tracking-widest mb-3">Lambarkaaga EVC Plus (Kaaga gaarka ah)</label>
                    <div className="relative">
                      <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 font-bold">+252</span>
                      <input 
                        type="text" 
                        placeholder="61XXXXXXX"
                        className="w-full bg-slate-800/30 border border-slate-700 rounded-xl py-4 pl-16 pr-5 text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-brand-primary transition-all"
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
            <div className="glass-card rounded-2xl p-8 sticky top-32 bg-slate-900/40 border-slate-800 overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-brand-primary" />
              
              <h3 className="text-xl font-bold mb-8">Koobitaanka Dalabka</h3>
              
              <div className="flex gap-4 p-4 rounded-xl bg-slate-800/30 mb-8 border border-white/5">
                <div className="w-12 h-12 bg-brand-primary rounded-lg flex items-center justify-center flex-shrink-0">
                   <Zap className="w-6 h-6 text-brand-bg" />
                </div>
                <div>
                  <div className="font-bold text-slate-100">PUBG Mobile UC</div>
                  <div className="text-xs text-slate-500">600 + 60 Bonus</div>
                </div>
                <div className="ml-auto font-bold text-slate-100">$9.99</div>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Warta qaybeed</span>
                  <span className="text-slate-100 font-medium">$9.99</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Lacagta adeegga</span>
                  <span className="text-brand-primary font-medium">$0.00</span>
                </div>
                <div className="h-px bg-slate-800" />
                <div className="flex justify-between text-xl font-black">
                  <span className="text-slate-100">Warta Guud</span>
                  <span className="text-brand-primary">$9.99</span>
                </div>
              </div>

              <button 
                onClick={() => {
                  if (paymentMethod === 'EVC') {
                    window.location.href = "tel:*712*771909054%23";
                  }
                }}
                className="w-full bg-brand-primary text-brand-bg py-4 rounded-xl font-black text-lg hover:bg-brand-primary-hover transition-all flex items-center justify-center gap-3 gaming-glow" 
                id="confirm-payment-btn"
              >
                <Lock className="w-5 h-5" />
                Dhammaystir libka {paymentMethod === 'EVC' ? '(EVC)' : ''}
              </button>

              <div className="mt-8 grid grid-cols-3 gap-2">
                <div className="text-center flex flex-col items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-slate-500" />
                  <span className="text-[10px] text-slate-500 font-bold uppercase">Ammaan</span>
                </div>
                <div className="text-center flex flex-col items-center gap-1">
                  <Zap className="w-4 h-4 text-slate-500" />
                  <span className="text-[10px] text-slate-500 font-bold uppercase">Degdeg</span>
                </div>
                <div className="text-center flex flex-col items-center gap-1">
                  <Headphones className="w-4 h-4 text-slate-500" />
                  <span className="text-[10px] text-slate-500 font-bold uppercase">Caawinaad</span>
                </div>
              </div>

              <p className="mt-6 text-[10px] text-slate-500 text-center leading-relaxed">
                Markaad dhammaystirto iibkan, waxaad oggolaatay <span className="text-slate-300 underline cursor-pointer">Shuruudaha Adeegga</span> waxaadna xaqiijinaysaa in ID-ga Ciyaartoygu sax yahay.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
