import { ShoppingCart, Zap, Gem, CircleDollarSign, Plus } from 'lucide-react';
import { Product } from '../constants';
import { motion } from 'motion/react';

interface ProductCardProps {
  product: Product;
  onAddToCart: (productId: string) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      className={`relative group bg-slate-800/90 border rounded-2xl sm:rounded-[24px] overflow-hidden p-3 sm:p-5 transition-all duration-300 flex flex-col justify-between h-full ${
        product.price === 'BILAASH' 
        ? 'border-brand-primary shadow-[0_0_20px_rgba(251,191,36,0.3)] bg-gradient-to-br from-slate-800 to-brand-primary/10' 
        : 'border-slate-700/80 hover:border-brand-primary hover:shadow-[0_10px_30px_rgba(251,191,36,0.2)]'
      }`}
      id={`product-card-${product.id}`}
    >
      {product.badge && (
        <div className="absolute top-0 right-0 z-10">
          <div className={`${product.price === 'BILAASH' ? 'bg-white text-brand-bg animate-pulse' : 'bg-brand-primary text-brand-bg'} text-[8px] sm:text-[10px] font-black px-2 py-0.5 sm:px-3 sm:py-1 uppercase rounded-bl-lg sm:rounded-bl-xl tracking-wider shadow-md`}>
            {product.badge}
          </div>
        </div>
      )}

      <div className="flex flex-col items-center text-center flex-1">
        <div className="relative w-full h-28 sm:h-40 mb-3 sm:mb-4 flex items-center justify-center group-hover:scale-105 transition-transform duration-500 rounded-xl overflow-hidden bg-slate-900/60 border border-slate-700/50">
          <div className={`absolute inset-0 rounded-full blur-2xl transition-colors ${product.price === 'BILAASH' ? 'bg-brand-primary/30' : 'bg-brand-primary/10 group-hover:bg-brand-primary/20'}`} />
          {product.image ? (
            <img 
              src={product.image} 
              alt={product.name}
              className={`w-full h-full object-cover transition-all duration-500 ${product.price === 'BILAASH' ? 'brightness-110 drop-shadow-[0_0_20px_rgba(251,191,36,0.9)]' : 'group-hover:scale-110'}`}
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="w-10 h-10 rounded-xl bg-brand-bg flex items-center justify-center shadow-inner">
               <Plus className="w-5 h-5 text-slate-400" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent pointer-events-none" />
        </div>

        <div className="mb-2 sm:mb-3 w-full">
          <p className="text-[8px] sm:text-[10px] font-bold text-brand-primary uppercase tracking-wider mb-0.5">{product.category}</p>
          <h3 className="text-sm sm:text-lg md:text-xl font-black text-slate-100 mb-0.5 leading-tight truncate">{product.amount}</h3>
          <p className="text-[10px] sm:text-xs font-semibold text-slate-400 truncate">
            {product.bonus || product.name}
          </p>
        </div>
      </div>
      
      <div className="w-full mt-auto pt-1">
        <div className="text-xs sm:text-lg font-display font-black text-slate-100 mb-2 sm:mb-3 bg-slate-900/60 py-1 sm:py-1.5 px-2 rounded-lg sm:rounded-full border border-slate-700/60 text-center">
          {product.price}
        </div>

        <button
          onClick={() => onAddToCart(product.id)}
          className="w-full bg-brand-primary text-brand-bg py-2 sm:py-3 rounded-lg sm:rounded-xl font-bold text-xs sm:text-sm hover:bg-brand-primary-hover active:scale-95 transition-all flex items-center justify-center gap-1.5 sm:gap-2 gaming-glow whitespace-nowrap"
          id={`product-buy-btn-${product.id}`}
        >
          <ShoppingCart className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span>Iibso Hada</span>
        </button>
      </div>
    </motion.div>
  );
}
