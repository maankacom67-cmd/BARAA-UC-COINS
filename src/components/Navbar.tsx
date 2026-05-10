import { ShoppingCart, LogIn, UserPlus, Menu, X, LogOut, User } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  onNavigate: (page: string) => void;
  currentPage: string;
  isLoggedIn?: boolean;
  onLogout?: () => void;
}

export default function Navbar({ onNavigate, currentPage, isLoggedIn, onLogout }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Hoyga', id: 'home' },
    { name: 'Bakhaarka', id: 'shop' },
    { name: 'Caawinaadda', id: 'support' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-x-0 border-t-0 border-b-slate-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div 
            className="flex items-center gap-2 cursor-pointer" 
            onClick={() => onNavigate('home')}
            id="nav-logo"
          >
            <div className="w-10 h-10 bg-brand-primary rounded-lg flex items-center justify-center shadow-lg shadow-brand-primary/20">
              <span className="text-brand-bg font-black text-xl">B</span>
            </div>
            <span className="font-display font-black text-xl tracking-tighter uppercase hidden sm:block">
              BARAA <span className="text-brand-primary text-sm">UC & COINS</span>
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => onNavigate(link.id)}
                className={`relative px-2 py-1 text-sm font-medium transition-colors hover:text-brand-primary ${
                  currentPage === link.id ? 'text-brand-primary' : 'text-slate-400'
                }`}
                id={`nav-link-${link.id}`}
              >
                {link.name}
                {currentPage === link.id && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-brand-primary"
                  />
                )}
              </button>
            ))}
          </div>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-4">
            <button className="p-2 text-slate-400 hover:text-brand-primary transition-colors relative" id="cart-button">
              <ShoppingCart className="w-6 h-6" />
              <span className="absolute top-1 right-1 w-4 h-4 bg-brand-primary text-brand-bg text-[10px] font-bold rounded-full flex items-center justify-center">0</span>
            </button>
            <div className="h-6 w-px bg-slate-800 mx-2" />
            
            {isLoggedIn ? (
              <div className="flex items-center gap-4">
                <button 
                  className="flex items-center gap-2 text-sm font-bold text-brand-primary bg-brand-primary/10 px-4 py-2 rounded-lg"
                  id="profile-button"
                >
                  <User className="w-4 h-4" />
                  Macmiil
                </button>
                <button 
                  onClick={onLogout}
                  className="p-2 text-slate-500 hover:text-red-500 transition-colors"
                  id="logout-button"
                  title="Ka Bax"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <>
                <button 
                  onClick={() => onNavigate('login')}
                  className="flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-slate-100 transition-colors" 
                  id="login-button"
                >
                  <LogIn className="w-4 h-4" />
                  Soo Gal
                </button>
                <button 
                  onClick={() => onNavigate('auth')}
                  className="bg-brand-primary text-brand-bg px-5 py-2.5 rounded-lg text-sm font-bold hover:bg-brand-primary-hover transition-all active:scale-95 gaming-glow" 
                  id="register-button"
                >
                  <div className="flex items-center gap-2">
                    <UserPlus className="w-4 h-4" />
                    Is Diwaangeli
                  </div>
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <button className="p-2 text-slate-400">
               <ShoppingCart className="w-6 h-6" />
            </button>
            <button 
              className="p-2 text-slate-400"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              id="mobile-menu-toggle"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-card border-x-0 border-b-0"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => {
                    onNavigate(link.id);
                    setIsMenuOpen(false);
                  }}
                  className={`block w-full text-left px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                    currentPage === link.id ? 'bg-brand-primary/10 text-brand-primary' : 'text-slate-400 hover:bg-white/5'
                  }`}
                  id={`mobile-nav-link-${link.id}`}
                >
                  {link.name}
                </button>
              ))}
              <div className="pt-4 grid grid-cols-2 gap-4">
                {isLoggedIn ? (
                  <>
                    <button 
                      className="flex justify-center items-center gap-2 px-4 py-3 rounded-lg bg-brand-primary/10 text-brand-primary text-sm font-bold"
                    >
                      <User className="w-4 h-4" />
                      Macmiil
                    </button>
                    <button 
                      onClick={() => {
                        if (onLogout) onLogout();
                        setIsMenuOpen(false);
                      }}
                      className="flex justify-center items-center gap-2 px-4 py-3 rounded-lg bg-slate-800 text-red-500 text-sm font-bold"
                    >
                      <LogOut className="w-4 h-4" />
                      Ka Bax
                    </button>
                  </>
                ) : (
                  <>
                    <button 
                      onClick={() => {
                        onNavigate('login');
                        setIsMenuOpen(false);
                      }}
                      className="flex justify-center items-center gap-2 px-4 py-3 rounded-lg bg-slate-800 text-sm font-bold text-slate-100"
                    >
                      <LogIn className="w-4 h-4" />
                      Soo Gal
                    </button>
                    <button 
                      onClick={() => {
                        onNavigate('auth');
                        setIsMenuOpen(false);
                      }}
                      className="flex justify-center items-center gap-2 px-4 py-3 rounded-lg bg-brand-primary text-brand-bg text-sm font-bold"
                    >
                      <UserPlus className="w-4 h-4" />
                      Is Diwaangeli
                    </button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
