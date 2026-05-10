import { ShoppingCart, Zap, Gem, CircleDollarSign, Plus } from 'lucide-react';
import { Product } from '../constants';
import { motion } from 'motion/react';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="relative group bg-slate-800 border border-brand-primary/20 rounded-[24px] overflow-hidden p-6 transition-all duration-300 hover:border-brand-primary hover:shadow-[0_10px_30px_rgba(251,191,36,0.2)]"
      id={`product-card-${product.id}`}
    >
      {product.badge && (
        <div className="absolute top-0 right-0 z-10">
          <div className="bg-brand-primary text-brand-bg text-[10px] font-black px-4 py-1.5 uppercase rounded-bl-xl tracking-wider shadow-lg">
            {product.badge}
          </div>
        </div>
      )}

      <div className="flex flex-col items-center text-center">
        <div className="relative w-40 h-40 mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
          <div className="absolute inset-0 bg-brand-primary/5 rounded-full blur-3xl group-hover:bg-brand-primary/20 transition-colors" />
          {product.image ? (
            <img 
              src={product.image} 
              alt={product.name}
              className="w-32 h-32 object-contain drop-shadow-[0_0_15px_rgba(251,191,36,0.6)] group-hover:drop-shadow-[0_0_25px_rgba(251,191,36,0.8)] transition-all duration-500"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="w-16 h-16 rounded-2xl bg-brand-bg flex items-center justify-center shadow-inner">
               <Plus className="w-8 h-8 text-slate-400" />
            </div>
          )}
        </div>

        <div className="mb-6">
          <p className="text-[10px] font-bold text-brand-primary uppercase tracking-[0.2em] mb-1">{product.category}</p>
          <h3 className="text-2xl font-black text-slate-100 mb-1">{product.amount}</h3>
          <p className="text-xs font-semibold text-slate-400">
            {product.bonus || product.name}
          </p>
        </div>
        
        <div className="text-3xl font-display font-black text-slate-100 mb-8 bg-slate-900/50 px-6 py-2 rounded-full border border-slate-700">
          {product.price}
        </div>

        <button
          onClick={() => onAddToCart(product)}
          className="w-full bg-brand-primary text-brand-bg py-4 rounded-xl font-black text-lg hover:bg-brand-primary-hover hover:scale-[1.02] transition-all flex items-center justify-center gap-3 gaming-glow"
          id={`product-buy-btn-${product.id}`}
        >
          <ShoppingCart className="w-5 h-5" />
          Iibso Hadda
        </button>
      </div>
    </motion.div>
  );
}
