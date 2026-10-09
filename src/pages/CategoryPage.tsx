import React, { useState, useMemo } from 'react';
import { useStore } from '../context/StoreContext';
import { PRODUCTS, getLocalizedProduct } from '../data/products';
import { ProductGrid } from '../components/commerce/ProductGrid';
import { Filter, X, ChevronDown, Check, SlidersHorizontal } from 'lucide-react';
import { ProductCategory, SportDiscipline } from '../types';

interface CategoryPageProps {
  categoryName?: string;
}

export const CategoryPage: React.FC<CategoryPageProps> = ({ categoryName }) => {
  const { currentPath, language, t, products: storeProducts } = useStore();
  const activeProducts = storeProducts && storeProducts.length > 0 ? storeProducts : PRODUCTS;
  
  // Extract path and query params
  const [pathname, searchStr] = currentPath.split('?');
  const params = new URLSearchParams(searchStr || '');
  const subParam = params.get('sub');
  const sportParam = params.get('sport');

  // Determine current active category from path
  const inferredCategory: ProductCategory | 'all' = useMemo(() => {
    if (pathname.includes('/category/heren')) return 'heren';
    if (pathname.includes('/category/dames')) return 'dames';
    if (pathname.includes('/category/kids')) return 'kids';
    if (pathname.includes('/category/fight-gear')) return 'fight-gear';
    if (pathname.includes('/category/training')) return 'training';
    if (pathname.includes('/category/accessoires')) return 'accessoires';
    return 'all';
  }, [pathname]);

  // Filters State
  const [selectedSport, setSelectedSport] = useState<string>(sportParam || 'all');
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>(subParam || 'all');
  const [selectedSize, setSelectedSize] = useState<string>('all');
  const [selectedColor, setSelectedColor] = useState<string>('all');
  const [maxPrice, setMaxPrice] = useState<number>(250);
  const [saleOnly, setSaleOnly] = useState<boolean>(pathname === '/sale');
  const [sortBy, setSortBy] = useState<'featured' | 'newest' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Available Filter Options derived from catalog
  const allSubcategories = useMemo(() => {
    const map = new Map<string, string>();
    activeProducts.forEach(p => {
      if (inferredCategory === 'all' || p.category === inferredCategory) {
        const loc = getLocalizedProduct(p, language);
        map.set(p.subcategory, loc.subcategory);
      }
    });
    return Array.from(map.entries());
  }, [inferredCategory, language, activeProducts]);

  const allSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL', '6 OZ', '8 OZ', '10 OZ', '12 OZ', '14 OZ', '16 OZ', '18 OZ', '4.5 METER'];

  // Filtering Logic
  const filteredProducts = useMemo(() => {
    return activeProducts.filter(p => {
      // Category check
      if (inferredCategory !== 'all' && p.category !== inferredCategory) return false;
      // Subcategory check
      if (selectedSubcategory !== 'all' && p.subcategory.toLowerCase() !== selectedSubcategory.toLowerCase()) return false;
      // Sport check
      if (selectedSport !== 'all' && !p.sport.includes(selectedSport as SportDiscipline)) return false;
      // Size check
      if (selectedSize !== 'all' && !p.sizes.includes(selectedSize)) return false;
      // Color check
      if (selectedColor !== 'all' && !p.colors.some(c => c.name.toLowerCase().includes(selectedColor.toLowerCase()))) return false;
      // Price check
      if (p.price > maxPrice) return false;
      // Sale check
      if (saleOnly && !p.isSale && (!p.compareAtPrice || p.compareAtPrice <= p.price)) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [inferredCategory, selectedSubcategory, selectedSport, selectedSize, selectedColor, maxPrice, saleOnly, sortBy]);

  const categoryTitles: Record<string, Record<string, { title: string; desc: string }>> = {
    'heren': {
      nl: { title: 'HEREN FIGHTWEAR & KLEDING', desc: 'Professionele rashguards, MMA shorts, compressie en streetwear hoodies voor heren.' },
      en: { title: 'MEN FIGHTWEAR & APPAREL', desc: 'Professional rashguards, MMA shorts, compression wear and streetwear hoodies for men.' },
      pl: { title: 'MĘSKI FIGHTWEAR & ODZIEŻ', desc: 'Profesjonalne rashguardy, spodenki MMA, odzież kompresyjna i bluzy dla mężczyzn.' }
    },
    'dames': {
      nl: { title: 'DAMES COMBAT SPORTKLEDING', desc: 'High-waist sportleggings, ergonomische handschoenen en vechtsport uitrusting voor dames.' },
      en: { title: 'WOMEN COMBAT APPAREL', desc: 'High-waisted athletic tights, ergonomic gloves and combat equipment for women.' },
      pl: { title: 'DAMSKA ODZIEŻ & SPRZĘT FIGHT', desc: 'Legginsy z wysokim stanem, ergonomiczne rękawice i ochraniacze dla kobiet.' }
    },
    'kids': {
      nl: { title: 'KIDS & JEUGD FIGHT GEAR', desc: 'Maximale bescherming en veilige vechtsportkleding voor jonge vechters.' },
      en: { title: 'KIDS & YOUTH COMBAT GEAR', desc: 'Maximum protection and durable combat equipment for young athletes.' },
      pl: { title: 'SPRZĘT FIGHT DLA DZIECI I MŁODZIEŻY', desc: 'Maksymalne bezpieczeństwo i profesjonalny sprzęt dla młodych zawodników.' }
    },
    'fight-gear': {
      nl: { title: 'FIGHT GEAR & BESCHERMING', desc: 'Bokshandschoenen van 100% rundleer, MMA handschoenen, scheenbeschermers en bandages.' },
      en: { title: 'FIGHT GEAR & PROTECTION', desc: '100% genuine cowhide boxing gloves, MMA gloves, shin guards and protective wraps.' },
      pl: { title: 'SPRZĘT FIGHT & OCHRANIACZE', desc: 'Rękawice z prawdziwej skóry bydlęcej, rękawice MMA, ochraniacze piszczeli i owijki.' }
    },
    'training': {
      nl: { title: 'TRAINING & COACHING EQUIPMENT', desc: 'Focus mitts, kick pads, zware bokszakken en functionele trainingsaccessoires.' },
      en: { title: 'TRAINING & COACHING EQUIPMENT', desc: 'Focus mitts, Thai pads, heavy punching bags, and conditioning accessories.' },
      pl: { title: 'SPRZĘT TRENINGOWY & TRENERSKI', desc: 'Łapy bokserskie, tarcze kopnięć, ciężkie worki bokserskie i akcesoria.' }
    },
    'accessoires': {
      nl: { title: 'COMBAT ACCESSOIRES & TASSEN', desc: 'Heavy-duty sporttassen, snapbacks, bitjes, shakers en vechtsport gear.' },
      en: { title: 'COMBAT ACCESSORIES & BAGS', desc: 'Heavy-duty gym duffles, snapbacks, mouthguards, and fight accessories.' },
      pl: { title: 'AKCESORIA FIGHT & TORBY', desc: 'Wytrzymałe torby sportowe, czapki, szczęki, shakery i akcesoria do sportów walki.' }
    },
    'all': {
      nl: { title: 'VOLLEDIGE OCTAGON COLLECTIE', desc: 'Alle professionele fightwear en vechtsportartikelen voor training en competitie.' },
      en: { title: 'FULL OCTAGON COLLECTION', desc: 'All professional fightwear and combat sports gear engineered for training and competition.' },
      pl: { title: 'PEŁNA KOLEKCJA OCTAGON', desc: 'Wszystkie produkty fightwear i profesjonalny sprzęt do sportów walki.' }
    }
  };

  const headerInfo = categoryTitles[inferredCategory]?.[language] || categoryTitles.all[language] || categoryTitles.all.nl;

  const resetFilters = () => {
    setSelectedSport('all');
    setSelectedSubcategory('all');
    setSelectedSize('all');
    setSelectedColor('all');
    setMaxPrice(150);
    setSaleOnly(false);
  };

  return (
    <div className="bg-[#050505] min-h-screen text-white">
      {/* Category Hero Banner */}
      <div className="bg-[#0B0B0B] border-b border-neutral-800 py-10 sm:py-14 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <span className="text-xs font-mono uppercase text-[#D71920] tracking-widest block mb-1">
            OCTAGON SPORT NL / {inferredCategory.toUpperCase()}
          </span>
          <h1 className="font-bebas text-4xl sm:text-6xl text-white tracking-wide">
            {headerInfo.title}
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 mt-2 max-w-2xl font-body">
            {headerInfo.desc}
          </p>
        </div>
      </div>

      {/* Main Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Controls Bar: Item count, Mobile filter trigger, Sorting */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-800 mb-8">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden px-4 py-2 bg-[#141414] border border-neutral-700 text-white font-condensed font-bold text-xs uppercase tracking-wider flex items-center gap-2"
            >
              <SlidersHorizontal className="w-4 h-4 text-[#D71920]" />
              <span>Filters ({[selectedSport !== 'all', selectedSubcategory !== 'all', selectedSize !== 'all', saleOnly].filter(Boolean).length})</span>
            </button>
            <span className="text-xs font-mono text-neutral-400">
              {filteredProducts.length} {t('filters.found')}
            </span>
          </div>

          {/* Sort By Dropdown */}
          <div className="flex items-center gap-2 self-end sm:self-auto text-xs font-condensed uppercase tracking-wider">
            <span className="text-neutral-500 font-mono">{t('filters.sort')}</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-[#111111] border border-neutral-700 text-white px-3 py-1.5 focus:outline-none focus:border-[#D71920]"
            >
              <option value="featured">{t('filters.sort.featured')}</option>
              <option value="newest">{t('filters.sort.newest')}</option>
              <option value="price-asc">{t('filters.sort.priceAsc')}</option>
              <option value="price-desc">{t('filters.sort.priceDesc')}</option>
              <option value="rating">{t('filters.sort.rating')}</option>
            </select>
          </div>
        </div>

        {/* Content Layout: Left Filter Sidebar (Desktop) + Right Products Grid */}
        <div className="flex gap-8 items-start">
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block w-64 shrink-0 space-y-6 bg-[#0B0B0B] border border-neutral-800/80 p-5 sticky top-24">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
              <span className="font-bebas text-lg tracking-wider text-white">{t('filters.title')}</span>
              <button
                onClick={resetFilters}
                className="text-[11px] font-mono text-neutral-400 hover:text-[#D71920] underline"
              >
                {t('filters.clear')}
              </button>
            </div>

            {/* Subcategories Filter */}
            {allSubcategories.length > 0 && (
              <div>
                <label className="block text-xs font-condensed font-bold uppercase text-neutral-300 mb-2">
                  {t('mega.fightwear')}
                </label>
                <div className="space-y-1.5 text-xs text-neutral-400">
                  <button
                    onClick={() => setSelectedSubcategory('all')}
                    className={`block w-full text-left py-1 hover:text-white ${selectedSubcategory === 'all' ? 'text-[#D71920] font-bold' : ''}`}
                  >
                    {t('filters.allSub')}
                  </button>
                  {allSubcategories.map(([dutchKey, locLabel]) => (
                    <button
                      key={dutchKey}
                      onClick={() => setSelectedSubcategory(dutchKey)}
                      className={`block w-full text-left py-1 hover:text-white ${selectedSubcategory === dutchKey ? 'text-[#D71920] font-bold' : ''}`}
                    >
                      {locLabel}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Sport Discipline Filter */}
            <div className="border-t border-neutral-800 pt-4">
              <label className="block text-xs font-condensed font-bold uppercase text-neutral-300 mb-2">
                {t('filters.sport')}
              </label>
              <div className="space-y-1.5 text-xs text-neutral-400">
                {[
                  { id: 'all', label: t('filters.allSub') },
                  { id: 'mma', label: t('discipline.mma') },
                  { id: 'boxing', label: t('discipline.boxing') },
                  { id: 'kickboxing', label: t('discipline.kickboxing') },
                  { id: 'muay-thai', label: t('discipline.muayThai') },
                  { id: 'grappling', label: t('discipline.grappling') }
                ].map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSelectedSport(s.id)}
                    className={`block w-full text-left py-1 hover:text-white ${selectedSport === s.id ? 'text-[#D71920] font-bold' : ''}`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Filter */}
            <div className="border-t border-neutral-800 pt-4">
              <label className="block text-xs font-condensed font-bold uppercase text-neutral-300 mb-2">
                {t('filters.size')}
              </label>
              <div className="flex flex-wrap gap-1.5">
                <button
                  onClick={() => setSelectedSize('all')}
                  className={`px-2 py-1 text-[11px] font-mono border ${selectedSize === 'all' ? 'border-[#D71920] bg-[#D71920] text-white' : 'border-neutral-800 text-neutral-400 hover:border-neutral-600'}`}
                >
                  ALL
                </button>
                {allSizes.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`px-2 py-1 text-[11px] font-mono border ${selectedSize === sz ? 'border-[#D71920] bg-[#D71920] text-white' : 'border-neutral-800 text-neutral-400 hover:border-neutral-600'}`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Max Price Range Slider */}
            <div className="border-t border-neutral-800 pt-4">
              <div className="flex justify-between items-center text-xs font-condensed font-bold uppercase text-neutral-300 mb-2">
                <span>{t('filters.maxPrice')}:</span>
                <span className="font-mono text-[#D71920]">€{maxPrice}</span>
              </div>
              <input
                type="range"
                min="15"
                max="250"
                step="5"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#D71920] cursor-pointer"
              />
            </div>

            {/* Sale Only Toggle */}
            <div className="border-t border-neutral-800 pt-4">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-condensed font-bold uppercase text-neutral-300">
                <input
                  type="checkbox"
                  checked={saleOnly}
                  onChange={(e) => setSaleOnly(e.target.checked)}
                  className="accent-[#D71920] w-4 h-4"
                />
                <span>{t('filters.saleOnly')}</span>
              </label>
            </div>
          </aside>

          {/* Product Grid Area */}
          <main className="flex-1">
            <ProductGrid products={filteredProducts} columns={3} />
          </main>
        </div>
      </div>

      {/* Mobile Slide-Out Filter Drawer */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div 
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setIsMobileFilterOpen(false)}
          />
          <div className="relative w-4/5 max-w-sm bg-[#0C0C0C] border-r border-neutral-800 h-full p-5 flex flex-col justify-between overflow-y-auto z-50">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-neutral-800 mb-4">
                <span className="font-bebas text-xl text-white">{t('filters.title')}</span>
                <button onClick={() => setIsMobileFilterOpen(false)}>
                  <X className="w-5 h-5 text-neutral-400" />
                </button>
              </div>

              {/* Subcategories */}
              <div className="mb-4">
                <label className="block text-xs font-condensed font-bold uppercase text-neutral-300 mb-2">
                  {t('filters.subcategories')}
                </label>
                <div className="space-y-1 text-xs text-neutral-400 max-h-40 overflow-y-auto">
                  <button
                    onClick={() => setSelectedSubcategory('all')}
                    className={`block w-full text-left py-1 ${selectedSubcategory === 'all' ? 'text-[#D71920] font-bold' : ''}`}
                  >
                    {t('filters.allSub')}
                  </button>
                  {allSubcategories.map(([dutchKey, locLabel]) => (
                    <button
                      key={dutchKey}
                      onClick={() => setSelectedSubcategory(dutchKey)}
                      className={`block w-full text-left py-1 ${selectedSubcategory === dutchKey ? 'text-[#D71920] font-bold' : ''}`}
                    >
                      {locLabel}
                    </button>
                  ))}
                </div>
              </div>

              {/* Discipline */}
              <div className="mb-4 border-t border-neutral-800 pt-3">
                <label className="block text-xs font-condensed font-bold uppercase text-neutral-300 mb-2">
                  {t('filters.sport')}
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    { id: 'all', label: t('filters.allSub') },
                    { id: 'mma', label: t('discipline.mma') },
                    { id: 'boxing', label: t('discipline.boxing') },
                    { id: 'kickboxing', label: t('discipline.kickboxing') },
                    { id: 'muay-thai', label: t('discipline.muayThai') },
                    { id: 'grappling', label: t('discipline.grappling') }
                  ].map(s => (
                    <button
                      key={s.id}
                      onClick={() => setSelectedSport(s.id)}
                      className={`px-2.5 py-1 text-xs font-mono uppercase border ${selectedSport === s.id ? 'bg-[#D71920] text-white border-[#D71920]' : 'border-neutral-800 text-neutral-400'}`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price slider */}
              <div className="mb-4 border-t border-neutral-800 pt-3">
                <div className="flex justify-between items-center text-xs font-condensed font-bold uppercase text-neutral-300 mb-2">
                  <span>{t('filters.maxPrice')}: €{maxPrice}</span>
                </div>
                <input
                  type="range"
                  min="15"
                  max="250"
                  step="5"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-[#D71920]"
                />
              </div>

              {/* Sale toggle */}
              <div className="border-t border-neutral-800 pt-3">
                <label className="flex items-center gap-2 text-xs font-condensed font-bold uppercase text-neutral-300">
                  <input
                    type="checkbox"
                    checked={saleOnly}
                    onChange={(e) => setSaleOnly(e.target.checked)}
                    className="accent-[#D71920] w-4 h-4"
                  />
                  <span>{t('filters.saleOnly')}</span>
                </label>
              </div>
            </div>

            <div className="pt-4 border-t border-neutral-800 flex gap-2">
              <button
                onClick={resetFilters}
                className="w-1/2 py-2.5 bg-neutral-900 text-neutral-400 text-xs font-condensed font-bold uppercase"
              >
                {t('filters.clear')}
              </button>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-1/2 py-2.5 bg-[#D71920] text-white text-xs font-condensed font-bold uppercase"
              >
                {t('filters.apply')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
