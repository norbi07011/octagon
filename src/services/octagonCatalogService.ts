import { 
  Product, 
  ProductCategory, 
  SportDiscipline, 
  OctagonRawSupplierProduct, 
  SupplierSyncConfig, 
  CatalogSyncResult, 
  SyncStepLog 
} from '../types';

import {
  HERO_IMAGE,
  BOXING_GLOVES_IMAGE,
  RASHGUARD_IMAGE,
  SHIN_GUARDS_IMAGE,
  HOODIE_IMAGE,
  TSHIRT_IMAGE,
  JOGGER_IMAGE,
  MMA_SHORTS_IMAGE,
  CAMO_GLOVES_IMAGE,
  HEADGUARD_IMAGE,
  DUFFLE_BAG_IMAGE,
  LEGGINGS_IMAGE,
  MUAY_THAI_SHORTS_IMAGE,
  WAIST_BAG_IMAGE,
  SNAPBACK_IMAGE,
  THAI_PADS_IMAGE,
  HEAVY_BAG_IMAGE,
  WINDBREAKER_IMAGE,
  BACKPACK_IMAGE,
  BEANIE_IMAGE
} from '../data/productImages';

// =========================================================================
// Default Configuration based on the user's wholesale contract with Poland
// =========================================================================
export const DEFAULT_SUPPLIER_SYNC_CONFIG: SupplierSyncConfig = {
  plnToEurRate: 4.30,                     // Average exchange rate PLN -> EUR
  wholesaleContractDiscountPct: 35,       // Wholesale discount tier off Poland retail
  targetProfitMarginPct: 35,              // Markup on wholesale cost to set EUR selling price
  dutchVatRatePct: 21,                    // Dutch standard VAT rate
  importOutletDealsAsSale: true,          // Flag outlet items as sale
  minStockLevelToImport: 1,               // Minimum stock threshold
  selectedCategories: []                  // Empty array = all categories
};

// =========================================================================
// 1. IMAGE MAPPING SERVICE
// Maps raw supplier image identifiers/tokens to optimized local & high-res image assets
// =========================================================================
export const mapSupplierImages = (
  rawKeys: string[], 
  category: ProductCategory, 
  subcategory: string,
  name: string
): string[] => {
  const lowerName = name.toLowerCase();

  // 1. Specific model image matches
  if (lowerName.includes('camo') || lowerName.includes('shadow strike')) {
    return [CAMO_GLOVES_IMAGE, BOXING_GLOVES_IMAGE];
  }
  if (lowerName.includes('kask') || lowerName.includes('headguard') || lowerName.includes('helmet')) {
    return [HEADGUARD_IMAGE, BOXING_GLOVES_IMAGE];
  }
  if (lowerName.includes('worek') || lowerName.includes('punching bag') || lowerName.includes('heavy bag')) {
    return [HEAVY_BAG_IMAGE, BOXING_GLOVES_IMAGE];
  }
  if (lowerName.includes('tarcze tajskie') || lowerName.includes('thai pads') || lowerName.includes('belly pad')) {
    return [THAI_PADS_IMAGE, BOXING_GLOVES_IMAGE];
  }
  if (lowerName.includes('plecak') || lowerName.includes('backpack')) {
    return [BACKPACK_IMAGE, DUFFLE_BAG_IMAGE];
  }
  if (lowerName.includes('torba') || lowerName.includes('duffle')) {
    return [DUFFLE_BAG_IMAGE, BACKPACK_IMAGE];
  }
  if (lowerName.includes('nerka') || lowerName.includes('saszetka') || lowerName.includes('waist') || lowerName.includes('crossbody')) {
    return [WAIST_BAG_IMAGE, DUFFLE_BAG_IMAGE];
  }
  if (lowerName.includes('snapback') || lowerName.includes('czapka z daszkiem') || lowerName.includes('curved')) {
    return [SNAPBACK_IMAGE, HOODIE_IMAGE];
  }
  if (lowerName.includes('beanie') || lowerName.includes('zimowa') || lowerName.includes('muts')) {
    return [BEANIE_IMAGE, HOODIE_IMAGE];
  }
  if (lowerName.includes('wiatrówka') || lowerName.includes('bomberka') || lowerName.includes('windbreaker') || lowerName.includes('kurtka') || lowerName.includes('bezrękawnik')) {
    return [WINDBREAKER_IMAGE, HOODIE_IMAGE, JOGGER_IMAGE];
  }
  if (lowerName.includes('legginsy') || lowerName.includes('legging') || lowerName.includes('biustonosz') || lowerName.includes('crop') || lowerName.includes('booty')) {
    return [LEGGINGS_IMAGE, RASHGUARD_IMAGE];
  }
  if (lowerName.includes('muay thai') || lowerName.includes('satin')) {
    return [MUAY_THAI_SHORTS_IMAGE, BOXING_GLOVES_IMAGE];
  }
  if (lowerName.includes('mma') && lowerName.includes('spodenki')) {
    return [MMA_SHORTS_IMAGE, RASHGUARD_IMAGE];
  }
  if (lowerName.includes('rashguard') || lowerName.includes('vale tudo')) {
    return [RASHGUARD_IMAGE, MMA_SHORTS_IMAGE];
  }
  if (lowerName.includes('bluza') || lowerName.includes('hoodie') || lowerName.includes('crewneck') || lowerName.includes('sweater')) {
    return [HOODIE_IMAGE, TSHIRT_IMAGE, JOGGER_IMAGE];
  }
  if (lowerName.includes('spodnie') || lowerName.includes('dresowe') || lowerName.includes('jogger') || lowerName.includes('cargo')) {
    return [JOGGER_IMAGE, HOODIE_IMAGE];
  }
  if (lowerName.includes('koszulka') || lowerName.includes('t-shirt') || lowerName.includes('tank top')) {
    return [TSHIRT_IMAGE, HOODIE_IMAGE];
  }
  if (lowerName.includes('ochraniacze piszczeli') || lowerName.includes('nagolenniki') || lowerName.includes('shin guard')) {
    return [SHIN_GUARDS_IMAGE, CAMO_GLOVES_IMAGE];
  }
  if (lowerName.includes('rękawice') || lowerName.includes('gloves') || lowerName.includes('handschoenen')) {
    return [BOXING_GLOVES_IMAGE, CAMO_GLOVES_IMAGE];
  }

  // 2. Category level fallbacks
  switch (category) {
    case 'fight-gear':
      return [BOXING_GLOVES_IMAGE, SHIN_GUARDS_IMAGE];
    case 'training':
      return [THAI_PADS_IMAGE, HEAVY_BAG_IMAGE];
    case 'accessoires':
      return [DUFFLE_BAG_IMAGE, WAIST_BAG_IMAGE];
    case 'dames':
      return [LEGGINGS_IMAGE, RASHGUARD_IMAGE];
    case 'kids':
      return [BOXING_GLOVES_IMAGE, TSHIRT_IMAGE];
    case 'heren':
    default:
      return [HOODIE_IMAGE, TSHIRT_IMAGE, JOGGER_IMAGE];
  }
};

// =========================================================================
// 2. PRICING & MARGIN MAPPING SERVICE
// Converts Polish supplier PLN pricing -> Euro pricing with wholesale margin
// =========================================================================
export interface MappedPricing {
  priceEur: number;
  compareAtPriceEur?: number;
  wholesaleCostEur: number;
  profitMarginEur: number;
  profitMarginPercent: number;
  currency: string;
}

export const mapSupplierPricing = (
  rawProduct: OctagonRawSupplierProduct, 
  config: SupplierSyncConfig
): MappedPricing => {
  const rate = config.plnToEurRate || 4.30;
  
  // Calculate wholesale cost in EUR (our buy price from Poland)
  const wholesaleCostEur = Number((rawProduct.wholesale_price_pln / rate).toFixed(2));
  
  // Calculate MSRP / Suggested Polish Retail converted to EUR
  const msrpEur = Number((rawProduct.suggested_retail_price_pln / rate).toFixed(2));
  
  // Target selling price with markup applied to wholesale cost
  const markupFactor = 1 + (config.targetProfitMarginPct / 100);
  let calculatedPriceEur = wholesaleCostEur * markupFactor;
  
  // Standardize price endings to realistic commerce price (.99 or .49)
  const integerPart = Math.floor(calculatedPriceEur);
  const decimalPart = calculatedPriceEur - integerPart;
  let finalPrice = decimalPart > 0.65 ? integerPart + 0.99 : integerPart + 0.49;
  
  if (finalPrice <= wholesaleCostEur) {
    finalPrice = Math.ceil(wholesaleCostEur) + 4.99;
  }
  
  // Compare at price for sale and outlet items
  let compareAtPrice: number | undefined = undefined;
  if (rawProduct.is_outlet || msrpEur > finalPrice) {
    compareAtPrice = Math.max(Number((msrpEur * 1.15).toFixed(0)) + 0.99, finalPrice + 9.99);
  }

  const profitMarginEur = Number((finalPrice - wholesaleCostEur).toFixed(2));
  const profitMarginPercent = Number(((profitMarginEur / finalPrice) * 100).toFixed(1));

  return {
    priceEur: Number(finalPrice.toFixed(2)),
    compareAtPriceEur: compareAtPrice ? Number(compareAtPrice.toFixed(2)) : undefined,
    wholesaleCostEur,
    profitMarginEur,
    profitMarginPercent,
    currency: 'EUR'
  };
};

// =========================================================================
// 3. CATEGORY & TAXONOMY MAPPING SERVICE
// Maps Polish supplier category tree to the store's strict ProductCategory & Subcategory
// =========================================================================
export interface MappedTaxonomy {
  category: ProductCategory;
  subcategory: string;
  subcategory_en: string;
  subcategory_pl: string;
  sport: SportDiscipline[];
  gender: 'men' | 'women' | 'unisex' | 'kids';
  badges: { type: 'new' | 'sale' | 'bestseller' | 'limited' | 'last-size'; label: string }[];
}

