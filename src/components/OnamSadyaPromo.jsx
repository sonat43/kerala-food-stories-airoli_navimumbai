import { MessageCircle } from 'lucide-react'

const orderMessage = 'Hello Kerala Food Stories, I would like to book the Onam Sadya for 26 August 2026.'

export default function OnamSadyaPromo() {
  return (
    <section id="onam-sadya" className="scroll-mt-20 lg:hidden" aria-label="Onam Sadya booking">
      <img
        src="/images/onam-sadya-2026.jpg"
        alt="Kerala Food Stories Onam Sadya 2026: 22-item parcel-only feast for ₹550, available on 26 August from 12 PM"
        className="block w-full"
        loading="lazy"
      />
      <div className="px-5 pb-5 pt-4">
        <a
          href={`https://wa.me/917208207729?text=${encodeURIComponent(orderMessage)}`}
          target="_blank"
          rel="noreferrer"
          className="flex w-full items-center justify-center gap-2 rounded-full bg-[#e0b65f] px-5 py-4 text-sm font-bold text-[#1d2d1d] shadow-[0_8px_18px_rgba(0,0,0,0.2)] transition hover:bg-[#f0cd83]"
        >
          <MessageCircle size={18} /> Order Onam Sadya on WhatsApp
        </a>
      </div>
    </section>
  )
}
