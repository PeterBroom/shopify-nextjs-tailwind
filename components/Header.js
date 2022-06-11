import Link from 'next/link'
import SVG from 'react-inlinesvg'
import { useContext, useState, useCallback, useEffect } from 'react'
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
          <a className="cursor-pointer leading-none">
            <SVG 
              src='/images/logo/feather.svg'
              className='object-contain'
              aria-hidden='true'
              loading='lazy'
              alt='Quill stationary logo'
            />
          </a>
        </Link>
        <a 
          className="text-md font-regular cursor-pointer"
          onClick={() => setCartOpen(!cartOpen)}
          rel='nofollow'
          >
          <div className="inline-flex items-center flex-wrap text-white">
            <span className={`p-2 transition-opacity duration-300 ease-in-out${cartQuantity > 0 ? ' opacity-1' : ' opacity-0'}`}>Cart ({cartQuantity})</span>
          </div>
        </a>
        <MiniCart cart={cart} />
      </div>
    </header>
  )
}