export const mapSupplierCategory = (
  rawProduct: OctagonRawSupplierProduct,
  config: SupplierSyncConfig
): MappedTaxonomy => {
  const path = (rawProduct.category_path || '').toLowerCase();
  const name = rawProduct.name_pl.toLowerCase();

  let category: ProductCategory = 'heren';
  let subcategory = 'Kleding';
  let subcategory_en = 'Apparel';
  let subcategory_pl = 'Odzież';
  let sport: SportDiscipline[] = ['fitness'];
  let gender: 'men' | 'women' | 'unisex' | 'kids' = rawProduct.gender || 'men';

  // 1. Gender / Kids Check
  if (rawProduct.gender === 'kids' || path.includes('dzieci') || path.includes('kids') || name.includes('dziecięc') || name.includes('kids') || name.includes('monkey')) {
    category = 'kids';
    gender = 'kids';
    if (name.includes('rękawic') || name.includes('gloves')) {
      subcategory = 'Kids Handschoenen';
      subcategory_en = 'Kids Boxing Gloves';
      subcategory_pl = 'Rękawice Dziecięce';
      sport = ['boxing', 'kickboxing'];
    } else if (name.includes('ochraniacz') || name.includes('shin')) {
      subcategory = 'Kids Bescherming';
      subcategory_en = 'Kids Protection';
      subcategory_pl = 'Ochraniacze Dziecięce';
      sport = ['kickboxing', 'karate'];
    } else {
      subcategory = 'Kids Kleding';
      subcategory_en = 'Kids Apparel';
      subcategory_pl = 'Odzież Dziecięca';
      sport = ['fitness', 'boxing'];
    }
  } 
  // 2. Women Check
  else if (rawProduct.gender === 'women' || path.includes('damsk') || path.includes('women') || name.includes('damsk') || name.includes('flower') || name.includes('leggins')) {
    category = 'dames';
    gender = 'women';
    sport = ['kickboxing', 'fitness', 'boxing'];
    if (name.includes('rękawic') || name.includes('gloves')) {
      subcategory = 'Bokshandschoenen';
      subcategory_en = 'Boxing Gloves';
      subcategory_pl = 'Rękawice Damskie';
    } else if (name.includes('leggins') || name.includes('tights')) {
      subcategory = 'Leggings';
      subcategory_en = 'Leggings';
      subcategory_pl = 'Legginsy';
    } else if (name.includes('biustonosz') || name.includes('bra') || name.includes('top')) {
      subcategory = 'Sport BH\'s';
      subcategory_en = 'Sports Bras';
      subcategory_pl = 'Top / Biustonosz';
    } else if (name.includes('hoodie') || name.includes('bluza')) {
      subcategory = 'Hoodies';
      subcategory_en = 'Hoodies';
      subcategory_pl = 'Bluzy Damskie';
    } else {
      subcategory = 'Shorts';
      subcategory_en = 'Shorts';
      subcategory_pl = 'Spodenki Damskie';
    }
  }
  // 3. Training & Heavy Gear Check
  else if (path.includes('worek') || path.includes('tarcze') || path.includes('trening') || name.includes('worek') || name.includes('punching bag') || name.includes('tarcze tajskie') || name.includes('belly pad') || name.includes('focus mitts')) {
    category = 'training';
    gender = 'unisex';
    sport = ['boxing', 'kickboxing', 'muay-thai', 'mma'];
    if (name.includes('worek') || name.includes('bag')) {
      subcategory = 'Bokszakken';
      subcategory_en = 'Punching Bags';
      subcategory_pl = 'Worki Treningowe';
    } else {
      subcategory = 'Trapkussens & Pads';
      subcategory_en = 'Thai Kick Pads';
      subcategory_pl = 'Tarcze Trenerskie';
    }
  }
  // 4. Combat Fight Gear
  else if (path.includes('rękawice') || path.includes('ochraniacze') || path.includes('rashguard') || path.includes('spodenki mma') || path.includes('muay thai') || name.includes('rękawice') || name.includes('rashguard') || name.includes('mma') || name.includes('kask') || name.includes('szczęki') || name.includes('nagolennik') || name.includes('krocza')) {
    category = 'fight-gear';
    if (name.includes('rękawice boks') || name.includes('boxing glove') || name.includes('royal') || name.includes('tournament') || name.includes('giant') || name.includes('victory') || name.includes('camo')) {
      subcategory = 'Bokshandschoenen';
      subcategory_en = 'Boxing Gloves';
      subcategory_pl = 'Rękawice Bokserskie';
      sport = ['boxing', 'kickboxing', 'muay-thai'];
    } else if (name.includes('rękawice mma') || name.includes('4oz') || name.includes('7oz') || name.includes('grappling')) {
      subcategory = 'MMA Handschoenen';
      subcategory_en = 'MMA Gloves';
      subcategory_pl = 'Rękawice MMA';
      sport = ['mma', 'grappling'];
    } else if (name.includes('rashguard') || name.includes('vale tudo')) {
      subcategory = 'Rashguards';
      subcategory_en = 'Rashguards';
      subcategory_pl = 'Rashguardy';
      sport = ['mma', 'grappling', 'kickboxing'];
    } else if (name.includes('muay thai') || name.includes('satin') || name.includes('tajskie')) {
      subcategory = 'Muay Thai Shorts';
      subcategory_en = 'Muay Thai Shorts';
      subcategory_pl = 'Spodenki Muay Thai';
      sport = ['muay-thai', 'kickboxing'];
    } else if (name.includes('spodenki') || name.includes('shorts')) {
      subcategory = 'MMA Shorts';
      subcategory_en = 'MMA Shorts';
      subcategory_pl = 'Spodenki MMA';
      sport = ['mma', 'grappling', 'kickboxing'];
    } else if (name.includes('piszczel') || name.includes('nagolennik') || name.includes('shin')) {
      subcategory = 'Scheenbeschermers';
      subcategory_en = 'Shin Guards';
      subcategory_pl = 'Ochraniacze Piszczeli';
      sport = ['kickboxing', 'muay-thai', 'mma'];
    } else if (name.includes('kask') || name.includes('headguard') || name.includes('helmet')) {
      subcategory = 'Hoofdbeschermers';
      subcategory_en = 'Headguards';
      subcategory_pl = 'Kaski Bokserskie';
      sport = ['boxing', 'kickboxing', 'mma'];
    } else {
      subcategory = 'Bescherming';
      subcategory_en = 'Protection';
      subcategory_pl = 'Ochraniacze & Akcesoria';
      sport = ['mma', 'boxing', 'kickboxing'];
    }
  }
  // 5. Accessories
  else if (path.includes('akcesoria') || name.includes('torba') || name.includes('plecak') || name.includes('nerka') || name.includes('czapka') || name.includes('shaker') || name.includes('owijki') || name.includes('skakanka') || name.includes('ręcznik')) {
    category = 'accessoires';
    gender = 'unisex';
    sport = ['fitness', 'boxing', 'mma'];
    if (name.includes('plecak') || name.includes('backpack')) {
      subcategory = 'Rugzakken';
      subcategory_en = 'Backpacks';
      subcategory_pl = 'Plecaki Sportowe';
    } else if (name.includes('torba') || name.includes('bag')) {
      subcategory = 'Sporttassen';
      subcategory_en = 'Gym Bags';
      subcategory_pl = 'Torby Sportowe';
    } else if (name.includes('nerka') || name.includes('saszetka') || name.includes('crossbody')) {
      subcategory = 'Heuptassen & Slings';
      subcategory_en = 'Waist & Sling Bags';
      subcategory_pl = 'Nerki i Saszetki';
    } else if (name.includes('czapka') || name.includes('snapback') || name.includes('beanie')) {
      subcategory = 'Caps & Mutsen';
      subcategory_en = 'Caps & Headwear';
      subcategory_pl = 'Czapki & Nakrycia Głowy';
    } else if (name.includes('owijki') || name.includes('wraps')) {
      subcategory = 'Boksbandages';
      subcategory_en = 'Hand Wraps';
      subcategory_pl = 'Owijki Bokserskie';
    } else if (name.includes('skakanka') || name.includes('rope')) {
      subcategory = 'Springtouwen';
      subcategory_en = 'Jump Ropes';
      subcategory_pl = 'Skakanki Bokserskie';
    } else if (name.includes('shaker') || name.includes('bidon')) {
      subcategory = 'Shakers & Bidons';
      subcategory_en = 'Bottles & Shakers';
      subcategory_pl = 'Shakery & Bidony';
    } else {
      subcategory = 'Accessoires';
      subcategory_en = 'Accessories';
      subcategory_pl = 'Akcesoria Treningowe';
    }
  }
  // 6. Men's Streetwear & Apparel
  else {
    category = 'heren';
    gender = 'men';
    sport = ['fitness', 'boxing', 'mma'];
    if (name.includes('kurtka') || name.includes('bomber') || name.includes('wiatrów') || name.includes('bezrękawnik') || name.includes('vest')) {
      subcategory = 'Jassen';
      subcategory_en = 'Jackets';
      subcategory_pl = 'Kurtki & Kamizelki';
    } else if (name.includes('bluza z kapturem') || name.includes('hoodie') || name.includes('kangurka')) {
      subcategory = 'Hoodies';
      subcategory_en = 'Hoodies';
      subcategory_pl = 'Bluzy Hoodie';
    } else if (name.includes('rozpinana') || name.includes('zip')) {
      subcategory = 'Hoodies';
      subcategory_en = 'Zip Hoodies';
      subcategory_pl = 'Bluzy Rozpinane';
    } else if (name.includes('crewneck') || name.includes('bez kaptura')) {
      subcategory = 'Sweaters';
      subcategory_en = 'Crewnecks';
      subcategory_pl = 'Bluzy Klasyczne';
    } else if (name.includes('spodnie') || name.includes('jogger') || name.includes('bojówki') || name.includes('cargo')) {
      subcategory = 'Broeken & Joggers';
      subcategory_en = 'Sweatpants';
      subcategory_pl = 'Spodnie Dresowe';
    } else if (name.includes('spodenki') || name.includes('shorts')) {
      subcategory = 'Shorts';
      subcategory_en = 'Shorts';
      subcategory_pl = 'Spodenki Dresowe';
    } else {
      subcategory = 'T-Shirts';
      subcategory_en = 'T-Shirts';
      subcategory_pl = 'Koszulki T-Shirt';
    }
  }

  // Generate badges based on collection & outlet
  const badges: { type: 'new' | 'sale' | 'bestseller' | 'limited' | 'last-size'; label: string }[] = [];
  if (rawProduct.is_outlet) {
    badges.push({ type: 'sale', label: 'OUTLET DEAL' });
  } else if (rawProduct.collection === 'Zęby' || name.includes('zęby')) {
    badges.push({ type: 'bestseller', label: 'LEGEND ZĘBY' });
  } else if (rawProduct.collection === 'Pasy' || name.includes('pasy')) {
    badges.push({ type: 'bestseller', label: 'PASY STRIPES' });
  } else if (name.includes('royal') || name.includes('gold')) {
    badges.push({ type: 'limited', label: 'GOLD EDITION' });
  } else {
    badges.push({ type: 'bestseller', label: 'OFFICIAL PL' });
  }

  return {
    category,
    subcategory,
    subcategory_en,
    subcategory_pl,
    sport,
    gender,
    badges
  };
};

