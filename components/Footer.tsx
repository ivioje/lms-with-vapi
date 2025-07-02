import Image from 'next/image'
import Link from 'next/link'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  
  return (
    <footer className="bg-gray-900 text-gray-300 pt-10 pb-6 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo & Tagline */}
          <div className="flex flex-col gap-4 items-start">
            <Link href="/">
              <div className="flex items-center gap-2 cursor-pointer">
                <Image src="/images/logo.svg" alt="Logo" width={46} height={44} />
                <span className="text-xl font-semibold text-white">Converso</span>
              </div>
            </Link>
            <p className="max-w-xs leading-relaxed text-sm text-gray-400">
              Build personalised learning companions and make studying fun, interactive and accessible for every student.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-4">
            <h4 className="text-lg font-semibold text-white">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link href="/companions" className="hover:text-white transition-colors">Companion Library</Link>
              </li>
              <li>
                <Link href="/companions/new" className="hover:text-white transition-colors">Build a Companion</Link>
              </li>
              <li>
                <Link href="/sign-in" className="hover:text-white transition-colors">Sign In</Link>
              </li>
            </ul>
          </div>

          {/* Contact / Social */}
          <div className="flex flex-col gap-4">
            <h4 className="text-lg font-semibold text-white">Get in Touch</h4>
            <p className="text-sm text-gray-400">Have questions or feedback? Reach out to us at:</p>
            <a href="mailto:support@converso.app" className="hover:text-white text-sm">support@converso.app</a>
            {/* You can replace these with real social links/icons */}
            <div className="flex gap-4 pt-2">
              <Link href="https://twitter.com" target="_blank" className="hover:text-white text-sm">Twitter</Link>
              <Link href="https://github.com" target="_blank" className="hover:text-white text-sm">GitHub</Link>
              <Link href="https://linkedin.com" target="_blank" className="hover:text-white text-sm">LinkedIn</Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 border-t border-gray-700 pt-6 text-center text-sm text-gray-500">
          © {currentYear} Converso. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

export default Footer
