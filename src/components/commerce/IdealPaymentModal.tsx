import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Smartphone, 
  QrCode, 
  CheckCircle2, 
  AlertCircle, 
  RefreshCw, 
  ArrowRight, 
  X,
  Clock,
  ExternalLink,
  ChevronDown
} from 'lucide-react';

export interface DutchBank {
  id: string;
  name: string;
  code: string;
  brandColor: string;
  bgColor: string;
}

export const DUTCH_BANKS: DutchBank[] = [
  { id: 'rabobank', name: 'Rabobank', code: 'RABO', brandColor: '#FF6200', bgColor: '#002B49' },
  { id: 'ing', name: 'ING Bank', code: 'INGB', brandColor: '#FF6200', bgColor: '#FF6200' },
  { id: 'abnamro', name: 'ABN AMRO', code: 'ABNA', brandColor: '#008272', bgColor: '#008272' },
  { id: 'sns', name: 'SNS Bank', code: 'SNSB', brandColor: '#E2001A', bgColor: '#333333' },
  { id: 'asn', name: 'ASN Bank', code: 'ASNB', brandColor: '#007A33', bgColor: '#004B23' },
  { id: 'bunq', name: 'bunq', code: 'BUNQ', brandColor: '#00B159', bgColor: '#1A1A1A' },
  { id: 'knab', name: 'Knab', code: 'KNAB', brandColor: '#FF7900', bgColor: '#0A2540' },
  { id: 'revolut', name: 'Revolut NL', code: 'REVO', brandColor: '#0075EB', bgColor: '#191C1F' },
  { id: 'regiobank', name: 'RegioBank', code: 'RBRB', brandColor: '#E2001A', bgColor: '#2C3E50' },
  { id: 'triodos', name: 'Triodos Bank', code: 'TRIO', brandColor: '#00557F', bgColor: '#00557F' },
  { id: 'vanlanschot', name: 'Van Lanschot Kempen', code: 'VLK', brandColor: '#B08D57', bgColor: '#1B263B' },
  { id: 'n26', name: 'N26', code: 'N26', brandColor: '#36A18B', bgColor: '#2B3A42' }
];

interface IdealPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (paymentDetails: {
    transactionId: string;
    bank: DutchBank;
    paidAmount: number;
    structuredReference: string;
  }) => void;
  orderNumber: string;
  amount: number;
  initialBankId?: string;
  language?: string;
  companyName?: string;
}

