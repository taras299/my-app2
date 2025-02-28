import Image from "next/image"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative pb-12 pt-20 md:pt-32 md:pb-24 lg:pt-40 lg:pb-32 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image src="/images/example.png" alt="Lounge кино" fill className="object-cover opacity-30" priority />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/60 via-navy/80 to-navy"></div>
      </div>

      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="mb-4 text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight">
            <span>КИНОТЕАТР</span>
            <br />
            <span className="text-cyan">LOUNGE КИНО</span>
          </h1>
          <p className="mb-8 text-lg md:text-xl lg:text-2xl text-white/80">
            Лучший кинотеатр для свиданий, вечеринок и дней рождений!
            <br />
            Комфорт и уютная атмосфера для наших любимых клиентов
          </p>
          <Link
            href="/booking"
            className="inline-flex h-12 md:h-14 items-center justify-center rounded-md bg-cyan px-6 md:px-8 text-lg font-medium text-navy shadow transition-colors hover:bg-cyan/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            ЗАБРОНИРОВАТЬ
          </Link>
        </div>
      </div>
    </section>
  )
}

