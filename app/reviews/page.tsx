import { ReviewsSection } from "@/components/reviews-section"
import { Button } from "@/components/ui/button"

export default function ReviewsPage() {
  return (
    <section className="py-12 md:py-20">
      <div className="container">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8">
          ОТЗЫВЫ <span className="text-cyan">НАШИХ КЛИЕНТОВ</span>
        </h1>

        <div className="max-w-4xl mx-auto">
          <ReviewsSection />

          <div className="mt-12 p-6 price-card rounded-lg">
            <h2 className="text-xl font-semibold mb-4 text-center">Оставьте свой отзыв</h2>

            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Имя</label>
                  <input
                    type="text"
                    className="w-full bg-navy/80 border border-white/10 rounded-md p-3 text-white"
                    placeholder="Ваше имя"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Оценка</label>
                  <select className="w-full bg-navy/80 border border-white/10 rounded-md p-3 text-white">
                    <option value="5">5 звезд</option>
                    <option value="4">4 звезды</option>
                    <option value="3">3 звезды</option>
                    <option value="2">2 звезды</option>
                    <option value="1">1 звезда</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Ваш отзыв</label>
                <textarea
                  className="w-full bg-navy/80 border border-white/10 rounded-md p-3 text-white min-h-32"
                  placeholder="Поделитесь своими впечатлениями..."
                />
              </div>
              <div className="text-center">
                <Button type="submit" className="bg-cyan hover:bg-cyan/90 text-navy">
                  ОТПРАВИТЬ ОТЗЫВ
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

