import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function RoomsPage() {
  const rooms = [
    {
      id: "cozy",
      name: "УЮТНЫЙ",
      capacity: "1-4 человек",
      features: ["Проектор Full HD", "Кондиционер", "Комфортные кресла-мешки", "Стереосистема", "Освещение с режимами"],
      description:
        "Идеальное место для романтического свидания или встречи с друзьями. Уютная атмосфера, приглушенный свет и максимальный комфорт.",
      images: ["/placeholder.svg?height=300&width=400", "/placeholder.svg?height=300&width=400"],
    },
    {
      id: "space",
      name: "КОСМИЧЕСКИЙ",
      capacity: "5-7 человек",
      features: [
        "Проектор 4K",
        "Объемный звук",
        "Тематический дизайн",
        "LED-освещение с эффектами",
        "Удобные диваны и кресла",
      ],
      description:
        "Почувствуйте себя в открытом космосе! Уникальный дизайн с космической тематикой, звездное небо на потолке и атмосферное освещение создадут незабываемые впечатления.",
      images: ["/placeholder.svg?height=300&width=400", "/placeholder.svg?height=300&width=400"],
    },
    {
      id: "premium",
      name: "ПРЕМИАЛЬНЫЙ",
      capacity: "10-15 человек",
      features: [
        "Проектор 4K HDR",
        "Премиальная аудиосистема",
        "Барная стойка",
        "Большая зона отдыха",
        "Отдельная гардеробная",
      ],
      description:
        "Наш самый большой и роскошный зал для особых случаев. Идеален для больших компаний, дней рождения и корпоративных мероприятий. Впечатляющий дизайн и максимальный комфорт.",
      images: ["/placeholder.svg?height=300&width=400", "/placeholder.svg?height=300&width=400"],
    },
  ]

  return (
    <>
      <section className="py-12 md:py-20">
        <div className="container">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12">
            НАШИ <span className="text-cyan">ЗАЛЫ</span>
          </h1>

          <div className="space-y-20">
            {rooms.map((room, index) => (
              <div
                key={room.id}
                className={`flex flex-col ${index % 2 ? "md:flex-row-reverse" : "md:flex-row"} gap-8 md:gap-12 items-center`}
              >
                <div className="w-full md:w-1/2">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {room.images.map((img, i) => (
                      <div key={i} className="relative h-64 rounded-lg overflow-hidden">
                        <Image
                          src={img || "/placeholder.svg"}
                          alt={`${room.name} - изображение ${i + 1}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="w-full md:w-1/2">
                  <h2 className="text-2xl md:text-3xl font-bold mb-2">{room.name}</h2>
                  <p className="text-cyan font-medium mb-4">{room.capacity}</p>
                  <p className="text-white/80 mb-6">{room.description}</p>

                  <div className="mb-6">
                    <h3 className="text-lg font-medium mb-3">Особенности:</h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {room.features.map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <span className="text-cyan mr-2">✓</span>
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button asChild className="bg-cyan hover:bg-cyan/90 text-navy">
                    <Link href="/booking">ЗАБРОНИРОВАТЬ</Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

