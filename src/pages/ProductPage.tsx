import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { PRODUCTS, getProductBySlug, getLocalizedProduct } from '../data/products';
import { ProductCard } from '../components/commerce/ProductCard';
import { 
  Star, 
  Truck, 
  RotateCcw, 
  ShieldCheck, 
  ChevronDown, 
  ChevronUp, 
  Heart, 
  ShoppingBag, 
  Ruler, 
  Plus, 
  Minus, 
  Check, 
  ArrowRight,
  Flame
} from 'lucide-react';

interface ProductPageProps {
  slug: string;
}

export const ProductPage: React.FC<ProductPageProps> = ({ slug }) => {
  const { 
    addToCart, 
    toggleWishlist, 
    isInWishlist, 
    openSizeGuide, 
    navigate, 
    language,
    t,
    getProductBySlug: storeGetProductBySlug,
    products: storeProducts
  } = useStore();

  const allProducts = storeProducts && storeProducts.length > 0 ? storeProducts : PRODUCTS;
  const rawProduct = (storeGetProductBySlug ? storeGetProductBySlug(slug) : null) || getProductBySlug(slug) || allProducts[0];
  const product = getLocalizedProduct(rawProduct, language);

  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'Standard');
  const [selectedColor, setSelectedColor] = useState<string>(product.colors[0]?.name || 'Standard');
  const [quantity, setQuantity] = useState(1);

  React.useEffect(() => {
    if (rawProduct) {
      setSelectedSize(rawProduct.sizes[0] || 'Standard');
      setSelectedColor(rawProduct.colors[0]?.name || 'Standard');
      setSelectedImageIdx(0);
      setQuantity(1);
    }
  }, [rawProduct.id]);

  // Accordion open states
  const [openAccordions, setOpenAccordions] = useState<Record<string, boolean>>({
    description: true,
    tech: true,
    materials: false,
    shipping: false,
    care: false
  });

  const toggleAccordion = (key: string) => {
    setOpenAccordions(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const inWishlist = isInWishlist(product.id);

  const discountPercent = product.compareAtPrice 
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : null;

  const handleAddToCart = () => {
    addToCart(rawProduct, selectedSize, selectedColor, quantity);
  };

  const handleBuyNow = () => {
    addToCart(rawProduct, selectedSize, selectedColor, quantity);
    navigate('/checkout');
  };

  // Cross sell "COMPLETE YOUR FIGHT KIT"
  const crossSellProducts = allProducts.filter(p => p.id !== product.id).slice(0, 3);

  const shippingAccordionText = language === 'pl'
    ? 'Zamówienia złożone do godziny 16:00 wysyłamy tego samego dnia roboczego za pośrednictwem PostNL lub DHL. Darmowa dostawa od €75 w Holandii i Unii Europejskiej. Zwrot bez podania przyczyny w ciągu 30 dni w oryginalnym opakowaniu z metkami.'
    : language === 'en'
    ? 'Orders placed before 16:00 CET are dispatched same business day via PostNL or DHL Express. Free delivery from €75 across the Netherlands and EU. Hassle-free 30-day returns in original packaging with tags.'
    : 'Bestellingen geplaatst voor 16:00 uur worden op dezelfde werkdag verzonden via PostNL of DHL. Gratis bezorging binnen Nederland en België vanaf €75. Retourneren kan binnen 30 dagen in originele verpakking met aangehechte kaartjes.';

  return (
    <div className="bg-[#050505] min-h-screen text-white pb-20">
      {/* Breadcrumb Navigation */}
      <div className="border-b border-neutral-800 bg-[#0A0A0A] py-3 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs font-mono text-neutral-400">
          <button onClick={() => navigate('/')} className="hover:text-white cursor-pointer">HOME</button>
          <span>/</span>
          <button onClick={() => navigate(`/category/${product.category}`)} className="hover:text-white uppercase cursor-pointer">
            {product.category}
          </button>
          <span>/</span>
          <span className="text-neutral-200 truncate">{product.name}</span>
        </div>
      </div>

      {/* Main PDP Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* ============================================================= */}
          {/* LEFT: ~60% GALLERY (lg:col-span-7) */}
          {/* ============================================================= */}
          <div className="lg:col-span-7 space-y-4">
            {/* Main Stage Image */}
            <div className="relative aspect-[4/5] bg-[#121212] border border-neutral-800 overflow-hidden flex items-center justify-center">
              <img
                src={product.images[selectedImageIdx] || product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-1.5">
                {product.badges.map((b, i) => (
                  <span
                    key={i}
                    className={`text-xs font-condensed font-bold uppercase tracking-wider px-3 py-1 ${
                      b.type === 'sale' ? 'bg-[#D71920] text-white' : 'bg-black/90 text-white border border-neutral-700'
                    }`}
                  >
                    {b.label}
                  </span>
                ))}
              </div>

              {/* Wishlist Button */}
              <button
                onClick={() => toggleWishlist(product.id)}
                aria-label={t('nav.wishlist')}
                className={`absolute top-4 right-4 p-2.5 rounded-full backdrop-blur-md transition-colors cursor-pointer ${
                  inWishlist ? 'bg-[#D71920] text-white' : 'bg-black/60 hover:bg-black text-white'
                }`}
              >
                <Heart className={`w-5 h-5 ${inWishlist ? 'fill-white' : ''}`} />
              </button>
            </div>

            {/* Thumbnail Row */}
            {product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIdx(idx)}
                    className={`w-20 h-24 shrink-0 bg-neutral-900 border-2 overflow-hidden transition-all cursor-pointer ${
                      selectedImageIdx === idx ? 'border-[#D71920] opacity-100' : 'border-neutral-800 opacity-60 hover:opacity-90'
                    }`}
                  >
                    <img src={img} alt={`${product.name} view ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ============================================================= */}
          {/* RIGHT: ~40% STICKY PRODUCT INFO (lg:col-span-5) */}
          {/* ============================================================= */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
            {/* Header info */}
            <div>
              <div className="flex items-center justify-between text-xs text-neutral-400 font-mono uppercase mb-1">
                <span>{product.brand} · {product.subcategory}</span>
                <span className="text-neutral-500">{t('product.sku')}: {product.sku}</span>
              </div>

              <h1 className="font-bebas text-3xl sm:text-4xl text-white tracking-wide leading-tight">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mt-2">
                <div className="flex items-center text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-amber-400' : 'text-neutral-700'}`} 
                    />
                  ))}
                </div>
                <span className="text-xs font-mono font-bold text-white">{product.rating}</span>
                <span className="text-xs text-neutral-400 underline font-mono">
                  ({product.reviewCount} {t('product.reviews')})
                </span>
              </div>
            </div>

            {/* Price block */}
            <div className="flex items-baseline gap-3 p-4 bg-[#0B0B0B] border border-neutral-800">
              <span className="font-mono text-3xl font-bold text-white tabular-nums">
                €{product.price.toFixed(2)}
              </span>
              {product.compareAtPrice && (
                <>
                  <span className="font-mono text-base text-neutral-500 line-through tabular-nums">
                    €{product.compareAtPrice.toFixed(2)}
                  </span>
                  <span className="text-xs font-mono font-bold bg-[#D71920] text-white px-2 py-0.5">
                    {t('product.save')} {discountPercent}%
                  </span>
                </>
              )}
            </div>

            {/* Stock indicator */}
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
              <Check className="w-4 h-4" />
              <span>{t('product.inStockCount', { count: product.stock })}</span>
            </div>

            {/* Direct Poland Supplier Badge */}
            <div className="flex items-center gap-2 px-3 py-1.5 bg-[#0E0E0E] border border-neutral-800 text-[11px] text-neutral-300">
              <ShieldCheck className="w-3.5 h-3.5 text-[#D71920] shrink-0" />
              <span>
                {language === 'pl'
                  ? 'Oryginalny produkt z kontraktu dostawczego Octagon Polska (octagonshop.pl)'
                  : language === 'en'
                  ? 'Authentic product from official Octagon Poland supply contract'
                  : 'Origineel product via officieel leveringscontract Octagon Polen'}
              </span>
            </div>

            {/* Color selection */}
            {product.colors.length > 0 && (
              <div>
                <label className="block text-xs font-condensed font-bold uppercase text-neutral-400 mb-2">
                  {t('product.selectColor')}: <span className="text-white font-mono">{selectedColor}</span>
                </label>
                <div className="flex items-center gap-2.5">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c.name)}
                      className={`w-8 h-8 rounded border-2 transition-all cursor-pointer ${
                        selectedColor === c.name ? 'border-[#D71920] scale-110 shadow-md shadow-red-950/40' : 'border-neutral-700 hover:border-neutral-400'
                      }`}
                      style={{ backgroundColor: c.hex }}
                      title={c.name}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Size selection */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-condensed font-bold uppercase text-neutral-400">
                  {t('product.chooseSize')} <span className="text-white font-mono font-bold">{selectedSize}</span>
                </label>
                <button
                  onClick={() => openSizeGuide(product.category)}
                  className="text-xs text-[#D71920] hover:underline flex items-center gap-1 font-condensed font-bold uppercase cursor-pointer"
                >
                  <Ruler className="w-3.5 h-3.5" /> {t('product.sizeGuide')}
                </button>
              </div>

              <div className="grid grid-cols-4 gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`py-3 text-xs font-mono font-bold border transition-colors cursor-pointer ${
                      selectedSize === s
                        ? 'border-[#D71920] bg-[#D71920] text-white'
                        : 'border-neutral-800 bg-[#121212] text-neutral-300 hover:border-neutral-600'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Stepper & CTA Buttons */}
            <div className="space-y-3 pt-2">
              <div className="flex gap-3">
                {/* Stepper */}
                <div className="flex items-center border border-neutral-700 bg-[#111111] px-2">
                  <button
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="p-2 text-neutral-400 hover:text-white cursor-pointer"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-8 text-center font-mono font-bold text-sm text-white">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(q => q + 1)}
                    className="p-2 text-neutral-400 hover:text-white cursor-pointer"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {/* Add to Cart */}
                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-4 bg-[#D71920] hover:bg-[#b01318] text-white font-condensed font-bold text-sm uppercase tracking-widest flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-lg shadow-red-950/30"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>{t('product.addToCart')}</span>
                </button>
              </div>

              {/* Buy Now Direct */}
              <button
                onClick={handleBuyNow}
                className="w-full py-3.5 bg-[#181818] hover:bg-[#252525] border border-neutral-700 hover:border-neutral-500 text-white font-condensed font-bold text-xs uppercase tracking-widest transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                <span>{t('product.buyNow')}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Trust Assurances */}
            <div className="grid grid-cols-3 gap-2 py-4 border-y border-neutral-800 text-[11px] text-neutral-400">
              <div className="flex flex-col items-center text-center gap-1">
                <Truck className="w-4 h-4 text-[#D71920]" />
                <span>{t('product.postnl24')}</span>
              </div>
              <div className="flex flex-col items-center text-center gap-1">
                <RotateCcw className="w-4 h-4 text-[#D71920]" />
                <span>{t('product.daysReturn')}</span>
              </div>
              <div className="flex flex-col items-center text-center gap-1">
                <ShieldCheck className="w-4 h-4 text-[#D71920]" />
                <span>{t('product.idealSecured')}</span>
              </div>
            </div>

            {/* Accordions */}
            <div className="divide-y divide-neutral-800 border-b border-neutral-800 text-xs">
              {/* Description */}
              <div className="py-3">
                <button
                  onClick={() => toggleAccordion('description')}
                  className="w-full flex items-center justify-between font-condensed font-bold uppercase tracking-wider text-white text-sm cursor-pointer"
                >
                  <span>{t('product.description')}</span>
                  {openAccordions.description ? <ChevronUp className="w-4 h-4 text-[#D71920]" /> : <ChevronDown className="w-4 h-4 text-neutral-500" />}
                </button>
                {openAccordions.description && (
                  <p className="mt-2.5 text-neutral-300 leading-relaxed font-body">
                    {product.description}
                  </p>
                )}
              </div>

              {/* Tech details */}
              {product.technicalDetails && (
                <div className="py-3">
                  <button
                    onClick={() => toggleAccordion('tech')}
                    className="w-full flex items-center justify-between font-condensed font-bold uppercase tracking-wider text-white text-sm cursor-pointer"
                  >
                    <span>{t('product.techDetails')}</span>
                    {openAccordions.tech ? <ChevronUp className="w-4 h-4 text-[#D71920]" /> : <ChevronDown className="w-4 h-4 text-neutral-500" />}
                  </button>
                  {openAccordions.tech && (
                    <ul className="mt-2.5 space-y-1.5 text-neutral-400 list-disc list-inside font-mono">
                      {product.technicalDetails.map((td, i) => (
                        <li key={i}>{td}</li>
                      ))}
                    </ul>
                  )}
                </div>
              )}

              {/* Materials */}
              <div className="py-3">
                <button
                  onClick={() => toggleAccordion('materials')}
                  className="w-full flex items-center justify-between font-condensed font-bold uppercase tracking-wider text-white text-sm cursor-pointer"
                >
                  <span>{t('product.materials')}</span>
                  {openAccordions.materials ? <ChevronUp className="w-4 h-4 text-[#D71920]" /> : <ChevronDown className="w-4 h-4 text-neutral-500" />}
                </button>
                {openAccordions.materials && (
                  <p className="mt-2.5 text-neutral-400 font-mono">
                    {product.material}
                  </p>
                )}
              </div>

              {/* Shipping & Returns */}
              <div className="py-3">
                <button
                  onClick={() => toggleAccordion('shipping')}
                  className="w-full flex items-center justify-between font-condensed font-bold uppercase tracking-wider text-white text-sm cursor-pointer"
                >
                  <span>{t('product.shippingInfo')}</span>
                  {openAccordions.shipping ? <ChevronUp className="w-4 h-4 text-[#D71920]" /> : <ChevronDown className="w-4 h-4 text-neutral-500" />}
                </button>
                {openAccordions.shipping && (
                  <p className="mt-2.5 text-neutral-400 leading-relaxed font-body">
                    {shippingAccordionText}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================= */}
        {/* CROSS SELL: COMPLETE YOUR FIGHT KIT */}
        {/* ============================================================= */}
        <div className="mt-20 pt-12 border-t border-neutral-800">
          <div className="flex items-center gap-2 mb-6">
            <Flame className="w-5 h-5 text-[#D71920]" />
            <h2 className="font-bebas text-2xl sm:text-3xl text-white tracking-wide">
              {t('product.completeKit')}
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
            {crossSellProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Sticky Bottom Buy Bar */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 bg-[#0B0B0B]/98 border-t border-neutral-800 p-3 z-30 backdrop-blur-md flex items-center justify-between gap-3 shadow-2xl">
        <div className="truncate">
          <p className="font-condensed font-bold text-xs text-white truncate">{product.name}</p>
          <p className="font-mono text-sm font-bold text-[#D71920]">€{product.price.toFixed(2)}</p>
        </div>
        <button
          onClick={handleAddToCart}
          className="px-6 py-2.5 bg-[#D71920] text-white font-condensed font-bold text-xs uppercase tracking-wider shrink-0 cursor-pointer"
        >
          {t('product.addToCart')}
        </button>
      </div>
    </div>
  );
};
