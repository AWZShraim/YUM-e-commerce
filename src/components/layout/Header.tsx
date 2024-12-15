'use client'
import Link from 'next/link'
import { useState } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { ShoppingCart, User, Clock, Menu, Search } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export default function Header() {
  const { data: session } = useSession()

  return (
    <header className="bg-york-red text-york-white sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold">YUM</span>
            <span className="hidden sm:block ml-2 text-sm">York University Market</span>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden md:block flex-1 max-w-md mx-6">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="text"
                placeholder="Search stores or items..."
                className="pl-8 bg-white text-gray-900 w-full"
              />
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden sm:flex items-center space-x-4">
            {/* Stores Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="text-white hover:bg-york-black hover:text-white">
                  Stores
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-york-black border-york-black">
                <DropdownMenuItem className="text-white focus:bg-york-red hover:bg-york-red focus:text-white">
                  <Link href="/stores/restaurants" className="w-full">Restaurants</Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-white focus:bg-york-red hover:bg-york-red focus:text-white">
                  <Link href="/stores/grocery" className="w-full">Grocery</Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-white focus:bg-york-red hover:bg-york-red focus:text-white">
                  <Link href="/stores/clothing-apparel" className="w-full">Clothing & Apparel</Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-white focus:bg-york-red hover:bg-york-red focus:text-white">
                  <Link href="/stores/convenience" className="w-full">Convenience Stores</Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-white focus:bg-york-red hover:bg-york-red focus:text-white">
                  <Link href="/stores/electronics" className="w-full">Electronics</Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-white focus:bg-york-red hover:bg-york-red focus:text-white">
                  <Link href="/stores/health-beauty" className="w-full">Health & Beauty</Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-white focus:bg-york-red hover:bg-york-red focus:text-white">
                  <Link href="/stores/miscellaneous" className="w-full">Miscellaneous</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {session  ? (
              <>
                <Button variant="ghost" className="text-white hover:bg-york-black hover:text-white">
                  <Link href="/orders" className="flex items-center">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>Orders</span>
                  </Link>
                </Button>
                
                <Button variant="ghost" className="text-white hover:bg-york-black hover:text-white">
                  <Link href="/profile" className="flex items-center">
                    <User className="h-4 w-4 mr-2" />
                    <span>Profile</span>
                  </Link>
                </Button>

                <Button 
                  variant="ghost" 
                  onClick={() => signOut()}
                  className="text-white hover:bg-york-black hover:text-white"
                >
                  Logout
                </Button>
              </>
            ) : (
              <Button variant="ghost" className="text-white hover:bg-york-black hover:text-white">
                <Link href="/login">Login</Link>
              </Button>
            )}

            <Button variant="ghost" asChild className="text-white hover:bg-york-black hover:text-white">
              <Link href="/cart" className="flex items-center">
                <ShoppingCart className="h-4 w-4" />
                <Badge variant="secondary" className="ml-2">0</Badge>
              </Link>
            </Button>
          </div>

          {/* Mobile Menu */}
          <div className="sm:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent 
                side="left" 
                className="w-[300px] bg-york-red border-none" 
              >
                <SheetHeader>
                  <SheetTitle className="text-white">Menu</SheetTitle>  {/* Made title white */}
                </SheetHeader>
                <div className="space-y-4 mt-4">
                  {/* Mobile Search */}
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                    <Input
                      type="text"
                      placeholder="Search stores or items..."
                      className="pl-8 w-full bg-white text-york-black"
                    />
                  </div>
                            
                  <Separator className="bg-white/20" />  {/* Made separator lighter */}
                            
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button 
                        variant="ghost" 
                        className="w-full justify-start text-white hover:bg-york-black hover:text-white"
                      >
                        Stores
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-[calc(300px-24px)] mt-2 bg-york-black text-white">
                      <DropdownMenuItem className="hover:bg-york-red focus:bg-york-red">
                        <Link href="/stores/restaurants" className="w-full">Restaurants</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="hover:bg-york-red focus:bg-york-red">
                        <Link href="/stores/grocery" className="w-full">Grocery</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="hover:bg-york-red focus:bg-york-red">
                        <Link href="/stores/clothing-apparel" className="w-full">Clothing & Apparel</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="hover:bg-york-red focus:bg-york-red">
                        <Link href="/stores/convenience" className="w-full">Convenience Stores</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="hover:bg-york-red focus:bg-york-red">
                        <Link href="/stores/electronics" className="w-full">Electronics</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="hover:bg-york-red focus:bg-york-red">
                        <Link href="/stores/health-beauty" className="w-full">Health & Beauty</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="hover:bg-york-red focus:bg-york-red">
                        <Link href="/stores/miscellaneous" className="w-full">Miscellaneous</Link>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                    
                  {session  ? (
                    <>
                      <Button 
                        variant="ghost" 
                        asChild 
                        className="w-full justify-start text-white hover:bg-york-black hover:text-white"
                      >
                        <Link href="/orders" className="flex items-center">
                          <Clock className="h-4 w-4 mr-2" />
                          Orders
                        </Link>
                      </Button>
                                
                      <Button 
                        variant="ghost" 
                        asChild 
                        className="w-full justify-start text-white hover:bg-york-black hover:text-white"
                      >
                        <Link href="/profile" className="flex items-center">
                          <User className="h-4 w-4 mr-2" />
                          Profile
                        </Link>
                      </Button>

                      <Button 
                        variant="ghost" 
                        onClick={() => signOut()}
                        className="text-white hover:bg-york-black hover:text-white"
                      >
                        Logout
                      </Button>
                    </>
                  ) : (
                    <Button 
                      variant="ghost" 
                      asChild 
                      className="w-full justify-start text-white hover:bg-york-black hover:text-white"
                    >
                      <Link href="/login">Login</Link>
                    </Button>
                  )}
                            
                  <Button 
                    variant="ghost" 
                    asChild 
                    className="w-full justify-start text-white hover:bg-york-black hover:text-white"
                  >
                    <Link href="/cart" className="flex items-center">
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Cart
                      <Badge variant="secondary" className="ml-2 bg-white text-york-black">0</Badge>
                    </Link>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </header>
  )
}