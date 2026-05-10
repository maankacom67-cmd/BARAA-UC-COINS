import { Search, Filter } from 'lucide-react';
import { useState } from 'react';
import { PRODUCTS } from '../constants';
import ProductCard from './ProductCard';
import { motion, AnimatePresence } from 'motion/react';

interface ShopProps {
  onNavigateToCheckout: () => void;
}

export default function Shop({ onNavigateToCheckout }: ShopProps) {
  const [activeCategory, setActiveCategory] = useState<string>('Dhammaan Ciyaaraha');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['Dhammaan Ciyaaraha', 'PUBG Mobile', 'Free Fire', 'Mobile Legends', 'Coins'];

  const filteredProducts = PRODUCTS.filter(p => {
    const matchesCategory = activeCategory === 'Dhammaan Ciyaaraha' || p.category === activeCategory || (activeCategory === 'PUBG Mobile' && p.category === 'PUBG');
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.amount.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="pt-32 pb-24 min-h-screen" id="shop-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
          <div>
            <h2 className="text-4xl lg:text-6xl mb-4">Keydka Hubka <br /><span className="text-brand-primary">Dijitaalka ah</span></h2>
            <p className="text-slate-400">Ku hel xirmooyinkaaga lacagta ciyaaraha si degdeg ah.</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
            <div className="relative flex-1 sm:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input
                type="text"
                placeholder="Raadi xirmooyinka ama ciyaaraha.."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-800/50 border border-slate-700 rounded-xl py-4 pl-12 pr-4 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-brand-primary transition-colors"
                id="shop-search-input"
              />
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto pb-8 scrollbar-hide no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-3 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${
                activeCategory === cat 
                ? 'bg-brand-primary text-brand-bg gaming-glow' 
                : 'bg-slate-800 text-slate-400 hover:text-slate-100 active:scale-95'
              }`}
              id={`cat-btn-${cat.replace(/\s+/g, '-').toLowerCase()}`}
            >
              {cat}
            </button>
          ))}
        </div>

        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
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
                <ProductCard product={product} onAddToCart={() => onNavigateToCheckout()} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        
        {filteredProducts.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-slate-500 text-lg">Ma jiro wax soo baxay oo waafaqsan raadintaada.</p>
          </div>
        )}
      </div>
    </section>
  );
}
