import { Facebook, Twitter, Instagram, MessageCircle, Shield, Zap, Star } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-brand-bg border-t border-slate-800 pt-20 pb-10" id="footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center">
                <span className="text-brand-bg font-black text-lg">B</span>
              </div>
              <span className="font-display font-black text-lg uppercase tracking-tight">BARAA UC & COINS</span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed pr-8">
              Xalalka Lacagaha Ciyaaraha Xirfadda leh. Awood siinta ciyaartoyda kala iibsi lagu kalsoonaan karo iyo mid degdeg ah.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-brand-primary hover:text-brand-bg transition-all">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-brand-primary hover:text-brand-bg transition-all">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-brand-primary hover:text-brand-bg transition-all">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="http://wa.me/252771909054" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-green-500 hover:text-white transition-all" id="footer-whatsapp">
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest text-slate-100 mb-6">Bakhaarka</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-slate-500 text-sm hover:text-brand-primary transition-colors">PUBG UC</a></li>
              <li><a href="#" className="text-slate-500 text-sm hover:text-brand-primary transition-colors">Free Fire Diamonds</a></li>
              <li><a href="#" className="text-slate-500 text-sm hover:text-brand-primary transition-colors">Mobile Legends</a></li>
              <li><a href="#" className="text-slate-500 text-sm hover:text-brand-primary transition-colors">Digital Coins</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest text-slate-100 mb-6">Sharciga</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-slate-500 text-sm hover:text-brand-primary transition-colors">Siyaasadda Khaaska ah</a></li>
              <li><a href="#" className="text-slate-500 text-sm hover:text-brand-primary transition-colors">Shuruudaha Adeegga</a></li>
              <li><a href="#" className="text-slate-500 text-sm hover:text-brand-primary transition-colors">Siyaasadda Celinta</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest text-slate-100 mb-6">Caawinaad</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-slate-500 text-sm hover:text-brand-primary transition-colors">Nala soo Xiriir</a></li>
              <li><a href="#" className="text-slate-500 text-sm hover:text-brand-primary transition-colors">Hababka Lacag-bixinta</a></li>
              <li><a href="#" className="text-slate-500 text-sm hover:text-brand-primary transition-colors">FAQ</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-600 text-xs text-center md:text-left">
            © 2024 BARAA UC & COINS. Xuquuqda way dhowran tahay. <br className="md:hidden" />
            Designed for professional gamers.
          </p>
          <div className="flex items-center gap-6">
            <Shield className="w-5 h-5 text-slate-700" />
            <Zap className="w-5 h-5 text-slate-700" />
            <Star className="w-5 h-5 text-slate-700" />
          </div>
        </div>
      </div>
    </footer>
  );
}
