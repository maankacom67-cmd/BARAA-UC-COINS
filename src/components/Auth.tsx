import React, { useState } from 'react';
import { Mail, Phone, Lock, ArrowRight, Chrome, X, CheckCircle2, AlertCircle, ShieldAlert } from 'lucide-react';
import { motion } from 'motion/react';
import { useAuth } from '../context/AuthContext';
import { createOrderInFirestore } from '../lib/orders';

interface AuthProps {
  onBack: () => void;
  initialMode?: 'login' | 'signup';
  onSuccess?: () => void;
}

export default function Auth({ onBack, initialMode = 'signup', onSuccess }: AuthProps) {
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    password: '',
    playerId: ''
  });
  const [status, setStatus] = useState<{ type: 'success' | 'error', msg: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { signupWithEmail, loginWithEmail, loginWithGoogle, user } = useAuth();

  const sendToWhatsApp = (phone: string, playerId: string) => {
    const tel_number = "252610446604"; 
    const message = `Asc Maanka, waxaan iska diiwaangeliyay BARAA UC & COINS.\nEmail: ${formData.email}\nTel: ${phone}\nPlayer ID: ${playerId || 'N/A'}`;
    const whatsappUrl = `https://wa.me/${tel_number}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleGoogleSignIn = async () => {
    setStatus(null);
    setIsSubmitting(true);
    try {
      await loginWithGoogle();
      setStatus({ type: 'success', msg: 'Si guul leh ayaad ugu gashay Google!' });

      if (onSuccess) onSuccess();
      setTimeout(() => onBack(), 1500);
    } catch (err: any) {
      console.error('Google Sign In error:', err);
      setStatus({ type: 'error', msg: err.message || 'Khalad ayaa dhacay Google sign-in' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);

    if (mode === 'signup') {
      if (!formData.email) {
        setStatus({ type: 'error', msg: 'Fadlan geli Gmail-kaaga' });
        return;
      }
      
      if (!formData.password || formData.password.length < 6) {
        setStatus({ type: 'error', msg: 'Password-ku waa inuu ka koobnaadaa ugu yaraan 6 xaraf' });
        return;
      }

      setIsSubmitting(true);

      try {
        await signupWithEmail(formData.email, formData.password, formData.phone, formData.playerId);

        setIsSubmitted(true);
        if (onSuccess) onSuccess();
        if (formData.phone) {
          sendToWhatsApp(formData.phone, formData.playerId);
        }

        setStatus({ 
          type: 'success', 
          msg: "Koontadaada si ammaan ah ayaa loogu keydiyay Firebase Database!" 
        });
      } catch (error: any) {
        console.error('Firebase Auth Error:', error);
        let errorMsg = "Khalad ayaa dhacay, fadlan mar kale isku day.";
        if (error.code === 'auth/email-already-in-use') {
          errorMsg = "Email-kan hadda ka hor ayaa loo isticmaalay koonto kale. Fadlan 'Soo Gal' dooro.";
        } else if (error.code === 'auth/invalid-email') {
          errorMsg = "Email-ku ma saxna, fadlan hubi.";
        } else if (error.code === 'auth/weak-password') {
          errorMsg = "Password-ku aad buu u daciifsan yahay. Geli mid ka adag.";
        }
        setStatus({ type: 'error', msg: errorMsg });
      } finally {
        setIsSubmitting(false);
      }
    } else {
      // Login logic
      if (!formData.email || !formData.password) {
        setStatus({ type: 'error', msg: 'Fadlan geli email-ka iyo password-ka' });
        return;
      }
      setIsSubmitting(true);
      try {
        await loginWithEmail(formData.email, formData.password);
        if (onSuccess) onSuccess();
        setStatus({ type: 'success', msg: 'Si guul leh ayaad u soo gashay koontadaada!' });
        setTimeout(() => onBack(), 1500);
      } catch (err: any) {
        console.error('Login error:', err);
        let msg = 'Email-ka ama Password-ka waa qalad.';
        if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
          msg = 'Email-ka ama Password-ka aad galisay ma saxna.';
        }
        setStatus({ type: 'error', msg });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <section className="pt-32 pb-24 min-h-screen flex items-center justify-center px-4" id="auth-section">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full relative"
      >
        <button 
          onClick={onBack}
          className="absolute -top-12 right-0 p-2 text-slate-500 hover:text-slate-100 transition-colors"
          id="auth-close-btn"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="glass-card rounded-2xl p-8 border-t-4 border-t-brand-primary gaming-glow">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-3">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Firebase Database Live
            </div>
            <h2 className="text-3xl font-display font-black mb-2">
              {mode === 'signup' ? 'Is-diiwaangeli' : 'Soo Gal'}
            </h2>
            <p className="text-slate-400 text-sm">
              {mode === 'signup' 
                ? 'Ku biir BARAA UC & COINS si xogtaada & dalabaadkaaga loogu kaydiyo database-ka.' 
                : 'Ku soo dhawaada mar kale koontadaada BARAA UC & COINS.'}
            </p>
          </div>

          {status && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`mb-6 p-4 rounded-xl text-sm font-bold flex items-start gap-3 ${
                status.type === 'success' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'
              }`}
            >
              {status.type === 'success' ? (
                <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              )}
              <p className="whitespace-pre-line leading-snug">{status.msg}</p>
            </motion.div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            {mode === 'signup' && (
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                  PUBG Player ID <span className="text-slate-500 font-normal">(Ikhtiyaari)</span>
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 flex items-center justify-center">
                    <span className="text-[10px] font-black text-brand-primary">ID</span>
                  </div>
                  <input 
                    type="text" 
                    placeholder="Geli Player ID-gaaga (tusaale: 5123456789)"
                    value={formData.playerId}
                    onChange={(e) => setFormData({...formData, playerId: e.target.value})}
                    className="w-full bg-slate-900/60 border border-slate-700 rounded-xl py-3 pl-12 pr-4 text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-brand-primary transition-all text-sm"
                    id="auth-playerid-input"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">Gmail / Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input 
                  type="email" 
                  required
                  placeholder="tusaale@gmail.com"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-slate-900/60 border border-slate-700 rounded-xl py-3 pl-12 pr-4 text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-brand-primary transition-all text-sm"
                  id="auth-email-input"
                />
              </div>
            </div>

            {mode === 'signup' && (
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">Lambarka Taleefanka</label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-1.5 pr-2.5 border-r border-slate-700">
                    <span className="text-xs font-bold text-slate-400">+252</span>
                  </div>
                  <input 
                    type="tel" 
                    placeholder="61XXXXXXX"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full bg-slate-900/60 border border-slate-700 rounded-xl py-3 pl-20 pr-4 text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-brand-primary transition-all text-sm"
                    id="auth-phone-input"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input 
                  type="password" 
                  required
                  placeholder={mode === 'signup' ? 'Abuur password (ugu yaraan 6 xaraf)' : 'Geli password-kaaga'}
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="w-full bg-slate-900/60 border border-slate-700 rounded-xl py-3 pl-12 pr-4 text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-brand-primary transition-all text-sm"
                  id="auth-password-input"
                />
              </div>
            </div>

            {isSubmitted && mode === 'signup' ? (
              <div className="w-full bg-brand-primary/10 text-brand-primary py-3.5 rounded-xl font-black text-base flex items-center justify-center gap-2 mt-4 border border-brand-primary/20 shadow-lg animate-pulse" id="auth-success-message">
                Dalabkaaga iyo koontadaada waa la keydiyay!
              </div>
            ) : (
              <button 
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-brand-primary text-brand-bg py-3.5 rounded-xl font-black text-base hover:bg-brand-primary-hover transition-all flex items-center justify-center gap-2 mt-4 shadow-lg shadow-brand-primary/10 ${isSubmitting ? 'opacity-60 cursor-not-allowed' : ''}`}
                id="auth-submit-btn"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-brand-bg border-t-transparent rounded-full animate-spin" />
                    Fadlan sug...
                  </div>
                ) : (
                  <>
                    {mode === 'signup' ? 'Is-diiwaangeli' : 'Soo Gal'}
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            )}
          </form>

          <div className="mt-8 pt-6 border-t border-slate-800/80">
            <button 
              type="button"
              onClick={handleGoogleSignIn}
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2.5 p-3 bg-slate-800/80 border border-slate-700 rounded-xl text-slate-200 hover:bg-slate-800 hover:text-white transition-all text-sm font-bold mb-4 active:scale-98"
            >
              <Chrome className="w-4 h-4 text-brand-primary" />
              Ku gal Google Account
            </button>

            <div className="text-center">
              <p className="text-xs text-slate-400">
                {mode === 'signup' ? 'Hadda ka hor ma is-diiwaangelisay?' : 'Miyaanad lahayn koonto?'}
                <button 
                  onClick={() => setMode(mode === 'signup' ? 'login' : 'signup')}
                  className="ml-2 text-brand-primary font-bold hover:underline"
                  id="auth-mode-toggle"
                >
                  {mode === 'signup' ? 'Soo Gal' : 'Is-diiwaangeli'}
                </button>
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
