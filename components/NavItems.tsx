'use client'
import { cn } from "@/lib/utils";
import Link from "next/link"
import { usePathname } from "next/navigation";

const navItems = [
    { label: 'Home', href: '/' },
    { label: 'My Companions', href: '/companions' },
    { label: 'My Journey', href: '/my-journey' },
    { label: 'Archives', href: '/archives' },
]

const NavItems = () => {
    const pathname = usePathname();
  return (
    <nav className="flex md:items-center items-start md:flex-row flex-col gap-4">
      {navItems.map(({ label, href }) => (
        <Link key={label} href={href} className={cn(pathname === href && 'text-primary font-semibold')}>
          {label}
        </Link>
      ))}
    </nav>
  )
}

export default NavItems