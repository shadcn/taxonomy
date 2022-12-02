"use client"

import * as React from "react"
import Link from "next/link"
import { useSelectedLayoutSegment } from "next/navigation"

import { MainNavItem } from "types"
import { cn } from "@/lib/utils"
import { siteConfig } from "@/config/site"
import { Icons } from "@/components/icons"
import { MobileNav } from "@/components/mobile-nav"

interface MainNavProps {
  navLinks?: MainNavItem[]
  children?: React.ReactNode
}


export function MainNav({ navLinks, children }: MainNavProps) {
  const segment = useSelectedLayoutSegment()
  const [showMobileMenu, setShowMobileMenu] = React.useState<boolean>(false)
  
  const handleShowMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu)
  }

  return (
    <div className="flex gap-6 md:gap-10">
      <Link href="/" className="hidden items-center space-x-2 md:flex">
        <Icons.logo />
        <span className="hidden font-bold sm:inline-block">
          {siteConfig.name}
        </span>
      </Link>
      {navLinks?.length ? (
        <nav className="hidden gap-6 md:flex">
          {navLinks?.map((item, index) => (
            <Link
              key={index}
              href={item.disabled ? "#" : item.href}
              className={cn(
                "flex items-center text-lg font-semibold text-slate-600 sm:text-sm",
                item.href.startsWith(`/${segment}`) && "text-slate-900",
                item.disabled && "cursor-not-allowed opacity-80"
              )}
            >
              {item.title}
            </Link>
          ))}
        </nav>
      ) : null}
      <button
        className="flex items-center space-x-2 md:hidden"
        onClick={handleShowMobileMenu}
      >
        {showMobileMenu ? <Icons.close /> : <Icons.logo />}
        <span className="font-bold">Menu</span>
      </button>
      {showMobileMenu && <MobileNav navLinks={navLinks} handleShowMobileMenu={handleShowMobileMenu}>{children}</MobileNav>}
    </div>
  )
}
