import { Menu, ShoppingBag, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion as Motion } from 'framer-motion'
import { useCart } from '../context/CartContext'
import { getDisplayedTotal } from '../utils/priceDisplay'

const links = [
  { label: 'Menu', href: '#menu' },
  { label: 'Pairings', href: '#feasts' },
  { label: 'Our story', href: '#story' },
  { label: 'Find us', href: '#visit' },
]

function navigateTo(event, href, closeMenu) {
  event.preventDefault()
  closeMenu()
  const target = document.querySelector(href)
  target?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  window.history.replaceState(null, '', href)
}

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const menuRef = useRef(null)
  const menuButtonRef = useRef(null)
  const { itemCount, items, setIsCartOpen } = useCart()
  const displayedTotal = getDisplayedTotal(items)

  useEffect(() => {
    if (!mobileOpen) return undefined

    const closeOnOutsidePress = (event) => {
      if (!menuRef.current?.contains(event.target) && !menuButtonRef.current?.contains(event.target)) setMobileOpen(false)
    }
    const closeOnScroll = () => setMobileOpen(false)

    document.addEventListener('pointerdown', closeOnOutsidePress)
    window.addEventListener('scroll', closeOnScroll, { passive: true })
    return () => {
      document.removeEventListener('pointerdown', closeOnOutsidePress)
      window.removeEventListener('scroll', closeOnScroll)
    }
  }, [mobileOpen])

  return (
    <header className="site-header sticky top-0 z-40 border-b border-white/10 bg-[linear-gradient(110deg,#17110f_0%,#241915_52%,#38241b_100%)] text-kasavu shadow-[0_8px_28px_rgba(30,25,21,0.2)]">
      <div className="mx-auto flex h-[68px] max-w-7xl items-center justify-between px-5 sm:px-8">
        <a href="#top" className="group flex items-center gap-3" aria-label="Kerala Food Stories home">
          <span>
            <span className="block font-display text-[17px] font-semibold tracking-wide sm:text-xl">Kerala Food Stories</span>
            <span className="block text-[8px] font-semibold uppercase tracking-[0.24em] text-teak/45 sm:text-[9px]">Airoli · Navi Mumbai</span>
          </span>
        </a>

        <nav className="hidden items-center gap-7 border-l border-white/10 pl-7 lg:flex" aria-label="Main navigation">
          {links.map((link) => (
            <a key={link.href} href={link.href} onClick={(event) => navigateTo(event, link.href, () => {})} className="relative py-3 text-[13px] font-semibold text-kasavu/65 transition hover:text-white after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-[#e0bd82] after:transition-transform hover:after:scale-x-100">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsCartOpen(true)}
            className="group flex h-10 items-center gap-2 rounded-full border border-white/15 bg-white/[0.1] px-3.5 text-sm font-semibold text-white shadow-inner shadow-white/[0.04] transition hover:bg-white/[0.17] sm:px-4"
            aria-label={`Open order, ${itemCount} items`}
          >
            <span className="relative">
              <ShoppingBag size={18} strokeWidth={1.8} />
              {itemCount > 0 && (
                <span className="absolute -right-2.5 -top-2.5 grid min-h-4 min-w-4 place-items-center rounded-full bg-clay px-1 text-[9px] text-white">
                  {itemCount}
                </span>
              )}
            </span>
            <span className="hidden sm:inline">Your order</span>
            {itemCount > 0 && <span className="hidden text-kasavu/60 lg:inline">{displayedTotal}</span>}
          </button>
          <button
            ref={menuButtonRef}
            onClick={() => setMobileOpen((open) => !open)}
            className="grid h-10 w-10 place-items-center rounded-full text-kasavu transition hover:bg-white/10 hover:text-white lg:hidden"
            aria-label="Toggle navigation"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <Motion.nav
            ref={menuRef}
            initial={{ height: 0, opacity: 0, y: -8 }}
            animate={{ height: 'auto', opacity: 1, y: 0 }}
            exit={{ height: 0, opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="absolute left-0 right-0 top-full z-50 overflow-hidden border-b border-white/10 bg-[#16100e] px-5 py-3 text-kasavu shadow-[0_12px_24px_rgba(30,25,21,0.28)] lg:hidden"
          >
            {links.map((link, index) => (
              <a key={link.href} href={link.href} onClick={(event) => navigateTo(event, link.href, () => setMobileOpen(false))} className="flex items-center justify-between border-b border-white/10 px-1 py-3.5 text-sm font-semibold text-kasavu/75 last:border-0 transition hover:text-white">
                <span>{link.label}</span><span className="text-[10px] font-bold tracking-[0.16em] text-[#e0bd82]/70">0{index + 1}</span>
              </a>
            ))}
          </Motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
