import Link from "next/link"
import { MessageCircle, Phone } from "lucide-react"

export function ContactButtons() {
  return (
    <div className="fixed bottom-4 left-4 z-50 flex flex-col gap-2">
      <Link
        href="tel:+77270000000"
        className="flex items-center justify-center w-12 h-12 rounded-full bg-muted text-white hover:bg-cyan hover:text-navy transition-colors"
      >
        <Phone className="h-5 w-5" />
      </Link>
      <Link
        href="#"
        className="flex items-center justify-center w-12 h-12 rounded-full bg-green-500 text-white hover:bg-green-600 transition-colors"
      >
        <MessageCircle className="h-5 w-5" />
      </Link>
    </div>
  )
}

