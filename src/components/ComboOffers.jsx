import { useState } from 'react'
import { motion as Motion } from 'framer-motion'
import { Check, Plus, Sparkles } from 'lucide-react'
import { signaturePairings } from '../data/comboOffers'
import { useCart } from '../context/CartContext'

export default function ComboOffers({ dishes }) {
  return (
    <section id="feasts" className="relative scroll-mt-20 overflow-hidden bg-teak px-5 py-20 text-kasavu sm:px-8 sm:py-28">
      <div className="heritage-pattern pointer-events-none absolute inset-0 opacity-10" />
      <div className="relative mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-7 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#d9b679]">No second-guessing</p>
            <h2 className="mt-3 max-w-2xl font-display text-4xl font-semibold leading-tight sm:text-5xl">Naatile favourite pairings.</h2>
            <p className="mt-2 font-display text-lg italic text-white/45" lang="ml">നാട്ടിലെ ഇഷ്ട കൂട്ടുകൾ</p>
          </div>
          <p className="max-w-md text-sm leading-7 text-white/55 sm:text-base">The combinations Malayalis know by heart, assembled from the same menu items and prices shown above.</p>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {signaturePairings.map((pairing, index) => <PairingCard key={pairing.id} pairing={pairing} dishes={dishes} index={index} />)}
        </div>

        <div className="mt-6 flex flex-col justify-between gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 text-xs text-white/50 sm:flex-row sm:items-center sm:px-6">
          <p className="flex items-center gap-2"><Sparkles size={14} className="text-[#d9b679]" /> Every pairing adds the individual dishes to your basket—no hidden combo pricing.</p>
          <a href="#menu" className="font-bold text-[#e7c68e] transition hover:text-white">Build your own combination →</a>
        </div>
      </div>
    </section>
  )
}

function PairingCard({ pairing, dishes, index }) {
  const [justAdded, setJustAdded] = useState(false)
  const { addItems } = useCart()
  const resolvedItems = pairing.items.map((entry) => ({
    ...entry,
    dish: dishes.find((dish) => dish.id === entry.dishId),
  })).filter((entry) => entry.dish)
  const total = resolvedItems.reduce((sum, entry) => sum + entry.dish.price * entry.quantity, 0)

  const addPairing = () => {
    addItems(resolvedItems)
    setJustAdded(true)
    window.setTimeout(() => setJustAdded(false), 1600)
  }

  return (
    <Motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      className={`group flex h-full flex-col overflow-hidden rounded-[1.6rem] border bg-[#27211c] ${pairing.featured ? 'border-[#d9b679]/55 shadow-[0_20px_55px_rgba(0,0,0,.28)]' : 'border-white/10'}`}
    >
      <div className="relative aspect-[16/9] overflow-hidden">
        <img src={pairing.imageUrl} alt={pairing.name} loading="lazy" className={`h-full w-full object-cover transition duration-700 group-hover:scale-[1.04] ${index === 0 ? 'object-left' : index === 2 ? 'object-right' : 'object-center'}`} />
        <div className="absolute inset-0 bg-gradient-to-t from-[#27211c]/85 via-transparent to-black/10" />
        {pairing.featured && <span className="absolute right-4 top-4 rounded-full bg-clay px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white">Airoli favourite</span>}
        <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-3">
          <div>
            <h3 className="font-display text-2xl font-semibold leading-tight text-white">{pairing.name}</h3>
            <p className="mt-0.5 text-xs text-white/55" lang="ml">{pairing.malayalamName}</p>
          </div>
          <p className="shrink-0 font-display text-2xl font-semibold text-[#e7c68e]">₹{total}</p>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="text-sm leading-6 text-white/50">{pairing.note}</p>
        <ul className="mt-5 space-y-2.5 border-t border-white/10 pt-5">
          {resolvedItems.map(({ dish, quantity }) => (
            <li key={dish.id} className="flex items-center justify-between gap-3 text-xs leading-5 text-white/65">
              <span className="flex items-center gap-2.5"><Check size={14} className="shrink-0 text-[#d9b679]" />{quantity} × {dish.name}</span>
              <span className="shrink-0 text-white/35">₹{dish.price * quantity}</span>
            </li>
          ))}
        </ul>
        <button onClick={addPairing} disabled={!resolvedItems.length} className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-kasavu px-5 py-3.5 text-sm font-bold text-teak transition hover:bg-white active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-40">
          {justAdded ? <><Check size={16} /> Added to your order</> : <>Add this pairing <Plus size={16} /></>}
        </button>
      </div>
    </Motion.article>
  )
}
