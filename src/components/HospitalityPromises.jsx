import { createElement } from 'react'
import { Flame, Leaf, MessageCircle, Sparkles } from 'lucide-react'
import { motion as Motion } from 'framer-motion'

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
    <section className="relative overflow-hidden bg-[#f1ece4] px-5 py-16 text-teak sm:px-8 sm:py-24" aria-labelledby="ordering-heading">
      <div className="heritage-pattern pointer-events-none absolute inset-0 opacity-[0.05]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_8%_18%,rgba(184,74,40,.10),transparent_27%),radial-gradient(circle_at_90%_86%,rgba(58,90,64,.08),transparent_26%)]" />
      <div className="relative mx-auto max-w-7xl">
        <div className="border-b border-teak/10 pb-8">
          <div>
            <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.24em] text-clay sm:text-xs"><span className="h-px w-8 bg-clay" /> From kitchen to table</div>
            <h2 id="ordering-heading" className="mt-4 max-w-xl font-display text-3xl font-semibold leading-[1.05] tracking-tight text-teak sm:text-4xl">An order should feel<br className="hidden sm:block" /> as good as the food.</h2>
          </div>
          {false && <div className="rounded-2xl border border-sand bg-white/65 p-4 shadow-[0_8px_24px_rgba(43,35,29,0.05)] backdrop-blur-sm sm:p-5">
            <p className="font-display text-xl italic leading-7 text-[#f0d2a1]">“No uncertainty. No chasing. Just a proper Kerala meal on its way.”</p>
            <p className="mt-3 flex items-center gap-2 text-xs leading-5 text-white/55"><Sparkles size={13} className="shrink-0 text-[#e7c68e]" /> Your order is confirmed by a person before the kitchen gets started.</p>
          </div>}
        </div>

        <div className="relative mt-7 grid gap-3 lg:grid-cols-3 lg:gap-4">
          <div className="pointer-events-none absolute left-[16.66%] right-[16.66%] top-12 hidden h-px bg-gradient-to-r from-transparent via-[#d9b679]/45 to-transparent lg:block" />
          {promises.map(({ icon, number, eyebrow, title, copy }, index) => (
            <Motion.article
              key={title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -5 }}
              className="group relative overflow-hidden rounded-2xl border border-sand bg-white/65 p-5 shadow-[0_8px_24px_rgba(43,35,29,0.04)] backdrop-blur-sm transition-colors duration-300 hover:border-clay/30 hover:bg-white sm:p-6"
            >
              <div className="relative flex items-center justify-between">
                <span className="grid h-10 w-10 place-items-center rounded-xl border border-clay/20 bg-clay/10 text-clay shadow-inner shadow-black/5">{createElement(icon, { size: 18, strokeWidth: 1.6 })}</span>
                <span className="rounded-full border border-teak/10 px-2.5 py-1 text-[10px] font-bold tracking-[0.16em] text-teak/35">{number}</span>
              </div>
              <p className="relative mt-5 text-[9px] font-bold uppercase tracking-[0.2em] text-clay">{eyebrow}</p>
              <h3 className="relative mt-2 font-display text-xl font-semibold leading-tight text-teak">{title}</h3>
              <p className="relative mt-2.5 text-[13px] leading-6 text-teak/58">{copy}</p>
              <div className="relative mt-5 flex items-center gap-2 text-[10px] font-bold text-teak/38"><span className="h-px w-6 bg-clay/60" /> Kerala Food Stories promise</div>
            </Motion.article>
          ))}
        </div>

        <div className="mt-7 flex flex-col justify-between gap-3 rounded-2xl border border-clay/20 bg-clay/[0.06] px-5 py-4 text-sm sm:flex-row sm:items-center sm:px-6">
          <p className="font-medium text-teak/75">Add your note, send it on WhatsApp, and leave the rest to us.</p>
          <a href="#menu" className="shrink-0 font-bold text-[#f0d2a1] transition hover:text-white">Choose your meal <span aria-hidden="true">→</span></a>
        </div>
      </div>
    </section>
  )
}
