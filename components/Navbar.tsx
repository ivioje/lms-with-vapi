'use client'

import Image from "next/image"
import Link from "next/link"
import NavItems from "./NavItems"
import { SignInButton, UserButton, SignedIn, SignedOut } from "@clerk/nextjs"
import { Menu, X } from "lucide-react"
import { useState } from "react"

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  return (
   <nav className="navbar relative">
    {/* Logo */}
    <Link href="/">
      <div className="flex items-center gap-2.5 cursor-pointer">
        <Image src="/images/logo.svg" alt="Logo" width={46} height={44} />
      </div>
    </Link>

    {/* Desktop Menu */}
    <div className="hidden md:flex items-center gap-8">
      <NavItems />
      <SignedOut>
        <SignInButton>
          <button className="btn-signin">Sign In</button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <UserButton afterSignOutUrl="/" />
      </SignedIn>
    </div>

    {/* Mobile Hamburger */}
    <button className="md:hidden ml-auto flex gap-2" onClick={toggleMenu} aria-label="Toggle Menu">
      <SignedIn>
        <UserButton afterSignOutUrl="/" />
      </SignedIn>
      {menuOpen ? <X size={24} /> : <Menu size={24} />}
    </button>

    {/* Mobile Dropdown */}
    {menuOpen && (
      <div className="absolute top-full left-0 right-0 bg-white shadow-md z-50 flex flex-col gap-4 p-4 md:hidden">
        <NavItems />
        <div className="flex items-center gap-4">
          <SignedOut>
            <SignInButton>
              <button className="btn-signin w-full">Sign In</button>
            </SignInButton>
          </SignedOut>
        </div>
      </div>
    )}
   </nav>
  )
}

export default Navbar