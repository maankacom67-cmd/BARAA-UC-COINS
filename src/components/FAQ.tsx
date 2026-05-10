import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Waa maxay waqtiga caadiga ah ee bixinta UC iyo Coins?',
      a: 'Nidaamkayaga iswada wuxuu xaqiijinayaa bixin aad u degdeg ah. PUBG UC, bixintu caadi ahaan waa isla marka la xaqiijiyo bixinta lacagta. Qadaadiicda ciyaaraha kale, filo in lagu soo shubo 5 ilaa 10 daqiiqo gudahood ugu badnaan inta lagu jiro saacadaha shaqada caadiga ah.',
      id: 'faq-1'
    },
    {
      q: 'Waa maxay hababka lacag bixinta ee la oggol yahay?',
      a: 'Waxaan aqbalnaa habab badan oo aamin ah oo ay ku jiraan Kaararka Daynta/Debit ee waaweyn, xawaaladaha crypto (USDT, BTC), iyo e-wallets-ka maxalliga ah ee la xaqiijiyay. Dhammaan macaamilka waxaa lagu sifeeyaa borotokoolka amniga heerka shirkadda.',
      id: 'faq-2'
    },
    {
      q: 'Waa maxay nidaamka dib u celinta lacagta (Refund Policy)?',
      a: 'Haddii gelinta lacagta la diido ama dib u dhac ku yimaado in ka badan 24 saacadood sababo la xiriira degenaansho la\'aanta server-ka dhankayaga, waxaad xaq u leedahay dib u celin buuxda. Hantida dhijitaalka ah ee si guul leh loogu diray ID-ga la bixiyay lama noqon karo.',
      id: 'faq-3'
    },
    {
      q: 'Ma u baahan tahay inaan dhiibo lambarkayga sirta ah ee akoonka?',
      a: 'Maya. Waxaan si adag ugu shaqeynaa kordhinta Player ID. Waligeen ma weydiisan doono lambarkaaga sirta ah ee akoonka. Ilaali macluumaadkaaga oo soo sheeg qof kasta oo sheegta inuu yahay wakiilkeena oo codsanaya xogta xasaasiga ah.',
      id: 'faq-4'
    }
  ];

  return (
    <section className="py-24 bg-brand-surface/30" id="faq-section">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-4 text-brand-primary">
            <HelpCircle className="w-12 h-12" />
          </div>
          <h2 className="text-3xl lg:text-5xl mb-4">Su\'aalaha inta badan la isweydiiyo (FAQ)</h2>
          <p className="text-slate-400">Wax ka baro sida ay wax u shaqeeyaan iyo shaqada aan qabano.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div 
              key={faq.id}
              className={`glass-card rounded-2xl overflow-hidden transition-all border-slate-800 ${openIndex === idx ? 'border-brand-primary/40 shadow-lg shadow-brand-primary/5' : ''}`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full flex items-center justify-between p-6 text-left"
                id={`faq-toggle-${idx}`}
              >
                <span className="font-bold text-slate-100 pr-8">{faq.q}</span>
                {openIndex === idx ? (
                  <ChevronUp className="w-5 h-5 text-brand-primary" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-slate-500" />
                )}
              </button>
              
              <AnimatePresence>
                {openIndex === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 text-slate-400 text-sm leading-relaxed border-t border-slate-800/50 pt-4">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
