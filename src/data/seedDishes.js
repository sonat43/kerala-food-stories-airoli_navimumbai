const images = {
  vegmeals: '/images/menu-veg-meals.png',
  eggmeals:'/images/menu-egg-meals.jpg',
  chickenmeals:'/images/menu-chicken-meals.png',
  fishmeals:'/images/menu-fish-meals.png',
  fishcurrymeals:'/images/menu-fishcurry-meals.png',

  porotta: '/images/menu-porotta.jpg',
  puttu:'/images/menu-puttu.png',
  appam:'/images/menu-appam.png',

  chickenbiriyani: '/images/menu-chickenbiriyani.png',
  kizhibiriyani: '/images/menu-kizhibiriyani.png',

  eggroast: '/images/menu-eggroast.png',
  kadala: '/images/menu-kadala.png',

  chickenroast: '/images/menu-chickenroast.png',
  chickencurry: '/images/menu-chickencurry.png',
  chicken65: '/images/menu-chicken65.png',
  tchicken: '/images/menu-tchicken.png',
  kchicken: '/images/menu-kchicken.png',
  gchicken: '/images/menu-gchicken.png',
  gachicken: '/images/menu-gachicken.png',
  chillichicken: '/images/menu-chillichicken.png',
  pepperchicken: '/images/menu-pepperchicken.png',

  pothcurry: '/images/menu-pothcurry.png',
  pothroast: '/images/menu-pothroast.png',
  pothfry: '/images/menu-pothfry.png',


  mathi: '/images/menu-mathi.png',
  ayala: '/images/menu-ayala.png',
  mathi: '/images/menu-mathi.png',
  chemballi: '/images/menu-chemballi.png',
  mandhal: '/images/menu-mandhal.png',
  fishcurry: '/images/menu-fishcurry.png',


  eggkoth:'/images/menu-eggkoth.png',
  chickenkoth:'/images/menu-chickenkoth.png',
  pothkoth:'/images/menu-pothkoth.png',

  eggpothi:'/images/menu-eggpothi.png',
  chickenpothi:'/images/menu-chickenpothi.png',
  fishpothi:'/images/menu-fishpothi.png',










  

  fish: '/images/menu-fish-coastal.jpg',

 
}

export const categories = [
  { id: 'all', label: 'Full menu', malayalam: 'മുഴുവൻ മെനു' },
  { id: 'meals', label: 'Kerala meals', malayalam: 'ഊണ്' },
  { id: 'staples', label: 'Kerala staples', malayalam: 'നാടൻ പലഹാരം' },
  { id: 'biriyani', label: 'Biriyani', malayalam: 'ബിരിയാണി' },
  { id: 'curries', label: 'Curries & sides', malayalam: 'കറികൾ' },
  { id: 'chicken', label: 'Chicken', malayalam: 'ചിക്കൻ' },
  { id: 'pothu', label: 'Poth', malayalam: 'പോത്ത്' },
  { id: 'seafood', label: 'Fish items', malayalam: 'മീൻ വിഭവങ്ങൾ' },
  { id: 'kothu', label: 'Kothu porotta', malayalam: 'കൊത്തു പൊറോട്ട' },
  { id: 'pothichor', label: 'Pothichor', malayalam: 'പൊതിച്ചോറ്' },
]

function menuItem(id, name, malayalamName, price, category, options = {}) {
  return {
    id,
    name,
    malayalamName,
    price,
    category,
    description: '',
    isVeg: false,
    dietary: 'nonveg',
    isChefSpecial: false,
    spiceLevel: 2,
    imageUrl: images.curries,
    isAvailable: true,
    ...options,
  }
}

