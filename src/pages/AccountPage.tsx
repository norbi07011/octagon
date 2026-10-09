import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Award, Package, Heart, MapPin, User, LogOut, Check, ChevronRight } from 'lucide-react';

export const AccountPage: React.FC = () => {
  const { loyaltyPoints, navigate, showToast, language, t, orders: storeOrders } = useStore();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'orders' | 'loyalty' | 'addresses'>('dashboard');

  const formattedOrders = (storeOrders && storeOrders.length > 0) ? storeOrders.map((o: any) => ({
    id: o.orderNumber || o.id,
    date: o.date || 'Vandaag',
    total: typeof o.total === 'number' ? `€${o.total.toFixed(2)}` : String(o.total),
    status: o.status === 'confirmed' ? (language === 'pl' ? 'Potwierdzone' : 'Bevestigd') : t('account.delivered'),
    items: o.items && o.items[0] 
      ? `${o.items[0].product.name} (${o.items[0].selectedSize || 'Standard'})${o.items.length > 1 ? ` + ${o.items.length - 1} extra` : ''}` 
      : 'Octagon Gear Levering'
  })) : [
    {
      id: 'OCT-NL-2026-749201',
      date: '28 Feb 2026',
      total: '€119.99',
      status: t('account.delivered'),
      items: language === 'pl'
        ? 'Octagon Pro Fight Bokshandschoenen Skórzane (14 OZ)'
        : language === 'en'
        ? 'Octagon Pro Fight Leather Boxing Gloves (14 OZ)'
        : 'Octagon Pro Fight Leather Bokshandschoenen (14 OZ)'
    }
  ];

  const orders = formattedOrders;

  return (
    <div className="bg-[#050505] min-h-screen text-white pb-20">
      {/* Header */}
      <div className="bg-[#0A0A0A] border-b border-neutral-800 py-10 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-mono uppercase text-[#D71920] tracking-widest block mb-1">
              {t('account.portal')}
            </span>
            <h1 className="font-bebas text-3xl sm:text-5xl text-white">
              {t('account.title')}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-3 bg-[#141414] border border-neutral-700 flex items-center gap-3">
              <Award className="w-5 h-5 text-[#D71920]" />
              <div>
                <p className="text-[10px] font-mono uppercase text-neutral-400">{t('account.points')}</p>
                <p className="font-mono text-base font-bold text-white tabular-nums">{loyaltyPoints} PTS</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content with Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Side Nav */}
          <div className="space-y-1 bg-[#0C0C0C] border border-neutral-800 p-3 h-fit">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`w-full p-3 text-left font-condensed font-bold text-xs uppercase tracking-wider flex items-center justify-between transition-colors cursor-pointer ${
                activeTab === 'dashboard' ? 'bg-[#D71920] text-white' : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <User className="w-4 h-4" />
                <span>{t('account.dashboard')}</span>
              </div>
              <ChevronRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setActiveTab('orders')}
              className={`w-full p-3 text-left font-condensed font-bold text-xs uppercase tracking-wider flex items-center justify-between transition-colors cursor-pointer ${
                activeTab === 'orders' ? 'bg-[#D71920] text-white' : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Package className="w-4 h-4" />
                <span>{t('account.orders')}</span>
              </div>
              <ChevronRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setActiveTab('loyalty')}
              className={`w-full p-3 text-left font-condensed font-bold text-xs uppercase tracking-wider flex items-center justify-between transition-colors cursor-pointer ${
                activeTab === 'loyalty' ? 'bg-[#D71920] text-white' : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Award className="w-4 h-4" />
                <span>{t('account.loyalty')}</span>
              </div>
              <ChevronRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setActiveTab('addresses')}
              className={`w-full p-3 text-left font-condensed font-bold text-xs uppercase tracking-wider flex items-center justify-between transition-colors cursor-pointer ${
                activeTab === 'addresses' ? 'bg-[#D71920] text-white' : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4" />
                <span>{t('account.addresses')}</span>
              </div>
              <ChevronRight className="w-4 h-4" />
            </button>

            <div className="pt-4 border-t border-neutral-800">
              <button
                onClick={() => {
                  showToast(language === 'pl' ? 'Wylogowano z konta.' : language === 'en' ? 'Signed out.' : 'Uitgelogd.');
                  navigate('/');
                }}
                className="w-full p-3 text-left font-condensed font-bold text-xs uppercase tracking-wider text-neutral-400 hover:text-[#D71920] flex items-center gap-2 cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span>{t('account.logout')}</span>
              </button>
            </div>
          </div>

          {/* Right Tab Content */}
          <div className="md:col-span-3 bg-[#0C0C0C] border border-neutral-800 p-6 sm:p-8">
            {activeTab === 'dashboard' && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-bebas text-2xl text-white">
                    {t('account.welcome')}
                  </h3>
                  <p className="text-xs text-neutral-400 font-mono mt-1">
                    {t('account.status')} · {t('account.points')}: {loyaltyPoints} PTS
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 bg-[#141414] border border-neutral-800">
                    <p className="font-mono text-2xl font-bold text-white">{orders.length}</p>
                    <p className="text-xs font-condensed font-bold uppercase text-neutral-400 mt-1">{t('account.orders')}</p>
                  </div>
                  <div className="p-4 bg-[#141414] border border-neutral-800">
                    <p className="font-mono text-2xl font-bold text-[#D71920]">€174.98</p>
                    <p className="text-xs font-condensed font-bold uppercase text-neutral-400 mt-1">{t('checkout.total')}</p>
                  </div>
                  <div className="p-4 bg-[#141414] border border-neutral-800">
                    <p className="font-mono text-2xl font-bold text-emerald-400">{loyaltyPoints}</p>
                    <p className="text-xs font-condensed font-bold uppercase text-neutral-400 mt-1">{t('account.points')}</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-bebas text-xl text-white tracking-wider mb-3">
                    {language === 'pl' ? 'OSTATNIE ZAMÓWIENIE' : language === 'en' ? 'RECENT ORDER' : 'LAATSTE BESTELLING'}
                  </h4>
                  <div className="p-4 bg-[#111111] border border-neutral-800 flex flex-col sm:flex-row justify-between gap-3">
                    <div>
                      <span className="font-mono font-bold text-xs text-white">{orders[0].id}</span>
                      <p className="text-xs text-neutral-400 mt-1">{orders[0].items}</p>
                      <span className="text-[11px] font-mono text-emerald-400 mt-1 block">✓ {orders[0].status}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-mono font-bold text-white">{orders[0].total}</span>
                      <button
                        onClick={() => navigate('/order-tracking')}
                        className="block mt-2 text-xs font-condensed font-bold uppercase text-[#D71920] hover:underline"
                      >
                        {t('checkout.trackBtn')}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'orders' && (
              <div className="space-y-4">
                <h3 className="font-bebas text-2xl text-white tracking-wider pb-3 border-b border-neutral-800">
                  {t('account.orders')}
                </h3>
                <div className="space-y-3">
                  {orders.map(o => (
                    <div key={o.id} className="p-4 bg-[#111111] border border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-3">
                          <span className="font-mono font-bold text-xs text-white">{o.id}</span>
                          <span className="text-xs font-mono text-neutral-500">{o.date}</span>
                        </div>
                        <p className="text-xs text-neutral-300 mt-1">{o.items}</p>
                        <span className="text-[11px] font-mono text-emerald-400">✓ {o.status}</span>
                      </div>
                      <div className="text-right">
                        <span className="font-mono font-bold text-white block">{o.total}</span>
                        <button
                          onClick={() => navigate('/order-tracking')}
                          className="mt-1 text-xs font-condensed font-bold uppercase text-[#D71920] hover:underline cursor-pointer"
                        >
                          {t('checkout.trackBtn')}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'loyalty' && (
              <div className="space-y-4">
                <h3 className="font-bebas text-2xl text-white tracking-wider pb-3 border-b border-neutral-800">
                  {t('account.pointsTitle')}
                </h3>
                <p className="text-xs text-neutral-400 font-body">
                  {t('account.pointsDesc')}
                </p>
                <div className="p-6 bg-gradient-to-r from-red-950/40 to-black border border-[#D71920]/40 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-mono uppercase text-[#D71920]">OCTAGON VIP TIER</span>
                    <h4 className="font-bebas text-3xl text-white mt-1">{loyaltyPoints} FIGHT POINTS</h4>
                    <p className="text-xs text-neutral-400 mt-1">
                      {language === 'pl' ? 'Wymień 250 pkt na rabat €15 przy kolejnym zamówieniu.' : language === 'en' ? 'Redeem 250 PTS for a €15 voucher on your next order.' : 'Wissel 250 punten in voor €15 korting op je volgende bestelling.'}
                    </p>
                  </div>
                  <Award className="w-12 h-12 text-[#D71920]" />
                </div>
              </div>
            )}

            {activeTab === 'addresses' && (
              <div className="space-y-4">
                <h3 className="font-bebas text-2xl text-white tracking-wider pb-3 border-b border-neutral-800">
                  {t('account.addresses')}
                </h3>
                <div className="p-4 bg-[#111111] border border-neutral-800">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-condensed font-bold uppercase text-white">Standaard Bezorgadres</span>
                    <span className="px-2 py-0.5 bg-neutral-800 text-[10px] font-mono text-[#D71920] uppercase font-bold">Default</span>
                  </div>
                  <p className="text-xs text-neutral-400 mt-2 font-mono">
                    Lars de Boer<br />
                    Keizersgracht 42A<br />
                    1015 CR Amsterdam, Nederland
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
