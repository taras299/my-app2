import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function RoomCards() {
  const rooms = [
    {
      id: "cozy",
      name: "УЮТНЫЙ",
      capacity: "1-4 человек",
      image: "/images/cozy-room.png",
    },
    {
      id: "space",
      name: "КОСМИЧЕСКИЙ",
      capacity: "5-7 человек",
      image: "/images/space-room.png",
    },
    {
      id: "premium",
      name: "ПРЕМИАЛЬНЫЙ",
      capacity: "10-15 человек",
      image: "/images/premium-room.png",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {rooms.map((room) => (
        <div key={room.id} className="room-card rounded-lg overflow-hidden">
          <div className="relative h-64">
            <Image src={room.image || "/placeholder.svg"} alt={room.name} fill className="object-cover" />
          </div>
          <div className="p-6 text-center">
            <h3 className="text-2xl font-semibold mb-2">{room.name}</h3>
            <p className="text-white/70 mb-4">{room.capacity}</p>
            <Button asChild className="bg-cyan hover:bg-cyan/90 text-navy">
              <Link href={`/rooms/${room.id}`}>ПОДРОБНЕЕ</Link>
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}

