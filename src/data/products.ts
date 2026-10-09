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
} from './productImages';
import { Product, Language } from '../types';
import { OCTAGON_ADDITIONAL_PRODUCTS } from './octagonCatalog';

export const PRODUCTS: Product[] = [
  // ==========================================
  // 1. BOXING GLOVES & COMBAT FIGHT GEAR
  // ==========================================
  {
    id: 'oct-fg-01',
    slug: 'octagon-pro-leather-boxing-gloves-black-red',
    name: 'Octagon Pro Fight Leather Bokshandschoenen',
    name_en: 'Octagon Pro Fight Genuine Leather Boxing Gloves',
    name_pl: 'Skórzane Rękawice Bokserskie Octagon Pro Fight',
    brand: 'OCTAGON',
    description: 'Vervaardigd uit 100% geselecteerd premium runderleer voor maximale slagkracht en onverwoestbare levensduur. Uitgerust met viervoudig gelamineerde schokabsorberende IMF-schuimkern, brede klittenbandsluiting met extra polsversteviging en ademende palmperforatie. Direct geïmporteerd via het officiële contract met Octagon Polen.',
    description_en: 'Crafted from 100% premium cowhide leather for maximum impact power and durability. Equipped with quadruple laminated shock-absorbing IMF foam core, wide velcro closure with wrist stabilization, and breathable palm perforation. Direct official import from Octagon Poland.',
    description_pl: 'Wykonane w 100% z wyselekcjonowanej skóry bydlęcej premium dla maksymalnej siły ciosu i niezniszczalnej trwałości. Wyposażone w 4-warstwowy amortyzujący rdzeń piankowy IMF, szerokie zapięcie na rzep ze stabilizacją nadgarstka i wentylację dłoni. Oficjalna dystrybucja z Octagon Polska.',
    shortDescription: '100% premium rundleer met IMF multi-layer demping en extra polsstabiliteit.',
    shortDescription_en: '100% premium cowhide leather with IMF multi-layer cushioning and wrist support.',
    shortDescription_pl: '100% naturalna skóra bydlęca z wielowarstwową amortyzacją IMF i wsparciem nadgarstka.',
    price: 119.99,
    compareAtPrice: 139.99,
    currency: 'EUR',
    images: [
      BOXING_GLOVES_IMAGE,
      CAMO_GLOVES_IMAGE,
      SHIN_GUARDS_IMAGE
    ],
    category: 'fight-gear',
    subcategory: 'Bokshandschoenen',
    subcategory_en: 'Boxing Gloves',
    subcategory_pl: 'Rękawice Bokserskie',
    sport: ['boxing', 'kickboxing', 'muay-thai'],
    gender: 'unisex',
    collection: 'PRO SERIES',
    material: '100% Genuine Cowhide Leather & IMF Foam',
    colors: [
      { name: 'Matte Black / Red', hex: '#D71920' },
      { name: 'Stealth Carbon Black', hex: '#141414' },
      { name: 'Gold / Black Championship', hex: '#D4AF37' }
    ],
    sizes: ['10 OZ', '12 OZ', '14 OZ', '16 OZ'],
    stock: 24,
    sku: 'OCT-GLV-001',
    badges: [
      { type: 'bestseller', label: 'OFFICIAL SUPPLIER' },
      { type: 'sale', label: '-14%' }
    ],
    featured: true,
    isBestseller: true,
    rating: 4.9,
    reviewCount: 48,
    technicalDetails: [
      'Gecertificeerd 100% premium volnerf rundleer',
      'Viervoudige schuimlaag met geïntegreerde gel-inleg',
      'Brede 8cm klittenband wrap-around polsband',
      'Duimbevestiging voorkomt overstrekking en oogletsel',
      'Geschikt voor heavy bag, padwork en hard sparren'
    ],
    careInstructions: [
      'Na training direct laten drogen op kamertemperatuur',
      'Niet in de wasmachine of droger plaatsen',
      'Reinigen met milde leerspray of vochtige doek'
    ]
  },
  {
    id: 'oct-fg-13',
    slug: 'legion-octagon-shadow-strike-camo-boxing-gloves',
    name: 'Legion Octagon Shadow Strike Camo Bokshandschoenen',
    name_en: 'Legion Octagon Shadow Strike Camo Boxing Gloves',
    name_pl: 'Rękawice Bokserskie Legion Octagon Shadow Strike Camo',
    brand: 'LEGION OCTAGON',
    description: 'Het iconische model uit de Legion Octagon collectie van octagonshop.pl. Voorzien van het kenmerkende militaire Shadow Strike camouflagepatroon met contrasterend rood Octagon embleem. Gemaakt van versterkt premium synthetisch leer en meerlaagse schuimvulling met anatomische vuistkromming.',
    description_en: 'The iconic model from the Legion Octagon collection at octagonshop.pl. Features military Shadow Strike camouflage with contrasting red Octagon brand emblem. Engineered with reinforced synthetic leather and multi-density impact foam.',
    description_pl: 'Kultowy model z kolekcji Legion Octagon dostępny na octagonshop.pl. Charakteryzuje się militarnym wzorem moro Shadow Strike z kontrastującym czerwonym emblematem Octagon. Wzmocniona skóra syntetyczna i wielowarstwowa pianka amortyzująca.',
    shortDescription: 'Legion Octagon Camo bokshandschoenen met anatomische vuistpasvorm en polsstrap.',
    shortDescription_en: 'Legion Octagon Camo boxing gloves with ergonomic fist curvature and wrist lockdown.',
    shortDescription_pl: 'Rękawice Legion Octagon Camo z ergonomicznym profilem pięści i stabilnym rzepem.',
    price: 89.99,
    compareAtPrice: 104.99,
    currency: 'EUR',
    images: [
      CAMO_GLOVES_IMAGE,
      BOXING_GLOVES_IMAGE
    ],
    category: 'fight-gear',
    subcategory: 'Bokshandschoenen',
    subcategory_en: 'Boxing Gloves',
    subcategory_pl: 'Rękawice Bokserskie',
    sport: ['boxing', 'kickboxing', 'muay-thai'],
    gender: 'unisex',
    collection: 'LEGION OCTAGON',
    material: 'High-Grade Matte Synthetic Leather & Shock Foam',
    colors: [
      { name: 'Shadow Camo / Red', hex: '#2B332A' }
    ],
    sizes: ['10 OZ', '12 OZ', '14 OZ', '16 OZ'],
    stock: 28,
    sku: 'OCT-CAMO-013',
    badges: [
      { type: 'bestseller', label: 'TOP MODEL PL' },
      { type: 'new', label: 'LEGION' }
    ],
    featured: true,
    isBestseller: true,
    isNew: true,
    rating: 5.0,
    reviewCount: 36,
    technicalDetails: [
      'Origineel Legion Octagon Shadow Strike camouflage design',
      'Anatomische duimbeveiliging en ergonomische vuistvorm',
      'Brede klittenbandsluiting met stevige polsondersteuning',
      'Ventilerende handpalm voor vochtregulatie tijdens lange sessies'
    ]
  },
  {
    id: 'oct-fg-14',
    slug: 'legion-octagon-pro-sparring-headguard-helmet',
    name: 'Legion Octagon Pro Sparring Hoofdbeschermer',
    name_en: 'Legion Octagon Pro Sparring Leather Headguard Helmet',
    name_pl: 'Kask Sparingowy Legion Octagon Pro z Ochroną Kości Policzkowych',
    brand: 'LEGION OCTAGON',
    description: 'Volledige 360-graden schedel- en jukbeenbescherming voor harde kickboks- en bokssessies. Uitgevoerd in matzwart rundleer met rood Legion Octagon borduurwerk. Uitgerust met gewatteerde oorbeschermers, vetersluiting aan de bovenzijde en versterkte kinriem.',
    description_en: 'Full 360-degree cranial and cheekbone defense for hard sparring. Crafted in matte black cowhide leather with bold red Legion Octagon embroidery, padded ear crossbars, top lacing and reinforced chin lock.',
    description_pl: 'Pełna ochrona czaszki i kości policzkowych podczas twardych sparingów bokserskich i K-1. Wykonany z matowej skóry naturalnej z czerwonym haftem Legion Octagon. Ochrona uszu, regulacja sznurowana od góry i zapięcie pod brodą.',
    shortDescription: 'Lederen sparringshelm met jukbeenbescherming en vetersluiting.',
    shortDescription_en: 'Full-grain leather sparring headguard with cheek protection and top laces.',
    shortDescription_pl: 'Skórzany kask sparingowy z ochroną policzków i regulacją sznurowaną.',
    price: 89.99,
    compareAtPrice: 109.99,
    currency: 'EUR',
    images: [
      HEADGUARD_IMAGE,
      BOXING_GLOVES_IMAGE
    ],
    category: 'fight-gear',
    subcategory: 'Hoofdbeschermers',
    subcategory_en: 'Headguards',
    subcategory_pl: 'Kaski Bokserskie',
    sport: ['boxing', 'kickboxing', 'muay-thai', 'mma'],
    gender: 'unisex',
    collection: 'LEGION OCTAGON',
    material: '100% Genuine Leather & High-Density Shock Absorption Core',
    colors: [
      { name: 'Matte Black / Red', hex: '#D71920' }
    ],
    sizes: ['M', 'L', 'XL'],
    stock: 15,
    sku: 'OCT-HGD-014',
    badges: [
      { type: 'bestseller', label: 'PRO SPARRING' }
    ],
    featured: true,
    rating: 4.9,
    reviewCount: 27
  },
  {
    id: 'oct-fg-03',
    slug: 'octagon-impact-shield-pro-shin-guards',
    name: 'Octagon Impact Shield Pro Scheenbeschermers',
    name_en: 'Octagon Impact Shield Pro Muay Thai Shin Guards',
    name_pl: 'Ochraniacze Piszczeli Octagon Impact Shield Pro',
    brand: 'OCTAGON',
    description: 'Biedt meedogenloze impactverdeling bij low-kicks en harde trapblokken. Dubbel gevormde scheen- en wreefbescherming uit gecomprimeerd high-density EVA-schuim met versterkte stiknaden en antislip neopreen binnenvoering.',
    description_en: 'Maximum impact dissipation for heavy low-kicks and shin checks. Anatomically contoured high-density EVA core with dual secure hook-and-loop straps and anti-slip moisture-wicking liner.',
    description_pl: 'Bezwzględne tłumienie uderzeń przy low-kickach i blokach piszczelami. Anatomicznie profilowany rdzeń z pianki EVA o wysokiej gęstości z podwójnymi pasami na rzep i podszewką antypoślizgową.',
    shortDescription: 'Ergonomische Muay Thai & kickboks scheenbeschermers met maximale demping.',
    shortDescription_en: 'Ergonomic Muay Thai & kickboxing shin guards with maximum shock absorption.',
    shortDescription_pl: 'Ergonomiczne nagolenniki do kickboxingu i Muay Thai o maksymalnej amortyzacji.',
    price: 94.99,
    compareAtPrice: 109.99,
    currency: 'EUR',
    images: [
      SHIN_GUARDS_IMAGE,
      CAMO_GLOVES_IMAGE
    ],
    category: 'fight-gear',
    subcategory: 'Scheenbeschermers',
    subcategory_en: 'Shin Guards',
    subcategory_pl: 'Ochraniacze Piszczeli',
    sport: ['kickboxing', 'muay-thai', 'mma'],
    gender: 'unisex',
    collection: 'PRO SERIES',
    material: 'Reinforced Syn-Leather & Multi-Density EVA Foam',
    colors: [
      { name: 'Matte Black', hex: '#141414' },
      { name: 'Black / Red Accent', hex: '#D71920' }
    ],
    sizes: ['M', 'L', 'XL'],
    stock: 22,
    sku: 'OCT-SHN-003',
    badges: [
      { type: 'bestseller', label: 'PRO CHOICE' }
    ],
    featured: true,
    isBestseller: true,
    rating: 4.9,
    reviewCount: 42
  },
  {
    id: 'oct-fg-05',
    slug: 'octagon-sparring-mma-gloves-7oz',
    name: 'Octagon Hex-Lock MMA Sparring Handschoenen 7oz',
    name_en: 'Octagon Hex-Lock 7oz MMA Sparring Gloves',
    name_pl: 'Rękawice Sparingowe MMA Octagon Hex-Lock 7oz',
    brand: 'OCTAGON',
    description: 'De ultieme brug tussen sparren en grondvechten. Extra dikke knokkeldemping met open handpalm voor submissions en kooiwerk. Voldoet aan de officiële MMA trainingsstandaarden.',
    description_en: 'The ultimate hybrid for sparring and grappling. Thick knuckle padding with open palm for submissions and clinch transitions under official MMA standards.',
    description_pl: 'Najlepszy hybrydowy model do stójki i parteru. Gruba ochrona kostek i otwarta dłoń do chwytów, dźwigni i duszeń w klatce.',
    shortDescription: '7oz hybride MMA handschoenen met dikke knokkelbescherming voor veilig sparren.',
    shortDescription_en: '7oz hybrid MMA gloves with thick knuckle protection for safe sparring.',
    shortDescription_pl: 'Hybrydowe rękawice MMA 7oz z grubą pianką do bezpiecznych sparingów.',
    price: 69.99,
    compareAtPrice: 79.99,
    currency: 'EUR',
    images: [
      BOXING_GLOVES_IMAGE,
      SHIN_GUARDS_IMAGE
    ],
    category: 'fight-gear',
    subcategory: 'MMA Handschoenen',
    subcategory_en: 'MMA Gloves',
    subcategory_pl: 'Rękawice MMA',
    sport: ['mma', 'grappling'],
    gender: 'unisex',
    collection: 'PRO SERIES',
    material: 'Engineered Synthetic Leather & Layered Foam',
    colors: [
      { name: 'Stealth Black', hex: '#141414' },
      { name: 'Black / Red', hex: '#D71920' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 18,
    sku: 'OCT-MMA-005',
    badges: [
      { type: 'bestseller', label: 'MOST WANTED' }
    ],
    featured: true,
    isBestseller: true,
    rating: 4.9,
    reviewCount: 33
  },

  // ==========================================
  // 2. RASHGUARDS & MMA / MUAY THAI SHORTS
  // ==========================================
  {
    id: 'oct-fg-02',
    slug: 'octagon-armor-compression-rashguard-black',
    name: 'Octagon Armor Compression Rashguard Long Sleeve',
    name_en: 'Octagon Armor Long Sleeve Compression Rashguard',
    name_pl: 'Męski Rashguard Kompresyjny Octagon Armor Long Sleeve',
    brand: 'OCTAGON',
    description: 'Ontworpen voor intensieve No-Gi grappling, BJJ en MMA training. De 4-way stretch compressiestof bevordert spierherstel en biedt optimale thermoregulatie. Platte elastische flatlock-naden voorkomen schuren op de mat, terwijl de siliconen antislip tailleband opkruipen elimineert.',
    description_en: 'Engineered for intense No-Gi grappling, BJJ, and MMA training. 4-way stretch compression enhances recovery and thermoregulation. Reinforced flatlock seams prevent mat burns with anti-slip silicone waistband.',
    description_pl: 'Stworzony do intensywnego grapplingu No-Gi, BJJ i MMA. Tkanina kompresyjna 4-way stretch wspomaga regenerację i termoregulację. Płaskie szwy flatlock chronią przed otarciami, a silikonowy pasek zapobiega podwijaniu.',
    shortDescription: 'Compressie 4-way stretch rashguard met versterkte flatlock-stiksels en antislip taille.',
    shortDescription_en: '4-way stretch compression rashguard with reinforced flatlock stitching and silicone grip.',
    shortDescription_pl: 'Kompresyjny rashguard 4-way stretch ze wzmocnionymi szwami flatlock i silikonowym paskiem.',
    price: 54.99,
    compareAtPrice: 64.99,
    currency: 'EUR',
    images: [
      RASHGUARD_IMAGE,
      MMA_SHORTS_IMAGE
    ],
    category: 'fight-gear',
    subcategory: 'Rashguards',
    subcategory_en: 'Rashguards',
    subcategory_pl: 'Rashguardy',
    sport: ['mma', 'grappling', 'fitness'],
    gender: 'men',
    collection: 'FIGHT ESSENTIALS',
    material: '84% Polyester, 16% Spandex (240 GSM)',
    colors: [
      { name: 'Carbon Black / Crimson', hex: '#D71920' },
      { name: 'Monochrome Stealth', hex: '#141414' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    stock: 35,
    sku: 'OCT-RSH-002',
    badges: [
      { type: 'bestseller', label: 'OFFICIAL DROP' }
    ],
    featured: true,
    isBestseller: true,
    rating: 4.8,
    reviewCount: 39
  },
  {
    id: 'oct-fg-15',
    slug: 'octagon-zeby-short-sleeve-rashguard-pro',
    name: 'Octagon "Zęby" Short Sleeve Rashguard Pro',
    name_en: 'Octagon "Teeth" Short Sleeve Combat Rashguard',
    name_pl: 'Kultowy Rashguard Octagon "Zęby" Krótki Rękaw',
    brand: 'OCTAGON',
    description: 'Het meest iconische en herkenbare ontwerp van Octagon Polen uit de webshop octagonshop.pl. Voorzien van het legendarische "Zęby" (Tanden) motief in onverwoestbare sublimatiedruk die niet vervaagt of barst. Sneldrogend, antibacterieel en perfect voor No-Gi, kickboksen en gym sessies.',
    description_en: 'The most famous signature design from Octagon Poland directly from octagonshop.pl. Features the legendary "Zęby" (Teeth) graphic in indestructible non-fade sublimation print. Quick-drying, antibacterial, and tailored for No-Gi, kickboxing, and heavy gym training.',
    description_pl: 'Najbardziej kultowy i rozpoznawalny wzór marki Octagon z oferty octagonshop.pl. Legendarny motyw "Zęby" w trwałym druku sublimacyjnym, który nie blaknie i nie pęka. Szybkoschnący, antybakteryjny, idealny na No-Gi, kickboxing i matę.',
    shortDescription: 'Legendarisch Octagon "Zęby" motief met onverwoestbare sublimatiedruk.',
    shortDescription_en: 'Legendary Octagon "Teeth" design with indestructible sublimation print.',
    shortDescription_pl: 'Kultowy wzór Octagon "Zęby" z niezniszczalnym nadrukiem sublimacyjnym.',
    price: 49.99,
    compareAtPrice: 59.99,
    currency: 'EUR',
    images: [
      RASHGUARD_IMAGE,
      MMA_SHORTS_IMAGE
    ],
    category: 'fight-gear',
    subcategory: 'Rashguards',
    subcategory_en: 'Rashguards',
    subcategory_pl: 'Rashguardy',
    sport: ['mma', 'grappling', 'kickboxing', 'fitness'],
    gender: 'men',
    collection: 'OCTAGON CLASSICS',
    material: '85% Polyester, 15% Elastane Sublimation Tech',
    colors: [
      { name: 'Black / Red Teeth', hex: '#D71920' },
      { name: 'Black / White Teeth', hex: '#FFFFFF' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    stock: 30,
    sku: 'OCT-ZEB-015',
    badges: [
      { type: 'bestseller', label: 'LEGEND ZĘBY' },
      { type: 'new', label: 'SIGNATURE' }
    ],
    featured: true,
    isBestseller: true,
    isNew: true,
    rating: 5.0,
    reviewCount: 52
  },
  {
    id: 'oct-fg-04',
    slug: 'octagon-apex-mma-fight-shorts',
    name: 'Octagon Apex Pro MMA & Grappling Shorts',
    name_en: 'Octagon Apex Pro MMA & Grappling Fight Shorts',
    name_pl: 'Spodenki MMA & Grappling Octagon Apex Pro',
    brand: 'OCTAGON',
    description: 'Ontworpen voor onbeperkte trapflexibiliteit en grondvechten. Zijwaartse splitten, 4-way stretch kruisinzet en driedubbele versterkte naden. Lichtgewicht micro-ripstop materiaal dat bestand is tegen zware trek- en wrijvingskrachten.',
    description_en: 'Engineered for unrestricted kicking range and submission scrambles. Deep reinforced side splits with 4-way stretch groin panel and tear-resistant micro-ripstop fabric.',
    description_pl: 'Zaprojektowane z myślą o pełnej swobodzie kopnięć i parteru. Głębokie rozcięcia boczne, elastyczny klin w kroku i niezniszczalny materiał ripstop.',
    shortDescription: 'Lichtgewicht ripstop MMA fightshorts met stretch kruis en versterkte zijsplitten.',
    shortDescription_en: 'Lightweight ripstop MMA fight shorts with stretch gusset and reinforced split hem.',
    shortDescription_pl: 'Lekkie spodenki MMA z materiału ripstop z elastycznym krokiem i rozcięciami.',
    price: 49.99,
    compareAtPrice: 59.99,
    currency: 'EUR',
    images: [
      MMA_SHORTS_IMAGE,
      RASHGUARD_IMAGE
    ],
    category: 'fight-gear',
    subcategory: 'MMA Shorts',
    subcategory_en: 'MMA Shorts',
    subcategory_pl: 'Spodenki MMA',
    sport: ['mma', 'grappling', 'kickboxing'],
    gender: 'men',
    collection: 'FIGHT ESSENTIALS',
    material: 'Micro-Ripstop Polyester & Spandex Gusset',
    colors: [
      { name: 'Carbon Black / Red Side', hex: '#D71920' },
      { name: 'Full Stealth Black', hex: '#141414' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    stock: 26,
    sku: 'OCT-SHT-004',
    badges: [
      { type: 'bestseller', label: 'MOST WANTED' }
    ],
    featured: true,
    isBestseller: true,
    rating: 4.8,
    reviewCount: 31
  },
  {
    id: 'oct-fg-16',
    slug: 'legion-octagon-kevlar-muay-thai-shorts',
    name: 'Legion Octagon Kevlar Muay Thai & Kickboks Shorts',
    name_en: 'Legion Octagon Kevlar Muay Thai & Kickboxing Shorts',
    name_pl: 'Satynowe Spodenki Muay Thai Legion Octagon Kevlar Gold',
    brand: 'LEGION OCTAGON',
    description: 'Topmodel Muay Thai shorts uit het assortiment van octagonshop.pl. Gemaakt van zwaar Thais satijn met gouden metallic Legion Octagon borduursels en traditionele 8-baans elastische tailleband. Extra hoge beenuitsnijding voor ongehinderde hoge trappen en knieën.',
    description_en: 'Top-tier Muay Thai shorts from octagonshop.pl. Tailored from heavyweight authentic Thai satin with metallic gold Legion Octagon front embroidery and traditional 8-stripe waistband. High side cuts for explosive kicks.',
    description_pl: 'Topowy model spodenek Muay Thai z oferty octagonshop.pl. Wykonane z grubego satynowego materiału z metalicznym złotym haftem Legion Octagon i tradycyjnym 8-rzędowym ściągaczem. Wysokie wycięcia boczne do wysokich kopnięć.',
    shortDescription: 'Zwart-gouden Thaise satijnen kickboks short met traditionele pasvorm en borduursel.',
    shortDescription_en: 'Black and gold authentic Thai satin shorts with traditional wide elastic waistband.',
    shortDescription_pl: 'Czarne ze złotym haftem spodenki Muay Thai z tradycyjnym pasem.',
    price: 49.99,
    compareAtPrice: 59.99,
    currency: 'EUR',
    images: [
      MUAY_THAI_SHORTS_IMAGE,
      BOXING_GLOVES_IMAGE
    ],
    category: 'fight-gear',
    subcategory: 'Muay Thai Shorts',
    subcategory_en: 'Muay Thai Shorts',
    subcategory_pl: 'Spodenki Muay Thai',
    sport: ['muay-thai', 'kickboxing'],
    gender: 'unisex',
    collection: 'LEGION OCTAGON',
    material: '100% Heavy Metallic Thai Satin',
    colors: [
      { name: 'Black / Metallic Gold', hex: '#D4AF37' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 20,
    sku: 'OCT-MT-016',
    badges: [
      { type: 'new', label: 'KEVLAR TECH' },
      { type: 'bestseller', label: 'GOLD EDITION' }
    ],
    featured: true,
    isNew: true,
    isBestseller: true,
    rating: 5.0,
    reviewCount: 29
  },

  // ==========================================
  // 3. STREETWEAR, HOODIES & APPAREL
  // ==========================================
  {
    id: 'oct-app-06',
    slug: 'octagon-heavyweight-fight-club-hoodie',
    name: 'Octagon Fight Club Heavyweight Hoodie 460 GSM',
    name_en: 'Octagon Fight Club 460 GSM Heavyweight Hoodie',
    name_pl: 'Ciężka Bluza z Kapturem Octagon Fight Club 460 GSM',
    brand: 'OCTAGON',
    description: 'Het paradeplaardje van de Octagon kledinglijn uit Polen. Extreem zware 460 GSM gekamde katoen-polyester mix met warme brushed fleece binnenzijde. Dubbellaagse capuchon met dikke koorden en kenmerkende rode Octagon Fight borstprint en rubberen sleeve patch.',
    description_en: 'The flagship streetwear hoodie from Octagon Poland. Ultra-heavyweight 460 GSM combed cotton fleece with soft brushed interior, double-layered hood, and signature Octagon Fight chest screen print.',
    description_pl: 'Duma odzieżowej kolekcji Octagon z Polski. Niezwykle gruba dzianina 460 GSM z miękkim szczotkowanym polarem wewnątrz, podwójnym kapturem, grubym sznurkiem i trwałym nadrukiem sitodrukowym Octagon Fight.',
    shortDescription: 'Zware 460 GSM streetwear hoodie met brushed fleece en dubbelwandige capuchon.',
    shortDescription_en: 'Heavy 460 GSM streetwear hoodie with brushed fleece and double-layered hood.',
    shortDescription_pl: 'Gruba bluza 460 GSM ze szczotkowanym polarem i dwuwarstwowym kapturem.',
    price: 79.99,
    compareAtPrice: 89.99,
    currency: 'EUR',
    images: [
      HOODIE_IMAGE,
      TSHIRT_IMAGE,
      JOGGER_IMAGE
    ],
    category: 'heren',
    subcategory: 'Hoodies',
    subcategory_en: 'Hoodies',
    subcategory_pl: 'Bluzy Hoodie',
    sport: ['fitness', 'boxing', 'mma'],
    gender: 'men',
    collection: 'OCTAGON CLASSICS',
    material: '80% Heavy Combed Cotton, 20% Polyester (460 GSM)',
    colors: [
      { name: 'Onyx Deep Black', hex: '#0B0B0B' },
      { name: 'Charcoal Heather', hex: '#262626' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL', '3XL'],
    stock: 35,
    sku: 'OCT-HD-006',
    badges: [
      { type: 'bestseller', label: 'HEAVY 460G' }
    ],
    featured: true,
    isBestseller: true,
    rating: 5.0,
    reviewCount: 64
  },
  {
    id: 'oct-app-17',
    slug: 'octagon-classic-logo-tshirt-black',
    name: 'Octagon Classic Logo 100% Gekamd Katoen T-Shirt',
    name_en: 'Octagon Classic Logo 100% Combed Cotton T-Shirt',
    name_pl: 'Koszulka Męska Octagon Classic Logo 210g',
    brand: 'OCTAGON',
    description: 'Klassiek Octagon T-shirt geproduceerd in Polen uit 100% hoogwaardig gekamd ringgesponnen katoen van 210 g/m². Krasvrije halsboord, versterkte schoudernaden en een onverwoestbare zeefdruk van het Octagon Fightwear logo op de borst.',
    description_en: 'Classic Octagon combat t-shirt made in Poland from 100% premium combed ring-spun cotton (210 GSM). Reinforced shoulder seams, screen-printed chest emblem, and athletic comfort cut.',
    description_pl: 'Klasyczny t-shirt Octagon szyty w Polsce ze 100% czesanej bawełny ringspun o wysokiej gramaturze 210 g/m². Wzmacniane szwy barkowe, niepękający nadruk sitodrukowy z przodu i metka żakardowa na karku.',
    shortDescription: '100% gekamd katoen 210 GSM t-shirt met onverslijtbare zeefdruk.',
    shortDescription_en: '100% combed cotton 210 GSM t-shirt with durable screen print.',
    shortDescription_pl: '100% bawełna czesana 210 GSM z trwałym nadrukiem sitodrukowym.',
    price: 34.99,
    compareAtPrice: 39.99,
    currency: 'EUR',
    images: [
      TSHIRT_IMAGE,
      HOODIE_IMAGE,
      JOGGER_IMAGE
    ],
    category: 'heren',
    subcategory: 'T-Shirts',
    subcategory_en: 'T-Shirts',
    subcategory_pl: 'Koszulki T-Shirt',
    sport: ['fitness', 'boxing', 'mma'],
    gender: 'men',
    collection: 'OCTAGON CLASSICS',
    material: '100% Combed Ring-Spun Cotton (210 GSM)',
    colors: [
      { name: 'Pure Black', hex: '#0B0B0B' },
      { name: 'Combat Red', hex: '#D71920' },
      { name: 'White Edition', hex: '#FFFFFF' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL', '3XL'],
    stock: 45,
    sku: 'OCT-TSH-017',
    badges: [
      { type: 'bestseller', label: 'MUST HAVE' }
    ],
    featured: true,
    isBestseller: true,
    rating: 4.9,
    reviewCount: 58
  },
  {
    id: 'oct-app-18',
    slug: 'octagon-combat-jogger-heavyweight-sweatpants',
    name: 'Octagon Combat Jogger Heavyweight Sweatpants',
    name_en: 'Octagon Combat Heavyweight Cargo Jogger Sweatpants',
    name_pl: 'Spodnie Dresowe Octagon Combat Jogger Heavyweight',
    brand: 'OCTAGON',
    description: 'Zware trainingsbroek uit de streetwear collectie van octagonshop.pl. Gemaakt van 420 GSM geborsteld katoen met elastische boorden aan de enkels, diepe zakken met waterafstotende ritssluitingen en rood geborduurd Octagon schild op het dijbeen.',
    description_en: 'Heavyweight streetwear joggers from octagonshop.pl. Crafted from 420 GSM brushed fleece with cuffed ankles, waterproof zippered side pockets, and red embroidered Octagon patch.',
    description_pl: 'Ciężkie spodnie dresowe z kolekcji streetwear octagonshop.pl. Dzianina 420 GSM z polarem wewnątrz, ściągacze w kostkach, kieszenie boczne na suwak i haftowana tarcza Octagon na udzie.',
    shortDescription: 'Catering 420 GSM dresbroek met ritssluitingzakken en elastische manchetten.',
    shortDescription_en: 'Heavy 420 GSM jogger pants with zippered pockets and ribbed cuffs.',
    shortDescription_pl: 'Grube spodnie dresowe 420 GSM z kieszeniami na zamek i ściągaczami.',
    price: 69.99,
    compareAtPrice: 79.99,
    currency: 'EUR',
    images: [
      JOGGER_IMAGE,
      HOODIE_IMAGE
    ],
    category: 'heren',
    subcategory: 'Broeken & Joggers',
    subcategory_en: 'Sweatpants',
    subcategory_pl: 'Spodnie Dresowe',
    sport: ['fitness', 'boxing', 'mma'],
    gender: 'men',
    collection: 'OCTAGON CLASSICS',
    material: '80% Heavy Cotton, 20% Polyester (420 GSM)',
    colors: [
      { name: 'Stealth Black', hex: '#0B0B0B' },
      { name: 'Melange Grey', hex: '#333333' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    stock: 28,
    sku: 'OCT-JOG-018',
    badges: [
      { type: 'bestseller', label: 'BESTSELLER' }
    ],
    featured: true,
    isBestseller: true,
    rating: 4.9,
    reviewCount: 37
  },
  {
    id: 'oct-app-19',
    slug: 'octagon-zip-hoodie-fullzip-streetwear',
    name: 'Octagon Zip Hoodie Full-Zip Streetwear 420 GSM',
    name_en: 'Octagon Full-Zip Streetwear Combat Hoodie 420 GSM',
    name_pl: 'Bluza Rozpinana z Kapturem Octagon Zip Streetwear 420 GSM',
    brand: 'OCTAGON',
    description: 'Sportieve en praktische vest-hoodie met robuuste metalen ritssluiting. Gemaakt in Polen uit zwaar katoen met zachte fleece binnenzijde, dubbelgevoerde capuchon en subtiele borstprint. Ideaal als warming-up vest voor training of casual streetwear.',
    description_en: 'Full-zip combat hoodie with heavy-duty metal YKK zipper, made in Poland from 420 GSM fleece cotton. Dual-lined hood and subtle chest emblem for warmup and casual streetwear.',
    description_pl: 'Ciepła bluza rozpinana na solidny suwak, szyta w Polsce z bawełny 420 GSM z polarem od spodu. Podwójny kaptur, kieszenie kangurki i dyskretny nadruk. Idealna na rozgrzewkę i na co dzień.',
    shortDescription: 'Rozpinana bluza z kapturem 420 GSM z solidnym suwakiem.',
    shortDescription_en: 'Full-zip 420 GSM hoodie with heavy-duty zipper and dual hood.',
    shortDescription_pl: 'Ciepła bluza rozpinana 420 GSM z solidnym zamkiem.',
    price: 74.99,
    compareAtPrice: 84.99,
    currency: 'EUR',
    images: [
      HOODIE_IMAGE,
      TSHIRT_IMAGE
    ],
    category: 'heren',
    subcategory: 'Hoodies',
    subcategory_en: 'Hoodies',
    subcategory_pl: 'Bluzy Rozpinane',
    sport: ['fitness', 'boxing', 'mma'],
    gender: 'men',
    collection: 'OCTAGON CLASSICS',
    material: '80% Cotton, 20% Polyester (420 GSM)',
    colors: [
      { name: 'Black Metal-Zip', hex: '#0B0B0B' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    stock: 20,
    sku: 'OCT-ZIP-019',
    badges: [
      { type: 'new', label: 'ZIP HOODIE' }
    ],
    featured: false,
    rating: 4.8,
    reviewCount: 21
  },

  // ==========================================
  // 4. WOMEN'S COMBAT APPAREL & GEAR
  // ==========================================
  {
    id: 'oct-wom-11',
    slug: 'octagon-women-compression-performance-legging',
    name: 'Octagon Women Combat Pro High-Waist Legging',
    name_en: 'Octagon Women Combat High-Waist Pro Leggings',
    name_pl: 'Damskie Legginsy Kompresyjne Octagon Combat Pro High-Waist',
    brand: 'OCTAGON',
    description: 'Speciaal ontworpen high-waist sportlegging voor kickboksen, MMA en krachttraining. Vervaardigd uit 100% squat-proof dicht geweven compressiestof die niet afzakt tijdens zware trapreeksen of grondvechten. Subtiel Octagon logo op de heup.',
    description_en: 'High-waisted compression athletic tights engineered for kickboxing, MMA, and grappling. 100% squat-proof dense knit that stays in place during high kicks and mat scrambles.',
    description_pl: 'Wysoki stan i pełna nieprześwitywalność (100% squat-proof). Dedykowane do kickboxingu, MMA i treningu siłowego. Nie zsuwają się w pasie podczas kopnięć i parteru.',
    shortDescription: 'Squat-proof high-waist combat legging met compressieweefsel.',
    shortDescription_en: 'Squat-proof high-waisted performance compression leggings.',
    shortDescription_pl: 'Nieprześwitujące legginsy kompresyjne z wysokim stanem.',
    price: 59.99,
    compareAtPrice: 69.99,
    currency: 'EUR',
    images: [
      LEGGINGS_IMAGE,
      RASHGUARD_IMAGE
    ],
    category: 'dames',
    subcategory: 'Leggings',
    subcategory_en: 'Leggings',
    subcategory_pl: 'Legginsy',
    sport: ['kickboxing', 'fitness', 'mma'],
    gender: 'women',
    collection: 'FIGHT ESSENTIALS',
    material: '78% Polyamide, 22% Elastane Compression Knit',
    colors: [
      { name: 'Onyx Black', hex: '#0B0B0B' }
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    stock: 25,
    sku: 'OCT-WM-011',
    badges: [
      { type: 'bestseller', label: 'WOMEN FIT' }
    ],
    featured: true,
    isBestseller: true,
    rating: 4.9,
    reviewCount: 46
  },
  {
    id: 'oct-wom-21',
    slug: 'legion-octagon-flower-womens-boxing-gloves',
    name: 'Legion Octagon Flower Dames Bokshandschoenen',
    name_en: 'Legion Octagon Flower Women\'s Boxing Gloves 10oz/12oz',
    name_pl: 'Damskie Rękawice Bokserskie Legion Octagon Flower 10oz/12oz',
    brand: 'LEGION OCTAGON',
    description: 'Damesmodel uit de Legion Octagon collectie van octagonshop.pl. Speciaal gevormd met een smallere handholte en versterkte polsbandage voor de anatomie van vrouwelijke vechters. Stijlvol zwart-roze design met multi-layer schuimkussens.',
    description_en: 'Women\'s specific model from the Legion Octagon line at octagonshop.pl. Ergonomically narrower hand pocket and reinforced wrist strap tailored for female athletes. Chic styling with multi-layer strike cushioning.',
    description_pl: 'Damski model z serii Legion Octagon z octagonshop.pl. Węższa komora na dłoń i wzmocniony mankiet stabilizujący damski nadgarstek. Eleganckie wykończenie i bezpieczna pianka wielowarstwowa.',
    shortDescription: 'Ergonomische dames bokshandschoenen met smallere handholte.',
    shortDescription_en: 'Women\'s boxing gloves with narrower hand compartment and wrist lock.',
    shortDescription_pl: 'Damskie rękawice bokserskie o węższym profilu dłoni.',
    price: 79.99,
    compareAtPrice: 89.99,
    currency: 'EUR',
    images: [
      BOXING_GLOVES_IMAGE,
      LEGGINGS_IMAGE
    ],
    category: 'dames',
    subcategory: 'Bokshandschoenen',
    subcategory_en: 'Boxing Gloves',
    subcategory_pl: 'Rękawice Damskie',
    sport: ['boxing', 'kickboxing', 'fitness'],
    gender: 'women',
    collection: 'LEGION OCTAGON',
    material: 'Engineered Synthetic Leather & Dual-Density Foam',
    colors: [
      { name: 'Black / Rose Accent', hex: '#E06287' },
      { name: 'Matte White / Gold', hex: '#D4AF37' }
    ],
    sizes: ['10 OZ', '12 OZ'],
    stock: 16,
    sku: 'OCT-WM-GLV-021',
    badges: [
      { type: 'new', label: 'WOMEN ONLY' }
    ],
    featured: true,
    isNew: true,
    rating: 4.8,
    reviewCount: 18
  },

  // ==========================================
  // 5. KIDS & JUNIOR FIGHT GEAR
  // ==========================================
  {
    id: 'oct-kid-22',
    slug: 'legion-octagon-monkey-kids-boxing-gloves',
    name: 'Legion Octagon Monkey Kids Bokshandschoenen 6oz/8oz',
    name_en: 'Legion Octagon Monkey Kids Youth Boxing Gloves',
    name_pl: 'Dziecięce Rękawice Bokserskie Legion Octagon Monkey 6oz/8oz',
    brand: 'LEGION OCTAGON',
    description: 'Speciaal ontwikkelde bokshandschoenen voor jonge vechters en kinderen (6 tot 14 jaar) uit het assortiment van octagonshop.pl. Voorzien van extra zachte impact foam, vaste duimbescherming en een eenvoudige brede klittenbandsluiting.',
    description_en: 'Specially engineered boxing gloves for youth fighters (ages 6 to 14) from octagonshop.pl. Features extra soft impact foam, locked thumb safety, and easy wide velcro closure for kids.',
    description_pl: 'Bezpieczne rękawice bokserskie dla dzieci i młodzieży (od 6 do 14 lat) z oferty octagonshop.pl. Wyjątkowo miękka pianka tłumiąca, zablokowany kciuk chroniący przed urazem i łatwe zapinanie na rzep.',
    shortDescription: 'Veilige kinderbokshandschoenen met zachte demping en vaste duim.',
    shortDescription_en: 'Safe youth boxing gloves with soft impact foam and thumb lock.',
    shortDescription_pl: 'Bezpieczne rękawice bokserskie dla dzieci z ochroną kciuka.',
    price: 44.99,
    compareAtPrice: 54.99,
    currency: 'EUR',
    images: [
      BOXING_GLOVES_IMAGE,
      CAMO_GLOVES_IMAGE
    ],
    category: 'kids',
    subcategory: 'Kids Handschoenen',
    subcategory_en: 'Kids Boxing Gloves',
    subcategory_pl: 'Rękawice Dziecięce',
    sport: ['boxing', 'kickboxing', 'karate'],
    gender: 'kids',
    collection: 'LEGION OCTAGON',
    material: 'Safety Syn-Leather & Soft Multi-Density Kids Foam',
    colors: [
      { name: 'Red / Black Monkey', hex: '#D71920' },
      { name: 'Blue / Black Monkey', hex: '#1D4ED8' }
    ],
    sizes: ['6 OZ', '8 OZ'],
    stock: 22,
    sku: 'OCT-KID-022',
    badges: [
      { type: 'bestseller', label: 'KIDS SAFE' }
    ],
    featured: true,
    rating: 4.9,
    reviewCount: 31
  },
  {
    id: 'oct-kid-23',
    slug: 'octagon-kids-cotton-logo-tshirt',
    name: 'Octagon Kids 100% Katoen Logo T-Shirt',
    name_en: 'Octagon Kids 100% Combed Cotton Logo T-Shirt',
    name_pl: 'Dziecięca Koszulka Bawełniana Octagon Kids',
    brand: 'OCTAGON',
    description: 'Kinder T-shirt van 100% zacht ademend katoen. Vervaardigd in Polen met veilige, niet-giftige zeefdruk van het Octagon logo. Bestand tegen veelvuldig wassen en intensieve trainingen.',
    description_en: 'Youth athletic t-shirt in 100% soft breathable cotton made in Poland with non-toxic screen printed Octagon graphics. Wash-durable and comfortable.',
    description_pl: 'Dziecięca koszulka ze 100% miękkiej bawełny czesanej szyta w Polsce z bezpiecznym i trwałym nadrukiem sitodrukowym Octagon. Odporna na pranie i znoszenie.',
    shortDescription: '100% zacht katoen kinder t-shirt met duurzame opdruk.',
    shortDescription_en: '100% soft cotton kids t-shirt with durable print.',
    shortDescription_pl: '100% miękka bawełna t-shirt dziecięcy z trwałym nadrukiem.',
    price: 24.99,
    compareAtPrice: 29.99,
    currency: 'EUR',
    images: [
      TSHIRT_IMAGE
    ],
    category: 'kids',
    subcategory: 'Kids Kleding',
    subcategory_en: 'Kids Apparel',
    subcategory_pl: 'Odzież Dziecięca',
    sport: ['fitness', 'boxing', 'karate'],
    gender: 'kids',
    collection: 'OCTAGON KIDS',
    material: '100% Soft Combed Cotton',
    colors: [
      { name: 'Black', hex: '#0B0B0B' },
      { name: 'Red', hex: '#D71920' }
    ],
    sizes: ['116-122', '128-134', '140-146', '152-158'],
    stock: 25,
    sku: 'OCT-KID-TSH-023',
    badges: [
      { type: 'new', label: 'KIDS' }
    ],
    featured: false,
    rating: 4.8,
    reviewCount: 14
  },

  // ==========================================
  // 6. ACCESSOIRES & TRAINING EQUIPMENT
  // ==========================================
  {
    id: 'oct-acc-12',
    slug: 'octagon-gear-duffle-bag-60l',
    name: 'Octagon Heavy Combat Duffle Bag 60L',
    name_en: 'Octagon Heavy Combat 60L Sports Duffle Bag',
    name_pl: 'Duża Torba Sportowa Octagon Heavy Combat 60L',
    brand: 'OCTAGON',
    description: 'Gebouwd om al je bokshandschoenen, scheenbeschermers, helm en natte kleding te dragen. Gemaakt van 900D ballistisch waterafstotend nylon met geventileerde schoenencompartimenten, heavy-duty ritsen en comfortabele schouderband.',
    description_en: 'Built to haul gloves, shin guards, headgear, and wraps. Water-resistant 900D ballistic nylon with ventilated shoe pocket, reinforced seams, and padded shoulder strap.',
    description_pl: 'Mieści rękawice, nagolenniki, kask i kimono. Wodoodporny nylon balistyczny 900D z wentylowaną kieszenią na buty, mocnymi suwakami i pasem na ramię.',
    shortDescription: '60L sporttas van 900D nylon met geventileerd schoenen-/gearvak.',
    shortDescription_en: '60L heavy-duty sports duffle with ventilated gear compartment.',
    shortDescription_pl: 'Pojemna torba sportowa 60L z wentylowaną komorą na sprzęt.',
    price: 64.99,
    compareAtPrice: 74.99,
    currency: 'EUR',
    images: [
      DUFFLE_BAG_IMAGE,
      BOXING_GLOVES_IMAGE
    ],
    category: 'accessoires',
    subcategory: 'Sporttassen',
    subcategory_en: 'Gym Bags',
    subcategory_pl: 'Torby Sportowe',
    sport: ['boxing', 'kickboxing', 'mma', 'fitness'],
    gender: 'unisex',
    collection: 'OCTAGON CLASSICS',
    material: '900D Ballistic Water-Resistant Nylon',
    colors: [
      { name: 'Stealth Black / Red Trim', hex: '#D71920' }
    ],
    sizes: ['60 LITER'],
    stock: 24,
    sku: 'OCT-BAG-012',
    badges: [
      { type: 'bestseller', label: 'HEAVY DUTY' }
    ],
    featured: true,
    isBestseller: true,
    rating: 4.9,
    reviewCount: 38
  },
  {
    id: 'oct-acc-07',
    slug: 'octagon-stretch-hand-wraps-4-5m',
    name: 'Octagon Elastic Mexican Hand Wraps 4.5 Meter',
    name_en: 'Octagon 4.5m Mexican Style Elastic Hand Wraps',
    name_pl: 'Elastyczne Owijki Bokserskie Octagon 4.5m',
    brand: 'OCTAGON',
    description: 'Traditionele elastische boksbandages voor onwankelbare polsfixatie en bescherming van de middenhandsbeentjes. Voorzien van duimlus en extra brede klittenbandsluiting.',
    description_en: 'Traditional stretch cotton Mexican style hand wraps for optimal knuckle and wrist stabilization with thumb loop and heavy-duty velcro.',
    description_pl: 'Tradycyjne elastyczne owijki bokserskie w stylu meksykańskim dla stabilizacji dłoni i nadgarstków z pętlą na kciuk i solidnym rzepem.',
    shortDescription: '4.5m stretch bandages met duimlus en duurzame klittenbandsluiting.',
    shortDescription_en: '4.5m stretch wraps with thumb loop and heavy-duty hook-and-loop closure.',
    shortDescription_pl: 'Owijki elastyczne 4.5m z pętlą na kciuk i mocnym rzepem.',
    price: 14.99,
    compareAtPrice: 17.99,
    currency: 'EUR',
    images: [
      BOXING_GLOVES_IMAGE
    ],
    category: 'accessoires',
    subcategory: 'Boksbandages',
    subcategory_en: 'Hand Wraps',
    subcategory_pl: 'Owijki Bokserskie',
    sport: ['boxing', 'kickboxing', 'muay-thai', 'mma'],
    gender: 'unisex',
    collection: 'FIGHT ESSENTIALS',
    material: 'Stretch Cotton & Spandex blend',
    colors: [
      { name: 'Pure Red', hex: '#D71920' },
      { name: 'Jet Black', hex: '#141414' },
      { name: 'Championship White', hex: '#FFFFFF' }
    ],
    sizes: ['4.5 METER'],
    stock: 90,
    sku: 'OCT-WRP-007',
    badges: [
      { type: 'bestseller', label: 'ESSENTIAL' }
    ],
    featured: false,
    rating: 4.9,
    reviewCount: 92
  },
  {
    id: 'oct-fg-08',
    slug: 'octagon-custom-fit-pro-mouthguard',
    name: 'Octagon Pro Dual-Layer Gebitsbeschermer',
    name_en: 'Octagon Pro Dual-Layer Boil & Bite Mouthguard',
    name_pl: 'Podwójny Ochraniacz Szczęki Octagon Pro Dual-Layer',
    brand: 'OCTAGON',
    description: 'Geavanceerde boil-and-bite tandbescherming met schokdempend buitenskelet en zachte thermoplastische binnenlaag. Inclusief antibacterieel opbergdoosje.',
    description_en: 'Advanced dual-layer boil-and-bite mouthguard with rigid impact exoskeleton and customized inner mould. Includes antibacterial hygiene case.',
    description_pl: 'Zaawansowana podwójna szczęka bokserska z twardym szkieletem amortyzującym i termoformowalnym wnętrzem. Zawiera antybakteryjne pudełko.',
    shortDescription: 'Dual-layer bitje met schokdempend skelet en ademkanaal.',
    shortDescription_en: 'Dual-layer mouthguard with shock skeleton and central air channel.',
    shortDescription_pl: 'Podwójna szczęka z kanałem oddechowym i szkieletem ochronnym.',
    price: 19.99,
    compareAtPrice: 24.99,
    currency: 'EUR',
    images: [
      SHIN_GUARDS_IMAGE
    ],
    category: 'fight-gear',
    subcategory: 'Bescherming',
    subcategory_en: 'Protection',
    subcategory_pl: 'Ochraniacze Szczęki',
    sport: ['mma', 'boxing', 'kickboxing', 'muay-thai', 'grappling', 'karate'],
    gender: 'unisex',
    collection: 'FIGHT ESSENTIALS',
    material: 'Medical-grade BPA-Free Thermo Polymer',
    colors: [
      { name: 'Black / Red', hex: '#D71920' },
      { name: 'Clear / Ice', hex: '#FFFFFF' }
    ],
    sizes: ['Senior (12+)'],
    stock: 65,
    sku: 'OCT-MTH-008',
    badges: [
      { type: 'bestseller', label: 'ESSENTIAL' }
    ],
    featured: false,
    rating: 4.8,
    reviewCount: 54
  },
  {
    id: 'oct-fg-09',
    slug: 'octagon-curved-focus-mitts-pro',
    name: 'Octagon Pro Curved Focus Mitts (Handpads Paar)',
    name_en: 'Octagon Pro Curved Boxing Focus Mitts (Pair)',
    name_pl: 'Profilowane Tarcze Trenerskie Octagon Pro (Para)',
    brand: 'OCTAGON',
    description: 'Voorgevormde lederen handpads met schokdempende palmdome voor trainer en vechter. Absorbeert zware stootkrachten en ontlast de polsen van de coach.',
    description_en: 'Anatomically curved focus mitts engineered with wrist wedge and shock-absorbing palm dome for precision striking and trainer comfort.',
    description_pl: 'Anatomicznie profilowane tarcze bokserskie ze skóry ze stabilizacją nadgarstka trenera i wewnętrzną kulą absorbującą najcięższe ciosy.',
    shortDescription: 'Voorgevormde lederen handpads met schokdempende palmdome.',
    shortDescription_en: 'Curved leather punch mitts with palm dome impact absorption.',
    shortDescription_pl: 'Skórzane łapy trenerskie z amortyzującą kulą wewnątrz dłoni.',
    price: 84.99,
    compareAtPrice: 99.99,
    currency: 'EUR',
    images: [
      BOXING_GLOVES_IMAGE
    ],
    category: 'training',
    subcategory: 'Focus Mitts',
    subcategory_en: 'Focus Mitts',
    subcategory_pl: 'Tarcze Trenerskie',
    sport: ['boxing', 'kickboxing', 'mma'],
    gender: 'unisex',
    collection: 'PRO SERIES',
    material: 'Engineered Leather & Layered Foam Core',
    colors: [
      { name: 'Matte Black / Red', hex: '#D71920' }
    ],
    sizes: ['One Size (Paar)'],
    stock: 15,
    sku: 'OCT-PAD-009',
    badges: [
      { type: 'limited', label: 'COACH PRO' }
    ],
    featured: true,
    rating: 4.9,
    reviewCount: 28
  },
  {
    id: 'oct-sal-10',
    slug: 'octagon-retro-boxing-shorts-sale',
    name: 'Octagon Traditional Satin Muay Thai Shorts',
    name_en: 'Octagon Traditional Satin Muay Thai Shorts',
    name_pl: 'Tradycyjne Spodenki Satynowe Muay Thai Octagon',
    brand: 'OCTAGON',
    description: 'Klassieke Thaise satijnen kickboks short met hoge elastische 8-baans tailleband en brede beenopening. Outlet prijs rechtstreeks uit de magazijnvoorraad.',
    description_en: 'Classic authentic Thai satin kickboxing shorts with 8-stripe elastic waistband and wide leg cut. Clearance price directly from Poland warehouse.',
    description_pl: 'Klasyczne spodenki Muay Thai z gęstej satyny z 8-rzędowym pasem i szerokim wycięciem na nogi. Cena wyprzedażowa prosto z magazynu.',
    shortDescription: 'Traditionele Thaise satijnen kickboks short met 8-baans tailleband.',
    shortDescription_en: 'Traditional Thai satin fight shorts with 8-stripe elastic waistband.',
    shortDescription_pl: 'Tradycyjne spodenki satynowe Muay Thai ze sprężystym ściągaczem.',
    price: 29.99,
    compareAtPrice: 49.99,
    currency: 'EUR',
    images: [
      MUAY_THAI_SHORTS_IMAGE,
      RASHGUARD_IMAGE
    ],
    category: 'sale',
    subcategory: 'Muay Thai Shorts',
    subcategory_en: 'Muay Thai Shorts',
    subcategory_pl: 'Spodenki Muay Thai',
    sport: ['kickboxing', 'muay-thai'],
    gender: 'unisex',
    collection: 'SALE',
    material: '100% High-Grade Thai Satin',
    colors: [
      { name: 'Black / Gold', hex: '#D4AF37' }
    ],
    sizes: ['M', 'L'],
    stock: 7,
    sku: 'OCT-SL-010',
    badges: [
      { type: 'sale', label: '-40%' },
      { type: 'last-size', label: 'OUTLET DEAL' }
    ],
    featured: true,
    isSale: true,
    rating: 4.7,
    reviewCount: 19
  },

  // ==========================================
  // 7. NEW DIRECT IMPORTS FROM OCTAGON POLAND
  // ==========================================
  {
    id: 'oct-acc-24',
    slug: 'octagon-streetwear-tactical-waist-bag-nerka',
    name: 'Octagon Tactical Heuptas / Sling Bag Crossbody',
    name_en: 'Octagon Tactical Streetwear Waist Bag / Crossbody Sling',
    name_pl: 'Saszetka Biodrowa / Nerka na Ramię Octagon Tactical Logo',
    brand: 'OCTAGON',
    description: 'De iconische Octagon heuptas (nerka) rechtstreeks uit de streetwear collectie van octagonshop.pl. Gemaakt van ultra-sterk waterafstotend Cordura-polyester met een geborduurd rood Octagon embleem. Voorzien van twee ruime compartimenten met stevige ritssluitingen, clipsluiting en verstelbare draagriem voor heup of crossbody.',
    description_en: 'The signature Octagon streetwear waist bag directly from octagonshop.pl. Engineered from heavy-duty water-repellent Cordura polyester with vibrant 3D red Octagon patch. Dual zippered security pockets, heavy-duty buckle, and adjustable strap for waist or crossbody wear.',
    description_pl: 'Kultowa nerka / saszetka biodrowa z kolekcji streetwear sklepu octagonshop.pl. Wykonana z mocnego, wodoodpornego materiału typu Cordura z charakterystycznym czerwonym haftowanym logo Octagon. Dwie pojemne komory na solidne zamki, mocna klamra zatrzaskowa i regulowany pas na biodro lub przez ramię.',
    shortDescription: 'Waterafstotende Cordura heuptas met geborduurd Octagon logo en stevige clips.',
    shortDescription_en: 'Water-repellent Cordura waist sling bag with embroidered Octagon patch.',
    shortDescription_pl: 'Wodoodporna nerka biodrowa z haftowanym logo Octagon i mocną klamrą.',
    price: 34.99,
    compareAtPrice: 39.99,
    currency: 'EUR',
    images: [
      WAIST_BAG_IMAGE,
      DUFFLE_BAG_IMAGE
    ],
    category: 'accessoires',
    subcategory: 'Heuptassen & Slings',
    subcategory_en: 'Waist & Sling Bags',
    subcategory_pl: 'Nerki i Saszetki',
    sport: ['fitness', 'boxing', 'mma'],
    gender: 'unisex',
    collection: 'OCTAGON STREETWEAR',
    material: '100% Heavy-Duty Cordura Polyester',
    colors: [
      { name: 'Pure Tactical Black', hex: '#0B0B0B' }
    ],
    sizes: ['One Size (Verstelbaar)'],
    stock: 55,
    sku: 'OCT-NRK-024',
    badges: [
      { type: 'bestseller', label: 'STREET HIT PL' },
      { type: 'new', label: 'NOWOŚĆ' }
    ],
    featured: true,
    isBestseller: true,
    isNew: true,
    rating: 4.9,
    reviewCount: 42
  },
  {
    id: 'oct-acc-25',
    slug: 'octagon-3d-logo-snapback-cap-black',
    name: 'Octagon 3D Raised Logo Snapback Cap',
    name_en: 'Octagon 3D Raised Logo Streetwear Snapback Cap',
    name_pl: 'Czapka z Daszkiem Snapback Octagon 3D Logo',
    brand: 'OCTAGON',
    description: 'Onmisbaar item in het straatbeeld van Octagon fans. Zwarte snapback pet met prominent 3D reliëf borduursel van het Octagon Fight Brand logo in contrasterend rood. Vlakke klep met contrasterende rode stiksels, verstevigde voorkant en klassieke drukknoopsluiting achteraan.',
    description_en: 'Iconic Octagon fight streetwear headwear. Black snapback cap featuring thick 3D raised embroidery of the Octagon Fight Brand logo in bold red. Flat brim with red contrast stitching, structured crown, and snap closure.',
    description_pl: 'Klasyk odzieży ulicznej Octagon dostępny na octagonshop.pl. Czarna czapka typu snapback z grubym, wypukłym haftem 3D logo Octagon Fight Brand w kolorze czerwonym. Prosty daszek z czerwonymi przeszyciami, usztywniony przód i regulowane zapięcie.',
    shortDescription: 'Zwarte snapback cap met dik 3D geborduurd rood Octagon logo.',
    shortDescription_en: 'Black streetwear snapback cap with raised 3D embroidered red Octagon logo.',
    shortDescription_pl: 'Czapka snapback z wypukłym haftem 3D Octagon i prostym daszkiem.',
    price: 32.99,
    compareAtPrice: 38.99,
    currency: 'EUR',
    images: [
      SNAPBACK_IMAGE,
      HOODIE_IMAGE
    ],
    category: 'accessoires',
    subcategory: 'Caps & Mutsen',
    subcategory_en: 'Caps & Headwear',
    subcategory_pl: 'Czapki z Daszkiem',
    sport: ['fitness', 'boxing', 'mma'],
    gender: 'unisex',
    collection: 'OCTAGON STREETWEAR',
    material: '80% Acryl, 20% Wol Blend',
    colors: [
      { name: 'Black / Red 3D', hex: '#D71920' }
    ],
    sizes: ['One Size (Snapback)'],
    stock: 40,
    sku: 'OCT-CAP-025',
    badges: [
      { type: 'bestseller', label: 'OFFICIAL CAP' }
    ],
    featured: true,
    isBestseller: true,
    rating: 4.9,
    reviewCount: 38
  },
  {
    id: 'oct-tr-26',
    slug: 'octagon-pro-leather-curved-thai-pads-pair',
    name: 'Octagon Pro Lederen Gebogen Thai Kick Pads (Paar)',
    name_en: 'Octagon Pro Curved Leather Muay Thai Kicking Pads (Pair)',
    name_pl: 'Skórzane Profilowane Tarcze Tajskie Octagon Pro Kick Pads (Para)',
    brand: 'OCTAGON',
    description: 'Professionele Thaise trapkussens voor zware low-kicks, body-kicks en knietechnieken. Vervaardigd uit 100% dik rundleer met meerlagige schokabsorberende kern die schokken op de polsen en ellebogen van de trainer minimaliseert. Dubbele brede klittenband pols- en onderarmsluitingen en geklonken lederen handgreep.',
    description_en: 'Heavy-duty commercial Muay Thai kicking pads for punishing leg kicks, body shots, and knee strikes. 100% genuine cowhide leather with multi-density impact dissipation foam. Dual reinforced forearm velcro straps and riveted handle.',
    description_pl: 'Profesjonalne tarcze tajskie do mocnych kopnięć low-kick, middle-kick oraz uderzeń kolanami. Wykonane w 100% z grubej skóry bydlęcej z wielowarstwowym wkładem tłumiącym siłę uderzeń. Dwa szerokie pasy na rzep stabilizujące przedramię i nitowany uchwyt.',
    shortDescription: 'Lederen Thaise trapkussens met dubbele onderarmbanden en schokdemping.',
    shortDescription_en: 'Genuine leather curved Thai kicking pads with dual forearm straps.',
    shortDescription_pl: 'Skórzane tarcze tajskie do kopnięć z podwójnymi pasami na rzep.',
    price: 139.99,
    compareAtPrice: 169.99,
    currency: 'EUR',
    images: [
      THAI_PADS_IMAGE,
      BOXING_GLOVES_IMAGE
    ],
    category: 'training',
    subcategory: 'Trapkussens & Pads',
    subcategory_en: 'Thai Kick Pads',
    subcategory_pl: 'Tarcze Tajskie',
    sport: ['muay-thai', 'kickboxing', 'mma'],
    gender: 'unisex',
    collection: 'PRO SERIES',
    material: '100% Heavy Cowhide Leather & Multi-layer High Density Core',
    colors: [
      { name: 'Matte Black / Red Target', hex: '#D71920' }
    ],
    sizes: ['Standard Pro Size (Paar)'],
    stock: 14,
    sku: 'OCT-THP-026',
    badges: [
      { type: 'bestseller', label: 'CLUB GRADE' }
    ],
    featured: true,
    isBestseller: true,
    rating: 5.0,
    reviewCount: 22
  },
  {
    id: 'oct-tr-27',
    slug: 'octagon-pro-heavy-punching-bag-150cm',
    name: 'Octagon Pro Heavy Bokszak 150cm / 45kg (Gevuld)',
    name_en: 'Octagon Pro Heavy Boxing Punching Bag 150cm / 45kg',
    name_pl: 'Profesjonalny Worek Bokserski Octagon Heavy Bag 150cm / 45kg',
    brand: 'OCTAGON',
    description: 'Onverwoestbare bokszak voor dojo\'s, sportscholen en thuisgebruik. Geproduceerd in Polen uit extreem scheurvast plawil/kunstleder met versterkte kruisnaden en stalen 4-punts draaiketting met wartel. Gelijkmatig gevuld met textielsnippers voor een natuurlijke veerkracht en bescherming van de gewrichten.',
    description_en: 'Indestructible professional heavy bag for combat academies and home fight gyms. Made in Poland from reinforced ballistic Plawil vinyl leather with cross-stitched webbing and 4-strand steel swivel chains. Machine packed with textile cuttings.',
    description_pl: 'Niezniszczalny profesjonalny worek treningowy szyty w Polsce ze wzmocnionego plawilu o podwyższonej odporności na rozerwanie. 4-ramienny łańcuch ze stali ocynkowanej z krętlikiem zapobiegającym skręcaniu. Maszynowo wypełniony ścinkami tekstylnymi dla idealnej twardości.',
    shortDescription: '150cm zware bokszak (45kg) gemaakt in Polen met stalen kettingen en wartel.',
    shortDescription_en: '150cm heavy bag (45kg) made in Poland with swivel steel chain.',
    shortDescription_pl: 'Worek bokserski 150cm / 45kg szyty w Polsce z obrotowym łańcuchem.',
    price: 159.99,
    compareAtPrice: 189.99,
    currency: 'EUR',
    images: [
      HEAVY_BAG_IMAGE,
      BOXING_GLOVES_IMAGE
    ],
    category: 'training',
    subcategory: 'Bokszakken',
    subcategory_en: 'Punching Bags',
    subcategory_pl: 'Worki Treningowe',
    sport: ['boxing', 'kickboxing', 'muay-thai', 'mma'],
    gender: 'unisex',
    collection: 'PRO SERIES',
    material: 'Reinforced 900g Plawil Synthetic & Steel Swivel Chains',
    colors: [
      { name: 'Fight Black / Red Vertical', hex: '#D71920' }
    ],
    sizes: ['150cm (ca. 45kg)'],
    stock: 12,
    sku: 'OCT-BAG-150',
    badges: [
      { type: 'bestseller', label: 'MADE IN POLAND' }
    ],
    featured: true,
    isBestseller: true,
    rating: 5.0,
    reviewCount: 31
  },
  {
    id: 'oct-app-28',
    slug: 'octagon-tactical-combat-windbreaker-jacket',
    name: 'Octagon Tactical Combat Windbreaker Jack met Capuchon',
    name_en: 'Octagon Tactical Combat Hooded Windbreaker Jacket',
    name_pl: 'Kurtka Przejściowa Wiatrówka Octagon Tactical z Kapturem',
    brand: 'OCTAGON',
    description: 'Functionele wiatrówka jas uit de streetwear catalogus van octagonshop.pl. Waterafstotend en winddicht technisch materiaal met mesh binnenvoering voor ademend comfort. Voorzien van getapete ritssluitingen, borstzak met rits, verstelbare elastische capuchon en rood Octagon embleem op de borst.',
    description_en: 'Performance technical windbreaker jacket from octagonshop.pl. Water-repellent and windproof technical shell with breathable athletic mesh lining. Taped waterproof zippers, chest pocket, adjustable drawstring hood, and signature red Octagon chest logo.',
    description_pl: 'Funkcjonalna kurtka wiatrówka z kolekcji octagonshop.pl. Wodoodporny i wiatroszczelny materiał techniczny z oddychającą podszewką siatkową. Klejone zamki błyskawiczne, kieszeń na piersi, regulowany kaptur ze ściągaczami i czerwone logo Octagon.',
    shortDescription: 'Waterafstotende wiatrówka jas met getapete ritsen en capuchon.',
    shortDescription_en: 'Water-repellent technical windbreaker with taped zips and hood.',
    shortDescription_pl: 'Wodoodporna wiatrówka z klejonymi zamkami i kapturem.',
    price: 89.99,
    compareAtPrice: 109.99,
    currency: 'EUR',
    images: [
      WINDBREAKER_IMAGE,
      HOODIE_IMAGE,
      JOGGER_IMAGE
    ],
    category: 'heren',
    subcategory: 'Jassen',
    subcategory_en: 'Jackets',
    subcategory_pl: 'Kurtki',
    sport: ['fitness', 'boxing', 'mma'],
    gender: 'men',
    collection: 'OCTAGON STREETWEAR',
    material: '100% Water-Repellent Technical Polyester Shell & Breathable Mesh',
    colors: [
      { name: 'Tactical Stealth Black', hex: '#0B0B0B' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    stock: 24,
    sku: 'OCT-JKT-028',
    badges: [
      { type: 'new', label: 'NEW SEASON' }
    ],
    featured: true,
    isNew: true,
    rating: 4.9,
    reviewCount: 26
  },
  {
    id: 'oct-fg-29',
    slug: 'octagon-pro-cage-mma-4oz-competition-gloves',
    name: 'Octagon Pro Cage MMA 4oz Wedstrijdhandschoenen',
    name_en: 'Octagon Pro Cage 4oz Official MMA Competition Gloves',
    name_pl: 'Rękawice Zawodowe MMA Octagon Pro Cage 4oz ze Skóry Naturalnej',
    brand: 'OCTAGON',
    description: 'Officiële 4oz MMA wedstrijd handschoenen volgens professionele kooireglementen. Gemaakt van premium volnerf rundleer met open handpalm voor maximale grip bij takedowns en verwurgingen. Vrije duim voor flexibiliteit en dubbele polswikkel voor extreme polsstijfheid.',
    description_en: 'Official 4oz pro competition fight gloves built to regulation cage standards. Premium cowhide leather construction with open palm for clinch work, ground control, and submissions. Dual-lock wrist strap for wrist rigidity.',
    description_pl: 'Oficjalne rękawice startowe MMA 4oz zgodne ze standardami klatkowymi. Najwyższej jakości skóra bydlęca z odsłoniętą dłonią do chwytów, rzutów i duszeń w parterze. Podwójny rzep zapewniający maksymalną stabilność nadgarstka.',
    shortDescription: 'Officiële 4oz wedstrijdhandschoenen van rundleer met open handpalm.',
    shortDescription_en: 'Official 4oz cowhide MMA fight gloves with open palm ergonomics.',
    shortDescription_pl: 'Zawodowe rękawice MMA 4oz ze skóry naturalnej do walk w klatce.',
    price: 64.99,
    compareAtPrice: 74.99,
    currency: 'EUR',
    images: [
      BOXING_GLOVES_IMAGE,
      MMA_SHORTS_IMAGE
    ],
    category: 'fight-gear',
    subcategory: 'MMA Handschoenen',
    subcategory_en: 'MMA Gloves',
    subcategory_pl: 'Rękawice MMA',
    sport: ['mma', 'grappling'],
    gender: 'unisex',
    collection: 'PRO SERIES',
    material: '100% Genuine Cowhide Leather & Layered Density Foam',
    colors: [
      { name: 'Cage Black / Red Octagon', hex: '#D71920' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 22,
    sku: 'OCT-MMA4-029',
    badges: [
      { type: 'bestseller', label: 'CAGE PRO 4OZ' }
    ],
    featured: true,
    isBestseller: true,
    rating: 4.9,
    reviewCount: 35
  },
  {
    id: 'oct-fg-30',
    slug: 'octagon-zeby-mma-fight-shorts',
    name: 'Octagon "Zęby" MMA & Grappling Fight Shorts',
    name_en: 'Octagon "Teeth" Sublimated MMA & Grappling Fight Shorts',
    name_pl: 'Spodenki do MMA i Grapplingu Octagon "Zęby" Ripstop',
    brand: 'OCTAGON',
    description: 'Bijpassende fightshorts bij de legendarische "Zęby" rashguard. Onverwoestbare sublimatiedruk van het beruchte tandenmotief dat niet vervaagt bij intensief sparren. Ripstop weefsel, diepe beensplitten en elastische kruisinzet voor explosieve takedowns en trappen.',
    description_en: 'Matching fight shorts for the famous "Teeth" rashguard series. Indestructible non-fade sublimation print with tear-resistant ripstop panels, reinforced side splits, and stretch gusset for explosive cage wrestling.',
    description_pl: 'Spodenki do kompletu z kultowym rashguardem "Zęby". Niezniszczalny nadruk sublimacyjny, materiał ripstop odporny na szarpanie w klatce, głębokie rozcięcia nogawek i elastyczny klin w kroku.',
    shortDescription: 'Kultowe spodenki "Zęby" z sublimacją i elastycznym klinem w kroku.',
    shortDescription_en: 'Iconic "Teeth" fight shorts with stretch gusset and ripstop shell.',
    shortDescription_pl: 'Kultowe spodenki "Zęby" z elastycznym krokiem i materiałem ripstop.',
    price: 52.99,
    compareAtPrice: 62.99,
    currency: 'EUR',
    images: [
      MMA_SHORTS_IMAGE,
      RASHGUARD_IMAGE
    ],
    category: 'fight-gear',
    subcategory: 'MMA Shorts',
    subcategory_en: 'MMA Shorts',
    subcategory_pl: 'Spodenki MMA',
    sport: ['mma', 'grappling', 'kickboxing'],
    gender: 'men',
    collection: 'OCTAGON CLASSICS',
    material: 'Ripstop Micro-Polyester with 4-Way Spandex Gusset',
    colors: [
      { name: 'Black / Red Teeth', hex: '#D71920' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    stock: 28,
    sku: 'OCT-ZEBSHT-030',
    badges: [
      { type: 'bestseller', label: 'LEGEND ZĘBY' }
    ],
    featured: true,
    isBestseller: true,
    rating: 5.0,
    reviewCount: 44
  },
  {
    id: 'oct-app-31',
    slug: 'octagon-pasy-heavyweight-crewneck-sweatshirt',
    name: 'Octagon "Pasy" Heavyweight Crewneck Sweater 420 GSM',
    name_en: 'Octagon "Stripes" Heavyweight 420 GSM Crewneck Sweatshirt',
    name_pl: 'Klasyczna Bluza Męska Octagon "Pasy" Crewneck 420g',
    brand: 'OCTAGON',
    description: 'Een van de meest gewilde streetwear ontwerpen van Octagon in Polen: het iconische "Pasy" model met brede strepen op de borst en mouwen. Gemaakt in Polen uit 420 GSM premium gekamd katoen met versterkte boorden en geborduurde Octagon patch.',
    description_en: 'One of the most demanded streetwear staples from Octagon Poland: the iconic "Stripes" edition with signature athletic stripes on sleeves and chest. Made in Poland from 420 GSM combed fleece cotton with heavy ribbed trims.',
    description_pl: 'Jeden z najbardziej rozpoznawalnych klasyków Octagon w Polsce. Model "Pasy" z charakterystycznymi szerokimi pasami na klatce piersiowej i ramionach. Dzianina 420 GSM szyta w Polsce, wzmacniane ściągacze i haftowana naszywka.',
    shortDescription: '420 GSM crewneck trui met de legendarische Octagon "Pasy" strepen.',
    shortDescription_en: '420 GSM heavyweight crewneck sweater with iconic Octagon stripes.',
    shortDescription_pl: 'Ciężka bluza bez kaptura 420 GSM z kultowym wzorem "Pasy".',
    price: 69.99,
    compareAtPrice: 79.99,
    currency: 'EUR',
    images: [
      HOODIE_IMAGE,
      TSHIRT_IMAGE
    ],
    category: 'heren',
    subcategory: 'Sweaters',
    subcategory_en: 'Crewnecks',
    subcategory_pl: 'Bluzy Klasyczne',
    sport: ['fitness', 'boxing', 'mma'],
    gender: 'men',
    collection: 'OCTAGON CLASSICS',
    material: '90% Combed Cotton, 10% Polyester (420 GSM)',
    colors: [
      { name: 'Black / Red Stripes', hex: '#D71920' },
      { name: 'Black / White Stripes', hex: '#FFFFFF' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL', '3XL'],
    stock: 32,
    sku: 'OCT-PAS-031',
    badges: [
      { type: 'bestseller', label: 'BESTSELLER PL' }
    ],
    featured: true,
    isBestseller: true,
    rating: 4.9,
    reviewCount: 51
  },
  {
    id: 'oct-wom-32',
    slug: 'octagon-women-combat-performance-sports-bra',
    name: 'Octagon Women Combat High-Support Sport BH',
    name_en: 'Octagon Women Combat High-Support Sports Bra & Crop Top',
    name_pl: 'Damski Biustonosz Sportowy Octagon Combat High-Support',
    brand: 'OCTAGON',
    description: 'Stevige sporttop ontworpen voor vrouwelijke vechtsporters. Biedt maximale ondersteuning bij sparren, sprinten en zaktraining zonder te knellen. Vochtregulerend 4-way stretch materiaal met uitneembare cups en racerback constructie.',
    description_en: 'High-impact compression sports bra designed for female martial artists. Maximum motion control during sparring, bag drills, and conditioning. Moisture-wicking 4-way stretch with removable pads and racerback silhouette.',
    description_pl: 'Wysoko wspierający stanik sportowy dla trenujących kobiet. Zapewnia stabilność podczas sparingów, pracy na worku i treningów siłowych. Oddychający materiał 4-way stretch, wyjmowane wkładki i sportowy krój racerback.',
    shortDescription: 'High-support sport BH voor vechtsport en fitness met uitneembare pads.',
    shortDescription_en: 'High-support compression sports bra for combat sports and gym.',
    shortDescription_pl: 'Stanik sportowy o wysokim wsparciu z wyjmowanymi wkładkami.',
    price: 39.99,
    compareAtPrice: 47.99,
    currency: 'EUR',
    images: [
      LEGGINGS_IMAGE,
      RASHGUARD_IMAGE
    ],
    category: 'dames',
    subcategory: 'Sport BH\'s',
    subcategory_en: 'Sports Bras',
    subcategory_pl: 'Top / Biustonosz',
    sport: ['boxing', 'kickboxing', 'fitness', 'mma'],
    gender: 'women',
    collection: 'FIGHT ESSENTIALS',
    material: '80% Polyamide, 20% Elastane High-Impact Knit',
    colors: [
      { name: 'Onyx Black', hex: '#0B0B0B' }
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    stock: 22,
    sku: 'OCT-BRA-032',
    badges: [
      { type: 'new', label: 'WOMEN PRO' }
    ],
    featured: false,
    isNew: true,
    rating: 4.8,
    reviewCount: 20
  },
  {
    id: 'oct-acc-33',
    slug: 'octagon-pro-high-speed-bearing-jump-rope',
    name: 'Octagon Pro Speed Rope Kogellager Boksspringtouw',
    name_en: 'Octagon Pro Speed Rope High-Speed Bearings Jump Rope',
    name_pl: 'Bokserska Skakanka Łożyskowana Octagon Pro Speed Rope',
    brand: 'OCTAGON',
    description: 'Onmisbaar trainingsaccessoire voor conditie, voetenwerk en double-unders. Voorzien van soepele 360-graden kogellagers en een met PVC gecoate stalen kabel die niet in de knoop raakt. Lichtgewicht aluminium handvatten met antislipprofiel en eenvoudig instelbare kabellengte.',
    description_en: 'Essential conditioning tool for boxing footwork and endurance. Precision 360-degree dual ball bearings with tangle-free coated steel cable. Knurled lightweight aluminum handles and easy-adjust thumb screws.',
    description_pl: 'Niezbędny sprzęt bokserski do pracy nóg, kondycji i szybkości. Podwójne łożyska kulkowe 360 stopni zapewniają płynny obrót bez plątania stalowej linki w osłonie PVC. Aluminiowe radełkowane rączki z łatwą regulacją długości.',
    shortDescription: 'Kogellager springtouw met stalen kabel en aluminium handvatten.',
    shortDescription_en: 'High-speed bearing jump rope with coated steel cable and alloy handles.',
    shortDescription_pl: 'Szybka skakanka łożyskowana z linką stalową i aluminiowymi rączkami.',
    price: 24.99,
    compareAtPrice: 29.99,
    currency: 'EUR',
    images: [
      BOXING_GLOVES_IMAGE
    ],
    category: 'accessoires',
    subcategory: 'Springtouwen',
    subcategory_en: 'Jump Ropes',
    subcategory_pl: 'Skakanki Bokserskie',
    sport: ['boxing', 'kickboxing', 'mma', 'fitness'],
    gender: 'unisex',
    collection: 'FIGHT ESSENTIALS',
    material: 'Aluminum Handles & 3m Coated Steel Cable',
    colors: [
      { name: 'Anodized Black', hex: '#0B0B0B' },
      { name: 'Combat Red', hex: '#D71920' }
    ],
    sizes: ['3 Meter (Regelbaar)'],
    stock: 50,
    sku: 'OCT-JMP-033',
    badges: [
      { type: 'bestseller', label: 'SPEED TECH' }
    ],
    featured: false,
    rating: 4.9,
    reviewCount: 47
  },
  {
    id: 'oct-fg-34',
    slug: 'octagon-pro-carbon-groin-guard-cup',
    name: 'Octagon Pro Carbon Kruisbeschermer (Suspensoor)',
    name_en: 'Octagon Pro Carbon Impact Groin Guard Cup',
    name_pl: 'Ochraniacz Krocza Octagon Pro Carbon Suspensior',
    brand: 'OCTAGON',
    description: 'Anatomisch gevormde kruisbeschermer met slagvaste carbon polymeer cup en flexibele gelranden voor comfort tijdens sparren en kooigevechten. Brede elastische tailleband met ademende mesh jockstrap pouch.',
    description_en: 'Anatomically molded groin protector with impact-resistant carbon polymer cup and soft gel edges for unrestricted mobility. Wide moisture-wicking elastic waistband and breathable mesh pouch.',
    description_pl: 'Anatomicznie wyprofilowany ochraniacz krocza z wkładką z polimeru węglowego i elastycznymi żelowymi krawędziami. Szeroki elastyczny pas i oddychająca kieszeń z siatki mesh.',
    shortDescription: 'Carbon polymeer suspensoor met zachte gelranden en brede tailleband.',
    shortDescription_en: 'Carbon polymer groin cup with gel perimeter and elastic waistband.',
    shortDescription_pl: 'Ochraniacz krocza z wkładką węglową i żelowymi krawędziami.',
    price: 26.99,
    compareAtPrice: 32.99,
    currency: 'EUR',
    images: [
      MMA_SHORTS_IMAGE
    ],
    category: 'fight-gear',
    subcategory: 'Bescherming',
    subcategory_en: 'Protection',
    subcategory_pl: 'Ochraniacze Krocza',
    sport: ['mma', 'kickboxing', 'boxing', 'muay-thai', 'karate'],
    gender: 'men',
    collection: 'FIGHT ESSENTIALS',
    material: 'Carbon Polymer Cup with Silicone Gel Rim & Elastic Webbing',
    colors: [
      { name: 'Black / Carbon', hex: '#141414' }
    ],
    sizes: ['M', 'L', 'XL'],
    stock: 35,
    sku: 'OCT-GRN-034',
    badges: [
      { type: 'bestseller', label: 'ESSENTIAL' }
    ],
    featured: false,
    rating: 4.8,
    reviewCount: 29
  },
  {
    id: 'oct-sal-35',
    slug: 'octagon-camo-dryfit-training-tshirt-sale',
    name: 'Octagon Camo Dry-Fit Training T-Shirt (Outlet Deal)',
    name_en: 'Octagon Camo Dry-Fit Athletic Training T-Shirt (Clearance)',
    name_pl: 'Termoaktywna Koszulka Treningowa Octagon Camo Dry-Fit (Wyprzedaż)',
    brand: 'OCTAGON',
    description: 'Lichtgewicht ademend trainingsshirt met urban camo patroon en reflecterend Octagon logo. Vervaardigd uit sneldrogend Dry-Fit polyester dat zweet snel afvoert. Beperkte voorraad uit de officiële fabrieksopruiming van Octagon Polen.',
    description_en: 'Lightweight breathable workout t-shirt in urban camo pattern with reflective Octagon logo. Made from quick-drying Dry-Fit polyester. Limited stock clearance directly from Octagon Poland warehouse.',
    description_pl: 'Lekka, oddychająca koszulka treningowa w militarnym wzorze camo z odblaskowym logo Octagon. Szybkoschnący materiał termoaktywny odprowadzający pot. Końcówka serii prosto z polskiego magazynu.',
    shortDescription: 'Sneldrogend camo sportshirt uit de officiële fabrieksuitverkoop.',
    shortDescription_en: 'Quick-drying athletic camo t-shirt from official factory outlet.',
    shortDescription_pl: 'Oddychający t-shirt termoaktywny camo w cenie outletowej.',
    price: 24.99,
    compareAtPrice: 39.99,
    currency: 'EUR',
    images: [
      TSHIRT_IMAGE,
      CAMO_GLOVES_IMAGE
    ],
    category: 'sale',
    subcategory: 'T-Shirts',
    subcategory_en: 'T-Shirts',
    subcategory_pl: 'Koszulki Termoaktywne',
    sport: ['fitness', 'boxing', 'mma'],
    gender: 'men',
    collection: 'SALE',
    material: '100% Technical Dry-Fit Polyester',
    colors: [
      { name: 'Urban Shadow Camo', hex: '#2B332A' }
    ],
    sizes: ['M', 'L', 'XL'],
    stock: 9,
    sku: 'OCT-SL-035',
    badges: [
      { type: 'sale', label: '-38%' },
      { type: 'last-size', label: 'LAST UNITS' }
    ],
    featured: true,
    isSale: true,
    rating: 4.7,
    reviewCount: 23
  },
  ...OCTAGON_ADDITIONAL_PRODUCTS
];

// Helper to get localized product
export const getLocalizedProduct = (product: Product, lang: Language): Product => {
  if (lang === 'pl') {
    return {
      ...product,
      name: product.name_pl || product.name,
      description: product.description_pl || product.description,
      shortDescription: product.shortDescription_pl || product.shortDescription,
      subcategory: product.subcategory_pl || product.subcategory,
    };
  }
  if (lang === 'en') {
    return {
      ...product,
      name: product.name_en || product.name,
      description: product.description_en || product.description,
      shortDescription: product.shortDescription_en || product.shortDescription,
      subcategory: product.subcategory_en || product.subcategory,
    };
  }
  return product;
};

// Helper to filter products
export const getFeaturedProducts = (lang: Language = 'nl') => PRODUCTS.filter(p => p.featured).map(p => getLocalizedProduct(p, lang));
export const getNewProducts = (lang: Language = 'nl') => PRODUCTS.filter(p => p.isNew).map(p => getLocalizedProduct(p, lang));
export const getBestsellers = (lang: Language = 'nl') => PRODUCTS.filter(p => p.isBestseller).map(p => getLocalizedProduct(p, lang));
export const getSaleProducts = (lang: Language = 'nl') => PRODUCTS.filter(p => p.isSale || (p.compareAtPrice && p.compareAtPrice > p.price)).map(p => getLocalizedProduct(p, lang));
export const getProductBySlug = (slug: string, lang: Language = 'nl') => {
  const p = PRODUCTS.find(prod => prod.slug === slug);
  return p ? getLocalizedProduct(p, lang) : undefined;
};
export const getProductsBySport = (sport: string, lang: Language = 'nl') => PRODUCTS.filter(p => p.sport.includes(sport as any)).map(p => getLocalizedProduct(p, lang));

// Fight System Kit Recommendations mapping
export const FIGHT_SYSTEM_KITS = {
  mma: {
    title: { nl: 'MMA FIGHT KIT', en: 'MMA FIGHT KIT', pl: 'ZESTAW DO MMA' },
    subtitle: {
      nl: 'Alles voor kooiwerk, grondvechten en striking van Octagon Polen',
      en: 'Complete gear for cage fighting, grappling, and striking direct from Poland',
      pl: 'Kompletny sprzęt do klatki, parteru i stójki z oferty Octagon Polska'
    },
    productIds: ['oct-fg-01', 'oct-fg-29', 'oct-fg-15', 'oct-fg-30', 'oct-fg-08', 'oct-fg-34']
  },
  boxing: {
    title: { nl: 'BOXING PRO KIT', en: 'BOXING PRO KIT', pl: 'ZESTAW BOKSERSKI PRO' },
    subtitle: {
      nl: 'Klassieke boksset voor zwaar zakwerk en sparren',
      en: 'Classic boxing kit for heavy bag work and hard sparring',
      pl: 'Klasyczny zestaw bokserski do tarcz, worka i sparingów'
    },
    productIds: ['oct-fg-01', 'oct-fg-14', 'oct-acc-07', 'oct-fg-08', 'oct-tr-27', 'oct-fg-09']
  },
  kickboxing: {
    title: { nl: 'KICKBOXING / K-1 KIT', en: 'KICKBOXING / K-1 KIT', pl: 'ZESTAW KICKBOXING K-1' },
    subtitle: {
      nl: 'Volledige Dutch-style kickboks uitrusting met Legion Octagon gear',
      en: 'Complete Dutch-style kickboxing gear setup with Legion Octagon equipment',
      pl: 'Kompletny zestaw w stylu holenderskim do K-1 z serii Legion Octagon'
    },
    productIds: ['oct-fg-13', 'oct-fg-03', 'oct-acc-07', 'oct-fg-08', 'oct-tr-26', 'oct-fg-16']
  },
  'muay-thai': {
    title: { nl: 'MUAY THAI TRADITIONAL KIT', en: 'MUAY THAI TRADITIONAL KIT', pl: 'TRADYCYJNY ZESTAW MUAY THAI' },
    subtitle: {
      nl: 'Trap- en clinchbestendige authentieke uitrusting met Kevlar shorts & Thai pads',
      en: 'Authentic Thai clinch & kick heavy setup with Kevlar satin shorts & Thai pads',
      pl: 'Autentyczny sprzęt odporny na low-kicki i klincz ze spodenkami Kevlar i tarczami'
    },
    productIds: ['oct-fg-13', 'oct-fg-03', 'oct-fg-16', 'oct-tr-26', 'oct-fg-08']
  },
  grappling: {
    title: { nl: 'NO-GI GRAPPLING & BJJ KIT', en: 'NO-GI GRAPPLING & BJJ KIT', pl: 'ZESTAW NO-GI & BJJ' },
    subtitle: {
      nl: 'Optimale matgrip, compressie en schuurpreventie met "Zęby" & Armor',
      en: 'Optimal mat friction control, compression and durability with "Teeth" & Armor',
      pl: 'Maksymalny komfort na macie, kompresja i ochrona przed otarciami z motywem "Zęby"'
    },
    productIds: ['oct-fg-02', 'oct-fg-15', 'oct-fg-30', 'oct-fg-04', 'oct-fg-08']
  },
  fitness: {
    title: { nl: 'OCTAGON STREETWEAR & CONDITIONING', en: 'OCTAGON STREETWEAR & CONDITIONING', pl: 'STREETWEAR & TRENING KONDYCYJNY' },
    subtitle: {
      nl: 'Zware 460 GSM hoodie, jogger sweatpants, tactical heuptas en snapback',
      en: 'Heavyweight 460 GSM hoodie, jogger pants, tactical waist bag, and snapback',
      pl: 'Gruba bluza 460 GSM, dresy bojówki, saszetka nerka i snapback 3D'
    },
    productIds: ['oct-app-06', 'oct-app-18', 'oct-acc-24', 'oct-acc-25', 'oct-app-28', 'oct-acc-12']
  }
};
