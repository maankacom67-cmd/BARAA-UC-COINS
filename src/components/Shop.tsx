import { Search, Filter } from 'lucide-react';
import { useState } from 'react';
import { PRODUCTS } from '../constants';
import ProductCard from './ProductCard';
import { motion, AnimatePresence } from 'motion/react';

interface ShopProps {
  onSelectProduct: (productId: string) => void;
}

export default function Shop({ onSelectProduct }: ShopProps) {
  const [activeCategory, setActiveCategory] = useState<string>('Dhammaan Ciyaaraha');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['Dhammaan Ciyaaraha', 'PUBG Mobile', 'Free Fire', 'eFootball Coins'];

  const filteredProducts = PRODUCTS.filter(p => {
    const matchesCategory = 
      activeCategory === 'Dhammaan Ciyaaraha' || 
      (activeCategory === 'PUBG Mobile' && p.category === 'PUBG') ||
      (activeCategory === 'Free Fire' && p.category === 'Free Fire') ||
      (activeCategory === 'eFootball Coins' && (p.category === 'eFootball' || p.category === 'Coins'));
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.amount.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="pt-24 sm:pt-32 pb-16 sm:pb-24 min-h-screen" id="shop-section">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 sm:gap-8 mb-6 sm:mb-10">
          <div>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-display font-black mb-1.5 sm:mb-3">
              Xirmooyinka <span className="text-brand-primary">Dijitaalka ah</span>
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm">Ku hel xirmooyinkaaga lacagta ciyaaraha si degdeg ah oo toos ah.</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            <div className="relative flex-1 sm:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="text"
                placeholder="Raadi xirmooyinka ama ciyaaraha.."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-800/60 border border-slate-700 rounded-xl py-2.5 sm:py-3.5 pl-10 pr-4 text-xs sm:text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-brand-primary transition-colors"
                id="shop-search-input"
              />
            </div>
          </div>
        </div>

        {/* Categories Chips */}
        <div className="flex gap-2 overflow-x-auto pb-4 sm:pb-6 scrollbar-hide no-scrollbar -mx-3 px-3 sm:mx-0 sm:px-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 sm:px-5 sm:py-2.5 rounded-lg sm:rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex-shrink-0 ${
                activeCategory === cat 
                ? 'bg-brand-primary text-brand-bg gaming-glow' 
                : 'bg-slate-800/80 text-slate-400 hover:text-slate-100 active:scale-95'
              }`}
              id={`cat-btn-${cat.replace(/\s+/g, '-').toLowerCase()}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 2 columns on mobile, 3-4 on larger screens */}
        <motion.div 
          layout
          className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2.5 sm:gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                layout
              >
                <ProductCard product={product} onAddToCart={() => onSelectProduct(product.id)} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        
        {filteredProducts.length === 0 && (
          <div className="py-16 text-center">
            <p className="text-slate-500 text-sm sm:text-base">Ma jiro wax soo baxay oo waafaqsan raadintaada.</p>
          </div>
        )}
      </div>
    </section>
  );
}
