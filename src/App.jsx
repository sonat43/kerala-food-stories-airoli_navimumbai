import { useEffect, useMemo, useState } from 'react'
import { motion as Motion } from 'framer-motion'
import { ArrowDown, ArrowRight, Clock3, MapPin, MessageCircle, Navigation, Phone, Search, ShoppingBag, Sparkles, X } from 'lucide-react'
import Header from './components/Header'
import CategoryFilter from './components/CategoryFilter'
import FoodCard from './components/FoodCard'
import MenuSkeleton from './components/MenuSkeleton'
import CartDrawer from './components/CartDrawer'
import ComboOffers from './components/ComboOffers'
import HospitalityPromises from './components/HospitalityPromises'
import { categories } from './data/seedDishes'
import { fetchDishes } from './services/menuService'
import { useCart } from './context/CartContext'

export default function App() {
  const [dishes, setDishes] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [dietaryFilter, setDietaryFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const { itemCount, total, setIsCartOpen } = useCart()

  useEffect(() => {
    let active = true
    fetchDishes().then((data) => {
      if (active) {
        setDishes(data)
        setLoading(false)
      }
    })
    return () => { active = false }
  }, [])

  const filteredDishes = useMemo(() => dishes.filter((dish) => {
    const categoryMatch = selectedCategory === 'all' || dish.category === selectedCategory
    const dietaryMatch = dietaryFilter === 'all'
      || (dietaryFilter === 'veg' && dish.isVeg)
      || (dietaryFilter === 'nonveg' && !dish.isVeg)
    const searchableText = `${dish.name} ${dish.malayalamName || ''} ${dish.description || ''}`.toLocaleLowerCase()
    const searchMatch = !searchQuery.trim() || searchableText.includes(searchQuery.trim().toLocaleLowerCase())
    return categoryMatch && dietaryMatch && searchMatch
  }), [dishes, selectedCategory, dietaryFilter, searchQuery])

  const menuSections = useMemo(() => categories
    .filter((category) => category.id !== 'all')
    .map((category) => ({
      ...category,
      dishes: filteredDishes.filter((dish) => dish.category === category.id),
    }))
    .filter((section) => section.dishes.length), [filteredDishes])

  return (
    <div id="top" className="min-h-screen overflow-x-hidden bg-kasavu text-teak">
      <Header />

      <main>
        <section className="relative isolate min-h-[calc(100svh-76px)] overflow-hidden bg-teak text-white">
          <img src="/images/kerala-feast-hero.png" alt="A traditional Kerala feast served on a banana leaf" className="absolute inset-0 h-full w-full object-cover object-[62%_center]" fetchPriority="high" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(20,16,13,0.98)_0%,rgba(20,16,13,0.9)_30%,rgba(20,16,13,0.42)_59%,rgba(20,16,13,0.08)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(20,16,13,0.65)_0%,transparent_45%)] md:hidden" />
          <div className="heritage-pattern absolute inset-0 opacity-20" />

          <div className="relative mx-auto flex min-h-[calc(100svh-76px)] max-w-7xl items-center px-5 py-20 sm:px-8">
            <Motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-2xl">
              <div className="mb-6 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.24em] text-[#e0bd82]">
                <span className="h-px w-9 bg-[#e0bd82]" /> From Kerala to Airoli, with warmth
              </div>
              <h1 className="font-display text-[clamp(3.5rem,8vw,7rem)] font-semibold leading-[0.9] tracking-[-0.045em]">
                A feast that<br />feels like <em className="text-[#e7c68e]">home.</em>
              </h1>
              <p className="mt-7 max-w-xl text-base leading-7 text-white/70 sm:text-lg sm:leading-8">
                Matta rice meals, pothichor, coastal fish and flaky porotta—the food you miss from home, now served in Navi Mumbai.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <a href="#menu" className="flex items-center gap-2.5 rounded-full bg-clay px-6 py-3.5 text-sm font-bold text-white shadow-xl shadow-black/15 transition hover:bg-[#cb5a35]">
                  Explore our menu <ArrowDown size={17} />
                </a>
                <a href="#visit" className="flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.06] px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/10">
                  Find us in Airoli <ArrowRight size={16} />
                </a>
              </div>
              <div className="mt-11 flex flex-wrap gap-x-7 gap-y-3 border-t border-white/12 pt-6 text-xs font-medium text-white/50">
                <span className="flex items-center gap-2"><Sparkles size={14} className="text-[#e0bd82]" /> Small-batch cooking</span>
                <span className="flex items-center gap-2"><Clock3 size={14} className="text-[#e0bd82]" /> Open daily · 11 AM–11 PM</span>
              </div>
            </Motion.div>
          </div>
        </section>

        <section id="menu" className="scroll-mt-24 px-5 py-20 sm:px-8 sm:py-28">
          <div className="mx-auto max-w-7xl">
            <div className="relative overflow-hidden rounded-[2rem] border border-sand bg-[#eee5d9] shadow-[0_18px_50px_rgba(43,35,29,0.06)]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_10%,rgba(184,74,40,.12),transparent_26%),radial-gradient(circle_at_68%_86%,rgba(58,90,64,.14),transparent_30%)]" />
              <div className="absolute -left-9 top-10 font-display text-[11rem] leading-none text-teak/[0.035] sm:text-[15rem]">K</div>
              <div className="relative grid lg:grid-cols-[1.1fr_.9fr] lg:items-stretch">
                <div className="px-6 py-8 sm:px-10 sm:py-11 lg:py-14">
                  <div className="flex items-center gap-3">
                    <span className="h-px w-8 bg-clay" />
                    <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-clay sm:text-xs">Kerala Food Stories · Airoli</p>
                  </div>
                  <h2 className="mt-6 max-w-2xl font-display text-[2.65rem] font-semibold leading-[0.98] tracking-[-0.035em] text-teak sm:text-5xl lg:text-[3.7rem]">The Kerala dishes<br className="hidden sm:block" /> you’ll come back for.</h2>
                  <p className="mt-4 font-display text-lg italic text-palm/80 sm:text-xl" lang="ml">നാടിന്റെ രുചി, മുംബൈയിൽ.</p>
                  <p className="mt-6 max-w-xl text-sm leading-7 text-teak/60 sm:text-base sm:leading-8">From a ₹20 appam to a full banana-leaf pothichor, this is food for hungry lunches, unhurried dinners, and every craving that only a proper naatile meal can answer.</p>
                  <div className="mt-8 flex flex-wrap gap-2">
                    {['Kerala meals', 'Coastal fish', 'Porotta & curry', 'Banana-leaf pothichor'].map((item) => (
                      <span key={item} className="rounded-full border border-teak/10 bg-paper/80 px-3.5 py-2 text-[11px] font-bold text-teak/65 shadow-sm backdrop-blur">{item}</span>
                    ))}
                  </div>
                  <div className="mt-9 flex items-center gap-5 border-t border-teak/10 pt-5 text-xs text-teak/50">
                    <span><strong className="font-display text-2xl font-semibold text-clay">34</strong><span className="ml-1.5">dishes</span></span>
                    <span className="h-7 w-px bg-teak/10" />
                    <span><strong className="font-display text-2xl font-semibold text-clay">₹20</strong><span className="ml-1.5">onwards</span></span>
                    <span className="h-7 w-px bg-teak/10" />
                    <span className="font-medium leading-4">One focused<br />Kerala menu</span>
                  </div>
                </div>

                <div className="relative min-h-[270px] overflow-hidden lg:min-h-full">
                  <img src="/images/menu-meals-pothichor.jpg" alt="Kerala meal and banana-leaf pothichor served at Kerala Food Stories" className="absolute inset-0 h-full w-full object-cover object-center" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-teak/80 via-teak/10 to-transparent lg:bg-[linear-gradient(90deg,rgba(30,25,21,.24),transparent_46%),linear-gradient(0deg,rgba(30,25,21,.72),transparent_38%)]" />
                  <div className="absolute inset-x-5 bottom-5 rounded-2xl border border-white/15 bg-teak/70 p-4 text-white backdrop-blur-md sm:inset-x-7 sm:bottom-7 sm:p-5">
                    <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#e7c68e]">Today’s familiar table</p>
                    <p className="mt-2 max-w-xs font-display text-xl font-semibold leading-snug">Meals, fish fry, and the pothichor you open like a little gift.</p>
                    <div className="mt-3 flex items-center gap-2 text-[11px] text-white/65"><Sparkles size={13} className="text-[#e7c68e]" /> Made for the way Malayalis eat.</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10 border-y border-sand py-5">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <CategoryFilter categories={categories} selected={selectedCategory} onChange={setSelectedCategory} />
                <div className="flex shrink-0 items-center gap-1 rounded-full bg-sand/60 p-1 text-xs font-bold">
                  {[
                    { id: 'all', label: 'All' },
                    { id: 'veg', label: 'Veg' },
                    { id: 'nonveg', label: 'Non-veg' },
                  ].map((option) => (
                    <button key={option.id} onClick={() => setDietaryFilter(option.id)} className={`rounded-full px-4 py-2 transition ${dietaryFilter === option.id ? 'bg-paper text-teak shadow-sm' : 'text-teak/45 hover:text-teak'}`}>
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
              <div className="mt-4 flex flex-col gap-3 border-t border-sand/70 pt-4 sm:flex-row sm:items-center sm:justify-between">
                <label className="relative block w-full max-w-md">
                  <span className="sr-only">Search the menu</span>
                  <Search size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-teak/35" />
                  <input
                    type="search"
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    placeholder="Search biryani, seafood, appam…"
                    className="w-full rounded-full border border-sand bg-paper py-2.5 pl-10 pr-10 text-sm text-teak outline-none transition placeholder:text-teak/35 focus:border-clay/40 focus:ring-2 focus:ring-clay/10"
                  />
                  {searchQuery && <button onClick={() => setSearchQuery('')} className="absolute right-2.5 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-full text-teak/35 transition hover:bg-sand hover:text-teak" aria-label="Clear menu search"><X size={14} /></button>}
                </label>
                {!loading && <p className="shrink-0 text-xs font-medium text-teak/40">Showing {filteredDishes.length} of {dishes.length} dishes</p>}
              </div>
            </div>

            <div className="mt-9">
              {loading ? <MenuSkeleton /> : filteredDishes.length ? (
                <div className="space-y-14">
                  {menuSections.map((section) => (
                    <section key={section.id} aria-labelledby={`menu-${section.id}`}>
                      <div className="mb-5 flex items-end justify-between gap-4 border-b border-sand pb-4">
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-clay">{String(section.dishes.length).padStart(2, '0')} dishes</p>
                          <h3 id={`menu-${section.id}`} className="mt-1 font-display text-2xl font-semibold text-teak sm:text-3xl">{section.label}</h3>
                        </div>
                        <p className="font-display text-lg italic text-teak/35" lang="ml">{section.malayalam}</p>
                      </div>
                      <Motion.div layout className="grid gap-4 lg:grid-cols-2">
                        {section.dishes.map((dish) => <FoodCard key={dish.id} dish={dish} />)}
                      </Motion.div>
                    </section>
                  ))}
                </div>
              ) : (
                <div className="rounded-3xl border border-dashed border-sand py-20 text-center">
                  <p className="font-display text-2xl text-teak">Nothing in this combination today.</p>
                  <button onClick={() => { setSelectedCategory('all'); setDietaryFilter('all'); setSearchQuery('') }} className="mt-3 text-sm font-bold text-clay">Show the complete menu</button>
                </div>
              )}
            </div>
          </div>
        </section>

        <ComboOffers dishes={dishes} />
        <HospitalityPromises />

        <section id="story" className="scroll-mt-20 bg-[#e9dfd1] px-5 py-20 sm:px-8 sm:py-28">
          <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1fr_0.9fr] lg:gap-20">
            <div className="relative overflow-hidden rounded-[2rem] bg-teak shadow-soft">
              <img src="/images/kerala-feast-hero.png" alt="Appam, curry and biryani prepared in traditional serving ware" loading="lazy" className="aspect-[5/4] h-full w-full object-cover object-right" />
              <div className="absolute inset-0 bg-gradient-to-t from-teak/50 to-transparent" />
              <div className="absolute bottom-5 left-5 rounded-xl border border-white/15 bg-teak/75 px-4 py-3 text-white backdrop-blur-md">
                <p className="font-display text-lg italic" lang="ml">“നാടിന്റെ രുചി, വീട്ടിലെ ഓർമ്മ.”</p>
                <p className="mt-1 text-[10px] uppercase tracking-widest text-white/55">The taste of home, remembered</p>
              </div>
            </div>
            <div>
              <p className="eyebrow">Kerala Food Stories · Airoli</p>
              <h2 className="mt-3 font-display text-4xl font-semibold leading-tight sm:text-5xl">A small piece of naadu, right here in Mumbai.</h2>
              <p className="mt-6 text-base leading-8 text-teak/60">For Malayalis living away from home, food carries a place inside it: the smell of fish frying with curry leaves, a pothichor opened at lunch, porotta torn into a peppery roast.</p>
              <p className="mt-4 text-base leading-8 text-teak/60">Kerala Food Stories brings those everyday memories to Airoli—honest portions, familiar prices, and the food of a proper naatile hotel.</p>
              <div className="mt-8 grid grid-cols-3 gap-3 border-t border-teak/10 pt-7">
                {[
                  ['34', 'focused dishes'],
                  ['Airoli', 'Navi Mumbai'],
                  ['100%', 'Kerala heart'],
                ].map(([value, label]) => (
                  <div key={label}><p className="font-display text-2xl font-semibold text-clay sm:text-3xl">{value}</p><p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-teak/45 sm:text-xs">{label}</p></div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="visit" className="scroll-mt-20 bg-teak px-5 py-20 text-kasavu sm:px-8 sm:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-10 border-b border-white/10 pb-16 lg:grid-cols-[0.8fr_1.2fr] lg:items-stretch">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#d9b679]">Your Kerala table in Airoli</p>
                <h2 className="mt-3 font-display text-4xl font-semibold sm:text-5xl">Come over.<br />Come hungry.</h2>
                <p className="mt-4 font-display text-lg italic text-white/40" lang="ml">വരൂ, നമുക്ക് ഒരുമിച്ച് കഴിക്കാം.</p>
                <div className="mt-8 space-y-5">
                  <div className="flex gap-3"><MapPin size={20} className="mt-0.5 shrink-0 text-[#d9b679]" /><div><p className="text-sm font-bold">Kerala Food Stories</p><p className="mt-1 max-w-sm text-sm leading-6 text-white/50">Shop No. 1, Anugovind CHS, opposite D.K. Tower, Sector 20, Airoli, Navi Mumbai, Maharashtra 400708</p></div></div>
                  <div className="flex gap-3"><Clock3 size={20} className="mt-0.5 shrink-0 text-[#d9b679]" /><div><p className="text-sm font-bold">Open every day</p><p className="mt-1 text-sm leading-6 text-white/50">11:00 AM – 11:00 PM</p></div></div>
                  <div className="flex gap-3"><Phone size={20} className="mt-0.5 shrink-0 text-[#d9b679]" /><div><p className="text-sm font-bold">Call us</p><a href="tel:+917208207729" className="mt-1 block text-sm text-white/50 transition hover:text-white">+91 72082 07729</a></div></div>
                </div>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a href="https://share.google/6YSSKgHaSkuzXFMro" target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded-full bg-clay px-5 py-3 text-sm font-bold text-white transition hover:bg-[#cb5a35]"><Navigation size={16} /> Get directions</a>
                  <a href="tel:+917208207729" className="flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/10"><Phone size={16} /> Call restaurant</a>
                </div>
              </div>
              <div className="min-h-[360px] overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/5 p-1.5 shadow-2xl">
                <iframe
                  title="Kerala Food Stories location in Airoli"
                  src="https://www.google.com/maps?q=Kerala%20Food%20Stories%20Airoli%20Navi%20Mumbai&output=embed"
                  className="h-full min-h-[350px] w-full rounded-[1.4rem] border-0 grayscale-[15%]"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
            </div>
            <footer className="flex flex-col gap-5 pt-8 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
              <p>© {new Date().getFullYear()} Kerala Food Stories. Made with Kerala heart in Airoli.</p>
              <p className="flex items-center gap-2"><MessageCircle size={14} /> Orders are confirmed personally on WhatsApp</p>
            </footer>
          </div>
        </section>
      </main>

      <AnimateMobileCart itemCount={itemCount} total={total} onClick={() => setIsCartOpen(true)} />
      <CartDrawer />
    </div>
  )
}

function AnimateMobileCart({ itemCount, total, onClick }) {
  if (!itemCount) return null
  return (
    <Motion.button
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 80, opacity: 0 }}
      onClick={onClick}
      className="fixed inset-x-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-30 flex items-center justify-between rounded-2xl bg-clay px-5 py-3.5 text-white shadow-2xl md:hidden"
    >
      <span className="flex items-center gap-3 text-sm font-bold"><span className="grid h-7 min-w-7 place-items-center rounded-full bg-white/15 px-2">{itemCount}</span><ShoppingBag size={18} /> View order</span>
      <span className="font-bold">₹{total}</span>
    </Motion.button>
  )
}
