import { FaqSection } from "@/components/faq-section"

export default function FaqPage() {
  return (
    <section className="py-12 md:py-20">
      <div className="container">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8">
          FAQ <span className="text-cyan">ИНФОРМАЦИЯ</span>
        </h1>

        <div className="max-w-3xl mx-auto">
          <FaqSection />

          <div className="mt-12 text-center">
            <p className="text-white/80 mb-4">Не нашли ответ на свой вопрос?</p>
            <p className="text-lg">
              Свяжитесь с нами по телефону:{" "}
              <a href="tel:+78000000000" className="text-cyan hover:underline">
                +7 (800) 000-0000
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

