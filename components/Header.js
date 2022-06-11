import Link from 'next/link'
import SVG from 'react-inlinesvg'
import { useContext, useState, useCallback, useEffect } from 'react'
import { ShoppingBagIcon } from '@heroicons/react/solid'
import { CartContext } from '../context/shopContext'
import MiniCart from './MiniCart'

export default function Header({sticky}) {
  const { cart, cartOpen, setCartOpen } = useContext(CartContext)
  let cartQuantity = 0
  cart.map(item => {
    return (cartQuantity += item?.variantQuantity)    
  })

  const [hasScrolled, setScroll] = useState(false);

  const checkScroll = useCallback((e) => {
    if (e.currentTarget.scrollY > 0) {
      setScroll(true)
    } else {
      setScroll(false)
    }
  }, [])
  
  useEffect(() => {
      window.addEventListener("scroll", checkScroll);
      return () => {
        window.removeEventListener("scroll", checkScroll);
      };
  }, [checkScroll]);

  let headerClasses = ''
  if (sticky) {
    headerClasses = ` sticky will-change-[opacity] ${hasScrolled === true ? 'transition-all duration-500 ease-in-out opacity-1' : ' opacity-0'}`
  }

  return (
    <header className={`w-full z-20 bg-slate-800 top-0${headerClasses}`}>
      <div className="flex items-center justify-between max-w-6xl pt-4 pb-2 px-4 mx-auto lg:max-w-screen-xl">
        <Link href="/" passHref>
          <a className="cursor-pointer leading-none"><span className='sr-only'>Home</span>
            <SVG 
              src='/images/logo/feather.svg'
              className='object-contain'
              aria-hidden='true'
              loading='lazy'
              alt='Quill stationary logo'
            />
          </a>
        </Link>
        <button 
          className="text-md font-regular cursor-pointer"
          onClick={() => setCartOpen(!cartOpen)}
          >
          <div className="relative inline-flex items-center flex-wrap text-white">
            <span className={`p-2 transition-opacity duration-300 ease-in-out`}>
              <span className='sr-only'>Cart</span>
              <ShoppingBagIcon className='h-8 w-8' />
              <span className={`absolute top-1 right-0 flex items-center justify-center text-sm font-bold h-6 w-6 rounded-[50%] bg-emerald-600 transition-all duration-300 ease-in-out${cartQuantity > 0 ? ' opacity-1' : ' opacity-0'}`}>{cartQuantity}</span>
           </span>
          </div>
        </button>
        <MiniCart cart={cart} />
      </div>
    </header>
  )
}