import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Package, Search, CheckCircle2, Clock, Truck, ShieldCheck } from 'lucide-react';

export const OrderTrackingPage: React.FC = () => {
  const { language, t, orders } = useStore();
  const latestOrder = orders && orders.length > 0 ? orders[0] : null;
  const [orderNumber, setOrderNumber] = useState(latestOrder ? (latestOrder.orderNumber || latestOrder.id) : 'OCT-849201');
  const [email, setEmail] = useState('lars@vechtsport.nl');
  const [hasSearched, setHasSearched] = useState(true);

  const stages = [
    { title: t('tracking.s1Title'), desc: t('tracking.s1Desc'), date: '14:22', done: true },
    { title: t('tracking.s2Title'), desc: t('tracking.s2Desc'), date: '14:23', done: true },
    { title: t('tracking.s3Title'), desc: t('tracking.s3Desc'), date: '15:40', done: true },
    { title: t('tracking.s4Title'), desc: t('tracking.s4Desc'), date: 'Track & Trace 3S-OCTA-928192', done: true, current: true },
    { title: t('tracking.s5Title'), desc: t('tracking.s5Desc'), date: language === 'pl' ? 'Planowane: Jutro przed 13:00' : language === 'en' ? 'Estimated: Tomorrow before 13:00' : 'Verwachte bezorging: Morgen voor 13:00', done: false }
  ];

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSearched(true);
  };

  return (
    <div className="bg-[#050505] min-h-screen text-white pb-20">
      <div className="bg-[#0C0C0C] border-b border-neutral-800 py-12 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-xs font-mono uppercase text-[#D71920] tracking-widest block mb-1">
            {t('tracking.portal')}
          </span>
          <h1 className="font-bebas text-4xl sm:text-6xl text-white uppercase">
            {t('tracking.title')}
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-neutral-400">
            {t('tracking.subtitle')}
          </p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10">
        {/* Track Form */}
        <form onSubmit={handleTrack} className="bg-[#0F0F0F] border border-neutral-800 p-6 space-y-4 shadow-xl mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-condensed font-bold uppercase text-neutral-400 mb-1">
                {t('tracking.orderNumberLabel')}
              </label>
              <input
                type="text"
                required
                value={orderNumber}
                onChange={e => setOrderNumber(e.target.value)}
                placeholder="OCT-849201"
                className="w-full bg-[#161616] border border-neutral-700 px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D71920]"
              />
            </div>
            <div>
              <label className="block text-xs font-condensed font-bold uppercase text-neutral-400 mb-1">
                {t('tracking.emailLabel')}
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="atleet@domein.nl"
                className="w-full bg-[#161616] border border-neutral-700 px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D71920]"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#D71920] hover:bg-[#b01318] text-white font-condensed font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-colors"
          >
            <Search className="w-4 h-4" />
            <span>{t('tracking.btn')}</span>
          </button>
        </form>

        {/* Live Timeline Display */}
        {hasSearched && (
          <div className="bg-[#0C0C0C] border border-neutral-800 p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-800 mb-6">
              <div>
                <p className="text-xs font-mono text-neutral-400 uppercase">{t('tracking.timeline')}</p>
                <h3 className="font-bebas text-2xl text-white mt-0.5">{orderNumber}</h3>
              </div>
              <span className="px-3 py-1 bg-[#D71920]/20 border border-[#D71920]/50 text-[#D71920] text-xs font-mono font-bold uppercase">
                PostNL Express 24h
              </span>
            </div>

            <div className="space-y-6 relative pl-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-neutral-800">
              {stages.map((st, idx) => (
                <div key={idx} className="relative flex items-start gap-4">
                  <div className={`absolute -left-6 w-5 h-5 rounded-full flex items-center justify-center ${
                    st.current
                      ? 'bg-[#D71920] text-white ring-4 ring-red-950 animate-pulse'
                      : st.done
                      ? 'bg-emerald-600 text-white'
                      : 'bg-neutral-800 text-neutral-500'
                  }`}>
                    {st.done ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Clock className="w-3 h-3" />}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className={`font-condensed font-bold text-sm uppercase ${st.current ? 'text-[#D71920]' : 'text-white'}`}>
                        {st.title}
                      </p>
                      <span className="text-[11px] font-mono text-neutral-500">{st.date}</span>
                    </div>
                    <p className="text-xs text-neutral-400 mt-0.5 font-body">{st.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
