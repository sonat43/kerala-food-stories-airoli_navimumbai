import { useState } from 'react'
import { Menu, ShoppingBag, X } from 'lucide-react'
import { AnimatePresence, motion as Motion } from 'framer-motion'
import { useCart } from '../context/CartContext'

const links = [
  { label: 'Menu', href: '#menu' },
  { label: 'Pairings', href: '#feasts' },
  { label: 'Our story', href: '#story' },
  { label: 'Find us', href: '#visit' },
]

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { itemCount, total, setIsCartOpen } = useCart()

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-teak/95 text-kasavu backdrop-blur-xl">
      <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 sm:px-8">
        <a href="#top" className="group flex items-center gap-3" aria-label="Kerala Food Stories home">
          <span className="grid h-9 w-9 place-items-center rounded-full border border-[#d3aa68]/50 text-[#d3aa68] transition group-hover:rotate-12">
            <span className="font-display text-xl leading-none">K</span>
          </span>
          <span>
            <span className="block font-display text-[17px] font-semibold tracking-wide sm:text-xl">Kerala Food Stories</span>
            <span className="block text-[8px] font-semibold uppercase tracking-[0.24em] text-kasavu/55 sm:text-[9px]">Airoli · Navi Mumbai</span>
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Main navigation">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="text-sm font-medium text-kasavu/75 transition hover:text-white">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsCartOpen(true)}
            className="group flex h-11 items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.07] px-3.5 text-sm font-semibold transition hover:border-white/25 hover:bg-white/[0.12] sm:px-4"
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
            {total > 0 && <span className="hidden text-kasavu/60 lg:inline">₹{total}</span>}
          </button>
          <button
            className="grid h-11 w-11 place-items-center rounded-full md:hidden"
            onClick={() => setMobileOpen((open) => !open)}
            aria-label="Toggle navigation"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <Motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-white/10 bg-teak md:hidden"
          >
            <div className="flex flex-col px-5 py-4">
              {links.map((link) => (
                <a key={link.href} href={link.href} onClick={() => setMobileOpen(false)} className="border-b border-white/10 py-4 text-base text-kasavu/80 last:border-0">
                  {link.label}
                </a>
              ))}
            </div>
          </Motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
