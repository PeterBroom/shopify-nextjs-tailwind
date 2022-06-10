import Link from 'next/link'
import Image from 'next/image'
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
    setScroll(true);
  }, [])
  
  useEffect(() => {
      window.addEventListener("scroll", checkScroll);
      return () => {
        window.removeEventListener("scroll", checkScroll);
      };
  }, [checkScroll]);

  return (
    <header className={`w-full z-20 bg-slate-800 top-0${hasScrolled === true ? ' transition-opacity opacity-1' : ' opacity-0'}${sticky === true ? ' sticky' : ' relative'}`}>
      <div className="flex items-center justify-between max-w-6xl pt-4 pb-2 px-4 mx-auto lg:max-w-screen-xl">
        <Link href="/" passHref>
          <a className="cursor-pointer">
            <Image
              src="/images/logo/feather.svg"
              alt="Quill stationary logo"
              height={30} width={30}
            />
          </a>
        </Link>
        <a 
          className="text-md font-regular cursor-pointer"
          onClick={() => setCartOpen(!cartOpen)}
          >
          <div className="inline-flex items-center flex-wrap text-white">
            <span className={`p-2 transition-opacity duration-300 ease-in-out${cartQuantity ? ' opacity-1' : ' opacity-0'}`}>Cart ({cartQuantity})</span>
          </div>
        </a>
        <MiniCart cart={cart} />
      </div>
    </header>
  )
}