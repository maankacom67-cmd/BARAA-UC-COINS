import { Zap, ShieldCheck, HeartHandshake } from 'lucide-react';
import { motion } from 'motion/react';

export default function Features() {
  const features = [
    {
      title: 'Geesi Hillaac ah',
      desc: 'Nidaamyada tooska ah waxay hubinayaan in lacagtaadu kugu soo dhacdo ilbiriqsiyo gudahood.',
      icon: <Zap className="w-5 h-5 sm:w-7 sm:h-7 text-brand-primary" />,
      id: 'feat-speed'
    },
    {
      title: 'Ammaan Bir ah',
      desc: 'Sirta heerka bangiga ah iyo ilaalinta iibka waxay hubinayaan in macluumaadkaagu ammaan yahay.',
      icon: <ShieldCheck className="w-5 h-5 sm:w-7 sm:h-7 text-blue-400" />,
      id: 'feat-security'
    },
    {
      title: 'Caawinaad 24/7 ah',
      desc: 'Kooxdayada takhasuska leh waxay online yihiin saacad kasta si ay kaaga caawiyaan wax kasta.',
      icon: <HeartHandshake className="w-5 h-5 sm:w-7 sm:h-7 text-brand-primary" />,
      id: 'feat-support'
    }
  ];

  return (
    <section className="py-12 sm:py-20 bg-brand-bg relative overflow-hidden" id="features-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-black mb-3">Sababta ay Halyeeyadu noo Doortaan</h2>
          <p className="text-slate-400 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
            Loo habeeeyay xawaare, lagu dhisay aaminaad. Waxaan nahay laf-dhabarta dhaqaalahaga dhijitaalka ah.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {features.map((feat, idx) => (
            <motion.div
              key={feat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="p-5 sm:p-7 glass-card rounded-xl sm:rounded-2xl text-center border-slate-800 hover:border-brand-primary/30 transition-all group"
              id={feat.id}
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-slate-800 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:scale-110 transition-transform">
                {feat.icon}
              </div>
              <h3 className="text-base sm:text-lg font-bold mb-2">{feat.title}</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                {feat.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