// =========================================================================
// 4. COMPLETE SUPPLIER FEED (RAW OCTAGONSHOP.PL INVENTORY)
// Contains supplier inventory records with real Polish product definitions
// =========================================================================
export const OCTAGON_SUPPLIER_RAW_FEED: OctagonRawSupplierProduct[] = [
  // Boxing & MMA Fight Gear
  {
    supplier_sku: 'OCT-PL-GLV-01',
    name_pl: 'Skórzane Rękawice Bokserskie Octagon Pro Fight Czarno-Czerwone',
    name_en: 'Octagon Pro Fight Genuine Leather Boxing Gloves Black/Red',
    category_path: 'Sprzęt / Rękawice bokserskie',
    collection: 'Pro Series',
    wholesale_price_pln: 279.00,
    suggested_retail_price_pln: 529.00,
    is_outlet: false,
    stock_quantity: 45,
    available_sizes: ['10 OZ', '12 OZ', '14 OZ', '16 OZ'],
    colors: [{ name: 'Matte Black / Red', hex: '#D71920' }, { name: 'Carbon Black', hex: '#141414' }],
    material: '100% Skóra Bydlęca Volnerf & Pianka IMF',
    image_keys: ['product_boxing_gloves'],
    description_pl: 'Profesjonalne rękawice ze skóry bydlęcej z wielowarstwowym wkładem amortyzującym i szerokim mankietem stabilizującym nadgarstek. Oficjalny sprzęt turniejowy.',
    description_en: 'Professional cowhide boxing gloves with multi-layer IMF core and wide wrist stabilization strap.',
    short_description_pl: '100% naturalna skóra bydlęca z amortyzacją IMF.',
    discipline: 'Boks',
    gender: 'unisex',
    technical_specs: ['100% wyselekcjonowana skóra bydlęca', 'Pianka IMF o zróżnicowanej gęstości', 'Szeroki rzep 8cm stabilizujący nadgarstek', 'Perforacja dłoni zapewniająca wentylację']
  },
  {
    supplier_sku: 'OCT-PL-GLV-ROYAL',
    name_pl: 'Skórzane Rękawice Bokserskie Octagon Royal Black / Gold',
    name_en: 'Octagon Royal Genuine Leather Boxing Gloves Black/Gold',
    category_path: 'Sprzęt / Rękawice bokserskie',
    collection: 'Royal Series',
    wholesale_price_pln: 289.00,
    suggested_retail_price_pln: 549.00,
    is_outlet: false,
    stock_quantity: 28,
    available_sizes: ['10 OZ', '12 OZ', '14 OZ', '16 OZ'],
    colors: [{ name: 'Black / Metallic Gold', hex: '#D4AF37' }],
    material: '100% Skóra Bydlęca & Wkład Żelowy',
    image_keys: ['product_boxing_gloves', 'camo_gloves'],
    description_pl: 'Królewska edycja rękawic z metalicznym złotym logo i podwójnymi szwami. Precyzyjnie wyprofilowana komora dłoni.',
    discipline: 'Boks',
    gender: 'unisex'
  },
  {
    supplier_sku: 'OCT-PL-GLV-CAMO',
    name_pl: 'Rękawice Bokserskie Legion Octagon Shadow Strike Camo',
    name_en: 'Legion Octagon Shadow Strike Camo Boxing Gloves',
    category_path: 'Sprzęt / Rękawice bokserskie',
    collection: 'Legion Octagon',
    wholesale_price_pln: 219.00,
    suggested_retail_price_pln: 399.00,
    is_outlet: false,
    stock_quantity: 36,
    available_sizes: ['10 OZ', '12 OZ', '14 OZ', '16 OZ'],
    colors: [{ name: 'Shadow Camo / Red', hex: '#2B332A' }],
    material: 'Wzmocniona Skóra Syntetyczna Syn-Leather',
    image_keys: ['camo_gloves'],
    description_pl: 'Kultowy militarny wzór moro Shadow Strike z czerwonym emblematem Legion Octagon. Trwała skóra syntetyczna i wielowarstwowa pianka.',
    discipline: 'Kickboxing',
    gender: 'unisex'
  },
  {
    supplier_sku: 'OCT-PL-GLV-TOURN',
    name_pl: 'Rękawice Bokserskie Octagon Tournament Pro White / Red',
    name_en: 'Octagon Tournament Pro Boxing Gloves White/Red',
    category_path: 'Sprzęt / Rękawice bokserskie',
    collection: 'Tournament Pro',
    wholesale_price_pln: 239.00,
    suggested_retail_price_pln: 439.00,
    is_outlet: false,
    stock_quantity: 24,
    available_sizes: ['10 OZ', '12 OZ', '14 OZ'],
    colors: [{ name: 'White / Red Combat', hex: '#FFFFFF' }],
    material: 'Skóra Syntetyczna High-Grade & Siatka Wentylacyjna',
    image_keys: ['product_boxing_gloves'],
    description_pl: 'Turniejowy model o zwartej bryle ułatwiającej ciosy proste i gardę. Oddychająca siatka dłoni.',
    discipline: 'Boks',
    gender: 'unisex'
  },
  {
    supplier_sku: 'OCT-PL-GLV-GIANT',
    name_pl: 'Ciężkie Rękawice Sparingowe Legion Octagon Giant 16oz-18oz',
    name_en: 'Legion Octagon Giant Heavy Sparring Gloves 16oz-18oz',
    category_path: 'Sprzęt / Rękawice bokserskie',
    collection: 'Legion Octagon',
    wholesale_price_pln: 259.00,
    suggested_retail_price_pln: 479.00,
    is_outlet: false,
    stock_quantity: 19,
    available_sizes: ['14 OZ', '16 OZ', '18 OZ'],
    colors: [{ name: 'Matte Stealth Black', hex: '#0B0B0B' }],
    material: 'Matowa Skóra Naturalna & Gruba Pianka Sparingowa',
    image_keys: ['camo_gloves', 'product_boxing_gloves'],
    description_pl: 'Ponadwymiarowa pianka sparingowa stworzona z myślą o bezpieczeństwie sparingpartnera w wadze ciężkiej.',
    discipline: 'Boks',
    gender: 'unisex'
  },
  {
    supplier_sku: 'OCT-PL-MMA-CAGE4',
    name_pl: 'Zawodowe Rękawice MMA Octagon Pro Cage 4oz ze Skóry Naturalnej',
    name_en: 'Octagon Pro Cage 4oz Official MMA Competition Gloves',
    category_path: 'Sprzęt / Rękawice MMA',
    collection: 'Pro Series',
    wholesale_price_pln: 159.00,
    suggested_retail_price_pln: 289.00,
    is_outlet: false,
    stock_quantity: 32,
    available_sizes: ['S', 'M', 'L', 'XL'],
    colors: [{ name: 'Cage Black / Red', hex: '#D71920' }],
    material: '100% Skóra Bydlęca & Otwarta Dłoń',
    image_keys: ['product_boxing_gloves', 'mma_shorts'],
    description_pl: 'Oficjalne startowe rękawice 4oz do klatki MMA z odkrytą dłonią do chwytów i duszeń w parterze.',
    discipline: 'MMA',
    gender: 'unisex'
  },
  {
    supplier_sku: 'OCT-PL-MMA-HEX7',
    name_pl: 'Sparingowe Rękawice MMA Octagon Hex-Lock 7oz',
    name_en: 'Octagon Hex-Lock 7oz MMA Sparring Gloves',
    category_path: 'Sprzęt / Rękawice MMA',
    collection: 'Pro Series',
    wholesale_price_pln: 169.00,
    suggested_retail_price_pln: 299.00,
    is_outlet: false,
    stock_quantity: 26,
    available_sizes: ['S', 'M', 'L', 'XL'],
    colors: [{ name: 'Stealth Black', hex: '#141414' }],
    material: 'Skóra Syntetyczna & Podwójna Pianka Ochronna',
    image_keys: ['product_boxing_gloves'],
    description_pl: 'Hybrydowe rękawice 7oz z grubą poduszką na kostkach łączące stójkę z parterem.',
    discipline: 'MMA',
    gender: 'unisex'
  },

  // Protection & Helmets
  {
    supplier_sku: 'OCT-PL-SHN-PRO',
    name_pl: 'Ochraniacze Piszczeli Octagon Impact Shield Pro',
    name_en: 'Octagon Impact Shield Pro Shin Guards',
    category_path: 'Sprzęt / Ochraniacze',
    collection: 'Pro Series',
    wholesale_price_pln: 229.00,
    suggested_retail_price_pln: 419.00,
    is_outlet: false,
    stock_quantity: 30,
    available_sizes: ['M', 'L', 'XL'],
    colors: [{ name: 'Matte Black', hex: '#141414' }],
    material: 'Wzmocniona Skóra Syntetyczna & Pianka EVA High-Density',
    image_keys: ['product_shin_guards'],
    description_pl: 'Bezwzględne tłumienie uderzeń przy low-kickach i blokach piszczelami. Podwójne pasy na rzep.',
    discipline: 'Kickboxing',
    gender: 'unisex'
  },
  {
    supplier_sku: 'OCT-PL-HGD-LEG',
    name_pl: 'Kask Sparingowy Legion Octagon Pro z Ochroną Kości Policzkowych',
    name_en: 'Legion Octagon Pro Sparring Headguard Helmet',
    category_path: 'Sprzęt / Kaski',
    collection: 'Legion Octagon',
    wholesale_price_pln: 219.00,
    suggested_retail_price_pln: 399.00,
    is_outlet: false,
    stock_quantity: 22,
    available_sizes: ['M', 'L', 'XL'],
    colors: [{ name: 'Matte Black / Red', hex: '#D71920' }],
    material: '100% Skóra Naturalna & Rdzeń Amortyzujący',
    image_keys: ['headguard_helmet'],
    description_pl: 'Pełna ochrona czaszki i kości policzkowych podczas twardych sparingów bokserskich i K-1.',
    discipline: 'Boks',
    gender: 'unisex'
  },

  // Fightwear / Rashguards & Shorts
  {
    supplier_sku: 'OCT-PL-RSH-ZEBY-SS',
    name_pl: 'Kultowy Rashguard Octagon "Zęby" Krótki Rękaw',
    name_en: 'Octagon "Teeth" Short Sleeve Combat Rashguard Pro',
    category_path: 'Fightwear / Rashguardy',
    collection: 'Zęby',
    wholesale_price_pln: 119.00,
    suggested_retail_price_pln: 219.00,
    is_outlet: false,
    stock_quantity: 60,
    available_sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [{ name: 'Black / Red Teeth', hex: '#D71920' }, { name: 'Black / White Teeth', hex: '#FFFFFF' }],
    material: '85% Poliester, 15% Elastan Druk Sublimacyjny',
    image_keys: ['product_rashguard_pro'],
    description_pl: 'Najbardziej rozpoznawalny wzór marki Octagon z oferty octagonshop.pl. Legendarny motyw "Zęby" w trwałym druku sublimacyjnym.',
    discipline: 'MMA',
    gender: 'men'
  },
  {
    supplier_sku: 'OCT-PL-RSH-ZEBY-LS',
    name_pl: 'Kultowy Rashguard Octagon "Zęby" Długi Rękaw',
    name_en: 'Octagon "Teeth" Long Sleeve Combat Rashguard Pro',
    category_path: 'Fightwear / Rashguardy',
    collection: 'Zęby',
    wholesale_price_pln: 129.00,
    suggested_retail_price_pln: 239.00,
    is_outlet: false,
    stock_quantity: 45,
    available_sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [{ name: 'Black / Red Teeth', hex: '#D71920' }],
    material: '85% Poliester, 15% Elastan Termoaktywny',
    image_keys: ['product_rashguard_pro'],
    description_pl: 'Długi rękaw kultowego modelu "Zęby". Pełna ochrona przed otarciami na macie i podwijaniem dzięki silikonowej taśmie.',
    discipline: 'Grappling',
    gender: 'men'
  },
  {
    supplier_sku: 'OCT-PL-SHT-ZEBY',
    name_pl: 'Spodenki do MMA i Grapplingu Octagon "Zęby" Ripstop',
    name_en: 'Octagon "Teeth" Sublimated MMA & Grappling Fight Shorts',
    category_path: 'Fightwear / Spodenki MMA',
    collection: 'Zęby',
    wholesale_price_pln: 129.00,
    suggested_retail_price_pln: 239.00,
    is_outlet: false,
    stock_quantity: 40,
    available_sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [{ name: 'Black / Red Teeth', hex: '#D71920' }],
    material: 'Micro-Ripstop Poliester z Elastycznym Krokiem',
    image_keys: ['mma_shorts'],
    description_pl: 'Spodenki do kompletu z kultowym rashguardem "Zęby". Niezniszczalny nadruk sublimacyjny, materiał ripstop i głębokie rozcięcia.',
    discipline: 'MMA',
    gender: 'men'
  },

  // Streetwear Hoodies & T-Shirts
  {
    supplier_sku: 'OCT-PL-HD-FC',
    name_pl: 'Ciężka Bluza z Kapturem Octagon Fight Club 460 GSM',
    name_en: 'Octagon Fight Club Heavyweight 460 GSM Kangaroo Hoodie',
    category_path: 'Odzież męska / Bluzy',
    collection: 'Fight Club',
    wholesale_price_pln: 189.00,
    suggested_retail_price_pln: 349.00,
    is_outlet: false,
    stock_quantity: 50,
    available_sizes: ['S', 'M', 'L', 'XL', 'XXL', '3XL'],
    colors: [{ name: 'Onyx Deep Black', hex: '#0B0B0B' }],
    material: '80% Czesana Bawełna, 20% Poliester (460 GSM)',
    image_keys: ['hoodie_heavyweight'],
    description_pl: 'Duma kolekcji ulicznej Octagon szyta w Polsce. Niezwykle gruba dzianina 460 GSM ze szczotkowanym polarem wewnątrz.',
    discipline: 'Streetwear',
    gender: 'men'
  },
  {
    supplier_sku: 'OCT-PL-HD-PASY',
    name_pl: 'Bluza z Kapturem Octagon "Pasy" 460 GSM Kangurka',
    name_en: 'Octagon "Stripes" Heavyweight 460 GSM Kangaroo Hoodie',
    category_path: 'Odzież męska / Bluzy',
    collection: 'Pasy',
    wholesale_price_pln: 189.00,
    suggested_retail_price_pln: 349.00,
    is_outlet: false,
    stock_quantity: 38,
    available_sizes: ['S', 'M', 'L', 'XL', 'XXL', '3XL'],
    colors: [{ name: 'Black / Red Stripes', hex: '#D71920' }],
    material: '80% Bawełna, 20% Poliester (460 GSM)',
    image_keys: ['hoodie_heavyweight'],
    description_pl: 'Kultowy wzór z szerokimi pasami na piersi i rękawach. Gruba dzianina 460 GSM, podwójny kaptur i metalowe oczka.',
    discipline: 'Streetwear',
    gender: 'men'
  },
  {
    supplier_sku: 'OCT-PL-TSH-CLS',
    name_pl: 'Koszulka Męska Octagon Classic Logo 210g 100% Bawełna',
    name_en: 'Octagon Classic Logo 100% Combed Cotton T-Shirt 210 GSM',
    category_path: 'Odzież męska / Koszulki',
    collection: 'Classic',
    wholesale_price_pln: 79.00,
    suggested_retail_price_pln: 149.00,
    is_outlet: false,
    stock_quantity: 75,
    available_sizes: ['S', 'M', 'L', 'XL', 'XXL', '3XL'],
    colors: [{ name: 'Pure Black', hex: '#0B0B0B' }, { name: 'Combat Red', hex: '#D71920' }, { name: 'White Edition', hex: '#FFFFFF' }],
    material: '100% Czesana Bawełna Ringspun (210 GSM)',
    image_keys: ['tshirt_classic'],
    description_pl: 'Klasyczny t-shirt Octagon szyty w Polsce ze 100% czesanej bawełny ringspun o gramaturze 210 g/m².',
    discipline: 'Streetwear',
    gender: 'men'
  },
  {
    supplier_sku: 'OCT-PL-TSH-ZEBY',
    name_pl: 'Koszulka Męska Octagon "Zęby" Czarno-Czerwona 210g',
    name_en: 'Octagon "Teeth" 100% Cotton T-Shirt Black/Red 210 GSM',
    category_path: 'Odzież męska / Koszulki',
    collection: 'Zęby',
    wholesale_price_pln: 79.00,
    suggested_retail_price_pln: 149.00,
    is_outlet: false,
    stock_quantity: 80,
    available_sizes: ['S', 'M', 'L', 'XL', 'XXL', '3XL'],
    colors: [{ name: 'Pure Black / Red', hex: '#D71920' }],
    material: '100% Czesana Bawełna (210 GSM)',
    image_keys: ['tshirt_classic'],
    description_pl: 'Kultowy model koszulki z motywem "Zęby". Wytrzymały sitodruk, który nie pęka i nie spiera się.',
    discipline: 'Streetwear',
    gender: 'men'
  },
  {
    supplier_sku: 'OCT-PL-JOG-CLS',
    name_pl: 'Spodnie Dresowe Octagon Combat Jogger Heavyweight 420g',
    name_en: 'Octagon Combat Heavyweight Cargo Jogger Sweatpants 420 GSM',
    category_path: 'Odzież męska / Spodnie i spodenki',
    collection: 'Classic',
    wholesale_price_pln: 169.00,
    suggested_retail_price_pln: 309.00,
    is_outlet: false,
    stock_quantity: 40,
    available_sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [{ name: 'Stealth Black', hex: '#0B0B0B' }, { name: 'Melange Grey', hex: '#333333' }],
    material: '80% Bawełna, 20% Poliester (420 GSM)',
    image_keys: ['sweatpants_jogger'],
    description_pl: 'Ciężkie spodnie dresowe z kieszeniami na wodoodporny suwak, ściągaczami w kostkach i haftowaną tarczą.',
    discipline: 'Streetwear',
    gender: 'men'
  },

  // Equipment & Accessories
  {
    supplier_sku: 'OCT-PL-BAG-150',
    name_pl: 'Profesjonalny Worek Bokserski Octagon Heavy Bag 150cm (45kg)',
    name_en: 'Octagon Pro Heavy Boxing Punching Bag 150cm / 45kg',
    category_path: 'Trening / Worki i tarcze',
    collection: 'Pro Series',
    wholesale_price_pln: 369.00,
    suggested_retail_price_pln: 699.00,
    is_outlet: false,
    stock_quantity: 15,
    available_sizes: ['150cm (ca. 45kg)'],
    colors: [{ name: 'Fight Black / Red', hex: '#D71920' }],
    material: 'Wzmocniony Plawil 900g & Łańcuchy Stalowe z Krętlikiem',
    image_keys: ['heavy_bag'],
    description_pl: 'Niezniszczalny profesjonalny worek treningowy szyty w Polsce. Stalowy 4-ramienny łańcuch z krętlikiem zapobiegającym skręcaniu.',
    discipline: 'Boks',
    gender: 'unisex'
  },
  {
    supplier_sku: 'OCT-PL-PAD-THAI',
    name_pl: 'Skórzane Profilowane Tarcze Tajskie Octagon Pro Kick Pads (Para)',
    name_en: 'Octagon Pro Curved Leather Muay Thai Kicking Pads (Pair)',
    category_path: 'Trening / Worki i tarcze',
    collection: 'Pro Series',
    wholesale_price_pln: 329.00,
    suggested_retail_price_pln: 619.00,
    is_outlet: false,
    stock_quantity: 18,
    available_sizes: ['Standard Pro Size (Paar)'],
    colors: [{ name: 'Matte Black / Red Target', hex: '#D71920' }],
    material: '100% Gruba Skóra Bydlęca & Wielowarstwowy Wkład',
    image_keys: ['thai_pads'],
    description_pl: 'Profesjonalne tarcze tajskie do kopnięć low-kick, middle-kick oraz uderzeń kolanami. Podwójne pasy na rzep.',
    discipline: 'Muay Thai',
    gender: 'unisex'
  },
  {
    supplier_sku: 'OCT-PL-NRK-TAC',
    name_pl: 'Saszetka Biodrowa / Nerka na Ramię Octagon Tactical Logo',
    name_en: 'Octagon Tactical Streetwear Waist Bag / Crossbody Sling',
    category_path: 'Akcesoria / Torby',
    collection: 'Streetwear',
    wholesale_price_pln: 79.00,
    suggested_retail_price_pln: 149.00,
    is_outlet: false,
    stock_quantity: 70,
    available_sizes: ['One Size (Verstelbaar)'],
    colors: [{ name: 'Pure Tactical Black', hex: '#0B0B0B' }],
    material: '100% Wodoodporna Cordura Poliester',
    image_keys: ['waist_bag'],
    description_pl: 'Kultowa nerka z mocnej Cordury z haftowanym logo Octagon. Dwie komory na solidne zamki i mocna klamra zatrzaskowa.',
    discipline: 'Streetwear',
    gender: 'unisex'
  },
  {
    supplier_sku: 'OCT-PL-BPK-TAC',
    name_pl: 'Plecak Sportowy Octagon Tactical z Uchwytem na Rękawice',
    name_en: 'Octagon Tactical Sports Backpack with Boxing Glove Straps',
    category_path: 'Akcesoria / Torby',
    collection: 'Streetwear',
    wholesale_price_pln: 169.00,
    suggested_retail_price_pln: 319.00,
    is_outlet: false,
    stock_quantity: 35,
    available_sizes: ['35 LITER'],
    colors: [{ name: 'Tactical Black / Red', hex: '#D71920' }],
    material: 'Nylon Balistyczny 900D Cordura',
    image_keys: ['backpack'],
    description_pl: 'Taktyczny plecak sportowy stworzony dla zawodników z zewnętrznym uchwytem na rękawice bokserskie i kieszenią na laptopa.',
    discipline: 'Boks',
    gender: 'unisex'
  },
  {
    supplier_sku: 'OCT-PL-CAP-3D',
    name_pl: 'Czapka z Daszkiem Snapback Octagon 3D Logo',
    name_en: 'Octagon 3D Raised Logo Streetwear Snapback Cap',
    category_path: 'Akcesoria / Nakrycia głowy',
    collection: 'Streetwear',
    wholesale_price_pln: 74.00,
    suggested_retail_price_pln: 139.00,
    is_outlet: false,
    stock_quantity: 55,
    available_sizes: ['One Size (Snapback)'],
    colors: [{ name: 'Black / Red 3D', hex: '#D71920' }],
    material: '80% Akryl, 20% Wełna',
    image_keys: ['snapback'],
    description_pl: 'Czarna czapka typu snapback z grubym, wypukłym haftem 3D logo Octagon Fight Brand i prostym daszkiem.',
    discipline: 'Streetwear',
    gender: 'unisex'
  },
  {
    supplier_sku: 'OCT-PL-HAT-BEANIE',
    name_pl: 'Zimowa Czapka Beanie Octagon Logo Dzianinowa Czarna',
    name_en: 'Octagon Ribbed Knit Winter Beanie Hat Black',
    category_path: 'Akcesoria / Nakrycia głowy',
    collection: 'Streetwear',
    wholesale_price_pln: 59.00,
    suggested_retail_price_pln: 109.00,
    is_outlet: false,
    stock_quantity: 65,
    available_sizes: ['One Size Fits All'],
    colors: [{ name: 'Pure Black', hex: '#0B0B0B' }],
    material: '100% Miękka Dzianina Akrylowa',
    image_keys: ['beanie'],
    description_pl: 'Ciepła podwójna czapka zimowa z wywinięciem i czerwoną naszywką Octagon Fight.',
    discipline: 'Streetwear',
    gender: 'unisex'
  },

  // -------------------------------------------------------------
  // Additional Muay Thai, Vale Tudo & Combat Fightwear
  // -------------------------------------------------------------
  {
    supplier_sku: 'OCT-PL-SHT-THAI',
    name_pl: 'Tradycyjne Spodenki Muay Thai Octagon Satin Kevlar Black/Red',
    name_en: 'Octagon Traditional Satin Kevlar Muay Thai Fight Shorts',
    category_path: 'Fightwear / Spodenki Muay Thai',
    collection: 'Pro Series',
    wholesale_price_pln: 139.00,
    suggested_retail_price_pln: 259.00,
    is_outlet: false,
    stock_quantity: 34,
    available_sizes: ['S', 'M', 'L', 'XL'],
    colors: [{ name: 'Black / Gold / Red', hex: '#D71920' }],
    material: 'Heavyweight Satin z Wstawkami Kevlar i Haftem 3D',
    image_keys: ['muay_thai_shorts'],
    description_pl: 'Autentyczne spodenki do boksu tajskiego z szerokim ściągaczem 8-pasmowym i wycięciami na biodrach ułatwiającymi wysokie kopnięcia i klincz.',
    discipline: 'Muay Thai',
    gender: 'unisex'
  },
  {
    supplier_sku: 'OCT-PL-SHT-VALETUDO',
    name_pl: 'Krótkie Spodenki Kompresyjne Vale Tudo Octagon Fight Black',
    name_en: 'Octagon Vale Tudo Compression Short Fight Shorts Black',
    category_path: 'Fightwear / Spodenki Vale Tudo',
    collection: 'Pro Series',
    wholesale_price_pln: 119.00,
    suggested_retail_price_pln: 219.00,
    is_outlet: false,
    stock_quantity: 28,
    available_sizes: ['S', 'M', 'L', 'XL'],
    colors: [{ name: 'Stealth Black', hex: '#141414' }],
    material: 'Podwójnie Tkany Spandex & Poliester z Płaskimi Szwami',
    image_keys: ['mma_shorts'],
    description_pl: 'Krótkie spodenki kompresyjne typu Vale Tudo zapewniające maksymalną swobodę w parterze bez ryzyka chwytania za materiał.',
    discipline: 'Grappling',
    gender: 'men'
  },
  {
    supplier_sku: 'OCT-PL-RSH-ARMIA',
    name_pl: 'Termoaktywny Rashguard Octagon "Armia" Moro Wojskowe',
    name_en: 'Octagon "Army" Military Camo Performance Rashguard',
    category_path: 'Fightwear / Rashguardy',
    collection: 'Armia',
    wholesale_price_pln: 129.00,
    suggested_retail_price_pln: 239.00,
    is_outlet: false,
    stock_quantity: 42,
    available_sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [{ name: 'Tactical Camo Green', hex: '#3B443B' }],
    material: '88% Poliester, 12% Elastan Termoaktywny Dry-Tech',
    image_keys: ['product_rashguard_pro'],
    description_pl: 'Militarny motyw kamuflażu z orłem i godłem Octagon. Odprowadza wilgoć i utrzymuje stałą temperaturę mięśni.',
    discipline: 'MMA',
    gender: 'men'
  },
  {
    supplier_sku: 'OCT-PL-RSH-ARMOR',
    name_pl: 'Rashguard Kompresyjny Octagon Armor Titanium Grey Długi Rękaw',
    name_en: 'Octagon Armor Titanium Compression Rashguard Long Sleeve',
    category_path: 'Fightwear / Rashguardy',
    collection: 'Armor',
    wholesale_price_pln: 135.00,
    suggested_retail_price_pln: 249.00,
    is_outlet: false,
    stock_quantity: 36,
    available_sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [{ name: 'Titanium Grey / Carbon', hex: '#4A4A4A' }],
    material: 'Gęsty Splot Kompresyjny 4-Way Stretch',
    image_keys: ['product_rashguard_pro'],
    description_pl: 'Zaawansowany technologicznie rashguard ze strefami wentylacji pod pachami i wzmocnionymi szwami ryglowanymi.',
    discipline: 'Grappling',
    gender: 'men'
  },

  // -------------------------------------------------------------
  // Heavy Gear & Coaching Equipment
  // -------------------------------------------------------------
  {
    supplier_sku: 'OCT-PL-BAG-180',
    name_pl: 'Skórzany Worek Bokserski Octagon Heavy Bag 180cm (60kg)',
    name_en: 'Octagon Heavy Leather Punching Bag 180cm / 60kg Banana Bag',
    category_path: 'Trening / Worki i tarcze',
    collection: 'Pro Series',
    wholesale_price_pln: 439.00,
    suggested_retail_price_pln: 829.00,
    is_outlet: false,
    stock_quantity: 12,
    available_sizes: ['180cm (ca. 60kg)'],
    colors: [{ name: 'Matte Black / Red Print', hex: '#D71920' }],
    material: 'Skóra Pławił 950g & Stalowe Zblocze Obrotowe',
    image_keys: ['heavy_bag'],
    description_pl: 'Długi worek typu Banana Bag idealny do low-kicków i ciosów na korpus. Szyty podwójną nicią tytanową.',
    discipline: 'Kickboxing',
    gender: 'unisex'
  },
  {
    supplier_sku: 'OCT-PL-PAD-MITTS',
    name_pl: 'Profilowane Łapy Trenera Octagon Gel Focus Mitts (Para)',
    name_en: 'Octagon Curved Coach Gel Focus Punching Mitts (Pair)',
    category_path: 'Trening / Worki i tarcze',
    collection: 'Pro Series',
    wholesale_price_pln: 219.00,
    suggested_retail_price_pln: 399.00,
    is_outlet: false,
    stock_quantity: 22,
    available_sizes: ['Standard Coach Size'],
    colors: [{ name: 'Black / Red Bullseye', hex: '#D71920' }],
    material: 'Naturalna Skóra Bydlęca & Wkładka Żelowa na Dłoń',
    image_keys: ['thai_pads'],
    description_pl: 'Wyprofilowane łapy bokserskie z kulą podtrzymującą dłoń i poduszką osłaniającą nadgarstek trenera.',
    discipline: 'Boks',
    gender: 'unisex'
  },
  {
    supplier_sku: 'OCT-PL-PAD-BELLY',
    name_pl: 'Pas Trenerski na Tułów Octagon Heavy Body Shield Belly Pad',
    name_en: 'Octagon Heavy Body Shield Coach Belly Protector Pad',
    category_path: 'Trening / Worki i tarcze',
    collection: 'Pro Series',
    wholesale_price_pln: 349.00,
    suggested_retail_price_pln: 649.00,
    is_outlet: false,
    stock_quantity: 10,
    available_sizes: ['L / XL Verstelbaar'],
    colors: [{ name: 'Black / White Target', hex: '#FFFFFF' }],
    material: 'Wielowarstwowa Płyta Tłumiąca & Skóra Syn-Pro',
    image_keys: ['thai_pads'],
    description_pl: 'Pancerz trenerski absorbujący najcięższe uderzenia hakami na wątrobę i kopnięcia teep na korpus.',
    discipline: 'Muay Thai',
    gender: 'unisex'
  },

  // -------------------------------------------------------------
  // Protection: Mouthguard, Groin, Shin
  // -------------------------------------------------------------
  {
    supplier_sku: 'OCT-PL-MTH-GEL',
    name_pl: 'Żelowy Ochraniacz Szczęki Octagon Gel-Fit Dual Density',
    name_en: 'Octagon Dual Density Gel-Fit Boil & Bite Mouthguard',
    category_path: 'Sprzęt / Ochraniacze',
    collection: 'Pro Series',
    wholesale_price_pln: 49.00,
    suggested_retail_price_pln: 89.00,
    is_outlet: false,
    stock_quantity: 90,
    available_sizes: ['Senior (12+)'],
    colors: [{ name: 'Clear / Red Gel', hex: '#D71920' }, { name: 'Black / White', hex: '#141414' }],
    material: 'Spożywczy Silikon Medyczny & Rdzeń Żelowy',
    image_keys: ['product_shin_guards'],
    description_pl: 'Podwójna warstwa tłumiąca siłę uderzenia w zęby i żuchwę. Kanał oddechowy ułatwiający dotlenienie.',
    discipline: 'Boks',
    gender: 'unisex'
  },
  {
    supplier_sku: 'OCT-PL-GROIN-PRO',
    name_pl: 'Suspensorium / Męski Ochraniacz Krocza Octagon Cup Pro',
    name_en: 'Octagon Cup Pro Athletic Groin Guard Supporter',
    category_path: 'Sprzęt / Ochraniacze',
    collection: 'Pro Series',
    wholesale_price_pln: 59.00,
    suggested_retail_price_pln: 109.00,
    is_outlet: false,
    stock_quantity: 60,
    available_sizes: ['M', 'L', 'XL'],
    colors: [{ name: 'Stealth Black', hex: '#141414' }],
    material: 'Oddychająca Siatka Mesh & Twarda Wkładka Poliwęglanowa',
    image_keys: ['mma_shorts'],
    description_pl: 'Anatomiczna wkładka z gumowymi rantami amortyzującymi w elastycznych majtkach treningowych.',
    discipline: 'MMA',
    gender: 'men'
  },

  // -------------------------------------------------------------
  // Outerwear, Jackets & Extended Streetwear
  // -------------------------------------------------------------
  {
    supplier_sku: 'OCT-PL-JKT-WIND',
    name_pl: 'Przeciwdeszczowa Kurtka Wiatrówka Octagon Combat Shell',
    name_en: 'Octagon Combat Shell Technical Water-Repellent Windbreaker',
    category_path: 'Odzież męska / Kurtki',
    collection: 'Combat Tech',
    wholesale_price_pln: 219.00,
    suggested_retail_price_pln: 399.00,
    is_outlet: false,
    stock_quantity: 32,
    available_sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [{ name: 'Matte Black / Red Accent', hex: '#D71920' }],
    material: '100% Wodoodporny Ripstop z Membraną 5000mm',
    image_keys: ['windbreaker'],
    description_pl: 'Lekka, techniczna wiatrówka ze zgrzewanymi szwami, kapturem ze ściągaczami i dyskretnym logo Octagon na piersi.',
    discipline: 'Streetwear',
    gender: 'men'
  },
  {
    supplier_sku: 'OCT-PL-CRW-PASY',
    name_pl: 'Klasyczna Bluza Crewneck Octagon "Pasy" 420 GSM Bez Kaptura',
    name_en: 'Octagon "Stripes" Heavyweight 420 GSM Crewneck Sweatshirt',
    category_path: 'Odzież męska / Bluzy',
    collection: 'Pasy',
    wholesale_price_pln: 169.00,
    suggested_retail_price_pln: 309.00,
    is_outlet: false,
    stock_quantity: 44,
    available_sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [{ name: 'Deep Black / Red', hex: '#D71920' }],
    material: '80% Czesana Bawełna, 20% Poliester (420 GSM)',
    image_keys: ['hoodie_heavyweight'],
    description_pl: 'Ciężki crewneck bez kaptura z charakterystycznymi pasami i miękkim wykończeniem antypillingowym.',
    discipline: 'Streetwear',
    gender: 'men'
  },
  {
    supplier_sku: 'OCT-PL-HD-ZIP',
    name_pl: 'Rozpinana Bluza z Kapturem Octagon Tactical Full-Zip 460g',
    name_en: 'Octagon Tactical Full-Zip Heavyweight 460 GSM Hoodie',
    category_path: 'Odzież męska / Bluzy',
    collection: 'Tactical',
    wholesale_price_pln: 199.00,
    suggested_retail_price_pln: 369.00,
    is_outlet: false,
    stock_quantity: 36,
    available_sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [{ name: 'Black Metal-Zip', hex: '#141414' }],
    material: 'Gruba Bawełna 460 GSM & Metalowy Suwak YKK',
    image_keys: ['hoodie_heavyweight'],
    description_pl: 'Rozpinana wersja ciężkiej bluzy Octagon z dwustronnym metalowym suwakiem i głębokimi kieszeniami.',
    discipline: 'Streetwear',
    gender: 'men'
  },
  {
    supplier_sku: 'OCT-PL-TSH-BARCODE',
    name_pl: 'Koszulka Męska Octagon Barcode Streetwear 210g Czarna',
    name_en: 'Octagon Barcode Streetwear Graphic T-Shirt 210 GSM',
    category_path: 'Odzież męska / Koszulki',
    collection: 'Streetwear',
    wholesale_price_pln: 79.00,
    suggested_retail_price_pln: 149.00,
    is_outlet: false,
    stock_quantity: 65,
    available_sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [{ name: 'Black / Red Barcode', hex: '#D71920' }],
    material: '100% Czesana Bawełna Ringspun',
    image_keys: ['tshirt_classic'],
    description_pl: 'Uliczny nadruk kodu kreskowego z logo Octagon na plecach i dyskretny emblemat na piersi.',
    discipline: 'Streetwear',
    gender: 'men'
  },

  // -------------------------------------------------------------
  // Women's Collection (Kolekcja Damska)
  // -------------------------------------------------------------
  {
    supplier_sku: 'OCT-PL-LADY-LEGG',
    name_pl: 'Bezszwowe Legginsy Kompresyjne Octagon Women High-Waist Black',
    name_en: 'Octagon Women High-Waist Seamless Compression Leggings Black',
    category_path: 'Damskie / Legginsy',
    collection: 'Women Pro',
    wholesale_price_pln: 139.00,
    suggested_retail_price_pln: 259.00,
    is_outlet: false,
    stock_quantity: 48,
    available_sizes: ['XS', 'S', 'M', 'L'],
    colors: [{ name: 'Deep Black / Rose Gold', hex: '#E0BFB8' }],
    material: '87% Poliamid, 13% Elastan Squat-Proof Seamless',
    image_keys: ['leggings'],
    description_pl: 'Modelujące legginsy z wysokim stanem podtrzymującym brzuch. W 100% kryjące przy przysiadach i kopnięciach.',
    discipline: 'Fitness',
    gender: 'women'
  },
  {
    supplier_sku: 'OCT-PL-LADY-TOP',
    name_pl: 'Sportowy Biustonosz / Crop Top Octagon Women Pro Support',
    name_en: 'Octagon Women High-Impact Sports Bra & Training Crop Top',
    category_path: 'Damskie / Biustonosze i topy',
    collection: 'Women Pro',
    wholesale_price_pln: 99.00,
    suggested_retail_price_pln: 189.00,
    is_outlet: false,
    stock_quantity: 40,
    available_sizes: ['XS', 'S', 'M', 'L'],
    colors: [{ name: 'Black / Rose Gold', hex: '#E0BFB8' }],
    material: 'Oddychająca Mikrofibra z Wyjmowanymi Wkładkami',
    image_keys: ['leggings', 'product_rashguard_pro'],
    description_pl: 'Mocne trzymanie biustu podczas intensywnych treningów uderzanych i skakania na skakance.',
    discipline: 'Kickboxing',
    gender: 'women'
  },
  {
    supplier_sku: 'OCT-PL-GLV-LADY',
    name_pl: 'Damskie Rękawice Bokserskie Octagon Queen Fight Black & Rose Gold',
    name_en: 'Octagon Queen Fight Women Boxing Gloves Black & Rose Gold',
    category_path: 'Damskie / Rękawice bokserskie',
    collection: 'Women Pro',
    wholesale_price_pln: 209.00,
    suggested_retail_price_pln: 389.00,
    is_outlet: false,
    stock_quantity: 26,
    available_sizes: ['10 OZ', '12 OZ'],
    colors: [{ name: 'Black / Rose Gold', hex: '#E0BFB8' }],
    material: 'Wytrzymała Skóra Syn-Leather z Węższym Krojem Dłoni',
    image_keys: ['product_boxing_gloves'],
    description_pl: 'Zwężony profil komory dłoni zaprojektowany z myślą o anatomii kobiecej dłoni i nadgarstka.',
    discipline: 'Boks',
    gender: 'women'
  },

  // -------------------------------------------------------------
  // Kids Collection (Kolekcja Dziecięca)
  // -------------------------------------------------------------
  {
    supplier_sku: 'OCT-PL-GLV-KIDS',
    name_pl: 'Dziecięce Rękawice Bokserskie Octagon Little Fighter 6oz-8oz',
    name_en: 'Octagon Little Fighter Kids Boxing Gloves 6oz-8oz',
    category_path: 'Dzieci / Rękawice',
    collection: 'Kids Pro',
    wholesale_price_pln: 129.00,
    suggested_retail_price_pln: 239.00,
    is_outlet: false,
    stock_quantity: 35,
    available_sizes: ['6 OZ', '8 OZ'],
    colors: [{ name: 'Combat Red / White', hex: '#D71920' }, { name: 'Black / Gold', hex: '#D4AF37' }],
    material: 'Lekka Pianka Bezpieczna dla Stawów Dziecka & Skóra PU',
    image_keys: ['product_boxing_gloves'],
    description_pl: 'Specjalnie wyprofilowane rękawice dla młodych adeptów boksu i karate chroniące kciuk i nadgarstek.',
    discipline: 'Boks',
    gender: 'kids'
  },
  {
    supplier_sku: 'OCT-PL-KIDS-TSH',
    name_pl: 'Dziecięcy T-Shirt Octagon Little Fighter 100% Bawełna',
    name_en: 'Octagon Little Fighter Kids 100% Cotton Athletic T-Shirt',
    category_path: 'Dzieci / Odzież',
    collection: 'Kids Pro',
    wholesale_price_pln: 59.00,
    suggested_retail_price_pln: 109.00,
    is_outlet: false,
    stock_quantity: 50,
    available_sizes: ['116', '128', '140', '152'],
    colors: [{ name: 'Pure Black / Red', hex: '#D71920' }],
    material: '100% Miękka Bawełna Czesana Hipoalergiczna',
    image_keys: ['tshirt_classic'],
    description_pl: 'Dziecięca koszulka sportowa z miękkim ściągaczem i trwałym nadrukiem odpornym na częste pranie.',
    discipline: 'Boks',
    gender: 'kids'
  },

  // -------------------------------------------------------------
  // Equipment, Duffles & Accessories
  // -------------------------------------------------------------
  {
    supplier_sku: 'OCT-PL-BAG-DUFF60',
    name_pl: 'Torba Sportowa na Sprzęt Octagon Fight Duffle 60L ze Strefą Wet/Dry',
    name_en: 'Octagon Heavy Combat Sports Duffle Gym Bag 60L Wet/Dry',
    category_path: 'Akcesoria / Torby',
    collection: 'Streetwear',
    wholesale_price_pln: 189.00,
    suggested_retail_price_pln: 349.00,
    is_outlet: false,
    stock_quantity: 40,
    available_sizes: ['60 LITER'],
    colors: [{ name: 'Black / Bold Red Logo', hex: '#D71920' }],
    material: 'Wzmocniona Cordura 900D z Wentylowaną Kieszenią na Buty',
    image_keys: ['duffle_bag'],
    description_pl: 'Pojemna torba mieszcząca rękawice, ochraniacze piszczeli, kask i kimono z osobną komorą na mokre rzeczy po treningu.',
    discipline: 'Kickboxing',
    gender: 'unisex'
  },
  {
    supplier_sku: 'OCT-PL-WRP-4M',
    name_pl: 'Elastyczne Owijki Bokserskie Octagon Bandages 4m (Para)',
    name_en: 'Octagon Elastic Cotton Hand Wraps Bandages 4m (Pair)',
    category_path: 'Akcesoria / Ochraniacze',
    collection: 'Pro Series',
    wholesale_price_pln: 29.00,
    suggested_retail_price_pln: 59.00,
    is_outlet: false,
    stock_quantity: 120,
    available_sizes: ['4 Metry (Paar)'],
    colors: [{ name: 'Combat Red', hex: '#D71920' }, { name: 'Stealth Black', hex: '#141414' }],
    material: 'Bawełna z Domieszką Spandexu dla Optymalnej Elastyczności',
    image_keys: ['product_boxing_gloves'],
    description_pl: 'Owijki bokserskie z pętlą na kciuk i szerokim rzepem gwarantujące usztywnienie kości dłoni.',
    discipline: 'Boks',
    gender: 'unisex'
  },
  {
    supplier_sku: 'OCT-PL-ROP-SPD',
    name_pl: 'Szybkościowa Skakanka Bokserska ze Stalową Linką Octagon Speed',
    name_en: 'Octagon Pro Bearing Steel Cable Speed Jump Rope',
    category_path: 'Akcesoria / Trening',
    collection: 'Pro Series',
    wholesale_price_pln: 49.00,
    suggested_retail_price_pln: 94.00,
    is_outlet: false,
    stock_quantity: 85,
    available_sizes: ['3m (Regulowana linka)'],
    colors: [{ name: 'Anodized Black / Red', hex: '#D71920' }],
    material: 'Aluminiowe Rączki z Łożyskami Kulkami 360° & Powlekana Linka',
    image_keys: ['product_boxing_gloves'],
    description_pl: 'Błyskawiczne obroty bez plątania kabla, regulowana śrubami do każdego wzrostu zawodnika.',
    discipline: 'Boks',
    gender: 'unisex'
  },
  {
    supplier_sku: 'OCT-PL-SHK-700',
    name_pl: 'Shaker Treningowy Octagon Fight Fuel 700ml BPA Free',
    name_en: 'Octagon Fight Fuel Shaker Bottle 700ml BPA Free',
    category_path: 'Akcesoria / Trening',
    collection: 'Streetwear',
    wholesale_price_pln: 25.00,
    suggested_retail_price_pln: 49.00,
    is_outlet: false,
    stock_quantity: 110,
    available_sizes: ['700 ml'],
    colors: [{ name: 'Smoked Black / Red Cap', hex: '#D71920' }],
    material: 'Nietoksyczny Polipropylen BPA & DEHP Free ze Sitkiem',
    image_keys: ['waist_bag'],
    description_pl: 'Szczelny shaker z sitkiem rozbijającym grudki odżywek białkowych i BCAA.',
    discipline: 'Fitness',
    gender: 'unisex'
  },

  // -------------------------------------------------------------
  // Outlet & Clearance Deals (Końcówki Serii z octagonshop.pl)
  // -------------------------------------------------------------
  {
    supplier_sku: 'OCT-PL-OUT-HD',
    name_pl: '[OUTLET] Końcówka Serii: Bluza Octagon Retro Combat 2024',
    name_en: '[OUTLET DEAL] Octagon Retro Combat Heavyweight Hoodie 2024',
    category_path: 'Outlet / Wyprzedaż',
    collection: 'Retro Combat',
    wholesale_price_pln: 119.00,
    suggested_retail_price_pln: 299.00,
    is_outlet: true,
    stock_quantity: 14,
    available_sizes: ['M', 'L', 'XXL'],
    colors: [{ name: 'Vintage Black', hex: '#1C1C1C' }],
    material: '80% Bawełna, 20% Poliester',
    image_keys: ['hoodie_heavyweight'],
    description_pl: 'Oryginalna końcówka serii z magazynu octagonshop.pl w wyjątkowej cenie hurtowej.',
    discipline: 'Streetwear',
    gender: 'men'
  },
  {
    supplier_sku: 'OCT-PL-OUT-GLV',
    name_pl: '[OUTLET] Końcówka Serii: Rękawice Bokserskie Octagon Vintage Brown',
    name_en: '[OUTLET DEAL] Octagon Vintage Brown Leather Boxing Gloves',
    category_path: 'Outlet / Wyprzedaż',
    collection: 'Vintage',
    wholesale_price_pln: 149.00,
    suggested_retail_price_pln: 379.00,
    is_outlet: true,
    stock_quantity: 9,
    available_sizes: ['12 OZ', '14 OZ'],
    colors: [{ name: 'Vintage Dark Brown', hex: '#5A3D28' }],
    material: '100% Postarzana Skóra Naturalna',
    image_keys: ['product_boxing_gloves'],
    description_pl: 'Wyprzedaż limitowanej edycji w kolorze ciemnego brązu ze skórzanym tłoczeniem.',
    discipline: 'Boks',
    gender: 'unisex'
  }
];

