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
    <header className="top-0 z-20 bg-stone-700">
      <div className="flex items-center justify-between max-w-6xl pt-4 pb-2 px-4 mx-auto lg:max-w-screen-xl">
        <Link href="/" passHref>
          <a className="cursor-pointer">
            <Image
              src="/images/logo/jot-logo-white.svg"
              alt="Jot logo"
              height={50} width={50}
            />
          </a>
        </Link>
        <a 
          className="text-md font-regular cursor-pointer"
          onClick={() => setCartOpen(!cartOpen)}
          >
          <div className="inline-flex items-center flex-wrap p-3 text-white">
          <ShoppingBagIcon  className="h-6 w-6" aria-hidden="true" /> <span className="">Cart ({cartQuantity})</span>
          </div>
        </a>
        <MiniCart cart={cart} />
      </div>
    </header>
  )
}