import { createElement } from 'react'
import { Flame, Leaf, MessageCircle, Sparkles } from 'lucide-react'

const promises = [
  {
    icon: Flame,
    number: '01',
    eyebrow: 'Fresh from the stove',
    title: 'Cooked after you choose.',
    copy: 'We prepare in small batches and finish your dishes once the order reaches our kitchen—not hours before.',
  },
  {
    icon: Leaf,
    number: '02',
    eyebrow: 'Your way, noted',
    title: 'Preferences travel with it.',
    copy: 'Less oil, more spice, allergies or a table number—your note stays visible to the team preparing your meal.',
  },
  {
    icon: MessageCircle,
    number: '03',
    eyebrow: 'A real response',
    title: 'Confirmed by our people.',
    copy: 'A team member confirms availability, your preparation time and delivery details personally on WhatsApp.',
  },
]

export default function HospitalityPromises() {
  return (
    <section className="relative overflow-hidden bg-teak px-5 py-20 text-kasavu sm:px-8 sm:py-28" aria-labelledby="ordering-heading">
      <div className="heritage-pattern pointer-events-none absolute inset-0 opacity-[0.14]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_8%_18%,rgba(184,74,40,.28),transparent_27%),radial-gradient(circle_at_90%_86%,rgba(217,182,121,.14),transparent_26%)]" />
      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-8 border-b border-white/12 pb-10 lg:grid-cols-[1fr_.8fr] lg:items-end">
          <div>
            <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.24em] text-[#e7c68e] sm:text-xs"><span className="h-px w-8 bg-[#e7c68e]" /> From kitchen to table</div>
            <h2 id="ordering-heading" className="mt-5 max-w-2xl font-display text-4xl font-semibold leading-[1.02] tracking-tight text-white sm:text-5xl">An order should feel<br className="hidden sm:block" /> as good as the food.</h2>
          </div>
          <div className="rounded-2xl border border-white/12 bg-white/[0.06] p-5 backdrop-blur-sm sm:p-6">
            <p className="font-display text-xl italic leading-7 text-[#f0d2a1]">“No uncertainty. No chasing. Just a proper Kerala meal on its way.”</p>
            <p className="mt-3 flex items-center gap-2 text-xs leading-5 text-white/55"><Sparkles size={13} className="shrink-0 text-[#e7c68e]" /> Your order is confirmed by a person before the kitchen gets started.</p>
          </div>
        </div>

        <div className="relative mt-8 grid gap-4 lg:grid-cols-3 lg:gap-5">
          <div className="pointer-events-none absolute left-[16.66%] right-[16.66%] top-12 hidden h-px bg-gradient-to-r from-transparent via-[#d9b679]/45 to-transparent lg:block" />
          {promises.map(({ icon, number, eyebrow, title, copy }, index) => (
            <article key={title} className="group relative overflow-hidden rounded-[1.5rem] border border-white/12 bg-white/[0.055] p-6 backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-[#d9b679]/45 hover:bg-white/[0.09] sm:p-7">
              <span className="absolute -right-3 -top-7 font-display text-[7rem] font-semibold leading-none text-white/[0.045]">{number}</span>
              <div className="relative flex items-center justify-between">
                <span className="grid h-12 w-12 place-items-center rounded-2xl border border-[#d9b679]/20 bg-[#d9b679]/10 text-[#e7c68e] shadow-inner shadow-black/10">{createElement(icon, { size: 21, strokeWidth: 1.6 })}</span>
                <span className="font-display text-2xl italic text-[#d9b679]/60">{number}</span>
              </div>
              <p className="relative mt-7 text-[10px] font-bold uppercase tracking-[0.2em] text-[#e7c68e]">{eyebrow}</p>
              <h3 className="relative mt-2 font-display text-2xl font-semibold leading-tight text-white">{title}</h3>
              <p className="relative mt-3 text-sm leading-7 text-white/58">{copy}</p>
              <div className="relative mt-6 flex items-center gap-2 text-[11px] font-bold text-white/38"><span className="h-px w-6 bg-[#d9b679]/60" /> Kerala Food Stories promise</div>
            </article>
          ))}
        </div>

        <div className="mt-7 flex flex-col justify-between gap-3 rounded-2xl border border-[#d9b679]/20 bg-[#d9b679]/[0.08] px-5 py-4 text-sm sm:flex-row sm:items-center sm:px-6">
          <p className="font-medium text-white/75">Add your note, send it on WhatsApp, and leave the rest to us.</p>
          <a href="#menu" className="shrink-0 font-bold text-[#f0d2a1] transition hover:text-white">Choose your meal <span aria-hidden="true">→</span></a>
        </div>
      </div>
    </section>
  )
}
