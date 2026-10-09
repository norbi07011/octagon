import React from 'react';
import { useStore } from '../../context/StoreContext';
import { ArrowRight, Flame } from 'lucide-react';
import { 
  BOXING_GLOVES_IMAGE, 
  RASHGUARD_IMAGE, 
  SHIN_GUARDS_IMAGE,
  HOODIE_IMAGE,
  CAMO_GLOVES_IMAGE,
  LEGGINGS_IMAGE 
} from '../../data/productImages';

interface MegaMenuProps {
  category: string;
  onClose: () => void;
}

export const MegaMenu: React.FC<MegaMenuProps> = ({ category, onClose }) => {
  const { navigate, language, t } = useStore();

  const handleLinkClick = (path: string) => {
    navigate(path);
    onClose();
  };

  if (category === 'heren') {
    return (
      <div 
        onMouseLeave={onClose}
        className="absolute top-full left-0 w-full bg-[#0B0B0B]/98 backdrop-blur-xl border-b border-neutral-800 shadow-2xl py-8 px-6 z-40 transition-all duration-200"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h4 className="font-bebas text-lg tracking-wider text-[#FFFFFF] mb-4 border-l-2 border-[#D71920] pl-3">
              {t('mega.fightwear')}
            </h4>
            <ul className="space-y-2.5 text-sm text-neutral-400">
              <li>
                <button onClick={() => handleLinkClick('/category/heren?sub=rashguards')} className="hover:text-white hover:translate-x-1 transition-all cursor-pointer">
                  {t('sub.rashguards')}
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('/category/heren?sub=mma-shorts')} className="hover:text-white hover:translate-x-1 transition-all cursor-pointer">
                  {t('sub.mmaShorts')}
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('/category/fight-gear?sub=bokshandschoenen')} className="hover:text-white hover:translate-x-1 transition-all cursor-pointer">
                  {t('sub.boxingGloves')}
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('/category/fight-gear?sub=scheenbeschermers')} className="hover:text-white hover:translate-x-1 transition-all cursor-pointer">
                  {t('sub.shinGuards')}
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bebas text-lg tracking-wider text-[#FFFFFF] mb-4 border-l-2 border-neutral-700 pl-3">
              {t('mega.apparel')}
            </h4>
            <ul className="space-y-2.5 text-sm text-neutral-400">
              <li>
                <button onClick={() => handleLinkClick('/category/heren?sub=hoodies')} className="hover:text-white hover:translate-x-1 transition-all cursor-pointer">
                  {t('sub.hoodies')}
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('/category/heren?sub=t-shirts')} className="hover:text-white hover:translate-x-1 transition-all cursor-pointer">
                  {t('sub.tshirts')}
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('/category/heren?sub=broeken-joggers')} className="hover:text-white hover:translate-x-1 transition-all cursor-pointer">
                  {language === 'pl' ? 'Spodnie Dresowe Jogger' : language === 'en' ? 'Sweatpants & Joggers' : 'Trainingsbroeken & Joggers'}
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('/category/heren')} className="hover:text-white hover:translate-x-1 transition-all cursor-pointer">
                  {t('sub.tracksuits')}
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bebas text-lg tracking-wider text-[#FFFFFF] mb-4 border-l-2 border-neutral-700 pl-3">
              {t('mega.popular')}
            </h4>
            <ul className="space-y-2.5 text-sm text-neutral-400">
              <li>
                <button onClick={() => handleLinkClick('/category/fight-gear?sport=mma')} className="hover:text-white hover:translate-x-1 transition-all cursor-pointer">
                  MMA Fight Gear
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('/category/fight-gear?sport=boxing')} className="hover:text-white hover:translate-x-1 transition-all cursor-pointer">
                  Boxing Pro Series
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('/category/fight-gear?sport=muay-thai')} className="hover:text-white hover:translate-x-1 transition-all cursor-pointer">
                  Muay Thai & K-1
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('/category/fight-gear?sport=grappling')} className="hover:text-white hover:translate-x-1 transition-all cursor-pointer">
                  No-Gi Grappling & BJJ
                </button>
              </li>
            </ul>
          </div>

          {/* Featured visual card */}
          <div className="bg-[#141414] border border-neutral-800 p-4 rounded relative overflow-hidden group">
            <div className="h-44 w-full overflow-hidden bg-neutral-900 rounded mb-3">
              <img 
                src={HOODIE_IMAGE} 
                alt="Octagon Heavyweight Hoodie" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
              />
            </div>
            <span className="text-[10px] font-mono uppercase bg-[#D71920] text-white px-2 py-0.5 rounded tracking-wider">
              {t('newDrop.title')}
            </span>
            <h5 className="font-bebas text-lg text-white mt-1">Heavyweight 460 GSM</h5>
            <p className="text-xs text-neutral-400 mb-3">
              {language === 'pl' ? 'Oficjalna odzież uliczna szyta w Polsce z najwyższej jakości dzianiny.' : language === 'en' ? 'Official streetwear manufactured in Poland with premium cotton.' : 'Officiële streetwear geproduceerd in Polen uit zwaar gekamd katoen.'}
            </p>
            <button 
              onClick={() => handleLinkClick('/category/heren')}
              className="text-xs font-condensed font-bold uppercase tracking-wider text-[#D71920] flex items-center gap-1 hover:underline cursor-pointer"
            >
              {t('sub.allHeren')} <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (category === 'fight-gear') {
    return (
      <div 
        onMouseLeave={onClose}
        className="absolute top-full left-0 w-full bg-[#0B0B0B]/98 backdrop-blur-xl border-b border-neutral-800 shadow-2xl py-8 px-6 z-40 transition-all duration-200"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h4 className="font-bebas text-lg tracking-wider text-[#FFFFFF] mb-4 border-l-2 border-[#D71920] pl-3">
              {t('mega.gloves')}
            </h4>
            <ul className="space-y-2.5 text-sm text-neutral-400">
              <li>
                <button onClick={() => handleLinkClick('/category/fight-gear?sub=bokshandschoenen')} className="hover:text-white hover:translate-x-1 transition-all cursor-pointer">
                  {t('sub.boxingGloves')}
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('/category/fight-gear?sub=mma-handschoenen')} className="hover:text-white hover:translate-x-1 transition-all cursor-pointer">
                  {t('sub.mmaGloves')}
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('/category/fight-gear?sub=kids-handschoenen')} className="hover:text-white hover:translate-x-1 transition-all cursor-pointer">
                  {language === 'pl' ? 'Rękawice Dziecięce Monkey' : language === 'en' ? 'Kids Monkey Boxing Gloves' : 'Kids Bokshandschoenen'}
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bebas text-lg tracking-wider text-[#FFFFFF] mb-4 border-l-2 border-neutral-700 pl-3">
              {t('mega.protection')}
            </h4>
            <ul className="space-y-2.5 text-sm text-neutral-400">
              <li>
                <button onClick={() => handleLinkClick('/category/fight-gear?sub=scheenbeschermers')} className="hover:text-white hover:translate-x-1 transition-all cursor-pointer">
                  {t('sub.shinGuards')}
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('/category/fight-gear?sub=hoofdbeschermers')} className="hover:text-white hover:translate-x-1 transition-all cursor-pointer">
                  {t('sub.headguards')}
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('/category/accessoires?sub=boksbandages')} className="hover:text-white hover:translate-x-1 transition-all cursor-pointer">
                  {t('sub.wraps')}
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('/category/fight-gear?sub=bescherming')} className="hover:text-white hover:translate-x-1 transition-all cursor-pointer">
                  {t('sub.mouthguards')}
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bebas text-lg tracking-wider text-[#FFFFFF] mb-4 border-l-2 border-neutral-700 pl-3">
              {t('mega.trainer')}
            </h4>
            <ul className="space-y-2.5 text-sm text-neutral-400">
              <li>
                <button onClick={() => handleLinkClick('/category/training?sub=focus-mitts')} className="hover:text-white hover:translate-x-1 transition-all cursor-pointer">
                  {t('sub.pads')}
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('/category/training?sub=bokszakken')} className="hover:text-white hover:translate-x-1 transition-all cursor-pointer">
                  {t('sub.heavyBags')}
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('/category/accessoires?sub=sporttassen')} className="hover:text-white hover:translate-x-1 transition-all cursor-pointer">
                  {t('sub.bags')}
                </button>
              </li>
            </ul>
          </div>

          {/* Featured visual card */}
          <div className="bg-[#141414] border border-neutral-800 p-4 rounded relative overflow-hidden group">
            <div className="h-44 w-full overflow-hidden bg-neutral-900 rounded mb-3">
              <img 
                src={CAMO_GLOVES_IMAGE} 
                alt="Legion Octagon Shadow Strike" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
              />
            </div>
            <span className="text-[10px] font-mono uppercase bg-[#D71920] text-white px-2 py-0.5 rounded tracking-wider">
              {t('bestsellers.title')}
            </span>
            <h5 className="font-bebas text-lg text-white mt-1">Legion Shadow Strike Camo</h5>
            <p className="text-xs text-neutral-400 mb-3">
              {language === 'pl' ? 'Oficjalny model z polskiego sklepu octagonshop.pl z ergonomicznym profilem.' : language === 'en' ? 'Direct import from Poland store octagonshop.pl with ergonomic lock.' : 'Direct geïmporteerd uit Polen via ons leverancierscontract.'}
            </p>
            <button 
              onClick={() => handleLinkClick('/category/fight-gear')}
              className="text-xs font-condensed font-bold uppercase tracking-wider text-[#D71920] flex items-center gap-1 hover:underline cursor-pointer"
            >
              {t('sub.allFightGear')} <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (category === 'dames') {
    return (
      <div 
        onMouseLeave={onClose}
        className="absolute top-full left-0 w-full bg-[#0B0B0B]/98 backdrop-blur-xl border-b border-neutral-800 shadow-2xl py-8 px-6 z-40 transition-all duration-200"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h4 className="font-bebas text-lg tracking-wider text-[#FFFFFF] mb-4 border-l-2 border-[#D71920] pl-3">
              {t('mega.womenApparel')}
            </h4>
            <ul className="space-y-2.5 text-sm text-neutral-400">
              <li>
                <button onClick={() => handleLinkClick('/category/dames?sub=leggings')} className="hover:text-white hover:translate-x-1 transition-all cursor-pointer">
                  {t('sub.leggings')}
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('/category/dames?sub=rashguards')} className="hover:text-white hover:translate-x-1 transition-all cursor-pointer">
                  {t('sub.rashguards')}
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('/category/dames?sub=bokshandschoenen')} className="hover:text-white hover:translate-x-1 transition-all cursor-pointer">
                  {language === 'pl' ? 'Rękawice Damskie Flower' : language === 'en' ? 'Women\'s Boxing Gloves Flower' : 'Dames Handschoenen Flower'}
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bebas text-lg tracking-wider text-[#FFFFFF] mb-4 border-l-2 border-neutral-700 pl-3">
              {t('mega.womenGear')}
            </h4>
            <ul className="space-y-2.5 text-sm text-neutral-400">
              <li>
                <button onClick={() => handleLinkClick('/category/fight-gear?sub=bokshandschoenen')} className="hover:text-white hover:translate-x-1 transition-all cursor-pointer">
                  {t('sub.boxingGloves')}
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('/category/fight-gear?sub=scheenbeschermers')} className="hover:text-white hover:translate-x-1 transition-all cursor-pointer">
                  {t('sub.shinGuards')}
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('/category/accessoires?sub=boksbandages')} className="hover:text-white hover:translate-x-1 transition-all cursor-pointer">
                  {t('sub.wraps')}
                </button>
              </li>
            </ul>
          </div>

          <div className="bg-[#141414] border border-neutral-800 p-4 rounded">
            <img src={LEGGINGS_IMAGE} alt="Women combat leggings" className="h-40 w-full object-cover rounded mb-3" />
            <h5 className="font-bebas text-lg text-white">Squat-Proof Combat Tights</h5>
            <p className="text-xs text-neutral-400 mb-3">
              {language === 'pl' ? '100% nieprześwitujące, stworzone do twardych treningów i kopnięć.' : language === 'en' ? '100% squat-proof, engineered for combat kicks and high mobility.' : '100% squat-proof, ontwikkeld voor harde trappen en vechtsport.'}
            </p>
            <button 
              onClick={() => handleLinkClick('/category/dames')}
              className="text-xs font-condensed font-bold uppercase text-[#D71920] flex items-center gap-1 hover:underline cursor-pointer"
            >
              {t('sub.allDames')} <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
};
