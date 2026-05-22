import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShieldCheck, Mail, Phone, IdCard, Check, Loader2, Info, ArrowRight } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { Product } from '../constants';

interface OrderModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function OrderModal({ product, isOpen, onClose }: OrderModalProps) {
  const [formData, setFormData] = useState({
    playerId: '',
    email: '',
    phone: ''
  });
  const [status, setStatus] = useState<{ type: 'success' | 'error', msg: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    // Initialize EmailJS with official public key
    emailjs.init("fElg0MmaVdQdzy1yR");
  }, []);

  // Reset form when modal opens with a new product
  useEffect(() => {
    if (isOpen) {
      setFormData({
        playerId: '',
        email: '',
        phone: ''
      });
      setStatus(null);
      setIsSubmitting(false);
      setIsSubmitted(false);
    }
  }, [isOpen, product]);

  if (!isOpen || !product) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting || isSubmitted) return;

    if (!formData.playerId) {
      setStatus({ type: 'error', msg: 'Fadlan geli Player ID-gaaga saxda ah' });
      return;
    }
    if (!formData.email) {
      setStatus({ type: 'error', msg: 'Fadlan geli Email-kaaga' });
      return;
    }
    if (!formData.phone) {
      setStatus({ type: 'error', msg: 'Fadlan geli Lambarka Teleefanka' });
      return;
    }

    setIsSubmitting(true);
    setStatus(null);

    // Prepare template params
    const templateParams = {
      product_name: product.amount + (product.price === 'BILAASH' ? ' (BILAASH)' : ''),
      player_id: formData.playerId,
      user_email: formData.email,
      user_phone: formData.phone
    };

    try {
      // Send message via EmailJS
      await emailjs.send("service_l859y2m", "template_mo42cxc", templateParams);
      
      setIsSubmitting(false);
      setIsSubmitted(true);
      setStatus({ 
        type: 'success', 
        msg: "Dalabkaaga waa la qoray! Hadda waxaa laguu wareejinayaa WhatsApp." 
      });

      // Redirect to WhatsApp
      const myWhatsApp = "252771909054";
      const productName = product.amount + (product.price === 'BILAASH' ? ' (BILAASH)' : '');
      const textMessage = `Asc Maanka, waxaan rabaa ${productName}.\n\nXogtaydu waa:\n🆔 PUBG ID: ${formData.playerId}\n📧 Email: ${formData.email}\n📞 Tel: ${formData.phone}`;
      
      const whatsappUrl = `https://wa.me/${myWhatsApp}?text=${encodeURIComponent(textMessage)}`;

      setTimeout(() => {
        window.open(whatsappUrl, '_blank');
        onClose();
      }, 1500);

    } catch (error: any) {
      console.error('EmailJS Error, switching to direct WhatsApp redirect:', error);
      
      // Standalone/Demo Fallback
      setIsSubmitting(false);
      setIsSubmitted(true);
      setStatus({ 
        type: 'success', 
        msg: "Dalabkaaga waa la qoray! (Demo Mode) Hadda waxaa laguu wareejinayaa WhatsApp." 
      });

      const myWhatsApp = "252771909054";
      const productName = product.amount + (product.price === 'BILAASH' ? ' (BILAASH)' : '');
      const textMessage = `Asc Maanka, waxaan rabaa ${productName}.\n\nXogtaydu waa:\n🆔 PUBG ID: ${formData.playerId}\n📧 Email: ${formData.email}\n📞 Tel: ${formData.phone}`;
      const whatsappUrl = `https://wa.me/${myWhatsApp}?text=${encodeURIComponent(textMessage)}`;

      setTimeout(() => {
        window.open(whatsappUrl, '_blank');
        onClose();
      }, 1500);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 10 }}
          className="bg-slate-900 border border-slate-800 w-full max-w-md rounded-2xl overflow-hidden shadow-2xl relative"
          id="orderModal"
        >
          {/* Header */}
          <div className="bg-slate-950 px-6 py-4 border-b border-slate-800 flex justify-between items-center">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Info className="w-5 h-5 text-amber-500" /> Dhammaystir Dalabka
            </h3>
            <button 
              onClick={onClose} 
              className="text-slate-400 hover:text-white text-2xl transition-colors focus:outline-none cursor-pointer"
              aria-label="Deji modal-ka"
            >
              &times;
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {status && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`p-4 rounded-xl text-sm font-semibold flex items-center gap-3 ${
                  status.type === 'success' 
                    ? 'bg-green-500/10 text-green-400 border border-green-500/20' 
                    : 'bg-red-500/10 text-red-400 border border-red-500/20'
                }`}
              >
                <div className={`w-2 h-2 rounded-full ${status.type === 'success' ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
                <p>{status.msg}</p>
              </motion.div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Nooca Dalabka</label>
              <input 
                type="text" 
                value={product.amount + (product.price === 'BILAASH' ? ' (BILAASH)' : '')} 
                disabled 
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-amber-400 font-bold text-sm focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">PUBG Player ID</label>
              <div className="relative">
                <span className="absolute left-4 top-3.5 text-slate-500">
                  <IdCard className="w-4 h-4" />
                </span>
                <input 
                  type="text" 
                  required
                  placeholder="Geli Player ID-gaaga saxda ah" 
                  value={formData.playerId}
                  onChange={(e) => setFormData({...formData, playerId: e.target.value})}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-amber-500 text-white transition-colors"
                  id="playerId"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Gmail / Contact Email</label>
              <div className="relative">
                <span className="absolute left-4 top-3.5 text-slate-500">
                  <Mail className="w-4 h-4" />
                </span>
                <input 
                  type="email" 
                  required
                  placeholder="Geli Email-kaaga" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-amber-500 text-white transition-colors"
                  id="userEmail"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Lambarka Teleefanka</label>
              <div className="relative">
                <span className="absolute left-4 top-3.5 text-slate-500">
                  <Phone className="w-4 h-4" />
                </span>
                <input 
                  type="tel" 
                  required
                  placeholder="Tusaale: 061XXXXXXX" 
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-amber-500 text-white transition-colors"
                  id="userPhone"
                />
              </div>
            </div>

            {isSubmitted ? (
              <div 
                className="w-full bg-green-500 text-slate-950 font-bold py-3.5 px-4 rounded-xl text-center flex items-center justify-center gap-2 shadow-lg border border-green-400/40"
                id="submitBtn"
              >
                <Check className="w-5 h-5 animate-bounce" />
                <span>Dalabkaaga waa la qoray!</span>
              </div>
            ) : (
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-3.5 px-4 rounded-xl transition duration-200 mt-2 flex items-center justify-center gap-2 cursor-pointer focus:ring-2 focus:ring-amber-500 focus:outline-none focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-50"
                id="submitBtn"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Diyaarinta dalabka...</span>
                  </>
                ) : (
                  <>
                    <span>Xaqiiji Dalabka</span> 
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            )}
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
