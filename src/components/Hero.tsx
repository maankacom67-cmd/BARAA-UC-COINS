import { ShoppingBag, ArrowRight, Zap, Shield, Star } from 'lucide-react';
import { motion } from 'motion/react';

interface HeroProps {
  onCtaClick: () => void;
}

export default function Hero({ onCtaClick }: HeroProps) {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden" id="hero-section">
      {/* Background elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[20%] w-[60%] h-[60%] bg-brand-primary/5 rounded-full blur-[120px]" />
        <div className="absolute top-[20%] right-[10%] w-[40%] h-[40%] bg-blue-500/5 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-xs font-bold uppercase tracking-widest mb-6">
              <Zap className="w-3 h-3" />
              Geesi Hillaac ah
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-display font-black leading-tight mb-6">
              Saaxiibkaaga <br />
              <span className="text-brand-primary">Lacagaha Ciyaaraha</span>
            </h1>
            
            <p className="text-slate-400 text-lg mb-10 max-w-lg leading-relaxed">
              Geesi degdeg ah, kala iibsi ammaan ah, iyo qiimo jaban oo UC iyo Coins ah. 
              Ku hel xirmooyinkaaga ilbiriqsiyo gudahood waqti kasta.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={onCtaClick}
                className="bg-brand-primary text-brand-bg px-8 py-4 rounded-xl text-lg font-bold hover:bg-brand-primary-hover transition-all active:scale-95 flex items-center gap-2 gaming-glow-strong"
                id="hero-cta-button"
              >
                Iibso Hadda <ArrowRight className="w-5 h-5" />
              </button>
              <button 
                className="bg-slate-800/50 backdrop-blur text-slate-100 border border-slate-700 px-8 py-4 rounded-xl text-lg font-bold hover:bg-slate-800 transition-all active:scale-95"
                id="hero-secondary-button"
              >
                Fiiri Qiimaha
              </button>
            </div>
            
            <div className="mt-12 flex items-center gap-8 border-t border-slate-800/50 pt-8">
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-slate-100">10k+</span>
                <span className="text-xs text-slate-500 uppercase tracking-widest font-bold">Macaamiil</span>
              </div>
              <div className="h-8 w-px bg-slate-800" />
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-slate-100">24/7</span>
                <span className="text-xs text-slate-500 uppercase tracking-widest font-bold">Caawinaad</span>
              </div>
              <div className="h-8 w-px bg-slate-800" />
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-slate-100">99%</span>
                <span className="text-xs text-slate-500 uppercase tracking-widest font-bold">Ammaan</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: 5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-16 lg:mt-0 relative"
          >
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl shadow-brand-primary/20 border border-slate-800 bg-brand-surface">
              <img 
                src="https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=800" 
                alt="Gaming Setup" 
                className="w-full object-cover opacity-80"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-bg via-transparent to-transparent" />
            </div>
            
            {/* Floating elements for visual interest */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              className="absolute -top-6 -right-6 glass-card p-4 rounded-xl border-brand-primary/30 z-20"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brand-primary flex items-center justify-center">
                  <ShoppingBag className="w-5 h-5 text-brand-bg font-bold" />
                </div>
                <div>
                  <div className="text-[10px] text-slate-500 uppercase font-bold leading-none">Iibsi Cusub</div>
                  <div className="text-sm font-bold text-slate-100 leading-tight">600 UC + 60 Bonus</div>
                </div>
              </div>
            </motion.div>

            <motion.div 
               animate={{ x: [0, 10, 0] }}
               transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 1 }}
               className="absolute -bottom-6 -left-6 glass-card p-4 rounded-xl border-blue-500/30 z-20"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-[10px] text-slate-500 uppercase font-bold leading-none">Service Ammaan ah</div>
                  <div className="text-sm font-bold text-slate-100 leading-tight">100% Guaranteed</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
