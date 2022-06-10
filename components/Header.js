import Link from 'next/link'
import Image from 'next/image'
import { useContext, useState, useCallback, useEffect } from 'react'
import { useMediaQuery } from 'react-responsive'
import { CartContext } from '../context/shopContext'
import MiniCart from './MiniCart'

import { ShoppingBagIcon } from '@heroicons/react/solid'

export default function Header({sticky}) {

  const isTabletOrMobile = useMediaQuery({ minDeviceWidth: 768 })
  const logodimensions = isTabletOrMobile ? 40 : 25

  const { cart, cartOpen, setCartOpen } = useContext(CartContext)

  let cartQuantity = 0
  cart.map(item => {
    return (cartQuantity += item?.variantQuantity)
  })

  const [hasScrolled, setScroll] = useState(false);


  const checkScroll = useCallback((e) => {
    setScroll(true);
  }, [])
  
  useEffect(() => {
      window.addEventListener("scroll", checkScroll);
      return () => {
        window.removeEventListener("scroll", checkScroll);
      };
  }, [checkScroll]);


  const stickyClass = sticky === true ? ' fixed top-0' : ''
  const visibleClass = hasScrolled === true ? ' opacity-1' : ' opacity-0'
  
  return (
    <header className={`w-full z-20 bg-slate-800 transition-opacity ${stickyClass}${sticky ? visibleClass : ''}`}>
      <div className="flex items-center justify-between max-w-6xl pt-4 pb-2 px-4 mx-auto lg:max-w-screen-xl">
        <Link href="/" passHref>
          <a className="cursor-pointer">
            <Image
              src="/images/logo/feather.svg"
              alt="Quill stationary logo"
              height={logodimensions} width={logodimensions}
            />
          </a>
        </Link>
        <a 
          className="text-md font-regular cursor-pointer"
          onClick={() => setCartOpen(!cartOpen)}
          >
          <div className="inline-flex items-center flex-wrap text-white">
            <span className="p-2 md:sr-only">Cart ({cartQuantity})</span>
            <div className='relative h-10 w-10 hidden md:block'>
              <ShoppingBagIcon className="absolute top-0 left-[50%] -translate-x-[50%] h-10 w-10" aria-hidden="true" />
              <span className="absolute top-5 left-[50%] -translate-x-[50%] text-xs text-slate-900">
                {cartQuantity}
              </span>
            </div>
          </div>
        </a>
        <MiniCart cart={cart} />
      </div>
    </header>
  )
}