export const seedDishes = [
  menuItem('veg-meals', 'Veg Meals', 'വെജ് മീൽസ്', 130, 'meals', {
    description: 'Rice with the day’s homestyle Kerala vegetable curries, sides, pickle and pappadam.',
    isVeg: true, dietary: 'veg', spiceLevel: 1, imageUrl: images.vegmeals, popular: true, parcelCharge: 10,
  }),
  menuItem('omelette-meals', 'Omelette Meals', 'ഓംലെറ്റ് മീൽസ്', 170, 'meals', {
    description: 'A complete Kerala rice meal served with a freshly made omelette.',
    dietary: 'egg', spiceLevel: 1, imageUrl: images.eggmeals, parcelCharge: 10,
  }),
  menuItem('chicken-meals', 'Chicken Meals', 'ചിക്കൻ മീൽസ്', 240, 'meals', {
    description: 'Kerala rice meal with chicken curry and the day’s traditional sides.',
    imageUrl: images.chickenmeals, popular: true, parcelCharge: 10,
  }),
  menuItem('fish-fry-meals', 'Fish Fry Meals', 'മീൻ ഫ്രൈ മീൽസ്', 210, 'meals', {
    description: 'Kerala rice meal completed with a fresh masala-fried fish selection.',
    dietary: 'seafood', imageUrl: images.fishmeals, popular: true,
    parcelCharge: 10,
    variants: [
      { id: 'mathi', label: 'Mathi', price: 210 },
      { id: 'ayala', label: 'Ayala', price: 250 },
    ],
  }),
  menuItem('fish-curry-meals', 'Fish Curry Meals', 'മീൻ കറി മീൽസ്', 220, 'meals', {
    description: 'Rice and homestyle sides with a deeply flavoured Kerala fish curry.', price: 210,
    dietary: 'seafood', imageUrl: images.fishcurrymeals, isChefSpecial: true, popular: true, parcelCharge: 10,
  }),

  menuItem('malabar-porotta', 'Malabar Porotta', 'മലബാർ പൊറോട്ട', 25, 'staples', {
    description: 'Hand-layered, flaky and griddled until golden.',
    isVeg: true, dietary: 'veg', spiceLevel: 0, imageUrl: images.porotta,
  }),
  menuItem('puttu-white', 'Puttu (White)', 'വെള്ള പുട്ട്', 80, 'staples', {
    description: 'Steamed rice flour layered with fresh coconut—the Kerala breakfast staple.',
    isVeg: true, dietary: 'vegan', spiceLevel: 0, imageUrl: images.puttu,
  }),
  menuItem('appam', 'Appam', 'അപ്പം', 20, 'staples', {
    description: 'Soft-centred, lacy-edged fermented rice and coconut appam.',
    isVeg: true, dietary: 'vegan', spiceLevel: 0, imageUrl: images.appam,
  }),

  menuItem('chicken-biriyani', 'Chicken Biriyani', 'ചിക്കൻ ബിരിയാണി', 160, 'biriyani', {
    description: 'Kerala-style chicken biriyani with fragrant rice and gently layered masala.',
    imageUrl: images.chickenbiriyani, popular: true,
  }),
  menuItem('kizhi-biriyani', 'Kizhi Biriyani', 'കിഴി ബിരിയാണി', 210, 'biriyani', {
    description: 'Chicken biriyani finished inside banana leaf so every grain holds the aroma.',
    imageUrl: images.kizhibiriyani, isChefSpecial: true,
  }),

  menuItem('egg-roast', 'Egg Roast', 'മുട്ട റോസ്റ്റ്', 85, 'curries', {
    description: 'Boiled eggs in a slow-roasted shallot, tomato and spice masala.',
    dietary: 'egg', imageUrl: images.eggroast,
  }),
  menuItem('kadala-curry', 'Kadala Curry', 'കടല കറി', 80, 'curries', {
    description: 'Black chickpeas simmered in Kerala roasted-coconut gravy.',
    isVeg: true, dietary: 'vegan', imageUrl: images.kadala,
  }),

  menuItem('chicken-roast', 'Chicken Roast', 'ചിക്കൻ റോസ്റ്റ്', 210, 'chicken', {
    description: 'Chicken tossed in dark-roasted Kerala masala with shallots and curry leaves.',
    imageUrl: images.chickenroast, popular: true,
  }),
  menuItem('chicken-curry', 'Chicken Curry', 'ചിക്കൻ കറി', 180, 'chicken', {
    description: 'Comforting nadan chicken curry, made for porotta, appam or rice.',
    imageUrl: images.chickencurry, popular: true,
  }),
  menuItem('chicken-65', 'Chicken 65', 'ചിക്കൻ 65', 190, 'chicken', {
    description: 'Crisp, spicy chicken bites finished with curry leaves and green chilli.',
    spiceLevel: 3, imageUrl: images.chicken65,
  }),
  menuItem('thattukada-chicken', 'Thattukada Chicken', 'തട്ടുകട ചിക്കൻ', 200, 'chicken', {
    description: 'Bold street-stall style chicken with pepper, chilli and toasted spices.',
    spiceLevel: 3, imageUrl: images.tchicken, isChefSpecial: true,
  }),
  menuItem('chicken-kondattam', 'Chicken Kondattam', 'ചിക്കൻ കൊണ്ടാട്ടം', 220, 'chicken', {
    description: 'Fried chicken coated in a punchy dried-chilli kondattam masala.',
    spiceLevel: 3, imageUrl: images.kchicken,
  }),
  menuItem('ginger-chicken', 'Ginger Chicken', 'ജിഞ്ചർ ചിക്കൻ', 230, 'chicken', {
    description: 'Juicy chicken with the clean warmth of fresh ginger and aromatics.',
    imageUrl: images.gchicken,
  }),
  menuItem('garlic-chicken', 'Garlic Chicken', 'ഗാർലിക് ചിക്കൻ', 230, 'chicken', {
    description: 'A savoury chicken preparation led by roasted garlic and house spices.',
    imageUrl: images.gachicken,
  }),
  menuItem('chilli-chicken', 'Chilli Chicken', 'ചില്ലി ചിക്കൻ', 220, 'chicken', {
    description: 'A lively chilli-forward chicken favourite with peppers and aromatics.',
    spiceLevel: 3, imageUrl: images.chillichicken,
  }),
  menuItem('pepper-chicken', 'Pepper Chicken', 'പെപ്പർ ചിക്കൻ', 250, 'chicken', {
    description: 'Chicken coated in a deep black-pepper masala with curry leaves.', price: 260,
    spiceLevel: 3, imageUrl: images.pepperchicken,
  }),

  menuItem('pothu-curry', 'Poth Curry', 'പോത്ത് കറി', 220, 'pothu', {
    description: 'Kerala-style pothu curry slow-cooked with roasted spices and coconut notes.',
    spiceLevel: 3, imageUrl: images.pothcurry,
  }),
  menuItem('pothu-roast', 'Poth Roast', 'പോത്ത് റോസ്റ്റ്', 240, 'pothu', {
    description: 'Dark-roasted pothu with black pepper, curry leaves and coconut shards.', price: 250,
    spiceLevel: 3, imageUrl: images.pothroast, isChefSpecial: true, popular: true,
  }),
  menuItem('pothu-fry', 'Poth Fry', 'പോത്ത് ഫ്രൈ', 280, 'pothu', {
    description: 'Crisp fried pothu with Kerala spices, curry leaves and a peppery finish.',
    spiceLevel: 3, imageUrl: images.pothfry,
  }),

  menuItem('mathi-fry', 'Mathi Fry · 2 pcs', 'മത്തി ഫ്രൈ · 2 എണ്ണം', 80, 'seafood', {
    description: 'Two sardines coated in Kerala chilli masala and fried with curry leaves.',
    dietary: 'seafood', spiceLevel: 3, imageUrl: images.mathi, hidePrice: true,
    variants: [
      { id: 'small', label: 'Small', price: 80 },
      { id: 'large', label: 'Large', price: 120 },
    ],
  }),
  menuItem('ayala-fry', 'Ayala Fry', 'അയല ഫ്രൈ', 100, 'seafood', {
    description: 'Fresh mackerel marinated in house masala and fried to order.',
    dietary: 'seafood', spiceLevel: 3, imageUrl: images.ayala, popular: true, hidePrice: true,
    variants: [
      { id: 'regular', label: 'Regular', price: 100 },
      { id: 'large', label: 'Large', price: 120 },
    ],
  }),
  menuItem('chembally', 'Chembally', 'ചെമ്പല്ലി ഫ്രൈ', 80, 'seafood', {
    description: 'Chembally fish with a traditional Kerala spice marinade.',
    dietary: 'seafood', spiceLevel: 3, imageUrl: images.chemballi, hidePrice: true,
    variants: [
      { id: 'small', label: 'Small', price: 80 },
      { id: 'large', label: 'Large', price: 120 },
    ],
  }),
  menuItem('plate-manthal', 'Plate Manthal', 'പ്ലേറ്റ് മാന്തൾ', 80, 'seafood', {
    description: 'Delicate manthal fish fried with a crisp masala coating.',
    dietary: 'seafood', imageUrl: images.mandhal, hidePrice: true,
    variants: [
      { id: 'small', label: 'Small', price: 80 },
      { id: 'medium', label: 'Medium', price: 100 },
      { id: 'large', label: 'Large', price: 120 },
    ],
  }),
  menuItem('fish-curry', 'Fish Curry', 'മീൻ കറി', 140, 'seafood', {
    description: 'Tangy, red Kerala fish curry prepared with kokum and curry leaves.',
    dietary: 'seafood', spiceLevel: 3, imageUrl: images.fishcurry, isChefSpecial: true, hidePrice: true,
    variants: [
      { id: 'regular', label: 'Regular', price: 140 },
      { id: 'choora', label: 'Choora', price: 80 },
    ],
  }),

  menuItem('egg-kothu-porotta', 'Egg Kothu Porotta', 'മുട്ട കൊത്തു പൊറോട്ട', 150, 'kothu', {
    description: 'Chopped porotta tossed on the griddle with egg, masala and curry leaves.',
    dietary: 'egg', spiceLevel: 2, imageUrl: images.eggkoth,
  }),
  menuItem('chicken-kothu-porotta', 'Chicken Kothu Porotta', 'ചിക്കൻ കൊത്തു പൊറോട്ട', 190, 'kothu', {
    description: 'Griddle-chopped porotta with chicken, egg and house masala.', price: 200,
    imageUrl: images.chickenkoth, popular: true,
  }),
  menuItem('pothu-kothu-porotta', 'Poth Kothu Porotta', 'പോത്ത് കൊത്തു പൊറോട്ട', 210, 'kothu', {
    description: 'Flaky porotta chopped and tossed with spicy pothu roast masala.', price: 250,
    spiceLevel: 3, imageUrl: images.pothkoth,
  }),

  menuItem('egg-pothichor', 'Egg Pothichor', 'മുട്ട പൊതിച്ചോറ്', 210, 'pothichor', {
    description: 'Rice, omelette, chammanthi, thoran, mezhukkupuratti, achar, pappadam, sambar and moru curry, wrapped in banana leaf.', price: 220,
    includedItems: ['Rice', 'Omelette', 'Chammanthi', 'Thoran', 'Moru curry', 'Pappadam'],
    dietary: 'egg', spiceLevel: 2, imageUrl: images.eggpothi, isChefSpecial: true,
  }),
  menuItem('chicken-pothichor', 'Chicken Pothichor', 'ചിക്കൻ പൊതിച്ചോറ്', 330, 'pothichor', {
    description: 'Rice, chicken fry, chicken curry, omelette, chammanthi, thoran, mezhukkupuratti, achar, pappadam, sambar and moru curry, wrapped in banana leaf.', price: 340,
    includedItems: ['Rice', 'Chicken fry', 'Chicken curry', 'Omelette', 'Chammanthi', 'Thoran', 'Moru curry', 'Pappadam'],
    spiceLevel: 3, imageUrl: images.chickenpothi, isChefSpecial: true, popular: true,
  }),
  menuItem('fish-pothichor', 'Fish Pothichor', 'മീൻ പൊതിച്ചോറ്', 330, 'pothichor', {
    description: 'Rice, fish fry, fish curry, omelette, chammanthi, thoran, mezhukkupuratti, achar, pappadam, sambar and moru curry, wrapped in banana leaf.', price: 340,
    includedItems: ['Rice', 'Fish fry', 'Fish curry', 'Omelette', 'Chammanthi', 'Thoran', 'Moru curry', 'Pappadam'],
    dietary: 'seafood', spiceLevel: 3, imageUrl: images.fishpothi, isChefSpecial: true, popular: true,
  }),
]
