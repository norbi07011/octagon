import React, { useState, useMemo } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  Building2, 
  ShieldCheck, 
  Check, 
  Send, 
  TrendingUp, 
  Truck, 
  RefreshCw, 
  Sliders, 
  Database, 
  ExternalLink, 
  ArrowRight, 
  Layers, 
  Search, 
  CheckCircle2, 
  RotateCcw,
  PackageCheck,
  Tag
} from 'lucide-react';
import { OCTAGON_SUPPLIER_RAW_FEED } from '../services/octagonCatalogService';

export const WholesalePage: React.FC = () => {
  const { 
    showToast, 
    language, 
    t, 
    products, 
    supplierConfig, 
    updateSupplierConfig, 
    syncCatalogFromSupplier, 
    isSyncingCatalog, 
    lastCatalogSync, 
    syncLogs, 
    resetCatalogToDefault,
    navigate
  } = useStore();

  const [activeTab, setActiveTab] = useState<'hub' | 'form'>('hub');
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [catalogSearch, setCatalogSearch] = useState('');
  const [selectedFeedCategory, setSelectedFeedCategory] = useState<string>('all');
  
  // Custom local config editor state
  const [tempRate, setTempRate] = useState<number>(supplierConfig.plnToEurRate);
  const [tempDiscount, setTempDiscount] = useState<number>(supplierConfig.wholesaleContractDiscountPct);
  const [tempMargin, setTempMargin] = useState<number>(supplierConfig.targetProfitMarginPct);

  // Form state
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    company: '',
    kvk: '',
    vat: '',
    address: '',
    website: '',
    contactPerson: '',
    phone: '',
    email: '',
    volume: '€2.500 - €5.000',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    showToast(
      language === 'pl'
        ? 'Wniosek B2B złożony! Zweryfikujemy NIP/VAT w 24 godziny.'
        : language === 'en'
        ? 'B2B application submitted! We will verify your registration and respond within 24 hours.'
        : 'B2B aanvraag ingediend! We verifiëren je KvK nummer binnen 24u.'
    );
  };

  const handleSaveConfig = () => {
    updateSupplierConfig({
      plnToEurRate: Number(tempRate),
      wholesaleContractDiscountPct: Number(tempDiscount),
      targetProfitMarginPct: Number(tempMargin)
    });
    setShowConfigModal(false);
    showToast(
      language === 'pl' 
        ? 'Zapisano ustawienia marży i kursu walut!' 
        : 'Wisselkoers en marge instellingen opgeslagen!'
    );
  };

  // Filter raw supplier feed for the browser
  const filteredFeed = useMemo(() => {
    return OCTAGON_SUPPLIER_RAW_FEED.filter(item => {
      const matchCat = selectedFeedCategory === 'all' || 
        item.category_path.toLowerCase().includes(selectedFeedCategory.toLowerCase()) ||
        item.discipline.toLowerCase().includes(selectedFeedCategory.toLowerCase());
      
      const q = catalogSearch.toLowerCase().trim();
      const matchQuery = !q || 
        item.name_pl.toLowerCase().includes(q) ||
        (item.name_en && item.name_en.toLowerCase().includes(q)) ||
        item.supplier_sku.toLowerCase().includes(q) ||
        (item.collection && item.collection.toLowerCase().includes(q));

      return matchCat && matchQuery;
    });
  }, [catalogSearch, selectedFeedCategory]);

  return (
    <div className="bg-[#050505] min-h-screen text-white pb-24">
      {/* Header */}
      <div className="bg-[#0A0A0A] border-b border-neutral-800 py-12 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-950/40 border border-red-800/60 mb-4">
            <Building2 className="w-4 h-4 text-[#D71920]" />
            <span className="text-xs font-mono tracking-widest uppercase text-red-300 font-bold">
              {language === 'pl' 
                ? 'OFICJALNY KONTRAKT HURTOWY • OCTAGONSHOP.PL -> HOLANDIA' 
                : 'OFFICIEEL LEVERINGSCONTRACT MET OCTAGONSHOP.PL • POLEN -> NEDERLAND'}
            </span>
          </div>

          <h1 className="font-bebas text-5xl sm:text-7xl text-white uppercase leading-none">
            {language === 'pl' ? 'PORTAL HURTOWY I HUB DOSTAWCY OCTAGON' : t('wholesale.title')}
          </h1>

          <p className="mt-3 text-xs sm:text-sm text-neutral-400 max-w-2xl mx-auto font-body leading-relaxed">
            {language === 'pl'
              ? 'Bezpośredni kontrakt dostawczy z oficjalnym producentem Octagon Polska (Katowice). Ceny hurtowe fabryczne, bezpośrednia logistyka paletowa i paczkowa do Holandii przez PostNL/DHL oraz synchronizacja katalogu produktów.'
              : t('wholesale.lead')}
          </p>

          {/* Quick Tab Switcher */}
          <div className="flex items-center justify-center gap-3 mt-8">
            <button
              onClick={() => setActiveTab('hub')}
              className={`px-5 py-2.5 text-xs font-condensed font-bold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer ${
                activeTab === 'hub'
                  ? 'bg-[#D71920] text-white shadow-lg shadow-red-900/40'
                  : 'bg-[#141414] text-neutral-400 hover:text-white border border-neutral-800'
              }`}
            >
              <Database className="w-4 h-4" />
              <span>{language === 'pl' ? 'Hub Integracji & Asortyment Dostawcy' : 'Leverancier Hub & Product Import'}</span>
              <span className="px-1.5 py-0.5 text-[10px] bg-black/40 rounded font-mono">
                {products.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('form')}
              className={`px-5 py-2.5 text-xs font-condensed font-bold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer ${
                activeTab === 'form'
                  ? 'bg-[#D71920] text-white shadow-lg shadow-red-900/40'
                  : 'bg-[#141414] text-neutral-400 hover:text-white border border-neutral-800'
              }`}
            >
              <Send className="w-4 h-4" />
              <span>{language === 'pl' ? 'Wniosek o Konto B2B' : 'B2B Aanvraagformulier'}</span>
            </button>
          </div>
        </div>
      </div>

      {activeTab === 'hub' ? (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 space-y-10">
          {/* Supplier Status & Sync Control Card */}
          <div className="bg-[#0D0D0D] border border-neutral-800 p-6 sm:p-8 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/5 rounded-full blur-3xl pointer-events-none" />

            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-neutral-800/80">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-mono uppercase text-emerald-400 tracking-wider font-semibold">
                    {language === 'pl' ? 'POŁĄCZENIE AKTYWNE: OCTAGONSHOP.PL' : 'ACTIEVE VERBINDING: OCTAGONSHOP.PL'}
                  </span>
                  <a
                    href="https://octagonshop.pl/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] text-neutral-400 hover:text-white underline ml-2"
                  >
                    <span>octagonshop.pl</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <h2 className="font-bebas text-3xl sm:text-4xl text-white">
                  {language === 'pl' 
                    ? 'KONTRAKT HURTOWY POLSKA -> HOLANDIA' 
                    : 'GROOTHANDELS CONTRACT POLEN -> NEDERLAND'}
                </h2>
                <p className="text-xs text-neutral-400 mt-1 max-w-xl font-body">
                  {language === 'pl'
                    ? 'Wszystkie produkty z oferty Twojego polskiego dostawcy są importowane, kalkulowane w EUR z uwzględnieniem marży handlowej i dostępne w Twoim sklepie dla klientów w Holandii.'
                    : 'Alle producten van je officiële leverancier worden realtime gemapt naar EUR met margeberekening en Nederlandse categorieën.'}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => syncCatalogFromSupplier()}
                  disabled={isSyncingCatalog}
                  className="px-6 py-3.5 bg-[#D71920] hover:bg-[#b01318] disabled:opacity-60 text-white font-condensed font-bold text-xs uppercase tracking-widest flex items-center gap-2 cursor-pointer transition-all shadow-lg shadow-red-950"
                >
                  <RefreshCw className={`w-4 h-4 ${isSyncingCatalog ? 'animate-spin' : ''}`} />
                  <span>
                    {isSyncingCatalog 
                      ? (language === 'pl' ? 'POBIERANIE I IMPORTOWANIE...' : 'BEZIG MET IMPORTEREN...') 
                      : (language === 'pl' ? 'SYNCHRONIZUJ Z OCTAGONSHOP.PL' : 'SYNC MET OCTAGONSHOP.PL')}
                  </span>
                </button>

                <button
                  onClick={() => setShowConfigModal(!showConfigModal)}
                  className="px-4 py-3.5 bg-[#171717] hover:bg-[#202020] border border-neutral-700 text-white font-condensed font-bold text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer transition-colors"
                >
                  <Sliders className="w-4 h-4 text-neutral-400" />
                  <span>{language === 'pl' ? 'Parametry Marży & PLN' : 'Marge & Wisselkoers'}</span>
                </button>

                <button
                  onClick={resetCatalogToDefault}
                  title={language === 'pl' ? 'Przywróć stan bazowy' : 'Reset naar standaard'}
                  className="p-3.5 bg-[#171717] hover:bg-[#202020] border border-neutral-700 text-neutral-400 hover:text-white cursor-pointer transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6">
              <div className="bg-[#121212] p-4 border border-neutral-800/80">
                <span className="text-[10px] font-mono text-neutral-400 uppercase block">
                  {language === 'pl' ? 'Produkty w Sklepie' : 'Artikelen in Winkel'}
                </span>
                <span className="font-bebas text-3xl text-white mt-1 block">
                  {products.length} szt.
                </span>
                <span className="text-[11px] text-emerald-400 font-mono mt-0.5 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> 100% aktywnych
                </span>
              </div>

              <div className="bg-[#121212] p-4 border border-neutral-800/80">
                <span className="text-[10px] font-mono text-neutral-400 uppercase block">
                  {language === 'pl' ? 'Kurs Przeliczeniowy' : 'Wisselkoers PLN -> EUR'}
                </span>
                <span className="font-bebas text-3xl text-white mt-1 block">
                  1 € = {supplierConfig.plnToEurRate.toFixed(2)} PLN
                </span>
                <span className="text-[11px] text-neutral-500 font-mono mt-0.5">
                  Średni kurs NBP / ECB
                </span>
              </div>

              <div className="bg-[#121212] p-4 border border-neutral-800/80">
                <span className="text-[10px] font-mono text-neutral-400 uppercase block">
                  {language === 'pl' ? 'Rabat Hurtowy z Umowy' : 'Contract Inkoopkorting'}
                </span>
                <span className="font-bebas text-3xl text-emerald-400 mt-1 block">
                  -{supplierConfig.wholesaleContractDiscountPct}%
                </span>
                <span className="text-[11px] text-neutral-500 font-mono mt-0.5">
                  Od cen detalicznych w Polsce
                </span>
              </div>

              <div className="bg-[#121212] p-4 border border-neutral-800/80">
                <span className="text-[10px] font-mono text-neutral-400 uppercase block">
                  {language === 'pl' ? 'Docelowa Marża Zysku' : 'Bruto Winstmarge'}
                </span>
                <span className="font-bebas text-3xl text-[#D71920] mt-1 block">
                  +{supplierConfig.targetProfitMarginPct}%
                </span>
                <span className="text-[11px] text-neutral-500 font-mono mt-0.5">
                  Narzut na cenie sprzedaży EUR
                </span>
              </div>
            </div>

            {/* Config drawer (Collapsible) */}
            {showConfigModal && (
              <div className="mt-6 p-6 bg-[#141414] border border-neutral-700 space-y-5 animate-in fade-in duration-200">
                <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                  <h3 className="font-bebas text-xl text-white flex items-center gap-2">
                    <Sliders className="w-4 h-4 text-[#D71920]" />
                    {language === 'pl' ? 'Konfiguracja Parametrów Finansowych Importu' : 'Import & Marge Instellingen'}
                  </h3>
                  <span className="text-[11px] font-mono text-neutral-400">
                    Warunki B2B z Octagon Polska
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-[11px] font-mono uppercase text-neutral-300 mb-1.5">
                      {language === 'pl' ? 'Kurs Przeliczenia (1 EUR w PLN)' : 'Wisselkoers (1 EUR in PLN)'}
                    </label>
                    <input
                      type="number"
                      step="0.05"
                      min="3.5"
                      max="5.5"
                      value={tempRate}
                      onChange={e => setTempRate(Number(e.target.value))}
                      className="w-full bg-[#0A0A0A] border border-neutral-700 px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-[#D71920]"
                    />
                    <p className="text-[10px] text-neutral-500 mt-1">
                      {language === 'pl' ? 'Cena hurtowa w PLN jest dzielona przez ten kurs.' : 'PLN inkoopprijs wordt gedeeld door deze koers.'}
                    </p>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase text-neutral-300 mb-1.5">
                      {language === 'pl' ? 'Rabat Hurtowy z Kontraktu (%)' : 'Contract Inkoopkorting (%)'}
                    </label>
                    <input
                      type="number"
                      step="1"
                      min="10"
                      max="60"
                      value={tempDiscount}
                      onChange={e => setTempDiscount(Number(e.target.value))}
                      className="w-full bg-[#0A0A0A] border border-neutral-700 px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-[#D71920]"
                    />
                    <p className="text-[10px] text-neutral-500 mt-1">
                      {language === 'pl' ? 'Twój rabat od oficjalnej ceny detalicznej octagonshop.pl.' : 'Korting ten opzichte van adviesprijs Polen.'}
                    </p>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase text-neutral-300 mb-1.5">
                      {language === 'pl' ? 'Narzut Marży Handlowej w EUR (%)' : 'Verkoopmarge Opslag (%)'}
                    </label>
                    <input
                      type="number"
                      step="1"
                      min="15"
                      max="80"
                      value={tempMargin}
                      onChange={e => setTempMargin(Number(e.target.value))}
                      className="w-full bg-[#0A0A0A] border border-neutral-700 px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-[#D71920]"
                    />
                    <p className="text-[10px] text-neutral-500 mt-1">
                      {language === 'pl' ? 'Narzut na koszt zakupu ustalający cenę sprzedaży w Holandii.' : 'Marge toegevoegd aan inkoop om EUR verkoopprijs te bepalen.'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-3 border-t border-neutral-800">
                  <button
                    onClick={() => setShowConfigModal(false)}
                    className="px-4 py-2 text-xs font-condensed font-bold uppercase text-neutral-400 hover:text-white cursor-pointer"
                  >
                    {language === 'pl' ? 'Anuluj' : 'Annuleren'}
                  </button>
                  <button
                    onClick={handleSaveConfig}
                    className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-condensed font-bold text-xs uppercase tracking-wider cursor-pointer"
                  >
                    {language === 'pl' ? 'Zastosuj i Przelicz' : 'Opslaan & Toepassen'}
                  </button>
                </div>
              </div>
            )}

            {/* Sync Telemetry Logs (Live during sync or from last sync) */}
            {(isSyncingCatalog || syncLogs.length > 0) && (
              <div className="mt-6 p-4 bg-[#080808] border border-neutral-800 font-mono text-[11px] space-y-2 max-h-48 overflow-y-auto">
                <div className="text-neutral-400 font-bold uppercase flex items-center justify-between border-b border-neutral-800 pb-1">
                  <span>
                    {language === 'pl' ? 'DZIENNIK ZDARZEŃ SYNCHRONIZACJI' : 'SYNCHRONISATIE LOGBOEK'}
                  </span>
                  <span className="text-emerald-400">
                    {isSyncingCatalog ? 'W TOKU / IN PROGRESS...' : 'ZAKOŃCZONO / COMPLETED'}
                  </span>
                </div>
                {syncLogs.map((l, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <span className="text-neutral-500">[{new Date(l.timestamp).toLocaleTimeString()}]</span>
                    <span className={`px-1 rounded text-[10px] uppercase font-bold ${
                      l.status === 'success' ? 'bg-emerald-950 text-emerald-400' :
                      l.status === 'error' ? 'bg-red-950 text-red-400' : 'bg-neutral-800 text-neutral-300'
                    }`}>
                      {l.step}
                    </span>
                    <span className="text-neutral-300">{l.message}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Supplier Catalog Browser (Live search & category filter) */}
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <h3 className="font-bebas text-3xl sm:text-4xl text-white">
                  {language === 'pl' 
                    ? 'PRZEGLĄDARKA ASORTYMENTU DOSTAWCY (OCTAGON POLSKA)' 
                    : 'LEVERANCIER PRODUCT CATALOGUS (OCTAGONSHOP.PL)'}
                </h3>
                <p className="text-xs text-neutral-400 mt-1">
                  {language === 'pl'
                    ? `Łącznie ${filteredFeed.length} pozycji z bazy hurtowej Katowice. Ceny w PLN przeliczane na EUR zgodnie z Twoim kontraktem.`
                    : `Totaal ${filteredFeed.length} leverancier SKU's. Realtime omrekening van PLN naar EUR met jouw marge.`}
                </p>
              </div>

              {/* Search bar */}
              <div className="relative w-full md:w-80">
                <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={catalogSearch}
                  onChange={e => setCatalogSearch(e.target.value)}
                  placeholder={language === 'pl' ? 'Szukaj SKU, modelu, kolekcji...' : 'Zoek SKU, model, serie...'}
                  className="w-full bg-[#111111] border border-neutral-700 pl-9 pr-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#D71920]"
                />
              </div>
            </div>

            {/* Category Quick Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {[
                { id: 'all', label: language === 'pl' ? 'Wszystkie' : 'Alle' },
                { id: 'rękawice', label: language === 'pl' ? 'Rękawice & MMA' : 'Handschoenen' },
                { id: 'rashguard', label: language === 'pl' ? 'Fightwear & Rashguardy' : 'Fightwear' },
                { id: 'ochraniacze', label: language === 'pl' ? 'Ochraniacze' : 'Bescherming' },
                { id: 'bluzy', label: language === 'pl' ? 'Bluzy & Streetwear' : 'Hoodies & Street' },
                { id: 'koszulki', label: language === 'pl' ? 'T-Shirty' : 'T-Shirts' },
                { id: 'worki', label: language === 'pl' ? 'Worki & Tarcze' : 'Bokszakken & Pads' },
                { id: 'torby', label: language === 'pl' ? 'Torby & Akcesoria' : 'Tassen & Gear' },
                { id: 'damsk', label: language === 'pl' ? 'Damskie' : 'Dames' },
                { id: 'dzieci', label: language === 'pl' ? 'Dziecięce' : 'Kids' },
                { id: 'outlet', label: language === 'pl' ? 'Outlet / Wyprzedaż' : 'Outlet' }
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedFeedCategory(cat.id)}
                  className={`px-3.5 py-1.5 text-xs font-condensed font-bold uppercase tracking-wider whitespace-nowrap transition-colors cursor-pointer ${
                    selectedFeedCategory === cat.id
                      ? 'bg-[#D71920] text-white'
                      : 'bg-[#121212] border border-neutral-800 text-neutral-400 hover:text-white'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Feed Table / Cards */}
            <div className="bg-[#0C0C0C] border border-neutral-800 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-neutral-800 bg-[#121212] text-[10px] font-mono uppercase text-neutral-400">
                      <th className="py-3 px-4">Produkt (octagonshop.pl)</th>
                      <th className="py-3 px-4">SKU / Kategoria</th>
                      <th className="py-3 px-4 text-right">Cena Hurtowa PLN</th>
                      <th className="py-3 px-4 text-right">Koszt w EUR</th>
                      <th className="py-3 px-4 text-right">Cena Sklepu EUR</th>
                      <th className="py-3 px-4 text-right">Marża Handlowa</th>
                      <th className="py-3 px-4 text-center">Magazyn PL</th>
                      <th className="py-3 px-4 text-center">Akcja</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-900 text-xs">
                    {filteredFeed.map(item => {
                      const wholesaleEur = Number((item.wholesale_price_pln / supplierConfig.plnToEurRate).toFixed(2));
                      const retailEur = Number((wholesaleEur * (1 + supplierConfig.targetProfitMarginPct / 100)).toFixed(2));
                      const marginEur = Number((retailEur - wholesaleEur).toFixed(2));
                      const matchingStoreProduct = products.find(p => p.sku === item.supplier_sku);

                      return (
                        <tr key={item.supplier_sku} className="hover:bg-[#111111] transition-colors">
                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-neutral-900 border border-neutral-800 flex-shrink-0 flex items-center justify-center">
                                <PackageCheck className="w-5 h-5 text-[#D71920]" />
                              </div>
                              <div>
                                <span className="font-condensed font-bold text-white block">
                                  {item.name_pl}
                                </span>
                                {item.name_en && (
                                  <span className="text-[11px] text-neutral-500 font-body block">
                                    {item.name_en}
                                  </span>
                                )}
                              </div>
                            </div>
                          </td>

                          <td className="py-3.5 px-4 font-mono text-[11px] text-neutral-400">
                            <div className="font-bold text-neutral-300">{item.supplier_sku}</div>
                            <div className="text-[10px] text-neutral-500">{item.category_path}</div>
                          </td>

                          <td className="py-3.5 px-4 text-right font-mono text-neutral-300">
                            {item.wholesale_price_pln.toFixed(2)} PLN
                          </td>

                          <td className="py-3.5 px-4 text-right font-mono text-neutral-300 font-semibold">
                            €{wholesaleEur.toFixed(2)}
                          </td>

                          <td className="py-3.5 px-4 text-right font-mono text-white font-bold">
                            €{retailEur.toFixed(2)}
                          </td>

                          <td className="py-3.5 px-4 text-right font-mono">
                            <span className="text-emerald-400 font-bold block">
                              +€{marginEur.toFixed(2)}
                            </span>
                            <span className="text-[10px] text-neutral-500">
                              {supplierConfig.targetProfitMarginPct}% marży
                            </span>
                          </td>

                          <td className="py-3.5 px-4 text-center font-mono text-[11px]">
                            <span className="inline-flex items-center gap-1 text-emerald-400 font-bold">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                              {item.stock_quantity} szt.
                            </span>
                          </td>

                          <td className="py-3.5 px-4 text-center">
                            {matchingStoreProduct ? (
                              <button
                                onClick={() => navigate(`/product/${matchingStoreProduct.slug}`)}
                                className="px-3 py-1.5 bg-[#171717] hover:bg-[#222222] border border-neutral-700 text-white font-condensed font-bold text-[11px] uppercase tracking-wider inline-flex items-center gap-1 cursor-pointer transition-colors"
                              >
                                <span>{language === 'pl' ? 'W sklepie' : 'Bekijk'}</span>
                                <ArrowRight className="w-3 h-3 text-[#D71920]" />
                              </button>
                            ) : (
                              <span className="text-[10px] font-mono text-neutral-500 uppercase">
                                Gotowy do sync
                              </span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {filteredFeed.length === 0 && (
                <div className="p-12 text-center text-neutral-500">
                  <Database className="w-8 h-8 mx-auto mb-2 text-neutral-600" />
                  <p className="font-condensed font-bold uppercase text-white">
                    {language === 'pl' ? 'Brak produktów dla wybranego filtra' : 'Geen artikelen gevonden'}
                  </p>
                  <p className="text-xs text-neutral-500 mt-1">
                    {language === 'pl' ? 'Zmień frazę wyszukiwania lub wybierz inną kategorię.' : 'Pas de zoekterm of categorie aan.'}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* B2B Application Form */
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
          <div className="bg-[#0C0C0C] border border-neutral-800 p-8 sm:p-12 shadow-2xl">
            <div className="text-center max-w-xl mx-auto mb-8">
              <h2 className="font-bebas text-3xl sm:text-5xl text-white">
                {t('wholesale.submitBtn')}
              </h2>
              <p className="text-xs sm:text-sm text-neutral-400 mt-2 font-body">
                {language === 'pl'
                  ? 'Wypełnij formularz rejestracji biznesowej B2B. Po weryfikacji NIP/VAT otrzymasz dostęp do cen hurtowych dla klubów, dojo i sklepów w Holandii.'
                  : language === 'en'
                  ? 'Complete the wholesale registration form. Once verified, your account manager will grant direct B2B pricing portal access.'
                  : 'Vul onderstaand B2B aanvraagformulier in. Na controle van je gegevens ontvang je direct toegang tot ons groothandelsportaal.'}
              </p>
            </div>

            {submitted ? (
              <div className="p-8 bg-neutral-900 border border-emerald-500/50 text-center space-y-3">
                <Check className="w-10 h-10 text-emerald-400 mx-auto" />
                <h3 className="font-bebas text-2xl text-white">
                  {language === 'pl' ? 'Wniosek B2B Został Złożony!' : language === 'en' ? 'B2B Request Submitted!' : 'Aanvraag Ontvangen!'}
                </h3>
                <p className="text-xs text-neutral-300">
                  {language === 'pl'
                    ? `Dziękujemy ${form.contactPerson} (${form.company}). Nasz dział handlowy skontaktuje się w ciągu 24h.`
                    : language === 'en'
                    ? `Thank you ${form.contactPerson} (${form.company}). Our B2B sales team will reach out within 24 hours.`
                    : `Bedankt ${form.contactPerson} (${form.company}). We nemen spoedig contact met je op.`}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-mono uppercase text-neutral-400 mb-1">
                      {t('wholesale.companyName')} *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.company}
                      onChange={e => setForm({ ...form, company: e.target.value })}
                      placeholder="Fight Gear Benelux B.V."
                      className="w-full bg-[#141414] border border-neutral-700 px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D71920]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono uppercase text-neutral-400 mb-1">
                      {t('wholesale.kvk')} *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.kvk}
                      onChange={e => setForm({ ...form, kvk: e.target.value })}
                      placeholder="12345678"
                      className="w-full bg-[#141414] border border-neutral-700 px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D71920]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-mono uppercase text-neutral-400 mb-1">
                      {t('wholesale.vat')} *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.vat}
                      onChange={e => setForm({ ...form, vat: e.target.value })}
                      placeholder="NL123456789B01 / PL1234567890"
                      className="w-full bg-[#141414] border border-neutral-700 px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D71920]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono uppercase text-neutral-400 mb-1">
                      Website / Webshop
                    </label>
                    <input
                      type="url"
                      value={form.website}
                      onChange={e => setForm({ ...form, website: e.target.value })}
                      placeholder="https://jouwwinkel.nl"
                      className="w-full bg-[#141414] border border-neutral-700 px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D71920]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-mono uppercase text-neutral-400 mb-1">
                      {t('clubs.contactPerson')} *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.contactPerson}
                      onChange={e => setForm({ ...form, contactPerson: e.target.value })}
                      placeholder="Lars de Boer"
                      className="w-full bg-[#141414] border border-neutral-700 px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D71920]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono uppercase text-neutral-400 mb-1">
                      {t('checkout.email')} *
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={e => setForm({ ...form, email: e.target.value })}
                      placeholder="inkoop@jouwwinkel.nl"
                      className="w-full bg-[#141414] border border-neutral-700 px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D71920]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-mono uppercase text-neutral-400 mb-1">
                      {t('contact.phone')} *
                    </label>
                    <input
                      type="tel"
                      required
                      value={form.phone}
                      onChange={e => setForm({ ...form, phone: e.target.value })}
                      placeholder="+31 20 1234567"
                      className="w-full bg-[#141414] border border-neutral-700 px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D71920]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono uppercase text-neutral-400 mb-1">
                      {language === 'pl' ? 'Szacowany Kwartalny Wolumen' : language === 'en' ? 'Estimated Quarterly Volume' : 'Verwacht Kwartaalvolume'}
                    </label>
                    <select
                      value={form.volume}
                      onChange={e => setForm({ ...form, volume: e.target.value })}
                      className="w-full bg-[#141414] border border-neutral-700 px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D71920]"
                    >
                      <option value="€1.000 - €2.500">€1.000 - €2.500</option>
                      <option value="€2.500 - €5.000">€2.500 - €5.000</option>
                      <option value="€5.000 - €10.000">€5.000 - €10.000</option>
                      <option value="€10.000+">€10.000+</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-[#D71920] hover:bg-[#b01318] text-white font-condensed font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer shadow-lg transition-colors mt-2"
                >
                  <Send className="w-4 h-4" />
                  <span>{t('wholesale.submitBtn')}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
