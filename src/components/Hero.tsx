import { ShoppingBag, ArrowRight, Zap, Shield, Star } from 'lucide-react';
import { motion } from 'motion/react';
import heroMockupImage from '../assets/images/hero_game_topup_1787292986331.jpg';

interface HeroProps {
  onCtaClick: () => void;
}

export default function Hero({ onCtaClick }: HeroProps) {
  return (
    <section className="relative pt-24 sm:pt-32 pb-12 sm:pb-20 overflow-hidden" id="hero-section">
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
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-4 sm:mb-6">
              <Zap className="w-3 h-3" />
              Geesi Hillaac ah
            </div>
            
            <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-display font-black leading-tight mb-3 sm:mb-6">
              Kusoo Dhawaada wabsedka rasmiga ah ee <br className="hidden sm:inline" />
              <span className="text-brand-primary">BARAA UC & COINS</span>
            </h1>
            
            <p className="text-slate-400 text-xs sm:text-sm md:text-base mb-6 sm:mb-8 max-w-lg leading-relaxed">
              Halkaan waa dukaanka ugu kalsoonida badan ee aad ka heli karto PUBG UC, Free Fire Diamonds, iyo adeegyo kale oo degdeg ah. Ku naxariiso akoonkaaga oo ku dallac qiimo jaban iyo dammaanad buuxda 24/7
            </p>
            
            <div className="flex flex-row gap-2.5 sm:gap-4">
              <button 
                onClick={onCtaClick}
                className="bg-brand-primary text-brand-bg px-4 py-2.5 sm:px-7 sm:py-3.5 rounded-lg sm:rounded-xl text-xs sm:text-base font-bold hover:bg-brand-primary-hover transition-all active:scale-95 flex items-center gap-1.5 sm:gap-2 gaming-glow-strong whitespace-nowrap"
                id="hero-cta-button"
              >
                Iibso Hadda <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>
              <button 
                onClick={onCtaClick}
                className="bg-slate-800/50 backdrop-blur text-slate-100 border border-slate-700 px-4 py-2.5 sm:px-7 sm:py-3.5 rounded-lg sm:rounded-xl text-xs sm:text-base font-bold hover:bg-slate-800 transition-all active:scale-95 whitespace-nowrap"
                id="hero-secondary-button"
              >
                Fiiri Qiimaha
              </button>
            </div>
            
            <div className="mt-8 sm:mt-12 flex items-center gap-5 sm:gap-8 border-t border-slate-800/50 pt-6 sm:pt-8">
              <div className="flex flex-col">
                <span className="text-lg sm:text-2xl font-bold text-slate-100">10k+</span>
                <span className="text-[10px] sm:text-xs text-slate-500 uppercase tracking-wider font-bold">Macaamiil</span>
              </div>
              <div className="h-6 sm:h-8 w-px bg-slate-800" />
              <div className="flex flex-col">
                <span className="text-lg sm:text-2xl font-bold text-slate-100">24/7</span>
                <span className="text-[10px] sm:text-xs text-slate-500 uppercase tracking-wider font-bold">Caawinaad</span>
              </div>
              <div className="h-6 sm:h-8 w-px bg-slate-800" />
              <div className="flex flex-col">
                <span className="text-lg sm:text-2xl font-bold text-slate-100">99%</span>
                <span className="text-[10px] sm:text-xs text-slate-500 uppercase tracking-wider font-bold">Ammaan</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: 5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-10 lg:mt-0 relative max-w-md mx-auto lg:max-w-none"
          >
            <div className="relative z-10 rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl shadow-brand-primary/20 border border-slate-800 bg-brand-surface">
              <img 
                src={heroMockupImage} 
                alt="Gaming UC, Diamonds, Coins Topup" 
                className="w-full object-cover opacity-90 hover:scale-105 transition-transform duration-700 max-h-[320px] sm:max-h-[420px]"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-bg/80 via-transparent to-transparent" />
            </div>
            
            {/* Floating elements for visual interest */}
            <motion.div 
              animate={{ y: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              className="absolute -top-3 -right-2 sm:-top-6 sm:-right-6 glass-card p-2.5 sm:p-4 rounded-lg sm:rounded-xl border-brand-primary/30 z-20"
            >
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-full bg-brand-primary flex items-center justify-center flex-shrink-0">
                  <ShoppingBag className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-brand-bg font-bold" />
                </div>
                <div>
                  <div className="text-[8px] sm:text-[10px] text-slate-500 uppercase font-bold leading-none">Iibsi Cusub</div>
                  <div className="text-xs sm:text-sm font-bold text-slate-100 leading-tight">600 UC + 60 Bonus</div>
                </div>
              </div>
            </motion.div>

            <motion.div 
               animate={{ x: [0, 6, 0] }}
               transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 1 }}
               className="absolute -bottom-3 -left-2 sm:-bottom-6 sm:-left-6 glass-card p-2.5 sm:p-4 rounded-lg sm:rounded-xl border-blue-500/30 z-20"
            >
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                  <Shield className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-white" />
                </div>
                <div>
                  <div className="text-[8px] sm:text-[10px] text-slate-500 uppercase font-bold leading-none">Service Ammaan ah</div>
                  <div className="text-xs sm:text-sm font-bold text-slate-100 leading-tight">100% Guaranteed</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
