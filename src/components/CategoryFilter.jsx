import { motion as Motion } from 'framer-motion'

export default function CategoryFilter({ categories, selected, onChange }) {
  return (
    <div className="no-scrollbar flex gap-2 overflow-x-auto pb-2 sm:flex-wrap" role="tablist" aria-label="Menu categories">
      {categories.map((category) => {
        const active = category.id === selected
        return (
          <button
            key={category.id}
            role="tab"
            aria-selected={active}
            onClick={() => onChange(category.id)}
            className={`relative isolate shrink-0 rounded-full px-4 py-2.5 text-sm font-semibold shadow-[0_2px_8px_rgba(43,35,29,0.03)] transition ${active ? 'text-white shadow-[0_5px_14px_rgba(184,74,40,0.2)]' : 'border border-sand/80 bg-white/70 text-teak/65 backdrop-blur-sm hover:border-clay/25 hover:bg-white hover:text-teak'}`}
          >
            {active && <Motion.span layoutId="active-category" className="absolute inset-0 z-0 rounded-full bg-clay" transition={{ type: 'spring', stiffness: 420, damping: 34 }} />}
            <span className="relative z-10">{category.label}</span>
          </button>
        )
      })}
    </div>
  )
}
