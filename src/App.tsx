/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Shop from './components/Shop';
import Features from './components/Features';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import Checkout from './components/Checkout';
import Auth from './components/Auth';
import { PRODUCTS, Product } from './constants';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from './context/AuthContext';
import { MessageCircle } from 'lucide-react';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { user } = useAuth();

  const handleProductSelect = (productId: string) => {
    const product = PRODUCTS.find((p) => p.id === productId) || null;
    setSelectedProduct(product);
    setCurrentPage('checkout');
  };

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Hero onCtaClick={() => setCurrentPage('shop')} />
            <Features />
            <div className="py-12 sm:py-20 text-center px-4">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-black mb-4 sm:mb-6">Diyaar ma u tahay inaad hesho UC?</h2>
              <button 
                onClick={() => setCurrentPage('shop')}
                className="bg-brand-primary text-brand-bg px-6 py-3.5 sm:px-9 sm:py-4 rounded-xl text-sm sm:text-base font-bold hover:bg-brand-primary-hover transition-all gaming-glow cursor-pointer active:scale-95"
              >
                Bilow Bakhaarka
              </button>
            </div>
            <FAQ />
          </motion.div>
        );
      case 'shop':
        return (
          <motion.div
            key="shop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Shop onSelectProduct={handleProductSelect} />
          </motion.div>
        );
      case 'checkout':
        return (
          <motion.div
            key="checkout"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Checkout 
              product={selectedProduct} 
              onBack={() => setCurrentPage('shop')} 
            />
          </motion.div>
        );
      case 'auth':
      case 'login':
        return (
          <motion.div
            key="auth"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Auth 
              onBack={() => setCurrentPage('home')} 
              initialMode={currentPage === 'login' ? 'login' : 'signup'}
              onSuccess={() => setCurrentPage('shop')}
            />
          </motion.div>
        );
      case 'support':
        return (
          <motion.div
            key="support"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pt-32 pb-20 max-w-4xl mx-auto px-4"
          >
            <h1 className="text-4xl lg:text-6xl font-display font-black mb-8 text-center">
              Xarunta <span className="text-brand-primary">Caawinaadda</span>
            </h1>
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              <div className="glass-card p-8 rounded-2xl">
                 <h3 className="text-xl font-bold mb-4">Nala soo Xiriir</h3>
                 <form 
                   className="space-y-4"
                   onSubmit={(e) => {
                     e.preventDefault();
                     alert('Waad ku mahadsantahay farriintaada! Waanu kula soo xiriiri doonaa.');
                   }}
                 >
                   <div>
                     <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Magacaaga</label>
                     <input type="text" required className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white text-sm focus:border-brand-primary focus:outline-none" />
                   </div>
                   <div>
                     <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Email / Taleefan</label>
                     <input type="text" required className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white text-sm focus:border-brand-primary focus:outline-none" />
                   </div>
                   <div>
                     <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Farriintaada</label>
                     <textarea rows={4} required className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white text-sm focus:border-brand-primary focus:outline-none"></textarea>
                   </div>
                   <button type="submit" className="w-full bg-brand-primary text-brand-bg py-3.5 rounded-xl font-bold hover:bg-brand-primary-hover transition-all">
                     Dir Farriinta
                   </button>
                 </form>
              </div>
              <div className="space-y-6">
                <div className="glass-card p-6 rounded-2xl border-l-4 border-brand-primary">
                  <h4 className="font-bold mb-2">Xiriir Degdeg ah 24/7</h4>
                  <p className="text-xs text-slate-400 mb-4">Waxaan ka jawaabnaa farriimaha WhatsApp iyo Taleefanka ilbiriqsiyo gudahood.</p>
                  <div className="flex gap-4">
                    <a 
                      href="https://wa.me/252610446604" 
                      target="_blank" 
                      rel="noreferrer"
                      className="flex-1 bg-green-600 hover:bg-green-500 text-white py-2.5 rounded-xl text-xs font-bold flex items-center justify-center transition-all"
                    >
                      WhatsApp Direct
                    </a>
                    <a 
                      href="tel:0610446604"
                      className="flex-1 bg-slate-800 hover:bg-slate-700 text-white py-2.5 rounded-xl text-xs font-bold flex items-center justify-center transition-all border border-slate-700"
                    >
                      Wac Hadda
                    </a>
                  </div>
                </div>
                <div className="glass-card p-6 rounded-2xl">
                  <h4 className="font-bold mb-2">Xarunta Guud</h4>
                  <p className="text-xs text-slate-400">Muqdisho, Soomaaliya — Adeegga PUBG UC & Coins ee Soomaaliya oo dhan.</p>
                </div>
              </div>
            </div>
            <FAQ />
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen selection:bg-brand-primary/30 selection:text-brand-primary relative">
      <Navbar 
        onNavigate={setCurrentPage} 
        currentPage={currentPage}
      />
      
      <main>
        <AnimatePresence mode="wait">
          {renderPage()}
        </AnimatePresence>
      </main>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/252610446604"
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-green-600 hover:bg-green-500 text-white p-3.5 sm:p-4 rounded-full shadow-2xl shadow-green-600/40 hover:scale-110 active:scale-95 transition-all duration-300 flex items-center gap-2 group border border-green-400/30"
        title="Nagala soo xiriir WhatsApp"
        id="floating-whatsapp-btn"
      >
        <MessageCircle className="w-6 h-6 animate-pulse" />
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 ease-in-out text-xs font-bold sm:inline-block">
          WhatsApp
        </span>
      </a>

      <Footer />
    </div>
  );
}
