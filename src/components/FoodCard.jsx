import { useMemo, useState } from 'react'
import { ChefHat, Flame, Minus, Plus, Star, UtensilsCrossed } from 'lucide-react'
import { motion as Motion } from 'framer-motion'
import { useCart } from '../context/CartContext'

const dietaryLabels = {
  veg: { label: 'Vegetarian', dot: 'bg-[#3f7d45]' },
  vegan: { label: 'Vegan', dot: 'bg-[#3f7d45]' },
  egg: { label: 'Contains egg', dot: 'bg-[#d29b2e]' },
  nonveg: { label: 'Non-veg', dot: 'bg-[#a1392b]' },
  seafood: { label: 'Seafood', dot: 'bg-[#3e7180]' },
}

export default function FoodCard({ dish }) {
  const [imageFailed, setImageFailed] = useState(false)
  const [variantId, setVariantId] = useState(dish.variants?.[0]?.id || null)
  const { addItem, decrementItem, getQuantity } = useCart()
  const selectedVariant = dish.variants?.find((variant) => variant.id === variantId)
  const cartId = selectedVariant ? `${dish.id}--${selectedVariant.id}` : dish.id
  const quantity = getQuantity(cartId)
  const dietary = dietaryLabels[dish.dietary] || dietaryLabels[dish.isVeg ? 'veg' : 'nonveg']

  const cartItem = useMemo(() => selectedVariant ? {
    ...dish,
    id: cartId,
    dishId: dish.id,
    name: `${dish.name} · ${selectedVariant.label.replace(/ · ₹\d+$/, '').replace(/ ₹\d+$/, '')}`,
    price: selectedVariant.price,
    selectedVariant,
  } : dish, [dish, selectedVariant, cartId])

  return (
    <Motion.article
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.28 }}
      className="group flex min-h-[190px] overflow-hidden rounded-[1.25rem] border border-[#e8dfd4] bg-paper shadow-[0_7px_24px_rgba(43,35,29,0.045)] transition-shadow hover:shadow-card"
    >
      <div className="relative w-[34%] min-w-[112px] overflow-hidden bg-[#e6ded2] sm:min-w-[138px]">
        {!imageFailed ? (
          <img src={dish.imageUrl} alt={dish.name} loading="lazy" onError={() => setImageFailed(true)} className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.045]" />
        ) : (
          <div className="image-fallback grid h-full place-items-center"><UtensilsCrossed size={28} className="text-teak/25" strokeWidth={1.2} /></div>
        )}
        <div className="absolute left-2.5 top-2.5 flex flex-col items-start gap-1.5">
          {dish.popular && <span className="flex items-center gap-1 rounded-full bg-paper/95 px-2 py-1 text-[8px] font-bold uppercase tracking-wider text-clay shadow-sm"><Star size={9} fill="currentColor" /> Popular</span>}
          {dish.isChefSpecial && <span className="flex items-center gap-1 rounded-full bg-palm px-2 py-1 text-[8px] font-bold uppercase tracking-wider text-white shadow-sm"><ChefHat size={9} /> House special</span>}
        </div>
      </div>

      <div className="flex min-w-0 flex-1 flex-col p-4 sm:p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="mb-1.5 flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-[0.12em] text-teak/40">
              <span className={`h-2 w-2 rounded-full ${dietary.dot}`} /> {dietary.label}
            </div>
            <h3 className="font-display text-lg font-semibold leading-tight text-teak sm:text-xl">{dish.name}</h3>
            <p className="mt-1 text-[11px] text-teak/42" lang="ml">{dish.malayalamName}</p>
          </div>
          <div className="shrink-0 text-right">
            <p className="text-base font-bold text-clay">₹{selectedVariant?.price ?? dish.price}</p>
            {dish.variants && <p className="mt-0.5 text-[9px] font-medium text-teak/35">from ₹{Math.min(...dish.variants.map((variant) => variant.price))}</p>}
          </div>
        </div>

        <p className="mt-2 line-clamp-2 text-xs leading-5 text-teak/55 sm:text-[13px]">{dish.description}</p>

        {dish.variants && (
          <label className="mt-3 block">
            <span className="sr-only">Choose price option for {dish.name}</span>
            <select value={variantId} onChange={(event) => setVariantId(event.target.value)} className="w-full rounded-lg border border-sand bg-kasavu px-2.5 py-2 text-[11px] font-semibold text-teak outline-none focus:border-clay/40">
              {dish.variants.map((variant) => <option key={variant.id} value={variant.id}>{variant.label}</option>)}
            </select>
          </label>
        )}

        <div className="mt-auto flex items-end justify-between gap-2 pt-3">
          <div className="flex min-h-8 items-center gap-0.5" title={`${dish.spiceLevel} of 3 spice level`}>
            {dish.spiceLevel > 0 ? Array.from({ length: 3 }).map((_, index) => (
              <Flame key={index} size={12} fill={index < dish.spiceLevel ? 'currentColor' : 'none'} className={index < dish.spiceLevel ? 'text-clay' : 'text-teak/12'} />
            )) : <span className="text-[9px] font-bold uppercase tracking-wider text-palm">Not spicy</span>}
          </div>

          {quantity === 0 ? (
            <button onClick={() => addItem(cartItem)} className="flex h-9 items-center gap-1.5 rounded-full bg-clay px-3.5 text-xs font-bold text-white transition hover:bg-clay-dark active:scale-95"><Plus size={14} /> Add</button>
          ) : (
            <div className="flex h-9 items-center rounded-full bg-teak text-white shadow-sm" aria-label={`${quantity} ${dish.name} in order`}>
              <button onClick={() => decrementItem(cartId)} className="grid h-9 w-9 place-items-center rounded-full hover:bg-white/10" aria-label={`Remove one ${dish.name}`}><Minus size={13} /></button>
              <span className="min-w-4 text-center text-xs font-bold">{quantity}</span>
              <button onClick={() => addItem(cartItem)} className="grid h-9 w-9 place-items-center rounded-full hover:bg-white/10" aria-label={`Add another ${dish.name}`}><Plus size={13} /></button>
            </div>
          )}
        </div>
      </div>
    </Motion.article>
  )
}