// =========================================================================
// 5. CORE SERVICE PIPELINE: MAP RAW ITEM TO STORE PRODUCT
// =========================================================================
export const mapSupplierProductToStoreProduct = (
  raw: OctagonRawSupplierProduct,
  config: SupplierSyncConfig = DEFAULT_SUPPLIER_SYNC_CONFIG
): Product => {
  // 1. Map taxonomy
  const taxonomy = mapSupplierCategory(raw, config);

  // 2. Map pricing
  const pricing = mapSupplierPricing(raw, config);

  // 3. Map images
  const images = mapSupplierImages(raw.image_keys, taxonomy.category, taxonomy.subcategory, raw.name_pl);

  // 4. Generate URL-friendly slug
  const slug = raw.name_pl
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

  // 5. Generate translations (Dutch & English)
  const dutchTitle = raw.name_en || raw.name_pl
    .replace('Skórzane Rękawice Bokserskie', 'Lederen Bokshandschoenen')
    .replace('Rękawice Bokserskie', 'Bokshandschoenen')
    .replace('Rękawice MMA', 'MMA Handschoenen')
    .replace('Ochraniacze Piszczeli', 'Scheenbeschermers')
    .replace('Kask Sparingowy', 'Sparringshelm')
    .replace('Kultowy Rashguard', 'Iconische Rashguard')
    .replace('Koszulka Męska', 'Heren T-Shirt')
    .replace('Ciężka Bluza z Kapturem', 'Heavyweight Hoodie')
    .replace('Bluza z Kapturem', 'Hoodie')
    .replace('Spodnie Dresowe', 'Trainingsbroek Jogger')
    .replace('Spodenki do MMA', 'MMA Fightshorts')
    .replace('Saszetka Biodrowa / Nerka na Ramię', 'Tactical Heuptas')
    .replace('Plecak Sportowy', 'Tactical Rugzak')
    .replace('Czapka z Daszkiem Snapback', '3D Logo Snapback Pet')
    .replace('Zimowa Czapka Beanie', 'Wintermuts Beanie')
    .replace('Profesjonalny Worek Bokserski', 'Pro Bokszak Heavy Bag');

  const englishTitle = raw.name_en || raw.name_pl
    .replace('Skórzane Rękawice Bokserskie', 'Leather Boxing Gloves')
    .replace('Rękawice Bokserskie', 'Boxing Gloves')
    .replace('Rękawice MMA', 'MMA Gloves')
    .replace('Ochraniacze Piszczeli', 'Shin Guards')
    .replace('Kask Sparingowy', 'Sparring Headguard')
    .replace('Kultowy Rashguard', 'Signature Combat Rashguard')
    .replace('Koszulka Męska', 'Men\'s T-Shirt')
    .replace('Ciężka Bluza z Kapturem', 'Heavyweight Hoodie')
    .replace('Bluza z Kapturem', 'Hoodie')
    .replace('Spodnie Dresowe', 'Jogger Sweatpants')
    .replace('Spodenki do MMA', 'MMA Fight Shorts')
    .replace('Saszetka Biodrowa / Nerka na Ramię', 'Tactical Waist Bag')
    .replace('Plecak Sportowy', 'Tactical Combat Backpack')
    .replace('Czapka z Daszkiem Snapback', '3D Logo Snapback Cap')
    .replace('Zimowa Czapka Beanie', 'Winter Beanie Hat')
    .replace('Profesjonalny Worek Bokserski', 'Heavy Punching Bag');

  return {
    id: `oct-${raw.supplier_sku.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
    slug,
    name: dutchTitle,
    name_en: englishTitle,
    name_pl: raw.name_pl,
    brand: raw.collection?.includes('Legion') ? 'LEGION OCTAGON' : 'OCTAGON',
    description: raw.description_en ? `${raw.description_en} Direct geïmporteerd via het officiële leveringscontract met Octagon Polen.` : `Direct geïmporteerd uit het magazijn van Octagon Polen (octagonshop.pl). Vervaardigd volgens de hoogste Europese vechtsportstandaarden.`,
    description_en: raw.description_en || `${raw.description_pl} Direct official import from Octagon Poland (octagonshop.pl) supply warehouse.`,
    description_pl: raw.description_pl,
    shortDescription: raw.short_description_pl || `${dutchTitle} direct uit Polen.`,
    shortDescription_en: raw.short_description_pl || `${englishTitle} official distribution.`,
    shortDescription_pl: raw.short_description_pl || `${raw.name_pl} - oficjalna dystrybucja.`,
    price: pricing.priceEur,
    compareAtPrice: pricing.compareAtPriceEur,
    currency: pricing.currency,
    images,
    category: taxonomy.category,
    subcategory: taxonomy.subcategory,
    subcategory_en: taxonomy.subcategory_en,
    subcategory_pl: taxonomy.subcategory_pl,
    sport: taxonomy.sport,
    gender: taxonomy.gender,
    collection: raw.collection || 'OCTAGON CLASSICS',
    material: raw.material,
    colors: raw.colors.length > 0 ? raw.colors : [{ name: 'Standard Black', hex: '#0B0B0B' }],
    sizes: raw.available_sizes.length > 0 ? raw.available_sizes : ['One Size'],
    stock: raw.stock_quantity,
    sku: raw.supplier_sku,
    badges: taxonomy.badges,
    featured: raw.collection === 'Zęby' || raw.collection === 'Pro Series' || raw.collection === 'Fight Club',
    isBestseller: true,
    isNew: raw.collection?.includes('Royal') || raw.collection?.includes('Tournament'),
    isSale: raw.is_outlet || Boolean(pricing.compareAtPriceEur && pricing.compareAtPriceEur > pricing.priceEur),
    rating: 4.9,
    reviewCount: Math.floor(Math.random() * 30) + 18,
    technicalDetails: raw.technical_specs || [
      'Gecertificeerd origineel product van Octagon Polen',
      'Versterkte naden en stootbestendige materialen',
      'Direct geleverd met PostNL Track & Trace binnen 24-48 uur'
    ],
    careInstructions: raw.care_instructions || [
      'Luchten na training op kamertemperatuur',
      'Niet bleken of chemisch reinigen',
      'Wassen op maximaal 30 graden binnenstebuiten'
    ]
  };
};

// =========================================================================
// 6. ASYNC IMPORT & SYNC ENGINE
// Simulates live connection with OctagonShop supplier API with step-by-step telemetry
// =========================================================================
export const fetchOctagonSupplierFeed = async (
  options: {
    categoryFilter?: string;
    searchQuery?: string;
    onProgress?: (log: SyncStepLog) => void;
  } = {}
): Promise<OctagonRawSupplierProduct[]> => {
  const { onProgress } = options;

  onProgress?.({
    step: 'CONNECTION',
    timestamp: new Date().toISOString(),
    status: 'pending',
    message: 'Verbinding maken met OctagonShop B2B API gateway (octagonshop.pl / Katowice)...'
  });

  // Simulated realistic API network delay
  await new Promise(res => setTimeout(res, 450));

  onProgress?.({
    step: 'AUTH_CONTRACT',
    timestamp: new Date().toISOString(),
    status: 'success',
    message: 'B2B Leverancierscontract geverifieerd: Exclusieve distributie Nederland & Benelux actief.'
  });

  await new Promise(res => setTimeout(res, 350));

  let items = [...OCTAGON_SUPPLIER_RAW_FEED];

  if (options.categoryFilter && options.categoryFilter !== 'all') {
    items = items.filter(i => i.category_path.toLowerCase().includes(options.categoryFilter!.toLowerCase()));
  }

  if (options.searchQuery) {
    const q = options.searchQuery.toLowerCase();
    items = items.filter(i => i.name_pl.toLowerCase().includes(q) || i.supplier_sku.toLowerCase().includes(q));
  }

  onProgress?.({
    step: 'FETCH_CATALOG',
    timestamp: new Date().toISOString(),
    status: 'success',
    message: `${items.length} actuele voorraadartikelen succesvol opgehaald uit het centraal magazijn.`
  });

  return items;
};

export const syncSupplierCatalogWithLocalStore = async (
  currentStoreProducts: Product[],
  config: SupplierSyncConfig = DEFAULT_SUPPLIER_SYNC_CONFIG,
  onProgress?: (log: SyncStepLog) => void
): Promise<{ updatedProducts: Product[]; result: CatalogSyncResult }> => {
  const logs: SyncStepLog[] = [];
  const errors: string[] = [];

  const addLog = (log: SyncStepLog) => {
    logs.push(log);
    onProgress?.(log);
  };

  addLog({
    step: 'INIT',
    timestamp: new Date().toISOString(),
    status: 'pending',
    message: 'Starten catalogus synchronisatie & data import proces...'
  });

  // 1. Fetch raw items from feed
  const rawItems = await fetchOctagonSupplierFeed({ onProgress: addLog });

  addLog({
    step: 'MAPPING_PIPELINE',
    timestamp: new Date().toISOString(),
    status: 'pending',
    message: 'Mappen van PLN groothandelsprijzen -> EUR consumentenprijzen & categorie taxonomie...'
  });

  await new Promise(res => setTimeout(res, 400));

  // 2. Transform and map items
  const mappedProducts: Product[] = [];
  const categoriesBreakdown: Record<string, number> = {};

  for (const raw of rawItems) {
    try {
      const mapped = mapSupplierProductToStoreProduct(raw, config);
      mappedProducts.push(mapped);
      categoriesBreakdown[mapped.category] = (categoriesBreakdown[mapped.category] || 0) + 1;
    } catch (err: any) {
      errors.push(`Fout bij converteren ${raw.supplier_sku}: ${err.message}`);
    }
  }

  addLog({
    step: 'IMAGE_ASSETS',
    timestamp: new Date().toISOString(),
    status: 'success',
    message: `${mappedProducts.length} productafbeeldingen en multi-angle assets succesvol gekoppeld.`
  });

  await new Promise(res => setTimeout(res, 300));

  // 3. Merge into store catalog (deduplicating by SKU / ID)
  const productMap = new Map<string, Product>();
  
  // Existing products first
  currentStoreProducts.forEach(p => productMap.set(p.sku || p.id, p));

  let importedCount = 0;
  let updatedCount = 0;

  mappedProducts.forEach(p => {
    const key = p.sku || p.id;
    if (productMap.has(key)) {
      // Update price and stock from live feed
      const existing = productMap.get(key)!;
      productMap.set(key, {
        ...existing,
        price: p.price,
        compareAtPrice: p.compareAtPrice,
        stock: p.stock,
        badges: p.badges
      });
      updatedCount++;
    } else {
      productMap.set(key, p);
      importedCount++;
    }
  });

  const finalProducts = Array.from(productMap.values());

  addLog({
    step: 'STORE_COMMIT',
    timestamp: new Date().toISOString(),
    status: 'success',
    message: `Synchronisatie voltooid: ${importedCount} nieuw geïmporteerd, ${updatedCount} geüpdatet. Totaal catalogus: ${finalProducts.length} artikelen.`
  });

  const result: CatalogSyncResult = {
    success: errors.length === 0,
    timestamp: new Date().toISOString(),
    totalFetched: rawItems.length,
    importedCount,
    updatedCount,
    skippedCount: 0,
    categoriesBreakdown,
    logs,
    errors
  };

  return {
    updatedProducts: finalProducts,
    result
  };
};