export const IdealPaymentModal: React.FC<IdealPaymentModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  orderNumber,
  amount,
  initialBankId = 'rabobank',
  language = 'nl',
  companyName
}) => {
  const [selectedBankId, setSelectedBankId] = useState<string>(initialBankId);
  const [authMode, setAuthMode] = useState<'qr' | 'app'>('qr');
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success' | 'failed'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [timeLeftSeconds, setTimeLeftSeconds] = useState(899); // 14:59 min
  const [transactionId] = useState(() => `trx_nl_ideal_${Math.random().toString(36).substring(2, 10)}`);
  const [structuredRef] = useState(() => {
    const raw = Math.floor(1000000000000000 + Math.random() * 9000000000000000).toString();
    return `${raw.slice(0, 4)} ${raw.slice(4, 8)} ${raw.slice(8, 12)} ${raw.slice(12, 16)}`;
  });

  const selectedBank = DUTCH_BANKS.find(b => b.id === selectedBankId) || DUTCH_BANKS[0];

  // Sync bank selection
  useEffect(() => {
    if (initialBankId) {
      setSelectedBankId(initialBankId);
    }
  }, [initialBankId]);

  // Session timer countdown
  useEffect(() => {
    if (!isOpen || paymentStatus !== 'idle') return;
    const interval = setInterval(() => {
      setTimeLeftSeconds(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          setPaymentStatus('failed');
          setErrorMessage(
            language === 'pl' 
              ? 'Sesja płatności iDEAL wygasła. Spróbuj ponownie.' 
              : 'iDEAL sessie is verlopen. Probeer opnieuw.'
          );
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isOpen, paymentStatus, language]);

  if (!isOpen) return null;

  const minutes = Math.floor(timeLeftSeconds / 60);
  const seconds = timeLeftSeconds % 60;
  const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  const handleSimulatePayment = (willSucceed: boolean) => {
    setPaymentStatus('processing');
    setErrorMessage('');

    setTimeout(() => {
      if (willSucceed) {
        setPaymentStatus('success');
        setTimeout(() => {
          onSuccess({
            transactionId,
            bank: selectedBank,
            paidAmount: amount,
            structuredReference: structuredRef
          });
        }, 1400);
      } else {
        setPaymentStatus('failed');
        setErrorMessage(
          language === 'pl'
            ? 'Płatność została odrzucona przez bank (np. brak środków lub autoryzacja odrzucona). Spróbuj ponownie.'
            : 'De betaling is niet goedgekeurd door je bank. Controleer je saldo en probeer het opnieuw of kies een andere betaalmethode.'
        );
      }
    }, 2000);
  };

  const handleRetry = () => {
    setPaymentStatus('idle');
    setErrorMessage('');
    setTimeLeftSeconds(899);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-lg bg-[#0F0F0F] border border-neutral-700 shadow-2xl rounded-none text-white my-6 overflow-hidden">
        {/* Top Header: Official iDEAL Currence / Mollie Payment Gateway Bar */}
        <div className="bg-[#171717] px-6 py-4 border-b border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* iDEAL Logo Pill */}
            <div className="px-3 py-1 bg-[#CC0066] text-white font-mono font-black text-sm tracking-wider flex items-center gap-1 shadow-sm">
              <span>iDEAL</span>
            </div>
            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-300 block font-bold">
                iDEAL Payment Gateway
              </span>
              <span className="text-[10px] text-neutral-500 font-mono flex items-center gap-1">
                <Lock className="w-2.5 h-2.5 text-emerald-400" /> Currence & Mollie Beveiligd (256-bit SSL)
              </span>
            </div>
          </div>

          {paymentStatus !== 'processing' && paymentStatus !== 'success' && (
            <button
              onClick={onClose}
              aria-label="Sluiten"
              className="p-1.5 text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Payment Amount & Merchant Card */}
        <div className="p-6 bg-gradient-to-b from-[#141414] to-[#0F0F0F] border-b border-neutral-800">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-[11px] text-neutral-400 uppercase font-mono block">
                {language === 'pl' ? 'Odbiorca płatności (Wierzyciel)' : 'Begunstigde (Handelaar)'}
              </span>
              <p className="font-bebas text-xl text-white tracking-wide flex items-center gap-1.5">
                <span>OCTAGON FIGHTWEAR NETHERLANDS B.V.</span>
              </p>
              <p className="text-[10px] text-neutral-500 font-mono">
                KvK: 84920192 · BTW: NL849201928B01
              </p>
              {companyName && (
                <p className="text-[11px] text-emerald-400 font-mono mt-0.5">
                  B2B factuurreferentie: {companyName}
                </p>
              )}
            </div>

            <div className="sm:text-right bg-[#1B1B1B] sm:bg-transparent p-3 sm:p-0 border sm:border-0 border-neutral-800">
              <span className="text-[11px] text-neutral-400 uppercase font-mono block">
                {language === 'pl' ? 'Kwota do zapłaty' : 'Totaalbedrag iDEAL'}
              </span>
              <span className="font-mono text-3xl font-black text-[#D71920] tabular-nums">
                €{amount.toFixed(2)}
              </span>
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-neutral-800/80 flex flex-wrap items-center justify-between text-[11px] font-mono text-neutral-400">
            <div>
              <span className="text-neutral-500">Order: </span>
              <span className="text-neutral-200 font-bold">{orderNumber}</span>
            </div>
            <div className="flex items-center gap-1.5 text-amber-400">
              <Clock className="w-3.5 h-3.5" />
              <span>Sessie vervalt over: <strong className="font-bold">{formattedTime}</strong></span>
            </div>
          </div>
        </div>

        {/* Dynamic State Views */}
        {paymentStatus === 'processing' ? (
          <div className="p-10 text-center space-y-6">
            <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
              <div className="absolute inset-0 border-4 border-neutral-800 border-t-[#CC0066] rounded-full animate-spin" />
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center font-mono font-bold text-xs text-white"
                style={{ backgroundColor: selectedBank.bgColor }}
              >
                {selectedBank.code}
              </div>
            </div>

            <div>
              <h3 className="font-bebas text-2xl text-white tracking-wide">
                {language === 'pl' 
                  ? `AUTORYZACJA TRANSAKCJI Z ${selectedBank.name.toUpperCase()}...` 
                  : `VERIFIËREN MET ${selectedBank.name.toUpperCase()}...`}
              </h3>
              <p className="text-xs text-neutral-400 max-w-sm mx-auto mt-2 font-mono leading-relaxed">
                {language === 'pl'
                  ? 'Trwa bezpieczna wymiana kluczy kryptograficznych z siecią Currence iDEAL. Proszę czekać na potwierdzenie.'
                  : 'Bezig met veilige communicatie via het Nederlandse iDEAL interbancaire protocol. Bevestig de melding eventueel in je bankieren-app.'}
              </p>
            </div>

            <div className="p-3 bg-[#161616] border border-neutral-800 text-[11px] font-mono text-neutral-400 max-w-sm mx-auto flex items-center justify-center gap-2">
              <RefreshCw className="w-3.5 h-3.5 text-[#CC0066] animate-spin" />
              <span>Status: Wachten op akkoord bank...</span>
            </div>
          </div>
        ) : paymentStatus === 'success' ? (
          <div className="p-10 text-center space-y-5 animate-scale-up">
            <div className="w-20 h-20 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border-2 border-emerald-500/50">
              <CheckCircle2 className="w-12 h-12" />
            </div>

            <div>
              <span className="text-xs font-mono uppercase text-emerald-400 font-bold tracking-widest block">
                iDEAL Transactie Geslaagd (Status: ACWP)
              </span>
              <h3 className="font-bebas text-3xl text-white tracking-wide mt-1">
                {language === 'pl' ? 'PŁATNOŚĆ ZAAKCEPTOWANA!' : 'BETALING SUCCESVOL AFGEROND!'}
              </h3>
              <p className="text-xs text-neutral-300 mt-2 font-mono">
                Je betaling via <strong>{selectedBank.name}</strong> is direct ontvangen door Octagon Fightwear Benelux B.V.
              </p>
            </div>

            <div className="p-4 bg-[#141414] border border-neutral-800 text-left font-mono text-xs space-y-1.5 max-w-sm mx-auto">
              <div className="flex justify-between">
                <span className="text-neutral-500">Transactie-ID:</span>
                <span className="text-white font-bold">{transactionId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Betalingskenmerk:</span>
                <span className="text-white">{structuredRef}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Bank:</span>
                <span className="text-white">{selectedBank.name}</span>
              </div>
            </div>

            <p className="text-[11px] text-neutral-500 font-mono">
              Je wordt nu doorgestuurd naar de orderbevestiging...
            </p>
          </div>
        ) : paymentStatus === 'failed' ? (
          <div className="p-8 text-center space-y-5">
            <div className="w-16 h-16 bg-red-500/20 text-[#D71920] rounded-full flex items-center justify-center mx-auto border border-red-500/40">
              <AlertCircle className="w-9 h-9" />
            </div>

            <div>
              <span className="text-xs font-mono uppercase text-[#D71920] font-bold tracking-widest block">
                iDEAL Betaling Geannuleerd of Mislukt
              </span>
              <h3 className="font-bebas text-2xl text-white tracking-wide mt-1">
                {language === 'pl' ? 'PŁATNOŚĆ NIE POWIODŁA SIĘ' : 'BETALING NIET GELUKT'}
              </h3>
              <p className="text-xs text-neutral-300 mt-2 font-mono leading-relaxed max-w-md mx-auto">
                {errorMessage || 'De bank heeft de transactie niet kunnen autoriseren.'}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2 max-w-md mx-auto">
              <button
                onClick={handleRetry}
                className="flex-1 py-3 bg-[#CC0066] hover:bg-[#A80054] text-white font-condensed font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>{language === 'pl' ? 'Spróbuj ponownie' : 'Opnieuw Proberen'}</span>
              </button>
              <button
                onClick={onClose}
                className="flex-1 py-3 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white font-condensed font-bold text-xs uppercase tracking-wider cursor-pointer transition-colors"
              >
                <span>{language === 'pl' ? 'Wróć do kasy' : 'Terug naar Kassa'}</span>
              </button>
            </div>
          </div>
        ) : (
          /* Normal Interactive Gateway View */
          <div className="p-6 space-y-6">
            {/* Bank Selector Row */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-[11px] font-mono uppercase text-neutral-300 font-bold flex items-center gap-1.5">
                  <span>{language === 'pl' ? 'Wybrany Bank Holenderski' : 'Jouw Nederlandse Bank'}:</span>
                </label>
                <span className="text-[10px] text-neutral-500 font-mono">
                  {DUTCH_BANKS.length} banken ondersteund
                </span>
              </div>

              <div className="relative">
                <select
                  value={selectedBankId}
                  onChange={e => setSelectedBankId(e.target.value)}
                  className="w-full bg-[#161616] border border-neutral-700 hover:border-neutral-500 px-4 py-3 text-xs text-white font-mono focus:outline-none focus:border-[#CC0066] appearance-none cursor-pointer pr-10"
                >
                  {DUTCH_BANKS.map(bank => (
                    <option key={bank.id} value={bank.id}>
                      {bank.name} ({bank.code}) — iDEAL Gecertificeerd
                    </option>
                  ))}
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-400">
                  <ChevronDown className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Verification Mode Selector: QR Code vs Direct Bank App */}
            <div className="grid grid-cols-2 gap-2 bg-[#141414] p-1 border border-neutral-800">
              <button
                type="button"
                onClick={() => setAuthMode('qr')}
                className={`py-2 px-3 text-xs font-condensed font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-colors ${
                  authMode === 'qr' ? 'bg-[#CC0066] text-white shadow' : 'text-neutral-400 hover:text-white'
                }`}
              >
                <QrCode className="w-4 h-4" />
                <span>iDEAL QR-Code</span>
              </button>

              <button
                type="button"
                onClick={() => setAuthMode('app')}
                className={`py-2 px-3 text-xs font-condensed font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-colors ${
                  authMode === 'app' ? 'bg-[#CC0066] text-white shadow' : 'text-neutral-400 hover:text-white'
                }`}
              >
                <Smartphone className="w-4 h-4" />
                <span>Bankieren App / Web</span>
              </button>
            </div>

            {/* Mode 1: iDEAL QR Code Authenticator */}
            {authMode === 'qr' && (
              <div className="bg-[#141414] border border-neutral-800 p-5 text-center space-y-4">
                <div className="relative w-44 h-44 mx-auto bg-white p-3 shadow-xl flex items-center justify-center border-2 border-neutral-300">
                  {/* High Quality Stylized SVG iDEAL QR Code */}
                  <svg className="w-full h-full" viewBox="0 0 160 160" fill="none">
                    <rect width="160" height="160" fill="white" />
                    {/* Top-Left Finder */}
                    <rect x="10" y="10" width="40" height="40" fill="black" />
                    <rect x="15" y="15" width="30" height="30" fill="white" />
                    <rect x="22" y="22" width="16" height="16" fill="black" />
                    {/* Top-Right Finder */}
                    <rect x="110" y="10" width="40" height="40" fill="black" />
                    <rect x="115" y="15" width="30" height="30" fill="white" />
                    <rect x="122" y="22" width="16" height="16" fill="black" />
                    {/* Bottom-Left Finder */}
                    <rect x="10" y="110" width="40" height="40" fill="black" />
                    <rect x="15" y="115" width="30" height="30" fill="white" />
                    <rect x="22" y="122" width="16" height="16" fill="black" />
                    {/* Data Pattern */}
                    <rect x="60" y="15" width="10" height="10" fill="black" />
                    <rect x="75" y="20" width="15" height="10" fill="black" />
                    <rect x="95" y="15" width="8" height="8" fill="black" />
                    <rect x="60" y="35" width="8" height="16" fill="black" />
                    <rect x="75" y="40" width="20" height="8" fill="black" />
                    <rect x="15" y="60" width="10" height="15" fill="black" />
                    <rect x="35" y="65" width="15" height="8" fill="black" />
                    <rect x="55" y="60" width="8" height="8" fill="black" />
                    <rect x="115" y="60" width="15" height="10" fill="black" />
                    <rect x="135" y="65" width="15" height="15" fill="black" />
                    <rect x="10" y="85" width="15" height="10" fill="black" />
                    <rect x="30" y="90" width="20" height="10" fill="black" />
                    <rect x="110" y="85" width="10" height="15" fill="black" />
                    <rect x="130" y="90" width="20" height="8" fill="black" />
                    <rect x="60" y="115" width="15" height="15" fill="black" />
                    <rect x="80" y="120" width="10" height="10" fill="black" />
                    <rect x="100" y="115" width="15" height="10" fill="black" />
                    <rect x="120" y="130" width="15" height="15" fill="black" />
                    <rect x="60" y="138" width="10" height="12" fill="black" />
                    <rect x="78" y="138" width="18" height="12" fill="black" />
                    <rect x="100" y="135" width="10" height="15" fill="black" />
                    {/* iDEAL Center Pill */}
                    <rect x="62" y="62" width="36" height="36" fill="#CC0066" rx="4" />
                    <text x="80" y="84" fill="white" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="monospace">iDEAL</text>
                  </svg>

                  {/* Subtle Scan line overlay */}
                  <div className="absolute inset-x-0 h-1 bg-[#CC0066]/70 shadow-lg top-10 animate-pulse" />
                </div>

                <div className="space-y-1">
                  <p className="text-xs text-white font-mono font-bold">
                    Scan met de {selectedBank.name} app of camera
                  </p>
                  <p className="text-[11px] text-neutral-400 font-mono leading-relaxed">
                    Open je mobiel bankieren app (Rabobank Scanner, ING Mobiel Bevestigen, ABN AMRO app) en richt je camera op deze QR-code.
                  </p>
                </div>
              </div>
            )}

            {/* Mode 2: Direct Banking App / Portal */}
            {authMode === 'app' && (
              <div className="bg-[#141414] border border-neutral-800 p-5 space-y-4">
                <div className="flex items-center gap-3 p-3 bg-[#1A1A1A] border border-neutral-700">
                  <div 
                    className="w-10 h-10 rounded flex items-center justify-center font-mono font-bold text-white text-xs shrink-0"
                    style={{ backgroundColor: selectedBank.bgColor }}
                  >
                    {selectedBank.code}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white font-mono">
                      {selectedBank.name} Online Bankieren
                    </p>
                    <p className="text-[11px] text-neutral-400 font-mono">
                      Je wordt veilig doorgeschakeld naar de inlogomgeving van {selectedBank.name}.
                    </p>
                  </div>
                </div>

                <div className="p-3 bg-black/60 border border-neutral-800 font-mono text-[11px] space-y-1.5 text-neutral-300">
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Begunstigde:</span>
                    <span>Octagon Netherlands B.V.</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">IBAN rekening:</span>
                    <span>NL91 ABNA 0412 8492 01</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Betalingskenmerk:</span>
                    <span>{structuredRef}</span>
                  </div>
                  <div className="flex justify-between font-bold text-white pt-1 border-t border-neutral-800">
                    <span>Bedrag:</span>
                    <span className="text-[#CC0066]">€{amount.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Action Simulator Controls */}
            <div className="space-y-2.5 pt-1">
              <button
                type="button"
                onClick={() => handleSimulatePayment(true)}
                className="w-full py-4 bg-[#CC0066] hover:bg-[#A80054] text-white font-condensed font-bold text-sm uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-lg shadow-pink-950/30"
              >
                <Lock className="w-4 h-4" />
                <span>
                  {language === 'pl'
                    ? `AUTORYZUJ PŁATNOŚĆ W ${selectedBank.name.toUpperCase()} (€${amount.toFixed(2)})`
                    : `BETALING AUTORISEREN BIJ ${selectedBank.name.toUpperCase()} (€${amount.toFixed(2)})`}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => handleSimulatePayment(false)}
                  className="flex-1 py-2 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-neutral-700 text-neutral-400 hover:text-white font-mono text-[11px] transition-colors cursor-pointer"
                  title="Simuleer een afwijzing of onvoldoende saldo test"
                >
                  Simuleer Weigering (Test)
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-2 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-neutral-700 text-neutral-400 hover:text-white font-mono text-[11px] transition-colors cursor-pointer"
                >
                  Annuleren
                </button>
              </div>
            </div>

            {/* Bottom Trust Marks */}
            <div className="pt-2 border-t border-neutral-800/80 flex items-center justify-between text-[10px] font-mono text-neutral-500">
              <div className="flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                <span>Officiële Currence iDEAL Standaard</span>
              </div>
              <span>Nederlandse Banken Vereniging</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
