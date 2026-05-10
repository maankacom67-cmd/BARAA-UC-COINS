/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Shop from './components/Shop';
import Features from './components/Features';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import Checkout from './components/Checkout';
import Auth from './components/Auth';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check login status on mount
  useEffect(() => {
    const userLoggedIn = localStorage.getItem('userLoggedIn') === 'true';
    setIsLoggedIn(userLoggedIn);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userLoggedIn');
    setIsLoggedIn(false);
    setCurrentPage('home');
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
            <div className="py-20 text-center">
              <h2 className="text-3xl lg:text-5xl mb-8">Ready to Level Up?</h2>
              <button 
                onClick={() => setCurrentPage('shop')}
                className="bg-brand-primary text-brand-bg px-10 py-5 rounded-xl text-xl font-bold hover:bg-brand-primary-hover transition-all gaming-glow"
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
            <Shop onNavigateToCheckout={() => setCurrentPage('checkout')} />
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
            <Checkout onBack={() => setCurrentPage('shop')} />
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
              onSuccess={() => {
                setIsLoggedIn(true);
                localStorage.setItem('userLoggedIn', 'true');
              }}
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
            <h1 className="text-4xl lg:text-6xl mb-8 text-center">Xarunta <span className="text-brand-primary">Caawinaadda</span></h1>
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              <div className="glass-card p-8 rounded-2xl">
                 <h3 className="text-xl mb-4">Nala soo Xiriir</h3>
                 <form className="space-y-4">
                   <div>
                     <label className="block text-sm text-slate-500 mb-2">Magacaaga</label>
                     <input type="text" className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white" />
                   </div>
                   <div>
                     <label className="block text-sm text-slate-500 mb-2">Email-kaaga</label>
                     <input type="email" className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white" />
                   </div>
                   <div>
                     <label className="block text-sm text-slate-500 mb-2">Farriintaada</label>
                     <textarea rows={4} className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white"></textarea>
                   </div>
                   <button className="w-full bg-brand-primary text-brand-bg py-3 rounded-lg font-bold">Dir Farriinta</button>
                 </form>
              </div>
              <div className="space-y-6">
                <div className="glass-card p-6 rounded-2xl border-l-4 border-brand-primary">
                  <h4 className="font-bold mb-2">Xiriir Degdeg ah</h4>
                  <p className="text-sm text-slate-400">Waxaan ka jawaabnaa farriimaha 24 saac gudahood.</p>
                  <div className="mt-4 flex gap-4">
                    <a 
                      href="http://wa.me/252771909054" 
                      target="_blank" 
                      rel="noreferrer"
                      className="flex-1 bg-green-600 text-white py-2 rounded-lg text-sm font-bold flex items-center justify-center"
                    >
                      WhatsApp
                    </a>
                    <button className="flex-1 bg-blue-500 text-white py-2 rounded-lg text-sm font-bold">Telegram</button>
                  </div>
                </div>
                <div className="glass-card p-6 rounded-2xl">
                  <h4 className="font-bold mb-2">Location</h4>
                  <p className="text-sm text-slate-400">Muqdisho, Soomaaliya</p>
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
    <div className="min-h-screen selections:bg-brand-primary/30 selection:text-brand-primary">
      <Navbar 
        onNavigate={setCurrentPage} 
        currentPage={currentPage}
        isLoggedIn={isLoggedIn}
        onLogout={handleLogout}
      />
      
      <main>
        <AnimatePresence mode="wait">
          {renderPage()}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}

