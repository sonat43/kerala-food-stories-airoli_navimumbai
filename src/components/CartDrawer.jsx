import { useEffect, useState } from 'react'
import { AnimatePresence, motion as Motion } from 'framer-motion'
import { Check, ChevronRight, Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { logOrder } from '../services/menuService'
import { getDisplayedTotal, shouldHidePrice } from '../utils/priceDisplay'

const initialForm = {
  name: '',
  phone: '',
  type: 'delivery',
  location: '',
  notes: '',
}

function validate(form) {
  const errors = {}
  if (!form.name.trim()) errors.name = 'Please enter your name.'
  if (!/^\+?[0-9\s-]{7,15}$/.test(form.phone.trim())) errors.phone = 'Enter a valid mobile number.'
  if (!form.location.trim()) errors.location = form.type === 'delivery' ? 'Please add a delivery address.' : 'Please add pickup or table details.'
  return errors
}

function formatMessage(form, items, total, savings) {
  const typeLabel = form.type === 'delivery' ? 'Home Delivery' : 'Dine-in / Takeaway'
  const locationLabel = form.type === 'delivery' ? 'Address' : 'Pickup / Table'
  const itemLines = items.map((item) => `• ${item.quantity} × ${item.name} — ₹${item.price * item.quantity}`).join('\n')

  return `*— NEW ORDER FROM KERALA FOOD STORIES —*

👤 *Customer Name:* ${form.name.trim()}
📞 *Phone:* ${form.phone.trim()}
📍 *Delivery Type:* ${typeLabel}
🏠 *${locationLabel}:* ${form.location.trim()}

🍽️ *ORDER ITEMS:*
${itemLines}

📝 *Special Notes:* ${form.notes.trim() || 'None'}
────────────────────
💰 *TOTAL AMOUNT: ₹${total}*${savings ? `\n✨ *FEAST SAVINGS: ₹${savings}*` : ''}
────────────────────
Please confirm this order and share the estimated preparation time. Thank you!`
}

export default function CartDrawer() {
  const { items, total, savings, isCartOpen, setIsCartOpen, addItem, decrementItem, removeItem } = useCart()
  const displayedTotal = getDisplayedTotal(items)
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)

  useEffect(() => {
    document.body.style.overflow = isCartOpen ? 'hidden' : ''
    const onKeyDown = (event) => event.key === 'Escape' && setIsCartOpen(false)
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [isCartOpen, setIsCartOpen])

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }))
    setErrors((current) => ({ ...current, [field]: undefined }))
    setSent(false)
  }

  const submitOrder = () => {
    const nextErrors = validate(form)
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors)
      return
    }
    if (!items.length) return

    const customerDetails = {
      name: form.name.trim(),
      phone: form.phone.trim(),
      address: form.location.trim(),
      type: form.type,
    }
    const order = {
      customerDetails,
      items: items.map((item) => ({ dishId: item.dishId || item.id, name: item.name, quantity: item.quantity, unitPrice: item.price })),
      totalPrice: total,
      specialInstructions: form.notes.trim(),
    }

    const whatsappNumber = (import.meta.env.VITE_WHATSAPP_NUMBER || '917208207729').replace(/\D/g, '')
    const message = formatMessage(form, items, total, savings)
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer')
    setSent(true)
    void logOrder(order)
  }

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <Motion.button
            aria-label="Close order drawer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 z-50 cursor-default bg-teak/55 backdrop-blur-[2px]"
          />
          <Motion.aside
            role="dialog"
            aria-modal="true"
            aria-labelledby="cart-title"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 360, damping: 36 }}
            className="fixed inset-y-0 right-0 z-50 flex w-full max-w-[480px] flex-col bg-kasavu shadow-2xl"
          >
            <div className="flex h-[68px] shrink-0 items-center justify-between border-b border-sand px-5 sm:px-7">
              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-clay">Your selection</p>
                <h2 id="cart-title" className="font-display text-xl font-semibold leading-tight text-teak">Order basket</h2>
              </div>
              <button onClick={() => setIsCartOpen(false)} className="grid h-10 w-10 place-items-center rounded-full border border-sand bg-paper text-teak transition hover:bg-sand/50" aria-label="Close cart">
                <X size={19} />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
                <span className="grid h-20 w-20 place-items-center rounded-full bg-sand/50 text-clay"><ShoppingBag size={31} strokeWidth={1.4} /></span>
                <h3 className="mt-5 font-display text-xl text-teak">Your banana leaf is empty</h3>
                <p className="mt-2 max-w-xs text-sm leading-6 text-teak/55">Choose a few dishes from the menu and they’ll appear here.</p>
                <button onClick={() => setIsCartOpen(false)} className="mt-6 rounded-full bg-teak px-6 py-3 text-sm font-bold text-white">Explore the menu</button>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto px-5 pb-8 pt-5 sm:px-7">
                  <div className="space-y-3">
                    {items.map((item) => (
                      <Motion.div layout key={item.id} className="flex gap-3 rounded-2xl border border-sand bg-paper p-3">
                        <img src={item.imageUrl} alt="" className="h-20 w-20 shrink-0 rounded-xl bg-sand object-cover" onError={(event) => { event.currentTarget.style.visibility = 'hidden' }} />
                        <div className="min-w-0 flex-1 py-0.5">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <div className="flex min-w-0 items-center gap-2">
                                <h3 className="truncate text-sm font-bold text-teak">{item.name}</h3>
                                {item.isCombo && <span className="shrink-0 rounded-full bg-clay/10 px-2 py-0.5 text-[8px] font-bold uppercase tracking-wider text-clay">Feast set</span>}
                              </div>
                              {shouldHidePrice(item) ? <p className="mt-0.5 text-xs text-teak/45">Quantity selected</p> : <p className="mt-0.5 text-xs text-teak/45">₹{item.basePrice || item.price} each {item.parcelCharge > 0 && <span className="ml-1 text-clay/70">+ ₹{item.parcelCharge} parcel</span>} {item.originalPrice && <span className="ml-1 text-teak/25 line-through">₹{item.originalPrice}</span>}</p>}
                            </div>
                            <button onClick={() => removeItem(item.id)} className="text-teak/30 transition hover:text-clay" aria-label={`Remove ${item.name}`}><Trash2 size={15} /></button>
                          </div>
                          <div className="mt-2.5 flex items-center justify-between">
                            <div className="flex items-center rounded-full border border-sand bg-kasavu">
                              <button onClick={() => decrementItem(item.id)} className="grid h-7 w-7 place-items-center" aria-label={`Remove one ${item.name}`}><Minus size={12} /></button>
                              <span className="min-w-6 text-center text-xs font-bold">{item.quantity}</span>
                              <button onClick={() => addItem(item)} className="grid h-7 w-7 place-items-center" aria-label={`Add one ${item.name}`}><Plus size={12} /></button>
                            </div>
                            {!shouldHidePrice(item) && <span className="text-sm font-bold text-teak">₹{item.price * item.quantity}</span>}
                          </div>
                        </div>
                      </Motion.div>
                    ))}
                  </div>

                  <div className="my-7 flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.2em] text-teak/35"><span className="h-px flex-1 bg-sand" />Order details<span className="h-px flex-1 bg-sand" /></div>

                  <div className="space-y-4">
                    <Field label="Your name" error={errors.name}>
                      <input value={form.name} onChange={(event) => updateField('name', event.target.value)} placeholder="How should we address you?" className="form-input" autoComplete="name" />
                    </Field>
                    <Field label="Mobile number" error={errors.phone}>
                      <input value={form.phone} onChange={(event) => updateField('phone', event.target.value)} placeholder="For order confirmation" className="form-input" inputMode="tel" autoComplete="tel" />
                    </Field>

                    <fieldset>
                      <legend className="mb-2 text-xs font-bold text-teak">How would you like it?</legend>
                      <div className="grid grid-cols-2 rounded-xl bg-sand/55 p-1">
                        {[
                          { id: 'delivery', label: 'Home delivery' },
                          { id: 'pickup', label: 'Dine-in / takeaway' },
                        ].map((option) => (
                          <button key={option.id} type="button" onClick={() => updateField('type', option.id)} className={`rounded-lg px-2 py-2.5 text-xs font-bold transition ${form.type === option.id ? 'bg-paper text-teak shadow-sm' : 'text-teak/45'}`}>
                            {option.label}
                          </button>
                        ))}
                      </div>
                    </fieldset>

                    <Field label={form.type === 'delivery' ? 'Delivery address' : 'Pickup / table details'} error={errors.location}>
                      <textarea value={form.location} onChange={(event) => updateField('location', event.target.value)} placeholder={form.type === 'delivery' ? 'House, street and landmark' : 'Pickup time or table number'} className="form-input min-h-[78px] resize-none" />
                    </Field>
                    <Field label="Special notes · optional">
                      <textarea value={form.notes} onChange={(event) => updateField('notes', event.target.value)} placeholder="Less oil, extra spicy, allergies…" className="form-input min-h-[78px] resize-none" />
                    </Field>
                  </div>
                </div>

                <div className="shrink-0 border-t border-sand bg-paper px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-4 shadow-[0_-12px_35px_rgba(43,35,29,0.06)] sm:px-7">
                  {savings > 0 && (
                    <div className="mb-3 flex items-center justify-between rounded-lg bg-palm/10 px-3 py-2 text-xs font-bold text-palm">
                      <span>Your feast-set saving</span>
                      <span>−₹{savings}</span>
                    </div>
                  )}
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-sm text-teak/55">Order total</span>
                    <span className="font-display text-lg font-semibold text-teak">{displayedTotal}</span>
                  </div>
                  <button onClick={submitOrder} className="flex h-13 w-full items-center justify-center gap-3 rounded-xl bg-[#227448] px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#227448]/15 transition hover:bg-[#185d38] active:scale-[0.99]">
                    {sent ? <><Check size={18} /> Opened in WhatsApp</> : <>Send order via WhatsApp <ChevronRight size={18} /></>}
                  </button>
                  <p className="mt-2 text-center text-[10px] leading-4 text-teak/40">No payment now. We’ll confirm availability and timing on WhatsApp.</p>
                </div>
              </>
            )}
          </Motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}

function Field({ label, error, children }) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-bold text-teak">{label}</span>
      {children}
      {error && <span className="mt-1.5 block text-xs font-medium text-clay">{error}</span>}
    </label>
  )
}
