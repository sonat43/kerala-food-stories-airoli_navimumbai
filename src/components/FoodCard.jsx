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
  const basePrice = selectedVariant?.price ?? dish.price
  const orderPrice = basePrice + (dish.parcelCharge || 0)

  const cartItem = useMemo(() => ({
    ...dish,
    id: cartId,
    dishId: dish.id,
    name: selectedVariant ? `${dish.name} · ${selectedVariant.label.replace(/ · ₹\d+$/, '').replace(/ ₹\d+$/, '')}` : dish.name,
    price: orderPrice,
    basePrice,
    parcelCharge: dish.parcelCharge || 0,
    selectedVariant,
  }), [dish, selectedVariant, cartId, orderPrice, basePrice])

  return (
    <Motion.article
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.28 }}
      className="group flex h-full min-h-0 flex-col overflow-hidden rounded-[1.5rem] border border-[#e8dfd4] bg-paper shadow-[0_10px_30px_rgba(43,35,29,0.05)] transition-all hover:-translate-y-1 hover:border-clay/20 hover:shadow-card"
    >
      <div className="relative h-48 w-full shrink-0 overflow-hidden bg-[#e6ded2] sm:h-52">
        {!imageFailed ? (
          <img src={dish.imageUrl} alt={dish.name} loading="lazy" onError={() => setImageFailed(true)} className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.045]" />
        ) : (
          <div className="image-fallback grid h-full place-items-center"><UtensilsCrossed size={28} className="text-teak/25" strokeWidth={1.2} /></div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-teak/65 via-teak/5 to-transparent opacity-80" />
        <div className="absolute left-2.5 top-2.5 flex flex-col items-start gap-1.5">
          {dish.popular && <span className="flex items-center gap-1 rounded-full bg-paper/95 px-2.5 py-1.5 text-[8px] font-bold uppercase tracking-wider text-clay shadow-sm backdrop-blur-sm"><Star size={9} fill="currentColor" /> Popular</span>}
          {dish.isChefSpecial && <span className="flex items-center gap-1 rounded-full bg-palm/95 px-2.5 py-1.5 text-[8px] font-bold uppercase tracking-wider text-white shadow-sm backdrop-blur-sm"><ChefHat size={9} /> House special</span>}
        </div>
        <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-2">
          <span className="rounded-full border border-white/20 bg-teak/55 px-2.5 py-1 text-[8px] font-semibold uppercase tracking-[0.16em] text-white/85 backdrop-blur-sm">Made fresh</span>
        </div>
      </div>

      <div className="flex min-w-0 flex-1 flex-col p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="mb-2 flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.16em] text-teak/45">
              <span className={`h-2 w-2 rounded-full ${dietary.dot}`} /> {dietary.label}
              <span className="h-px w-8 bg-sand" />
            </div>
            <h3 className="font-display text-[1.3rem] font-semibold leading-[1.04] tracking-[-0.02em] text-teak sm:text-[1.4rem]">{dish.name}</h3>
            {dish.malayalamName && <p className="mt-1 text-[11px] text-teak/42" lang="ml">{dish.malayalamName}</p>}
          </div>
        </div>

        <p className="mt-2.5 line-clamp-2 text-xs leading-5 text-teak/55">{dish.description}</p>

        {dish.includedItems && (
          <div className="mt-2.5 rounded-xl bg-clay/[0.05] p-2.5">
            <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-clay">Inside the leaf</p>
            <div className="mt-1.5 flex flex-wrap gap-1.5">
              {dish.includedItems.map((item) => <span key={item} className="rounded-full border border-clay/10 bg-white/70 px-2 py-1 text-[10px] font-medium text-teak/65">{item}</span>)}
            </div>
          </div>
        )}

        {dish.variants && (
          <label className="mt-2.5 block">
            <span className="sr-only">Choose price option for {dish.name}</span>
            <select value={variantId} onChange={(event) => setVariantId(event.target.value)} className="w-full rounded-xl border border-sand bg-kasavu px-3 py-2.5 text-[11px] font-semibold text-teak outline-none transition focus:border-clay/50 focus:ring-2 focus:ring-clay/10">
              {dish.variants.map((variant) => <option key={variant.id} value={variant.id}>{variant.label}</option>)}
            </select>
          </label>
        )}

        {dish.parcelCharge > 0 && <p className="mt-1.5 text-[10px] font-semibold text-clay/70">+ ₹{dish.parcelCharge} parcel charge</p>}

        <div className="mt-4 flex items-end justify-between gap-2 border-t border-sand/70 pt-3">
          <div className="flex min-h-8 items-center gap-1 rounded-full bg-sand/35 px-2.5" title={`${dish.spiceLevel} of 3 spice level`}>
            {dish.spiceLevel > 0 ? Array.from({ length: 3 }).map((_, index) => (
              <Flame key={index} size={12} fill={index < dish.spiceLevel ? 'currentColor' : 'none'} className={index < dish.spiceLevel ? 'text-clay' : 'text-teak/12'} />
            )) : <span className="text-[9px] font-bold uppercase tracking-wider text-palm">Not spicy</span>}
          </div>

          <div className="flex items-center gap-3">
            {!dish.hidePrice && <span className="text-base font-bold text-clay">₹{basePrice}</span>}
            {quantity === 0 ? (
              <button onClick={() => addItem(cartItem)} className="flex h-10 items-center gap-1.5 rounded-full bg-clay px-4 text-xs font-bold text-white shadow-sm shadow-clay/15 transition hover:bg-clay-dark active:scale-95"><Plus size={14} /> Add</button>
            ) : (
              <div className="flex h-9 items-center rounded-full bg-teak text-white shadow-sm" aria-label={`${quantity} ${dish.name} in order`}>
                <button onClick={() => decrementItem(cartId)} className="grid h-9 w-9 place-items-center rounded-full hover:bg-white/10" aria-label={`Remove one ${dish.name}`}><Minus size={13} /></button>
                <span className="min-w-4 text-center text-xs font-bold">{quantity}</span>
                <button onClick={() => addItem(cartItem)} className="grid h-9 w-9 place-items-center rounded-full hover:bg-white/10" aria-label={`Add another ${dish.name}`}><Plus size={13} /></button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Motion.article>
  )
}
