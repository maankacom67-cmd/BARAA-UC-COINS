import { Zap, ShieldCheck, HeartHandshake } from 'lucide-react';
import { motion } from 'motion/react';

export default function Features() {
  const features = [
    {
      title: 'Geesi Hillaac ah',
      desc: 'Nidaamyada tooska ah waxay hubinayaan in lacagtaadu kugu soo dhacdo ilbiriqsiyo gudahood.',
      icon: <Zap className="w-8 h-8 text-brand-primary" />,
      id: 'feat-speed'
    },
    {
      title: 'Ammaan Bir ah',
      desc: 'Sirta heerka bangiga ah iyo ilaalinta iibka waxay hubinayaan in macluumaadkaagu ammaan yahay.',
      icon: <ShieldCheck className="w-8 h-8 text-blue-400" />,
      id: 'feat-security'
    },
    {
      title: 'Caawinaad 24/7 ah',
      desc: 'Kooxdayada takhasuska leh waxay online yihiin saacad kasta si ay kaaga caawiyaan wax kasta.',
      icon: <HeartHandshake className="w-8 h-8 text-brand-primary" />,
      id: 'feat-support'
    }
  ];

  return (
    <section className="py-24 bg-brand-bg relative overflow-hidden" id="features-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl mb-4">Sababta ay Halyeeyadu noo Doortaan</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Loo habeeeyay xawaare, lagu dhisay aaminaad. Waxaan nahay laf-dhabarta dhaqaalahaga dhijitaalka ah.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feat, idx) => (
            <motion.div
              key={feat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="p-8 pb-12 glass-card rounded-2xl text-center border-slate-800 hover:border-brand-primary/30 transition-all group"
              id={feat.id}
            >
              <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform">
                {feat.icon}
              </div>
              <h3 className="text-xl mb-4">{feat.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                {feat.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
