import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { ChevronRight, ChevronDown, Flame, Globe, X, Award } from 'lucide-react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const { navigate, language, setLanguage, loyaltyPoints, t } = useStore();
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  if (!isOpen) return null;

  const toggleSection = (id: string) => {
    setExpandedSection(expandedSection === id ? null : id);
  };

  const handleNavigate = (path: string) => {
    navigate(path);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 lg:hidden flex">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="relative w-4/5 max-w-sm bg-[#080808] border-r border-neutral-800 h-full flex flex-col z-50 overflow-y-auto">
        {/* Drawer Header */}
        <div className="p-4 border-b border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-[#141414] border border-[#D71920] flex items-center justify-center">
              <span className="font-bebas text-base text-[#D71920]">O</span>
            </div>
            <span className="font-bebas text-xl tracking-wider text-white">
              OCTAGON <span className="text-[#D71920]">SPORT NL</span>
            </span>
          </div>
          <button 
            onClick={onClose}
            aria-label={t('mobile.close')}
            className="p-1.5 text-neutral-400 hover:text-white"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Highlight Promo Banner */}
        <div className="p-3 bg-[#111111] border-b border-neutral-800">
          <button
            onClick={() => handleNavigate('/fight-system')}
            className="w-full flex items-center justify-between p-2.5 bg-[#181818] border border-neutral-700 rounded text-left"
          >
            <div className="flex items-center gap-2.5">
              <Flame className="w-5 h-5 text-[#D71920]" />
              <div>
                <p className="text-xs font-condensed font-bold tracking-wider uppercase text-white">
                  {t('mobile.fightSystemPromo')}
                </p>
                <p className="text-[11px] text-neutral-400">{t('mobile.fightSystemDesc')}</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-neutral-400" />
          </button>
        </div>

        {/* Main Categories Navigation */}
        <nav className="p-4 space-y-1 flex-1">
          {/* HEREN */}
          <div className="border-b border-neutral-800/60 pb-1">
            <button
              onClick={() => toggleSection('heren')}
              className="w-full py-3 flex items-center justify-between font-bebas text-xl tracking-wider text-white"
            >
              <span>{t('nav.men')}</span>
              {expandedSection === 'heren' ? <ChevronDown className="w-4 h-4 text-[#D71920]" /> : <ChevronRight className="w-4 h-4 text-neutral-500" />}
            </button>
            {expandedSection === 'heren' && (
              <div className="pl-3 pb-3 space-y-2 text-sm text-neutral-400">
                <button onClick={() => handleNavigate('/category/heren')} className="block hover:text-white text-left w-full font-semibold text-white">
                  {t('sub.allHeren')} →
                </button>
                <button onClick={() => handleNavigate('/category/heren?sub=rashguards')} className="block hover:text-white text-left w-full">
                  {t('sub.rashguards')}
                </button>
                <button onClick={() => handleNavigate('/category/heren?sub=mma-shorts')} className="block hover:text-white text-left w-full">
                  {t('sub.mmaShorts')}
                </button>
                <button onClick={() => handleNavigate('/category/heren?sub=hoodies')} className="block hover:text-white text-left w-full">
                  {t('sub.hoodies')}
                </button>
                <button onClick={() => handleNavigate('/category/heren?sub=t-shirts')} className="block hover:text-white text-left w-full">
                  {t('sub.tshirts')}
                </button>
              </div>
            )}
          </div>

          {/* DAMES */}
          <div className="border-b border-neutral-800/60 pb-1">
            <button
              onClick={() => toggleSection('dames')}
              className="w-full py-3 flex items-center justify-between font-bebas text-xl tracking-wider text-white"
            >
              <span>{t('nav.women')}</span>
              {expandedSection === 'dames' ? <ChevronDown className="w-4 h-4 text-[#D71920]" /> : <ChevronRight className="w-4 h-4 text-neutral-500" />}
            </button>
            {expandedSection === 'dames' && (
              <div className="pl-3 pb-3 space-y-2 text-sm text-neutral-400">
                <button onClick={() => handleNavigate('/category/dames')} className="block hover:text-white text-left w-full font-semibold text-white">
                  {t('sub.allDames')} →
                </button>
                <button onClick={() => handleNavigate('/category/dames?sub=leggings')} className="block hover:text-white text-left w-full">
                  {t('sub.leggings')}
                </button>
                <button onClick={() => handleNavigate('/category/dames?sub=rashguards')} className="block hover:text-white text-left w-full">
                  {t('sub.rashguards')}
                </button>
                <button onClick={() => handleNavigate('/category/fight-gear?sub=bokshandschoenen')} className="block hover:text-white text-left w-full">
                  {t('sub.boxingGloves')}
                </button>
              </div>
            )}
          </div>

          {/* FIGHT GEAR */}
          <div className="border-b border-neutral-800/60 pb-1">
            <button
              onClick={() => toggleSection('fight-gear')}
              className="w-full py-3 flex items-center justify-between font-bebas text-xl tracking-wider text-[#D71920]"
            >
              <span>{t('nav.fightGear')}</span>
              {expandedSection === 'fight-gear' ? <ChevronDown className="w-4 h-4 text-[#D71920]" /> : <ChevronRight className="w-4 h-4 text-neutral-500" />}
            </button>
            {expandedSection === 'fight-gear' && (
              <div className="pl-3 pb-3 space-y-2 text-sm text-neutral-400">
                <button onClick={() => handleNavigate('/category/fight-gear')} className="block hover:text-white text-left w-full font-semibold text-white">
                  {t('sub.allFightGear')} →
                </button>
                <button onClick={() => handleNavigate('/category/fight-gear?sub=bokshandschoenen')} className="block hover:text-white text-left w-full">
                  {t('sub.boxingGloves')}
                </button>
                <button onClick={() => handleNavigate('/category/fight-gear?sub=mma-gloves')} className="block hover:text-white text-left w-full">
                  {t('sub.mmaGloves')}
                </button>
                <button onClick={() => handleNavigate('/category/fight-gear?sub=scheenbeschermers')} className="block hover:text-white text-left w-full">
                  {t('sub.shinGuards')}
                </button>
                <button onClick={() => handleNavigate('/category/fight-gear?sub=bandages')} className="block hover:text-white text-left w-full">
                  {t('sub.wraps')}
                </button>
                <button onClick={() => handleNavigate('/category/fight-gear?sub=bitjes')} className="block hover:text-white text-left w-full">
                  {t('sub.mouthguards')}
                </button>
              </div>
            )}
          </div>

          {/* TRAINING */}
          <div className="border-b border-neutral-800/60 pb-1">
            <button
              onClick={() => handleNavigate('/category/training')}
              className="w-full py-3 flex items-center justify-between font-bebas text-xl tracking-wider text-white text-left"
            >
              <span>{t('nav.training')}</span>
              <ChevronRight className="w-4 h-4 text-neutral-500" />
            </button>
          </div>

          {/* KIDS */}
          <div className="border-b border-neutral-800/60 pb-1">
            <button
              onClick={() => handleNavigate('/category/kids')}
              className="w-full py-3 flex items-center justify-between font-bebas text-xl tracking-wider text-white text-left"
            >
              <span>{t('nav.kids')}</span>
              <ChevronRight className="w-4 h-4 text-neutral-500" />
            </button>
          </div>

          {/* ACCESSOIRES */}
          <div className="border-b border-neutral-800/60 pb-1">
            <button
              onClick={() => handleNavigate('/category/accessoires')}
              className="w-full py-3 flex items-center justify-between font-bebas text-xl tracking-wider text-white text-left"
            >
              <span>{t('nav.accessories')}</span>
              <ChevronRight className="w-4 h-4 text-neutral-500" />
            </button>
          </div>

          {/* MEDIA HUB */}
          <div className="border-b border-neutral-800/60 pb-1">
            <button
              onClick={() => handleNavigate('/media')}
              className="w-full py-3 flex items-center justify-between font-bebas text-xl tracking-wider text-white text-left"
            >
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#D71920] animate-pulse" />
                <span>{t('nav.media')}</span>
              </div>
              <ChevronRight className="w-4 h-4 text-neutral-500" />
            </button>
          </div>

          {/* SALE */}
          <div className="border-b border-neutral-800/60 pb-1">
            <button
              onClick={() => handleNavigate('/sale')}
              className="w-full py-3 flex items-center justify-between font-bebas text-xl tracking-wider text-[#D71920] text-left"
            >
              <span>{t('nav.sale')} (-70%)</span>
              <ChevronRight className="w-4 h-4 text-[#D71920]" />
            </button>
          </div>

          {/* B2B / CLUBS */}
          <div className="border-b border-neutral-800/60 pb-1">
            <button
              onClick={() => handleNavigate('/clubs')}
              className="w-full py-3 flex items-center justify-between font-bebas text-xl tracking-wider text-white text-left"
            >
              <span>{t('nav.clubs')}</span>
              <ChevronRight className="w-4 h-4 text-neutral-500" />
            </button>
          </div>
        </nav>

        {/* Footer & Language Controls */}
        <div className="p-4 border-t border-neutral-800 bg-[#0B0B0B] space-y-3">
          {/* Points Info */}
          <div className="flex items-center justify-between text-xs font-mono text-neutral-400 bg-[#141414] p-2.5 border border-neutral-800">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-[#D71920]" />
              <span>{t('mobile.loyaltyPoints')}</span>
            </div>
            <span className="text-white font-bold">{loyaltyPoints} PTS</span>
          </div>

          {/* Language Selector */}
          <div>
            <span className="text-[10px] font-mono uppercase text-neutral-400 block mb-1.5 flex items-center gap-1">
              <Globe className="w-3.5 h-3.5 text-neutral-400" /> {t('mobile.language')}
            </span>
            <div className="grid grid-cols-3 gap-1.5">
              <button
                onClick={() => setLanguage('nl')}
                className={`py-1.5 text-xs font-mono font-bold uppercase border transition-colors ${
                  language === 'nl' ? 'border-[#D71920] bg-[#D71920] text-white' : 'border-neutral-800 bg-[#161616] text-neutral-400'
                }`}
              >
                NL
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={`py-1.5 text-xs font-mono font-bold uppercase border transition-colors ${
                  language === 'en' ? 'border-[#D71920] bg-[#D71920] text-white' : 'border-neutral-800 bg-[#161616] text-neutral-400'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('pl')}
                className={`py-1.5 text-xs font-mono font-bold uppercase border transition-colors ${
                  language === 'pl' ? 'border-[#D71920] bg-[#D71920] text-white' : 'border-neutral-800 bg-[#161616] text-neutral-400'
                }`}
              >
                PL
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
