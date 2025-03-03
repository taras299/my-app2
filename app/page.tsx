import { HeroSection } from "@/components/hero-section"
import { PriceCards } from "@/components/price-cards"
import { RoomCards } from "@/components/room-cards"
import { FaqSection } from "@/components/faq-section"
import { ReviewsSection } from "@/components/reviews-section"

export default function Home() {
  return (
    <>
      <HeroSection />

      <section className="py-12 md:py-16 lg:py-20">
        <div className="container">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-8">
            НАШИ <span className="text-cyan">ЗАЛЫ</span>
          </h2>
          <RoomCards />
        </div>
      </section>

      <section className="py-12 md:py-16 lg:py-20 bg-navy/50">
        <div className="container">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-8">
            <span className="text-cyan">ТАРИФЫ</span>
          </h2>
          <PriceCards />
        </div>
      </section>

      <section className="py-12 md:py-16 lg:py-20">
        <div className="container">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-8">
            FAQ <span className="text-cyan">ИНФОРМАЦИЯ</span>
          </h2>
          <div className="max-w-3xl mx-auto">
            <FaqSection />
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 lg:py-20 bg-navy/50">
        <div className="container">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-8">
            ОТЗЫВЫ <span className="text-cyan">НАШИХ КЛИЕНТОВ</span>
          </h2>
          <ReviewsSection />
        </div>
      </section>
    </>
  )
}