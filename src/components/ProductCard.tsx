import { ShoppingCart, Gift, Sparkles, Gem, BadgeCent } from 'lucide-react';
import { Product } from '../constants';
import { motion } from 'motion/react';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const isFree = product.price === 'BILAASH';

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={`relative group bg-slate-900 border rounded-2xl p-6 flex flex-col justify-between text-center overflow-hidden h-full ${
        isFree 
          ? 'border-green-500/40 shadow-[0_0_15px_rgba(34,197,94,0.2)] hover:shadow-[0_0_25px_rgba(34,197,94,0.6)]' 
          : 'border-slate-800/85 shadow-[0_0_15px_rgba(245,158,11,0.1)] hover:border-amber-500/30 hover:shadow-[0_0_25px_rgba(245,158,11,0.5)]'
      }`}
      id={`product-card-${product.id}`}
    >
      {/* Badge at the top */}
      {product.badge && (
        <div className="absolute top-3 right-3 z-10">
          <span className={`text-[10px] font-black px-2.5 py-1 rounded uppercase tracking-wider shadow-sm ${
            isFree 
              ? 'bg-green-500 text-slate-100 animate-pulse' 
              : 'bg-amber-500 text-slate-950'
          }`}>
            {product.badge}
          </span>
        </div>
      )}

      {/* Main Container */}
      <div className="flex flex-col items-center flex-grow mb-6">
        {/* Glow & Icon container */}
        <div className="relative w-28 h-28 mx-auto mb-5 flex items-center justify-center">
          <div className={`absolute inset-0 rounded-full blur-2xl transition-all duration-500 ${
            isFree 
              ? 'bg-green-500/10 group-hover:bg-green-500/20' 
              : 'bg-amber-500/10 group-hover:bg-amber-500/20'
          }`} />
          
          <div className={`w-24 h-24 rounded-full flex items-center justify-center border transition-all duration-300 ${
            isFree 
              ? 'bg-green-500/10 border-green-500/20 group-hover:border-green-500/40' 
              : 'bg-amber-500/10 border-amber-500/20 group-hover:border-amber-500/40'
          }`}>
            {isFree ? (
              <Gift className="w-12 h-12 text-green-400 group-hover:scale-110 transition-transform duration-300" />
            ) : product.category === 'Coins' ? (
              <BadgeCent className="w-12 h-12 text-amber-400 group-hover:scale-110 transition-transform duration-300 animate-pulse" />
            ) : (
              <Gem className="w-12 h-12 text-amber-400 group-hover:scale-110 transition-transform duration-300" />
            )}
          </div>
        </div>

        {/* Product Details */}
        <div className="mb-4">
          <p className={`text-[10px] font-bold uppercase tracking-widest mb-1 ${
            isFree ? 'text-green-400' : 'text-amber-400'
          }`}>
            {product.category} Mobile
          </p>
          <h3 className="text-2xl font-black text-white mb-1 tracking-tight">
            {product.amount}
          </h3>
          <p className={`text-xs ${isFree ? 'text-green-400 font-extrabold' : 'text-slate-400 font-medium'}`}>
            {product.bonus || 'Auto-Delivery enabled'}
          </p>
        </div>

        {/* Pricing tag */}
        <div className={`text-xl font-black px-5 py-1.5 rounded-full border mb-2 mt-auto inline-block ${
          isFree 
            ? 'bg-green-950/40 text-green-400 border-green-500/20' 
            : 'bg-slate-950 text-slate-100 border-slate-800'
        }`}>
          {product.price}
        </div>
      </div>

      {/* Button with exact behavior */}
      <button
        onClick={() => onAddToCart(product)}
        className={`w-full font-bold py-3 px-4 rounded-xl transition duration-300 transform active:scale-95 cursor-pointer flex items-center justify-center gap-2 ${
          isFree 
            ? 'bg-green-500 hover:bg-green-600 text-slate-950 font-black' 
            : 'bg-amber-500 hover:bg-amber-600 text-slate-950 font-black'
        }`}
        id={`product-buy-btn-${product.id}`}
      >
        <span>{isFree ? 'Hada Qaado' : 'Iibso Hada'}</span>
      </button>
    </motion.div>
  );
}
