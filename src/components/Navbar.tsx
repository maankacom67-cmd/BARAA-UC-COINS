import React, { useState } from 'react';
import { ShoppingCart, LogIn, UserPlus, Menu, X, LogOut, User, Package, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../context/AuthContext';
import OrderHistoryModal from './OrderHistoryModal';

interface NavbarProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

export default function Navbar({ onNavigate, currentPage }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isOrdersOpen, setIsOrdersOpen] = useState(false);
  const { user, userProfile, isAdmin, logout } = useAuth();

  const navLinks = [
    { name: 'Hoyga', id: 'home' },
    { name: 'Bakhaarka', id: 'shop' },
    { name: 'Caawinaadda', id: 'support' },
  ];

  const handleLogout = async () => {
    try {
      await logout();
      onNavigate('home');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-x-0 border-t-0 border-b-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div 
              className="flex items-center gap-2 cursor-pointer" 
              onClick={() => onNavigate('home')}
              id="nav-logo"
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-brand-primary rounded-lg flex items-center justify-center shadow-lg shadow-brand-primary/20">
                <span className="text-brand-bg font-black text-base sm:text-xl">B</span>
              </div>
              <span className="font-display font-black text-sm sm:text-xl tracking-tight uppercase">
                BARAA <span className="text-brand-primary text-xs sm:text-sm">UC & COINS</span>
              </span>
            </div>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-8">
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
            <div className="hidden lg:flex items-center gap-3">
              {user && (
                <button 
                  onClick={() => setIsOrdersOpen(true)}
                  className="flex items-center gap-2 text-xs font-bold text-slate-300 bg-slate-800/80 hover:bg-slate-800 border border-slate-700 px-3.5 py-2 rounded-lg transition-all"
                  id="nav-orders-button"
                >
                  <Package className="w-4 h-4 text-brand-primary" />
                  Dalabaadka
                </button>
              )}

              {user ? (
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2 bg-brand-primary/10 border border-brand-primary/20 px-3 py-1.5 rounded-lg text-xs font-bold text-brand-primary">
                    {isAdmin ? <Shield className="w-3.5 h-3.5 text-amber-400" /> : <User className="w-3.5 h-3.5" />}
                    <span className="max-w-[120px] truncate">{userProfile?.displayName || user.email?.split('@')[0]}</span>
                    {isAdmin && <span className="text-[10px] bg-amber-400/20 text-amber-400 px-1 rounded">Admin</span>}
                  </div>
                  <button 
                    onClick={handleLogout}
                    className="p-2 text-slate-500 hover:text-red-400 transition-colors rounded-lg hover:bg-slate-800"
                    id="logout-button"
                    title="Ka Bax"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => onNavigate('login')}
                    className="flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-slate-100 transition-colors px-3 py-2" 
                    id="login-button"
                  >
                    <LogIn className="w-4 h-4" />
                    Soo Gal
                  </button>
                  <button 
                    onClick={() => onNavigate('auth')}
                    className="bg-brand-primary text-brand-bg px-4 py-2 rounded-lg text-sm font-bold hover:bg-brand-primary-hover transition-all active:scale-95 gaming-glow flex items-center gap-1.5" 
                    id="register-button"
                  >
                    <UserPlus className="w-4 h-4" />
                    Is Diwaangeli
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center gap-2">
              {user && (
                <button 
                  onClick={() => setIsOrdersOpen(true)}
                  className="p-2 text-brand-primary bg-brand-primary/10 rounded-lg border border-brand-primary/20"
                  title="Dalabkayga"
                >
                  <Package className="w-5 h-5" />
                </button>
              )}
              <button 
                className="p-2 text-slate-400 hover:text-white"
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
              className="lg:hidden glass-card border-x-0 border-b-0"
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

                {user && (
                  <button
                    onClick={() => {
                      setIsOrdersOpen(true);
                      setIsMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-2 px-4 py-3 rounded-lg text-base font-medium bg-slate-800/80 text-brand-primary border border-brand-primary/20"
                  >
                    <Package className="w-5 h-5" />
                    Dalabaadkaaga (Firestore Live)
                  </button>
                )}

                <div className="pt-3 grid grid-cols-2 gap-3">
                  {user ? (
                    <>
                      <div className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-brand-primary/10 text-brand-primary text-xs font-bold truncate">
                        <User className="w-4 h-4 flex-shrink-0" />
                        <span className="truncate">{userProfile?.displayName || user.email}</span>
                      </div>
                      <button 
                        onClick={() => {
                          handleLogout();
                          setIsMenuOpen(false);
                        }}
                        className="flex justify-center items-center gap-1.5 px-3 py-2.5 rounded-lg bg-slate-800 text-red-400 text-xs font-bold hover:bg-slate-700"
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
                        className="flex justify-center items-center gap-1.5 px-3 py-2.5 rounded-lg bg-slate-800 text-xs font-bold text-slate-100"
                      >
                        <LogIn className="w-4 h-4" />
                        Soo Gal
                      </button>
                      <button 
                        onClick={() => {
                          onNavigate('auth');
                          setIsMenuOpen(false);
                        }}
                        className="flex justify-center items-center gap-1.5 px-3 py-2.5 rounded-lg bg-brand-primary text-brand-bg text-xs font-bold"
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

      {/* Live Orders Modal */}
      <OrderHistoryModal isOpen={isOrdersOpen} onClose={() => setIsOrdersOpen(false)} />
    </>
  );
}
