const images = {
  meals: '/images/menu-meals-pothichor.jpg',
  fish: '/images/menu-fish-coastal.jpg',
  biriyani: '/images/menu-biriyani-kizhi.jpg',
  curries: '/images/menu-porotta-curries.jpg',
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
    isVeg: true, dietary: 'veg', spiceLevel: 1, imageUrl: images.meals, popular: true,
  }),
  menuItem('omelette-meals', 'Omelette Meals', 'ഓംലെറ്റ് മീൽസ്', 170, 'meals', {
    description: 'A complete Kerala rice meal served with a freshly made omelette.',
    dietary: 'egg', spiceLevel: 1, imageUrl: images.meals,
  }),
  menuItem('chicken-meals', 'Chicken Meals', 'ചിക്കൻ മീൽസ്', 240, 'meals', {
    description: 'Kerala rice meal with chicken curry and the day’s traditional sides.',
    imageUrl: images.meals, popular: true,
  }),
  menuItem('fish-fry-meals', 'Fish Fry Meals', 'മീൻ ഫ്രൈ മീൽസ്', 210, 'meals', {
    description: 'Kerala rice meal completed with a fresh masala-fried fish selection.',
    dietary: 'seafood', imageUrl: images.meals, popular: true,
    variants: [
      { id: 'option-210', label: 'Fish option ₹210', price: 210 },
      { id: 'option-230', label: 'Fish option ₹230', price: 230 },
    ],
  }),
  menuItem('fish-curry-meals', 'Fish Curry Meals', 'മീൻ കറി മീൽസ്', 220, 'meals', {
    description: 'Rice and homestyle sides with a deeply flavoured Kerala fish curry.',
    dietary: 'seafood', imageUrl: images.meals, isChefSpecial: true, popular: true,
  }),

  menuItem('malabar-porotta', 'Malabar Porotta', 'മലബാർ പൊറോട്ട', 25, 'staples', {
    description: 'Hand-layered, flaky and griddled until golden.',
    isVeg: true, dietary: 'veg', spiceLevel: 0, imageUrl: images.curries,
  }),
  menuItem('puttu-white', 'Puttu (White)', 'വെള്ള പുട്ട്', 80, 'staples', {
    description: 'Steamed rice flour layered with fresh coconut—the Kerala breakfast staple.',
    isVeg: true, dietary: 'vegan', spiceLevel: 0, imageUrl: images.curries,
  }),
  menuItem('appam', 'Appam', 'അപ്പം', 20, 'staples', {
    description: 'Soft-centred, lacy-edged fermented rice and coconut appam.',
    isVeg: true, dietary: 'vegan', spiceLevel: 0, imageUrl: images.curries,
  }),

  menuItem('chicken-biriyani', 'Chicken Biriyani', 'ചിക്കൻ ബിരിയാണി', 160, 'biriyani', {
    description: 'Kerala-style chicken biriyani with fragrant rice and gently layered masala.',
    imageUrl: images.biriyani, popular: true,
  }),
  menuItem('kizhi-biriyani', 'Kizhi Biriyani', 'കിഴി ബിരിയാണി', 210, 'biriyani', {
    description: 'Chicken biriyani finished inside banana leaf so every grain holds the aroma.',
    imageUrl: images.biriyani, isChefSpecial: true,
  }),

  menuItem('egg-roast', 'Egg Roast', 'മുട്ട റോസ്റ്റ്', 85, 'curries', {
    description: 'Boiled eggs in a slow-roasted shallot, tomato and spice masala.',
    dietary: 'egg', imageUrl: images.curries,
  }),
  menuItem('kadala-curry', 'Kadala Curry', 'കടല കറി', 80, 'curries', {
    description: 'Black chickpeas simmered in Kerala roasted-coconut gravy.',
    isVeg: true, dietary: 'vegan', imageUrl: images.curries,
  }),

  menuItem('chicken-roast', 'Chicken Roast', 'ചിക്കൻ റോസ്റ്റ്', 210, 'chicken', {
    description: 'Chicken tossed in dark-roasted Kerala masala with shallots and curry leaves.',
    imageUrl: images.curries, popular: true,
  }),
  menuItem('chicken-curry', 'Chicken Curry', 'ചിക്കൻ കറി', 180, 'chicken', {
    description: 'Comforting nadan chicken curry, made for porotta, appam or rice.',
    imageUrl: images.curries, popular: true,
  }),
  menuItem('chicken-65', 'Chicken 65', 'ചിക്കൻ 65', 190, 'chicken', {
    description: 'Crisp, spicy chicken bites finished with curry leaves and green chilli.',
    spiceLevel: 3, imageUrl: images.curries,
  }),
  menuItem('thattukada-chicken', 'Thattukada Chicken', 'തട്ടുകട ചിക്കൻ', 200, 'chicken', {
    description: 'Bold street-stall style chicken with pepper, chilli and toasted spices.',
    spiceLevel: 3, imageUrl: images.curries, isChefSpecial: true,
  }),
  menuItem('chicken-kondattam', 'Chicken Kondattam', 'ചിക്കൻ കൊണ്ടാട്ടം', 220, 'chicken', {
    description: 'Fried chicken coated in a punchy dried-chilli kondattam masala.',
    spiceLevel: 3, imageUrl: images.curries,
  }),
  menuItem('ginger-chicken', 'Ginger Chicken', 'ജിഞ്ചർ ചിക്കൻ', 230, 'chicken', {
    description: 'Juicy chicken with the clean warmth of fresh ginger and aromatics.',
    imageUrl: images.curries,
  }),
  menuItem('garlic-chicken', 'Garlic Chicken', 'ഗാർലിക് ചിക്കൻ', 230, 'chicken', {
    description: 'A savoury chicken preparation led by roasted garlic and house spices.',
    imageUrl: images.curries,
  }),
  menuItem('chilli-chicken', 'Chilli Chicken', 'ചില്ലി ചിക്കൻ', 220, 'chicken', {
    description: 'A lively chilli-forward chicken favourite with peppers and aromatics.',
    spiceLevel: 3, imageUrl: images.curries,
  }),
  menuItem('pepper-chicken', 'Pepper Chicken', 'പെപ്പർ ചിക്കൻ', 250, 'chicken', {
    description: 'Chicken coated in a deep black-pepper masala with curry leaves.',
    spiceLevel: 3, imageUrl: images.curries,
  }),

  menuItem('pothu-curry', 'Poth Curry', 'പോത്ത് കറി', 220, 'pothu', {
    description: 'Kerala-style pothu curry slow-cooked with roasted spices and coconut notes.',
    spiceLevel: 3, imageUrl: images.curries,
  }),
  menuItem('pothu-roast', 'Poth Roast', 'പോത്ത് റോസ്റ്റ്', 240, 'pothu', {
    description: 'Dark-roasted pothu with black pepper, curry leaves and coconut shards.',
    spiceLevel: 3, imageUrl: images.curries, isChefSpecial: true, popular: true,
  }),

  menuItem('mathi-fry', 'Mathi Fry · 2 pcs', 'മത്തി ഫ്രൈ · 2 എണ്ണം', 80, 'seafood', {
    description: 'Two sardines coated in Kerala chilli masala and fried with curry leaves.',
    dietary: 'seafood', spiceLevel: 3, imageUrl: images.fish,
  }),
  menuItem('ayala-fry', 'Ayala Fry', 'അയല ഫ്രൈ', 100, 'seafood', {
    description: 'Fresh mackerel marinated in house masala and fried to order.',
    dietary: 'seafood', spiceLevel: 3, imageUrl: images.fish, popular: true,
    variants: [
      { id: 'regular', label: 'Regular · ₹100', price: 100 },
      { id: 'large', label: 'Large · ₹120', price: 120 },
    ],
  }),
  menuItem('chembally', 'Chembally', 'ചെമ്പല്ലി ഫ്രൈ', 80, 'seafood', {
    description: 'Chembally fish with a traditional Kerala spice marinade.',
    dietary: 'seafood', spiceLevel: 3, imageUrl: images.fish,
  }),
  menuItem('plate-manthal', 'Plate Manthal', 'പ്ലേറ്റ് മാന്തൾ', 80, 'seafood', {
    description: 'Delicate manthal fish fried with a crisp masala coating.',
    dietary: 'seafood', imageUrl: images.fish,
    variants: [
      { id: 'small', label: 'Small · ₹80', price: 80 },
      { id: 'medium', label: 'Medium · ₹100', price: 100 },
      { id: 'large', label: 'Large · ₹120', price: 120 },
    ],
  }),
  menuItem('fish-curry', 'Fish Curry', 'മീൻ കറി', 140, 'seafood', {
    description: 'Tangy, red Kerala fish curry prepared with kokum and curry leaves.',
    dietary: 'seafood', spiceLevel: 3, imageUrl: images.fish, isChefSpecial: true,
    variants: [
      { id: 'regular', label: 'Fish curry · ₹140', price: 140 },
      { id: 'choora', label: 'Choora curry · ₹80', price: 80 },
    ],
  }),

  menuItem('egg-kothu-porotta', 'Egg Kothu Porotta', 'മുട്ട കൊത്തു പൊറോട്ട', 150, 'kothu', {
    description: 'Chopped porotta tossed on the griddle with egg, masala and curry leaves.',
    dietary: 'egg', spiceLevel: 2, imageUrl: images.curries,
  }),
  menuItem('chicken-kothu-porotta', 'Chicken Kothu Porotta', 'ചിക്കൻ കൊത്തു പൊറോട്ട', 190, 'kothu', {
    description: 'Griddle-chopped porotta with chicken, egg and house masala.',
    imageUrl: images.curries, popular: true,
  }),
  menuItem('pothu-kothu-porotta', 'Poth Kothu Porotta', 'പോത്ത് കൊത്തു പൊറോട്ട', 210, 'kothu', {
    description: 'Flaky porotta chopped and tossed with spicy pothu roast masala.',
    spiceLevel: 3, imageUrl: images.curries,
  }),

  menuItem('egg-pothichor', 'Egg Pothichor', 'മുട്ട പൊതിച്ചോറ്', 210, 'pothichor', {
    description: 'Rice, omelette, chammanthi, thoran, mezhukkupuratti, achar, pappadam, sambar and moru curry, wrapped in banana leaf.',
    dietary: 'egg', spiceLevel: 2, imageUrl: images.meals, isChefSpecial: true,
  }),
  menuItem('chicken-pothichor', 'Chicken Pothichor', 'ചിക്കൻ പൊതിച്ചോറ്', 330, 'pothichor', {
    description: 'Rice, chicken fry, chicken curry, omelette, chammanthi, thoran, mezhukkupuratti, achar, pappadam, sambar and moru curry, wrapped in banana leaf.',
    spiceLevel: 3, imageUrl: images.meals, isChefSpecial: true, popular: true,
  }),
  menuItem('fish-pothichor', 'Fish Pothichor', 'മീൻ പൊതിച്ചോറ്', 330, 'pothichor', {
    description: 'Rice, fish fry, fish curry, omelette, chammanthi, thoran, mezhukkupuratti, achar, pappadam, sambar and moru curry, wrapped in banana leaf.',
    dietary: 'seafood', spiceLevel: 3, imageUrl: images.meals, isChefSpecial: true, popular: true,
  }),
]
