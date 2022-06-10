import Link from 'next/link'
import Image from 'next/image'
import { useContext } from 'react'
import { CartContext } from '../context/shopContext'
import MiniCart from './MiniCart'

import { ShoppingBagIcon } from '@heroicons/react/solid'

export default function Nav() {
  const { cart, cartOpen, setCartOpen } = useContext(CartContext)

  let cartQuantity = 0
  cart.map(item => {
    return (cartQuantity += item?.variantQuantity)
  })

  return (
    <header className="top-0 z-20 bg-slate-800">
      <div className="flex items-center justify-between max-w-6xl pt-4 pb-2 px-4 mx-auto lg:max-w-screen-xl">
        <Link href="/" passHref>
          <a className="cursor-pointer">
            <Image
              src="/images/logo/feather.svg"
              alt="Jot logo"
              height={50} width={50}
            />
          </a>
        </Link>
        <a 
          className="text-md font-regular cursor-pointer"
          onClick={() => setCartOpen(!cartOpen)}
          >
          <div className="relative inline-flex items-center flex-wrap p-3 text-white">
            <span className="sr-only">Cart </span>
            <ShoppingBagIcon className="absolute left-[50%] -translate-x-[50%] h-10 w-10" aria-hidden="true" />
            <span className="absolute top-3 left-[50%] -translate-x-[50%] text-xs text-slate-900">
              {cartQuantity}
              </span>
          </div>
        </a>
        <MiniCart cart={cart} />
      </div>
    </header>
  )
}