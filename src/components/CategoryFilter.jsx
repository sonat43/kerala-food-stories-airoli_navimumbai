import { motion as Motion } from 'framer-motion'

export default function CategoryFilter({ categories, selected, onChange }) {
  return (
    <div className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 pb-2 sm:mx-0 sm:flex-wrap sm:px-0" role="tablist" aria-label="Menu categories">
      {categories.map((category) => {
        const active = category.id === selected
        return (
          <button
            key={category.id}
            role="tab"
            aria-selected={active}
            onClick={() => onChange(category.id)}
            className={`relative shrink-0 rounded-full px-4 py-2.5 text-sm font-semibold transition ${active ? 'text-white' : 'border border-sand bg-paper text-teak/65 hover:border-teak/20 hover:text-teak'}`}
          >
            {active && <Motion.span layoutId="active-category" className="absolute inset-0 -z-10 rounded-full bg-teak" transition={{ type: 'spring', stiffness: 420, damping: 34 }} />}
            {category.label}
          </button>
        )
      })}
    </div>
  )
}
