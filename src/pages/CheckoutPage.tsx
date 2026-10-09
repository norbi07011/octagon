import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  ShieldCheck, 
  Truck, 
  CreditCard, 
  Lock, 
  Check, 
  ArrowLeft, 
  PackageCheck,
  Building2,
  Printer,
  Download,
  MapPin,
  CheckCircle2,
  AlertCircle,
  FileText,
  X,
  Calendar,
  Sparkles,
  QrCode
} from 'lucide-react';
import { getLocalizedProduct } from '../data/products';
import { IdealPaymentModal, DUTCH_BANKS, DutchBank } from '../components/commerce/IdealPaymentModal';

export const CheckoutPage: React.FC = () => {
  const { 
    cart, 
    subtotal, 
    shippingFee, 
    total, 
    clearCart, 
    navigate, 
    addLoyaltyPoints, 
    addOrder, 
    language, 
    t, 
    showToast 
  } = useStore();

  const [customerType, setCustomerType] = useState<'individual' | 'business'>('business');
  const [promoCode, setPromoCode] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);
  const [promoError, setPromoError] = useState('');
  const [orderComplete, setOrderComplete] = useState(false);
  const [generatedOrderNumber, setGeneratedOrderNumber] = useState('');
  const [generatedTrackingCode, setGeneratedTrackingCode] = useState('');
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [showIdealModal, setShowIdealModal] = useState(false);
  const [idealDetails, setIdealDetails] = useState<{
    transactionId: string;
    bankName: string;
    structuredReference: string;
  } | null>(null);
  const [completedOrderItems, setCompletedOrderItems] = useState<any[]>([]);
  const [poNumber, setPoNumber] = useState('');
  const [suggestedDutchCity, setSuggestedDutchCity] = useState('');

  // Customer & Dutch Business Details
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    
    // Business fields
    companyName: '',
    kvkNumber: '',
    vatNumber: '',
    attentionTo: '',
    differentInvoiceAddress: false,
    invoiceStreet: '',
    invoiceHouseNumber: '',
    invoicePostalCode: '',
    invoiceCity: '',

    // Dutch delivery address
    street: '',
    houseNumber: '',
    houseAddition: '',
    postalCode: '',
    city: '',
    country: 'Nederland',
    deliveryMethod: 'postnl_home', // postnl_home | postnl_pickup | dhl_evening
    pickupPoint: 'Albert Heijn Rozengracht (PostNL Pakketpunt) - 0.4 km',
    
    // Dutch payments
    paymentMethod: 'ideal', // ideal | bancontact | klarna | card | b2b_invoice | applepay
    idealBank: 'rabobank',
    cardName: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
    notes: ''
  });

  const dutchBanks = DUTCH_BANKS;

  const pickupLocations = [
    'Albert Heijn Rozengracht (PostNL Pakketpunt) - 0.4 km',
    'Primera Kinkerstraat (PostNL Pakketpunt) - 0.8 km',
    'Jumbo Westermarkt (PostNL Pakketpunt) - 1.1 km',
    'Gamma Amsterdam West (PostNL Pakketpunt & Lockers) - 1.4 km'
  ];

  // Lookup Dutch Postal code to automatically suggest and auto-fill city
  const lookupDutchPostalCode = (pc: string) => {
    const clean = pc.trim().toUpperCase().replace(/\s/g, '');
    if (clean.length >= 4) {
      const digits = parseInt(clean.slice(0, 4), 10);
      if (digits >= 1000 && digits <= 1109) return 'Amsterdam';
      if (digits >= 1110 && digits <= 1119) return 'Diemen';
      if (digits >= 1180 && digits <= 1189) return 'Amstelveen';
      if (digits >= 2000 && digits <= 2039) return 'Haarlem';
      if (digits >= 2500 && digits <= 2599) return 'Den Haag';
      if (digits >= 2600 && digits <= 2629) return 'Delft';
      if (digits >= 3000 && digits <= 3089) return 'Rotterdam';
      if (digits >= 3500 && digits <= 3585) return 'Utrecht';
      if (digits >= 4800 && digits <= 4839) return 'Breda';
      if (digits >= 5000 && digits <= 5049) return 'Tilburg';
      if (digits >= 5600 && digits <= 5658) return 'Eindhoven';
      if (digits >= 6500 && digits <= 6546) return 'Nijmegen';
      if (digits >= 6800 && digits <= 6846) return 'Arnhem';
      if (digits >= 7300 && digits <= 7336) return 'Apeldoorn';
      if (digits >= 7500 && digits <= 7548) return 'Enschede';
      if (digits >= 8000 && digits <= 8045) return 'Zwolle';
      if (digits >= 9700 && digits <= 9747) return 'Groningen';
    }
    return '';
  };

  // Auto format Dutch postal code (e.g. 1015CR -> 1015 CR) & auto detect city
  const handlePostalCodeChange = (val: string) => {
    let clean = val.toUpperCase().replace(/[^0-9A-Z]/g, '');
    if (clean.length > 4 && !clean.includes(' ')) {
      clean = clean.slice(0, 4) + ' ' + clean.slice(4, 6);
    }
    const formatted = clean.slice(0, 7);
    const detectedCity = lookupDutchPostalCode(formatted);
    setSuggestedDutchCity(detectedCity);

    setFormData(prev => ({ 
      ...prev, 
      postalCode: formatted,
      city: (!prev.city || prev.city === 'Amsterdam' || prev.city === 'Rotterdam' || prev.city === 'Utrecht') && detectedCity ? detectedCity : prev.city
    }));
  };

  // Auto clean KvK number (8 digits)
  const handleKvkChange = (val: string) => {
    const clean = val.replace(/[^0-9]/g, '').slice(0, 8);
    setFormData(prev => ({ ...prev, kvkNumber: clean }));
  };

  // Auto format Dutch BTW number (NL...B01)
  const handleVatChange = (val: string) => {
    let clean = val.toUpperCase().replace(/\s/g, '');
    if (!clean.startsWith('NL') && clean.length > 0 && customerType === 'business') {
      clean = 'NL' + clean;
    }
    setFormData(prev => ({ ...prev, vatNumber: clean }));
  };

  const handleApplyPromo = () => {
    if (promoCode.trim().toUpperCase() === 'OCTAGON10') {
      setDiscountAmount(10);
      setPromoError('');
      showToast('Kortingscode OCTAGON10 toegepast (-€10)');
    } else if (promoCode.trim().toUpperCase() === 'FIGHTCLUB') {
      setDiscountAmount(15);
      setPromoError('');
      showToast('Kortingscode FIGHTCLUB toegepast (-€15)');
    } else {
      setPromoError(language === 'pl' ? 'Nieprawidłowy kod promocyjny' : t('checkout.invalidCode'));
    }
  };

  // Shipping fee calculation based on delivery method
  const effectiveShippingFee = shippingFee === 0 
    ? 0 
    : formData.deliveryMethod === 'dhl_evening' ? 7.90 : shippingFee;

  const finalTotal = Math.max(0, Number((subtotal + effectiveShippingFee - discountAmount).toFixed(2)));
  const subtotalExclVat = Number((finalTotal / 1.21).toFixed(2));
  const vatAmount = Number((finalTotal - subtotalExclVat).toFixed(2));

  const handlePlaceOrder = () => {
    // Validation
    if (!formData.email || !formData.email.includes('@')) {
      showToast(language === 'pl' ? 'Wprowadź prawidłowy adres e-mail' : 'Vul een geldig e-mailadres in');
      return;
    }
    if (customerType === 'business') {
      if (!formData.companyName) {
        showToast(language === 'pl' ? 'Wprowadź oficjalną nazwę firmy' : 'Vul officiële bedrijfsnaam in');
        return;
      }
      if (formData.kvkNumber.length !== 8) {
        showToast(language === 'pl' ? 'Numer KvK musi składać się z dokładnie 8 cyfr' : 'KvK-nummer moet exact 8 cijfers bevatten');
        return;
      }
    }
    if (!formData.street || !formData.houseNumber || !formData.city) {
      showToast(language === 'pl' ? 'Wprowadź kompletny adres dostawy w Holandii' : 'Vul het volledige bezorgadres in');
      return;
    }

    const orderNum = generatedOrderNumber || `OCT-NL-2026-${Math.floor(10000 + Math.random() * 90000)}`;
    const trackCode = generatedTrackingCode || `3S-OCTA-${Math.floor(1000000 + Math.random() * 9000000)}-NL`;
    
    setGeneratedOrderNumber(orderNum);
    setGeneratedTrackingCode(trackCode);
    setCompletedOrderItems([...cart]);

    // If iDEAL payment selected: trigger interactive iDEAL Gateway Modal!
    if (formData.paymentMethod === 'ideal') {
      setShowIdealModal(true);
      return;
    }

    // Otherwise finalize directly (e.g. B2B Factuur op rekening, Klarna, Bancontact)
    finalizeOrder(orderNum, trackCode);
  };

  const finalizeOrder = (
    orderNum: string,
    trackCode: string,
    idealPaymentInfo?: { transactionId: string; bankName: string; structuredReference: string }
  ) => {
    const itemsToSave = cart.length > 0 ? [...cart] : completedOrderItems;

    // Save order into state & history
    const newOrder = {
      id: orderNum,
      orderNumber: orderNum,
      date: new Date().toLocaleDateString('nl-NL', { day: 'numeric', month: 'short', year: 'numeric' }),
      total: finalTotal,
      subtotalExclVat,
      vatAmount,
      status: formData.paymentMethod === 'b2b_invoice' ? 'b2b_pending_30d' : 'confirmed',
      carrier: formData.deliveryMethod === 'postnl_pickup'
        ? `PostNL Pakketpunt (${formData.pickupPoint}) - ${trackCode}`
        : `PostNL 24h Express (${trackCode})`,
      paymentMethod: formData.paymentMethod === 'ideal'
        ? `iDEAL (${idealPaymentInfo?.bankName || formData.idealBank.toUpperCase()})`
        : formData.paymentMethod === 'b2b_invoice'
        ? 'B2B FACTUUR (30 DAGEN)'
        : formData.paymentMethod.toUpperCase(),
      transactionId: idealPaymentInfo?.transactionId,
      structuredReference: idealPaymentInfo?.structuredReference,
      isBusinessOrder: customerType === 'business',
      companyName: formData.companyName,
      kvkNumber: formData.kvkNumber,
      vatNumber: formData.vatNumber,
      poNumber: poNumber,
      items: itemsToSave,
      shippingAddress: {
        name: customerType === 'business' 
          ? `${formData.companyName} (t.a.v. ${formData.attentionTo || `${formData.firstName} ${formData.lastName}`})` 
          : `${formData.firstName} ${formData.lastName}`,
        street: `${formData.street} ${formData.houseNumber} ${formData.houseAddition}`.trim(),
        postalCode: formData.postalCode,
        city: formData.city,
        country: formData.country
      },
      invoiceAddress: formData.differentInvoiceAddress ? {
        street: `${formData.invoiceStreet} ${formData.invoiceHouseNumber}`.trim(),
        postalCode: formData.invoicePostalCode,
        city: formData.invoiceCity,
        country: formData.country
      } : null
    };

    addOrder(newOrder);
    addLoyaltyPoints(Math.floor(finalTotal));
    setOrderComplete(true);
    clearCart();
  };

  const handleIdealSuccess = (details: {
    transactionId: string;
    bank: DutchBank;
    paidAmount: number;
    structuredReference: string;
  }) => {
    setIdealDetails({
      transactionId: details.transactionId,
      bankName: details.bank.name,
      structuredReference: details.structuredReference
    });
    setShowIdealModal(false);
    finalizeOrder(generatedOrderNumber, generatedTrackingCode, {
      transactionId: details.transactionId,
      bankName: details.bank.name,
      structuredReference: details.structuredReference
    });
  };

  // =========================================================================
  // ORDER COMPLETE CONFIRMATION & INVOICE SCREEN
  // =========================================================================
  if (orderComplete) {
    return (
      <div className="bg-[#050505] min-h-screen text-white py-16 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto bg-[#0C0C0C] border border-neutral-800 p-8 sm:p-10 text-center space-y-6 shadow-2xl relative">
          <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
            <PackageCheck className="w-9 h-9" />
          </div>

          <div>
            <span className="text-xs font-mono uppercase text-[#D71920] tracking-widest block font-bold">
              {formData.paymentMethod === 'b2b_invoice' 
                ? (language === 'pl' ? 'ZAMÓWIENIE B2B NA FAKTURĘ (30 DNI)' : 'BESTELLING OP REKENING (30 DAGEN)')
                : `${t('checkout.paidVia')} ${formData.paymentMethod === 'ideal' ? `iDEAL (${formData.idealBank.toUpperCase()})` : formData.paymentMethod.toUpperCase()}`}
            </span>
            <h1 className="font-bebas text-4xl sm:text-6xl text-white mt-1">
              {language === 'pl' ? 'DZIĘKUJEMY ZA ZAMÓWIENIE!' : t('checkout.thanks')}
            </h1>
            {customerType === 'business' && (
              <p className="text-xs font-mono text-emerald-400 mt-1">
                ✓ Zakelijke B2B bestelling voor {formData.companyName} (KvK: {formData.kvkNumber})
              </p>
            )}
          </div>

          {/* Dutch Order & PostNL Tracking Summary Card */}
          <div className="p-5 bg-[#141414] border border-neutral-800 text-left font-mono text-xs space-y-2.5">
            <div className="flex justify-between items-center pb-2 border-b border-neutral-800">
              <span className="text-neutral-400">{t('checkout.orderNumber')}:</span>
              <span className="text-white font-bold text-sm text-[#D71920]">{generatedOrderNumber}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-neutral-400">PostNL Track & Trace:</span>
              <span className="text-emerald-400 font-bold">{generatedTrackingCode}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-neutral-400">Bezorgmethode:</span>
              <span className="text-white">
                {formData.deliveryMethod === 'postnl_pickup' ? 'PostNL Pakketpunt (Afhalen)' : 'PostNL Thuisbezorgd (Morgen in huis)'}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-neutral-400">Bezorgadres:</span>
              <span className="text-white text-right truncate max-w-xs">
                {formData.street} {formData.houseNumber} {formData.houseAddition}, {formData.postalCode} {formData.city}
              </span>
            </div>
            {customerType === 'business' && (
              <>
                <div className="flex justify-between items-center">
                  <span className="text-neutral-400">KvK-nummer:</span>
                  <span className="text-white">{formData.kvkNumber}</span>
                </div>
                {formData.vatNumber && (
                  <div className="flex justify-between items-center">
                    <span className="text-neutral-400">BTW-identificatienummer:</span>
                    <span className="text-white">{formData.vatNumber}</span>
                  </div>
                )}
              </>
            )}
            <div className="flex justify-between border-t border-neutral-800 pt-2 font-bold text-sm">
              <span className="text-neutral-300">Totaal (incl. 21% BTW):</span>
              <span className="text-[#D71920]">€{finalTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-[11px] text-neutral-500 pt-1">
              <span>Waarvan 21% BTW (Omzetbelasting):</span>
              <span>€{vatAmount.toFixed(2)}</span>
            </div>
          </div>

          <p className="text-xs text-neutral-400 leading-relaxed font-body">
            {language === 'pl'
              ? `Potwierdzenie zamówienia oraz oficjalną fakturę z numerem KvK i specyfikacją 21% BTW wysłaliśmy na adres ${formData.email}. Paczka zostanie nadana z magazynu Octagon przez PostNL.`
              : `We hebben de orderbevestiging en officiële BTW-factuur verzonden naar ${formData.email}. Zodra PostNL het pakket scant, ontvang je direct de actieve Track & Trace notificatie.`}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={() => setShowInvoiceModal(true)}
              className="flex-1 py-3.5 bg-neutral-800 hover:bg-neutral-700 text-white font-condensed font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-colors border border-neutral-700"
            >
              <FileText className="w-4 h-4 text-[#D71920]" />
              <span>{language === 'pl' ? 'Pobierz / Zobacz Fakturę BTW' : 'Bekijk & Download BTW-Factuur'}</span>
            </button>
            <button
              onClick={() => navigate('/order-tracking')}
              className="flex-1 py-3.5 bg-[#D71920] hover:bg-[#b01318] text-white font-condensed font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-lg shadow-red-950"
            >
              <Truck className="w-4 h-4" />
              <span>{language === 'pl' ? 'Śledź Przesyłkę w PostNL' : 'Traceer met PostNL'}</span>
            </button>
          </div>

          <div>
            <button
              onClick={() => navigate('/')}
              className="text-xs text-neutral-400 hover:text-white underline font-mono cursor-pointer"
            >
              {language === 'pl' ? 'Wróć do sklepu' : 'Terug naar de webshop'}
            </button>
          </div>
        </div>

        {/* ============================================================= */}
        {/* OFFICIAL DUTCH B2B TAX INVOICE (BTW-FACTUUR) MODAL */}
        {/* ============================================================= */}
        {showInvoiceModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm overflow-y-auto">
            <div className="relative w-full max-w-2xl bg-white text-black p-8 sm:p-10 shadow-2xl my-8 font-sans">
              {/* Close Button */}
              <button
                onClick={() => setShowInvoiceModal(false)}
                className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-black cursor-pointer print:hidden"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Invoice Header */}
              <div className="flex justify-between items-start border-b border-neutral-300 pb-6 mb-6">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bebas text-3xl tracking-wide text-[#D71920]">OCTAGON SPORT BENELUX</span>
                  </div>
                  <p className="text-xs text-neutral-600 mt-1">
                    Octagon Fight Gear Benelux B.V.<br />
                    Keizersgracht 42A, 1015 CR Amsterdam<br />
                    KvK: 84920192 | BTW-id: NL849201928B01<br />
                    IBAN: NL91 ABNA 0412 8492 01 | BIC: ABNANL2A
                  </p>
                </div>

                <div className="text-right">
                  <span className="font-bebas text-2xl tracking-wider text-black block">BTW-FACTUUR</span>
                  <span className="text-xs font-mono font-bold block mt-1">Factuurnummer: {generatedOrderNumber}</span>
                  <span className="text-xs text-neutral-600 block">Factuurdatum: {new Date().toLocaleDateString('nl-NL')}</span>
                  <span className="text-xs text-neutral-600 block">Vervaldatum: 30 dagen</span>
                </div>
              </div>

              {/* Invoice Parties */}
              <div className="grid grid-cols-2 gap-6 text-xs mb-6">
                <div className="p-3 bg-neutral-100 border border-neutral-200">
                  <span className="font-bold uppercase text-[10px] text-neutral-500 block mb-1">Gefactureerd aan:</span>
                  <p className="font-bold text-sm">
                    {customerType === 'business' ? formData.companyName : `${formData.firstName} ${formData.lastName}`}
                  </p>
                  {customerType === 'business' && (
                    <>
                      <p className="font-mono text-neutral-700">KvK: {formData.kvkNumber || 'N/A'}</p>
                      {formData.vatNumber && <p className="font-mono text-neutral-700">BTW: {formData.vatNumber}</p>}
                      {formData.attentionTo && <p className="text-neutral-600">T.a.v.: {formData.attentionTo}</p>}
                    </>
                  )}
                  <p className="text-neutral-700 mt-1">
                    {formData.street} {formData.houseNumber} {formData.houseAddition}<br />
                    {formData.postalCode} {formData.city}, {formData.country}
                  </p>
                </div>

                <div className="p-3 bg-neutral-100 border border-neutral-200">
                  <span className="font-bold uppercase text-[10px] text-neutral-500 block mb-1">Verzending & Betaling:</span>
                  <p className="text-neutral-700">
                    <strong>Vervoerder:</strong> PostNL 24h Express<br />
                    <strong>Track & Trace:</strong> <span className="font-mono">{generatedTrackingCode}</span><br />
                    <strong>Betaalwijze:</strong> {formData.paymentMethod === 'b2b_invoice' ? 'Factuur / Op Rekening (30 dagen)' : formData.paymentMethod.toUpperCase()}<br />
                    <strong>Status:</strong> {formData.paymentMethod === 'b2b_invoice' ? 'Factuur te voldoen binnen 30d' : 'Voldaan via iDEAL / PSP'}
                  </p>
                </div>
              </div>

              {/* Items Table */}
              <table className="w-full text-left text-xs border-collapse mb-6">
                <thead>
                  <tr className="border-b-2 border-black text-[11px] font-bold uppercase">
                    <th className="py-2">Omschrijving</th>
                    <th className="py-2 text-center">Aantal</th>
                    <th className="py-2 text-right">Prijs excl. BTW</th>
                    <th className="py-2 text-center">BTW</th>
                    <th className="py-2 text-right">Totaal incl. BTW</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200">
                  {(completedOrderItems.length > 0 ? completedOrderItems : cart).map((item, idx) => {
                    const itemLoc = getLocalizedProduct(item.product, language);
                    const lineTotal = item.product.price * item.quantity;
                    const lineExcl = lineTotal / 1.21;
                    return (
                      <tr key={idx}>
                        <td className="py-2.5">
                          <span className="font-bold text-black">{itemLoc.name}</span>
                          <span className="text-[11px] text-neutral-600 block font-mono">
                            SKU: {item.product.sku || item.product.id} · Maat: {item.selectedSize} · Kleur: {item.selectedColor}
                          </span>
                        </td>
                        <td className="py-2.5 text-center font-mono">{item.quantity}</td>
                        <td className="py-2.5 text-right font-mono">€{lineExcl.toFixed(2)}</td>
                        <td className="py-2.5 text-center font-mono">21%</td>
                        <td className="py-2.5 text-right font-mono font-bold">€{lineTotal.toFixed(2)}</td>
                      </tr>
                    );
                  })}
                  {effectiveShippingFee > 0 && (
                    <tr>
                      <td className="py-2.5">
                        <span className="font-bold">PostNL Express Levering</span>
                        <span className="text-[11px] text-neutral-600 block font-mono">Binnenlandse bezorging Nederland</span>
                      </td>
                      <td className="py-2.5 text-center font-mono">1</td>
                      <td className="py-2.5 text-right font-mono">€{(effectiveShippingFee / 1.21).toFixed(2)}</td>
                      <td className="py-2.5 text-center font-mono">21%</td>
                      <td className="py-2.5 text-right font-mono font-bold">€{effectiveShippingFee.toFixed(2)}</td>
                    </tr>
                  )}
                </tbody>
              </table>

              {/* Totals Breakdown */}
              <div className="border-t border-neutral-300 pt-4 flex justify-end mb-6 text-xs">
                <div className="w-64 space-y-1.5 font-mono">
                  <div className="flex justify-between text-neutral-700">
                    <span>Subtotaal excl. BTW:</span>
                    <span>€{subtotalExclVat.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-neutral-700">
                    <span>21% BTW (Omzetbelasting):</span>
                    <span>€{vatAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-neutral-700">
                    <span>Verzendkosten PostNL:</span>
                    <span>€{effectiveShippingFee.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-black border-t-2 border-black pt-2">
                    <span>TOTAAL TE VOLDOEN:</span>
                    <span>€{finalTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Footer Notice */}
              <div className="border-t border-neutral-300 pt-4 text-[11px] text-neutral-500 flex justify-between items-center print:hidden">
                <span>Officiële factuur conform Nederlandse Belastingdienst richtlijnen.</span>
                <button
                  onClick={() => window.print()}
                  className="px-4 py-2 bg-black hover:bg-neutral-800 text-white font-bold text-xs uppercase flex items-center gap-1.5 cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Afdrukken / Opslaan als PDF</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // =========================================================================
  // MAIN CHECKOUT FORM & PAYMENT SELECTION
  // =========================================================================
  return (
    <div className="bg-[#050505] min-h-screen text-white pb-20">
      {/* Checkout Top Bar */}
      <div className="border-b border-neutral-800 bg-[#080808] py-4 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white font-mono uppercase cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" /> {t('checkout.backShop')}
          </button>

          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-[#141414] border border-[#D71920] flex items-center justify-center">
              <span className="font-bebas text-sm text-[#D71920]">O</span>
            </div>
            <span className="font-bebas text-xl text-white">OCTAGON CHECKOUT</span>
          </div>

          <div className="flex items-center gap-2 text-xs text-emerald-400 font-mono">
            <Lock className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">256-bit SSL · Nederlandse Belastingdienst OK</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT: Checkout Form Steps (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">

            {/* Step 1: Customer Type & Address */}
            <div className="bg-[#0C0C0C] border border-neutral-800 p-6 shadow-xl">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-800 mb-5">
                <h2 className="font-bebas text-2xl text-white tracking-wider flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#D71920] text-white text-xs flex items-center justify-center font-mono font-bold">1</span>
                  {language === 'pl' ? 'DANE ZAMAWIAJĄCEGO I ADRES W HOLANDII' : 'KLANT- & FACTUURGEGEVENS'}
                </h2>
                <span className="text-[11px] font-mono text-neutral-400">
                  {customerType === 'business' ? 'Zakelijke Bestelling (B2B)' : 'Particuliere Bestelling'}
                </span>
              </div>

              {/* Customer Type Toggle (Consumer vs Dutch Business) */}
              <div className="grid grid-cols-2 gap-3 mb-6 p-1 bg-[#141414] border border-neutral-800">
                <button
                  type="button"
                  onClick={() => setCustomerType('individual')}
                  className={`py-2.5 text-xs font-condensed font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                    customerType === 'individual'
                      ? 'bg-[#D71920] text-white shadow'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  {language === 'pl' ? 'Klient Indywidualny' : 'Particulier'}
                </button>
                <button
                  type="button"
                  onClick={() => setCustomerType('business')}
                  className={`py-2.5 text-xs font-condensed font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                    customerType === 'business'
                      ? 'bg-[#D71920] text-white shadow'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  <Building2 className="w-3.5 h-3.5" />
                  <span>{language === 'pl' ? 'Holenderska Firma / B2B' : 'Zakelijk / Bedrijf (KvK)'}</span>
                </button>
              </div>

              <div className="space-y-4">
                {/* Email Address */}
                <div>
                  <label className="block text-[11px] font-mono uppercase text-neutral-300 mb-1">
                    {t('checkout.email')} *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    placeholder="inkoop@vechtsportschool.nl"
                    className="w-full bg-[#141414] border border-neutral-700 px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#D71920]"
                  />
                  <span className="text-[10px] text-neutral-500 mt-0.5 block">
                    {language === 'pl' ? 'Na ten adres wyślemy kod Track & Trace PostNL oraz fakturę VAT.' : 'Hierop ontvang je de PostNL Track & Trace en BTW-factuur.'}
                  </span>
                </div>

                {/* Business Specific Fields (KvK, BTW, Bedrijfsnaam) */}
                {customerType === 'business' && (
                  <div className="p-4 bg-[#111111] border border-neutral-800 space-y-3.5">
                    <div className="flex items-center gap-1.5 text-xs font-mono text-[#D71920] font-bold uppercase pb-1 border-b border-neutral-800">
                      <Building2 className="w-4 h-4" />
                      <span>{language === 'pl' ? 'DANE HOLENDERSKIEGO PRZEDSIĘBIORSTWA (B2B)' : 'NEDERLANDSE BEDRIJFSGEGEVENS (KVK & BTW)'}</span>
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono uppercase text-neutral-300 mb-1">
                        {language === 'pl' ? 'Oficjalna Nazwa Firmy (Bedrijfsnaam) *' : 'Officiële Bedrijfsnaam *'}
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.companyName}
                        onChange={e => setFormData({ ...formData, companyName: e.target.value })}
                        placeholder="Fight Academy Amsterdam B.V."
                        className="w-full bg-[#161616] border border-neutral-700 px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D71920]"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <label className="text-[11px] font-mono uppercase text-neutral-300">
                            {language === 'pl' ? 'Numer KvK (Holenderska Izba Handlowa) *' : 'KvK-nummer (8 cijfers) *'}
                          </label>
                          {formData.kvkNumber.length === 8 && (
                            <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-0.5">
                              <CheckCircle2 className="w-3 h-3" /> Geldig formaat
                            </span>
                          )}
                        </div>
                        <input
                          type="text"
                          required
                          value={formData.kvkNumber}
                          onChange={e => handleKvkChange(e.target.value)}
                          placeholder="84920192"
                          maxLength={8}
                          className="w-full bg-[#161616] border border-neutral-700 px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-[#D71920]"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-mono uppercase text-neutral-300 mb-1">
                          {language === 'pl' ? 'Numer BTW / NIP (NL...B01)' : 'BTW-identificatienummer'}
                        </label>
                        <input
                          type="text"
                          value={formData.vatNumber}
                          onChange={e => handleVatChange(e.target.value)}
                          placeholder="NL849201928B01"
                          className="w-full bg-[#161616] border border-neutral-700 px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-[#D71920]"
                        />
                      </div>
                    </div>

                    {/* PO Number & Attention To */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-neutral-800">
                      <div>
                        <label className="block text-[11px] font-mono uppercase text-neutral-300 mb-1">
                          {language === 'pl' ? 'Numer Zamówienia B2B / Referencja (PO Number)' : 'Inkoopordernummer / PO-referentie (optioneel)'}
                        </label>
                        <input
                          type="text"
                          value={poNumber}
                          onChange={e => setPoNumber(e.target.value)}
                          placeholder="PO-2026-OCTA-01"
                          className="w-full bg-[#161616] border border-neutral-700 px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-[#D71920]"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-mono uppercase text-neutral-300 mb-1">
                          {language === 'pl' ? 'Osoba kontaktowa / Dział (t.a.v.)' : 'T.a.v. Afdeling / Contactpersoon'}
                        </label>
                        <input
                          type="text"
                          value={formData.attentionTo}
                          onChange={e => setFormData({ ...formData, attentionTo: e.target.value })}
                          placeholder="Afdeling Inkoop / Trainer"
                          className="w-full bg-[#161616] border border-neutral-700 px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D71920]"
                        />
                      </div>
                    </div>

                    {/* Separate Billing Address Toggle */}
                    <div className="pt-2 border-t border-neutral-800">
                      <label className="flex items-center gap-2 cursor-pointer text-xs text-neutral-300">
                        <input
                          type="checkbox"
                          checked={formData.differentInvoiceAddress}
                          onChange={e => setFormData({ ...formData, differentInvoiceAddress: e.target.checked })}
                          className="accent-[#D71920]"
                        />
                        <span>Afwijkend factuuradres (indien kantoor afwijkt van bezorglocatie sportschool)</span>
                      </label>
                      {formData.differentInvoiceAddress && (
                        <div className="grid grid-cols-12 gap-3 mt-3 p-3 bg-[#181818] border border-neutral-700">
                          <div className="col-span-8">
                            <label className="block text-[10px] font-mono text-neutral-400 mb-1">Factuur Straat</label>
                            <input
                              type="text"
                              value={formData.invoiceStreet}
                              onChange={e => setFormData({ ...formData, invoiceStreet: e.target.value })}
                              placeholder="Herengracht"
                              className="w-full bg-[#121212] border border-neutral-700 px-2 py-1.5 text-xs text-white"
                            />
                          </div>
                          <div className="col-span-4">
                            <label className="block text-[10px] font-mono text-neutral-400 mb-1">Huisnummer</label>
                            <input
                              type="text"
                              value={formData.invoiceHouseNumber}
                              onChange={e => setFormData({ ...formData, invoiceHouseNumber: e.target.value })}
                              placeholder="120"
                              className="w-full bg-[#121212] border border-neutral-700 px-2 py-1.5 text-xs text-white"
                            />
                          </div>
                          <div className="col-span-6">
                            <label className="block text-[10px] font-mono text-neutral-400 mb-1">Factuur Postcode</label>
                            <input
                              type="text"
                              value={formData.invoicePostalCode}
                              onChange={e => setFormData({ ...formData, invoicePostalCode: e.target.value })}
                              placeholder="1015 BT"
                              className="w-full bg-[#121212] border border-neutral-700 px-2 py-1.5 text-xs text-white"
                            />
                          </div>
                          <div className="col-span-6">
                            <label className="block text-[10px] font-mono text-neutral-400 mb-1">Factuur Plaats</label>
                            <input
                              type="text"
                              value={formData.invoiceCity}
                              onChange={e => setFormData({ ...formData, invoiceCity: e.target.value })}
                              placeholder="Amsterdam"
                              className="w-full bg-[#121212] border border-neutral-700 px-2 py-1.5 text-xs text-white"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Contact Person Name */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-mono uppercase text-neutral-400 mb-1">
                      {t('checkout.firstName')} *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={e => setFormData({ ...formData, firstName: e.target.value })}
                      placeholder="Lars"
                      className="w-full bg-[#141414] border border-neutral-700 px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D71920]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono uppercase text-neutral-400 mb-1">
                      {t('checkout.lastName')} *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.lastName}
                      onChange={e => setFormData({ ...formData, lastName: e.target.value })}
                      placeholder="de Boer"
                      className="w-full bg-[#141414] border border-neutral-700 px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D71920]"
                    />
                  </div>
                </div>

                {/* Dutch Address Fields (Straat + Huisnummer + Toevoeging) */}
                <div className="grid grid-cols-12 gap-3">
                  <div className="col-span-7">
                    <label className="block text-[11px] font-mono uppercase text-neutral-400 mb-1">
                      {t('checkout.street')} *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.street}
                      onChange={e => setFormData({ ...formData, street: e.target.value })}
                      placeholder="Keizersgracht"
                      className="w-full bg-[#141414] border border-neutral-700 px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D71920]"
                    />
                  </div>
                  <div className="col-span-3">
                    <label className="block text-[11px] font-mono uppercase text-neutral-400 mb-1">
                      {t('checkout.houseNr')} *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.houseNumber}
                      onChange={e => setFormData({ ...formData, houseNumber: e.target.value })}
                      placeholder="42"
                      className="w-full bg-[#141414] border border-neutral-700 px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D71920]"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-[11px] font-mono uppercase text-neutral-400 mb-1">
                      Toev.
                    </label>
                    <input
                      type="text"
                      value={formData.houseAddition}
                      onChange={e => setFormData({ ...formData, houseAddition: e.target.value })}
                      placeholder="A / bis"
                      className="w-full bg-[#141414] border border-neutral-700 px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D71920]"
                    />
                  </div>
                </div>

                {/* Postal Code (Format 1234 AB) & City & Country */}
                <div className="grid grid-cols-12 gap-3">
                  <div className="col-span-4">
                    <label className="block text-[11px] font-mono uppercase text-neutral-400 mb-1">
                      Postcode (NL) *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.postalCode}
                      onChange={e => handlePostalCodeChange(e.target.value)}
                      placeholder="1015 CR"
                      className="w-full bg-[#141414] border border-neutral-700 px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-[#D71920]"
                    />
                    {suggestedDutchCity && (
                      <span className="text-[10px] text-emerald-400 font-mono mt-1 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 shrink-0" />
                        <span>Regio: {suggestedDutchCity}</span>
                      </span>
                    )}
                  </div>
                  <div className="col-span-4">
                    <label className="block text-[11px] font-mono uppercase text-neutral-400 mb-1">
                      {t('checkout.city')} *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={e => setFormData({ ...formData, city: e.target.value })}
                      placeholder="Amsterdam"
                      className="w-full bg-[#141414] border border-neutral-700 px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D71920]"
                    />
                  </div>
                  <div className="col-span-4">
                    <label className="block text-[11px] font-mono uppercase text-neutral-400 mb-1">
                      {t('checkout.country')}
                    </label>
                    <select
                      value={formData.country}
                      onChange={e => setFormData({ ...formData, country: e.target.value })}
                      className="w-full bg-[#141414] border border-neutral-700 px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D71920]"
                    >
                      <option value="Nederland">Nederland</option>
                      <option value="België">België</option>
                      <option value="Polen">Polska / Poland</option>
                      <option value="Duitsland">Deutschland</option>
                    </select>
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-[11px] font-mono uppercase text-neutral-400 mb-1">
                    {t('checkout.phone')} (voor PostNL bezorgsms)
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+31 6 12345678"
                    className="w-full bg-[#141414] border border-neutral-700 px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D71920]"
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Dutch Delivery Logistics (PostNL & DHL) */}
            <div className="bg-[#0C0C0C] border border-neutral-800 p-6 shadow-xl">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-800 mb-4">
                <h2 className="font-bebas text-2xl text-white tracking-wider flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#D71920] text-white text-xs flex items-center justify-center font-mono font-bold">2</span>
                  {language === 'pl' ? 'OPCJA DOSTAWY POSTNL / DHL (HOLANDIA)' : 'BEZORGING IN NEDERLAND'}
                </h2>
                <span className="text-[11px] font-mono text-emerald-400">
                  Direct vanuit EU Magazijn
                </span>
              </div>

              <div className="space-y-3">
                {/* PostNL Thuisbezorgd */}
                <label className={`block p-4 border cursor-pointer transition-colors ${
                  formData.deliveryMethod === 'postnl_home' ? 'border-[#D71920] bg-neutral-900' : 'border-neutral-800 bg-[#121212]'
                }`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="delivery"
                        checked={formData.deliveryMethod === 'postnl_home'}
                        onChange={() => setFormData({ ...formData, deliveryMethod: 'postnl_home' })}
                        className="accent-[#D71920]"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-condensed font-bold uppercase text-white text-sm">
                            PostNL Thuisbezorging (Volgende Werkdag)
                          </p>
                          <span className="px-1.5 py-0.2 bg-amber-500/20 text-amber-400 text-[10px] font-mono font-bold">
                            POPULAIR
                          </span>
                        </div>
                        <p className="text-[11px] text-neutral-400 mt-0.5">
                          Voor 16:00 besteld = morgen in huis met live PostNL Track & Trace code.
                        </p>
                      </div>
                    </div>
                    <span className="font-mono text-xs font-bold text-white shrink-0">
                      {shippingFee === 0 ? <span className="text-emerald-400 font-bold">GRATIS</span> : '€5.95'}
                    </span>
                  </div>
                </label>

                {/* PostNL Pakketpunt / Afhaallocatie */}
                <div className={`p-4 border transition-colors ${
                  formData.deliveryMethod === 'postnl_pickup' ? 'border-[#D71920] bg-neutral-900' : 'border-neutral-800 bg-[#121212]'
                }`}>
                  <label className="flex items-center justify-between cursor-pointer">
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="delivery"
                        checked={formData.deliveryMethod === 'postnl_pickup'}
                        onChange={() => setFormData({ ...formData, deliveryMethod: 'postnl_pickup' })}
                        className="accent-[#D71920]"
                      />
                      <div>
                        <p className="font-condensed font-bold uppercase text-white text-sm">
                          PostNL Pakketpunt (Zelf ophalen in de buurt)
                        </p>
                        <p className="text-[11px] text-neutral-400 mt-0.5">
                          Kies uit meer dan 3.800 PostNL punten (Albert Heijn, Jumbo, Primera, Gamma).
                        </p>
                      </div>
                    </div>
                    <span className="font-mono text-xs font-bold text-white shrink-0">
                      {shippingFee === 0 ? <span className="text-emerald-400 font-bold">GRATIS</span> : '€5.95'}
                    </span>
                  </label>

                  {formData.deliveryMethod === 'postnl_pickup' && (
                    <div className="mt-3 pt-3 border-t border-neutral-800">
                      <label className="block text-[11px] font-mono text-neutral-300 mb-1.5 flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-[#D71920]" />
                        <span>Kies dichtstbijzijnde PostNL Afhaallocatie:</span>
                      </label>
                      <select
                        value={formData.pickupPoint}
                        onChange={e => setFormData({ ...formData, pickupPoint: e.target.value })}
                        className="w-full bg-[#181818] border border-neutral-700 px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D71920]"
                      >
                        {pickupLocations.map((loc, idx) => (
                          <option key={idx} value={loc}>{loc}</option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>

                {/* DHL Express Avondbezorging */}
                <label className={`block p-4 border cursor-pointer transition-colors ${
                  formData.deliveryMethod === 'dhl_evening' ? 'border-[#D71920] bg-neutral-900' : 'border-neutral-800 bg-[#121212]'
                }`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="delivery"
                        checked={formData.deliveryMethod === 'dhl_evening'}
                        onChange={() => setFormData({ ...formData, deliveryMethod: 'dhl_evening' })}
                        className="accent-[#D71920]"
                      />
                      <div>
                        <p className="font-condensed font-bold uppercase text-white text-sm">
                          DHL Express Avondbezorging (18:00 - 22:00 uur)
                        </p>
                        <p className="text-[11px] text-neutral-400 mt-0.5">
                          Ideaal als je overdag op kantoor of in de gym traint.
                        </p>
                      </div>
                    </div>
                    <span className="font-mono text-xs font-bold text-white shrink-0">
                      €7.90
                    </span>
                  </div>
                </label>
              </div>
            </div>

            {/* Step 3: Dutch Payment Methods (iDEAL, Bancontact, Klarna, B2B Factuur) */}
            <div className="bg-[#0C0C0C] border border-neutral-800 p-6 shadow-xl">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-800 mb-4">
                <h2 className="font-bebas text-2xl text-white tracking-wider flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#D71920] text-white text-xs flex items-center justify-center font-mono font-bold">3</span>
                  {language === 'pl' ? 'HOLENDERSKIE METODY PŁATNOŚCI' : 'BETAALMETHODE (NEDERLAND & BENELUX)'}
                </h2>
                <span className="text-[11px] font-mono text-emerald-400">
                  Veilige Verbinding
                </span>
              </div>

              <div className="space-y-3">
                {/* 1. iDEAL 2.0 (The Dutch Standard) */}
                <div className={`p-4 border transition-colors ${
                  formData.paymentMethod === 'ideal' ? 'border-[#D71920] bg-neutral-900' : 'border-neutral-800 bg-[#121212]'
                }`}>
                  <label className="flex items-center justify-between cursor-pointer">
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="payment"
                        checked={formData.paymentMethod === 'ideal'}
                        onChange={() => setFormData({ ...formData, paymentMethod: 'ideal' })}
                        className="accent-[#D71920]"
                      />
                      <div>
                        <span className="font-condensed font-bold uppercase text-white text-sm flex items-center gap-2">
                          iDEAL (Direct via je eigen bank)
                          <span className="px-1.5 py-0.2 bg-red-950 text-red-400 text-[10px] font-mono">
                            #1 IN NEDERLAND
                          </span>
                        </span>
                        <p className="text-[11px] text-neutral-400 mt-0.5">
                          Direct en veilig afrekenen via ING, Rabobank, ABN AMRO, bunq of andere bank.
                        </p>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 bg-[#1A1A1A] border border-neutral-700 text-white font-mono text-xs font-bold text-[#D71920]">
                      iDEAL
                    </span>
                  </label>

                  {formData.paymentMethod === 'ideal' && (
                    <div className="mt-3 pt-3 border-t border-neutral-800 space-y-2">
                      <label className="block text-[11px] font-mono text-neutral-300">
                        {language === 'pl' ? 'Wybierz swój holenderski bank:' : 'Selecteer jouw bank:'}
                      </label>
                      <select
                        value={formData.idealBank}
                        onChange={e => setFormData({ ...formData, idealBank: e.target.value })}
                        className="w-full bg-[#181818] border border-neutral-700 px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D71920] font-mono"
                      >
                        {dutchBanks.map(b => (
                          <option key={b.id} value={b.id}>{b.name} ({b.code})</option>
                        ))}
                      </select>
                      <p className="text-[10px] text-neutral-500 font-mono">
                        ✓ Je wordt na het plaatsen van de bestelling direct doorverbonden met de app van {formData.idealBank.toUpperCase()}.
                      </p>
                    </div>
                  )}
                </div>

                {/* 2. B2B Op Rekening / Factuur (Special for Dutch Companies with KvK) */}
                {customerType === 'business' && (
                  <div className={`p-4 border transition-colors ${
                    formData.paymentMethod === 'b2b_invoice' ? 'border-[#D71920] bg-neutral-900' : 'border-neutral-800 bg-[#121212]'
                  }`}>
                    <label className="flex items-center justify-between cursor-pointer">
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="payment"
                          checked={formData.paymentMethod === 'b2b_invoice'}
                          onChange={() => setFormData({ ...formData, paymentMethod: 'b2b_invoice' })}
                          className="accent-[#D71920]"
                        />
                        <div>
                          <span className="font-condensed font-bold uppercase text-white text-sm flex items-center gap-2">
                            B2B Op Rekening / Factuur (30 Dagen)
                            <span className="px-1.5 py-0.2 bg-emerald-950 text-emerald-400 text-[10px] font-mono font-bold">
                              KVK EXCLUSIEF
                            </span>
                          </span>
                          <p className="text-[11px] text-neutral-400 mt-0.5">
                            Voor geregistreerde sportscholen, vechtsportclubs en bedrijven. Betaal binnen 30 dagen na levering.
                          </p>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 bg-[#1A1A1A] border border-neutral-700 text-white font-mono text-[10px] font-bold">
                        FACTUUR
                      </span>
                    </label>

                    {formData.paymentMethod === 'b2b_invoice' && (
                      <div className="mt-3 pt-3 border-t border-neutral-800 text-[11px] text-neutral-300 font-mono space-y-1">
                        <p className="text-emerald-400">
                          ✓ Factuur wordt verzonden naar {formData.email || 'jouw email'} met KvK {formData.kvkNumber || 'referentie'}.
                        </p>
                        <p className="text-neutral-500">
                          Levering geschiedt direct vanuit ons magazijn via PostNL met automatische creditcheck.
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* 3. Bancontact (For Belgium & Benelux) */}
                <label className={`block p-4 border cursor-pointer transition-colors ${
                  formData.paymentMethod === 'bancontact' ? 'border-[#D71920] bg-neutral-900' : 'border-neutral-800 bg-[#121212]'
                }`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="payment"
                        checked={formData.paymentMethod === 'bancontact'}
                        onChange={() => setFormData({ ...formData, paymentMethod: 'bancontact' })}
                        className="accent-[#D71920]"
                      />
                      <div>
                        <span className="font-condensed font-bold uppercase text-white text-sm">
                          Bancontact / Payconiq
                        </span>
                        <p className="text-[11px] text-neutral-400 mt-0.5">
                          Populairste betaalmethode in België en Benelux.
                        </p>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 bg-[#1A1A1A] border border-neutral-700 text-white font-mono text-xs font-bold text-blue-400">
                      Bancontact
                    </span>
                  </div>
                </label>

                {/* 4. Klarna Achteraf Betalen (30 days) */}
                <label className={`block p-4 border cursor-pointer transition-colors ${
                  formData.paymentMethod === 'klarna' ? 'border-[#D71920] bg-neutral-900' : 'border-neutral-800 bg-[#121212]'
                }`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="payment"
                        checked={formData.paymentMethod === 'klarna'}
                        onChange={() => setFormData({ ...formData, paymentMethod: 'klarna' })}
                        className="accent-[#D71920]"
                      />
                      <div>
                        <span className="font-condensed font-bold uppercase text-white text-sm">
                          Klarna — Achteraf Betalen in 30 Dagen
                        </span>
                        <p className="text-[11px] text-neutral-400 mt-0.5">
                          Ontvang eerst je gear, pas thuis en betaal pas over 30 dagen.
                        </p>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 bg-[#1A1A1A] border border-neutral-700 text-pink-400 font-mono text-xs font-bold">
                      Klarna.
                    </span>
                  </div>
                </label>

                {/* 5. Creditcard (Mastercard / Visa / AMEX) */}
                <div className={`p-4 border transition-colors ${
                  formData.paymentMethod === 'card' ? 'border-[#D71920] bg-neutral-900' : 'border-neutral-800 bg-[#121212]'
                }`}>
                  <label className="flex items-center justify-between cursor-pointer">
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="payment"
                        checked={formData.paymentMethod === 'card'}
                        onChange={() => setFormData({ ...formData, paymentMethod: 'card' })}
                        className="accent-[#D71920]"
                      />
                      <div>
                        <span className="font-condensed font-bold uppercase text-white text-sm">
                          Creditcard (Mastercard / Visa / Amex)
                        </span>
                        <p className="text-[11px] text-neutral-400 mt-0.5">
                          Wereldwijd beveiligde betaling met aankoopbescherming.
                        </p>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 bg-[#1A1A1A] border border-neutral-700 text-white font-mono text-xs font-bold">
                      VISA / MC
                    </span>
                  </label>

                  {formData.paymentMethod === 'card' && (
                    <div className="mt-3 pt-3 border-t border-neutral-800 space-y-3">
                      <div>
                        <label className="block text-[11px] font-mono text-neutral-400 mb-1">Kaartnummer</label>
                        <input
                          type="text"
                          value={formData.cardNumber}
                          onChange={e => setFormData({ ...formData, cardNumber: e.target.value })}
                          placeholder="4532 •••• •••• 8921"
                          className="w-full bg-[#181818] border border-neutral-700 px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-[#D71920]"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-mono text-neutral-400 mb-1">Vervaldatum</label>
                          <input
                            type="text"
                            value={formData.cardExpiry}
                            onChange={e => setFormData({ ...formData, cardExpiry: e.target.value })}
                            placeholder="MM / JJ"
                            className="w-full bg-[#181818] border border-neutral-700 px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-[#D71920]"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-mono text-neutral-400 mb-1">CVC / CVV</label>
                          <input
                            type="text"
                            value={formData.cardCvc}
                            onChange={e => setFormData({ ...formData, cardCvc: e.target.value })}
                            placeholder="123"
                            maxLength={4}
                            className="w-full bg-[#181818] border border-neutral-700 px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-[#D71920]"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* 6. Apple Pay / Google Pay */}
                <label className={`block p-4 border cursor-pointer transition-colors ${
                  formData.paymentMethod === 'applepay' ? 'border-[#D71920] bg-neutral-900' : 'border-neutral-800 bg-[#121212]'
                }`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="payment"
                        checked={formData.paymentMethod === 'applepay'}
                        onChange={() => setFormData({ ...formData, paymentMethod: 'applepay' })}
                        className="accent-[#D71920]"
                      />
                      <div>
                        <span className="font-condensed font-bold uppercase text-white text-sm">
                          Apple Pay / Google Pay
                        </span>
                        <p className="text-[11px] text-neutral-400 mt-0.5">
                          1-Click afrekenen via Face ID of vingerafdruk.
                        </p>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 bg-[#1A1A1A] border border-neutral-700 text-white font-mono text-xs font-bold">
                      Pay
                    </span>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* RIGHT: Order Summary & Placement (5 Cols) */}
          <div className="lg:col-span-5 bg-[#0C0C0C] border border-neutral-800 p-6 sticky top-24 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
              <h2 className="font-bebas text-2xl text-white tracking-wider">
                {t('checkout.orderSummary')} ({cart.reduce((a, b) => a + b.quantity, 0)})
              </h2>
              {customerType === 'business' && (
                <span className="px-2 py-0.5 bg-neutral-900 border border-neutral-700 text-[10px] font-mono text-emerald-400 uppercase">
                  B2B Order
                </span>
              )}
            </div>

            {/* Item list */}
            <div className="space-y-3 max-h-64 overflow-y-auto divide-y divide-neutral-900 pr-1">
              {cart.map((item, idx) => {
                const locProduct = getLocalizedProduct(item.product, language);
                return (
                  <div key={idx} className="pt-2.5 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                      <img 
                        src={item.product.images[0]} 
                        alt={locProduct.name} 
                        className="w-12 h-14 object-cover bg-neutral-900 shrink-0" 
                      />
                      <div>
                        <p className="font-condensed font-bold text-white line-clamp-1">{locProduct.name}</p>
                        <p className="text-[11px] text-neutral-400 font-mono">
                          {item.selectedSize} · {item.selectedColor}
                        </p>
                        <p className="text-[10px] text-neutral-500 font-mono">
                          Aantal: {item.quantity} × €{item.product.price.toFixed(2)}
                        </p>
                      </div>
                    </div>
                    <span className="font-mono font-bold text-white tabular-nums shrink-0">
                      €{(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Promo Code Input */}
            <div className="border-t border-neutral-800 pt-4">
              <label className="block text-[11px] font-mono uppercase text-neutral-400 mb-1">
                Kortingscode of Actiecode
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={promoCode}
                  onChange={e => setPromoCode(e.target.value)}
                  placeholder="OCTAGON10 / FIGHTCLUB"
                  className="bg-[#141414] border border-neutral-700 px-3 py-2 text-xs text-white flex-1 focus:outline-none focus:border-[#D71920] font-mono"
                />
                <button
                  type="button"
                  onClick={handleApplyPromo}
                  className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white font-condensed font-bold text-xs uppercase cursor-pointer"
                >
                  {t('cart.applyPromo')}
                </button>
              </div>
              {discountAmount > 0 && (
                <p className="text-xs text-emerald-400 font-mono mt-1">
                  ✓ {t('checkout.discount')}: -€{discountAmount.toFixed(2)}
                </p>
              )}
              {promoError && (
                <p className="text-xs text-[#D71920] font-mono mt-1">{promoError}</p>
              )}
            </div>

            {/* Calculations & VAT Breakdown */}
            <div className="border-t border-neutral-800 pt-4 space-y-2 text-xs text-neutral-300 font-mono">
              <div className="flex justify-between">
                <span>Subtotaal excl. BTW:</span>
                <span className="tabular-nums">€{subtotalExclVat.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>21% Nederlandse BTW (Omzetbelasting):</span>
                <span className="tabular-nums text-neutral-400">€{vatAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Verzendkosten PostNL:</span>
                <span className="tabular-nums">
                  {effectiveShippingFee === 0 ? <span className="text-emerald-400 font-bold">GRATIS</span> : `€${effectiveShippingFee.toFixed(2)}`}
                </span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <span>Korting:</span>
                  <span className="tabular-nums">-€{discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-lg font-bold text-white pt-3 border-t border-neutral-800">
                <span className="font-bebas text-2xl">TOTAAL (INCL. 21% BTW):</span>
                <span className="font-mono text-2xl text-[#D71920] tabular-nums">€{finalTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Place Order Button */}
            <button
              onClick={handlePlaceOrder}
              disabled={cart.length === 0}
              className="w-full py-4 bg-[#D71920] hover:bg-[#b01318] text-white font-condensed font-bold text-sm uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer shadow-xl shadow-red-950/40 transition-colors disabled:opacity-50"
            >
              <Lock className="w-4 h-4" />
              <span>
                {formData.paymentMethod === 'b2b_invoice' 
                  ? (language === 'pl' ? 'ZŁÓŻ ZAMÓWIENIE B2B NA FAKTURĘ (30 DNI)' : 'PLAATS B2B BESTELLING OP REKENING (30 DAGEN)')
                  : formData.paymentMethod === 'ideal'
                  ? (language === 'pl' ? `ZAPŁAĆ TERAZ PRZEZ iDEAL (€${finalTotal.toFixed(2)})` : `BESTELLING PLAATSEN & BETALEN MET iDEAL (€${finalTotal.toFixed(2)})`)
                  : formData.paymentMethod === 'bancontact'
                  ? 'AFREKENEN MET BANCONTACT'
                  : formData.paymentMethod === 'klarna'
                  ? 'BESTELLEN MET KLARNA (ACHTERAF BETALEN)'
                  : 'BESTELLING PLAATSEN & BETALEN'}
              </span>
            </button>

            <div className="text-center text-[11px] text-neutral-400 space-y-1">
              <p>
                {language === 'pl' 
                  ? 'Faktura VAT wystawiana automatycznie w EUR z numerem KvK.' 
                  : 'Officiële BTW-factuur met KvK-vermelding wordt direct meegezonden.'}
              </p>
              <p className="text-emerald-400">
                ✓ 30 dagen recht op gratis retour & PostNL Track & Trace garantie
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================= */}
      {/* OFFICIAL DUTCH iDEAL PAYMENT GATEWAY MODAL (CURRENCE / MOLLIE) */}
      {/* ============================================================= */}
      <IdealPaymentModal
        isOpen={showIdealModal}
        onClose={() => setShowIdealModal(false)}
        onSuccess={handleIdealSuccess}
        orderNumber={generatedOrderNumber}
        amount={finalTotal}
        initialBankId={formData.idealBank}
        language={language}
        companyName={customerType === 'business' ? formData.companyName : undefined}
      />
    </div>
  );
};
