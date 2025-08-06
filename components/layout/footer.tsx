import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-gray-100 py-12 px-6 lg:px-12 border-t border-gray-200">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="flex space-x-8">
          <Link href="https://github.com/AmenoNarime" className="text-gray-600 hover:text-gray-800 transition-colors">
            GitHub
          </Link>
        </div>
      </div>
    </footer>
  )
}
