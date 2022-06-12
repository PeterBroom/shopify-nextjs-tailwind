import { Fragment, useContext, useRef, useEffect, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'
import { PlusIcon } from '@heroicons/react/solid'
import { MinusIcon } from '@heroicons/react/solid'

import Image from 'next/image'
import Link from 'next/link'
import { CartContext } from '../context/shopContext'
import { formatter } from '../utils/helpers'
import axios from "axios"
import useSWR from 'swr'

// setup inventory fetcher
const fetchInventory = (url, id) =>
  axios
    .get(url, {
      params: {
        id: id,
      },
    })
    .then((res) => res.data)

export default function MiniCart({ cart }) {
  const cancelButtonRef = useRef()
  const [handle, setHandle] = useState(null)
  const [quantity, setQuantity] = useState(null)

  const { cartOpen, setCartOpen, checkoutUrl, removeCartItem, decreaseQuantity, increaseQuantity } = useContext(CartContext)

  let cartTotal = 0
  cart.map(item => {
    cartTotal += item?.variantPrice * item?.variantQuantity
  })

  const { data: productQuantity } = useSWR(
    ['/api/quantity', handle],
    (url, id) => fetchInventory(url, id),
    { errorRetryCount: 3 }
  )

  useEffect(() => {
    const findQuantity = productQuantity?.variants?.edges[0].node.quantityAvailable ? productQuantity?.variants?.edges[0].node.quantityAvailable : 0
    setQuantity(findQuantity)
  
  }, [productQuantity?.variants?.edges, quantity])

  return (
    <Transition.Root show={cartOpen} as={Fragment}>
      <Dialog
        initialFocus={cancelButtonRef}
        as="div"
        className="fixed z-50 inset-0 overflow-hidden"
        onClose={() => { setCartOpen(!cartOpen) }}
      >
        <div className="absolute inset-0 overflow-hidden">
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-y-0 right-0 max-w-full flex">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <div className="w-screen max-w-md">
                <div className="h-full flex flex-col bg-white shadow-xl overflow-y-scroll">
                  <div className="flex-1 py-6 overflow-y-auto px-4 sm:px-6">
                    <div className="flex items-start justify-between">
                      <Dialog.Title className="text-lg font-medium text-gray-900">Shopping cart</Dialog.Title>
                      <div className="ml-3 h-7 flex items-center">
                        <button
                          ref={cancelButtonRef}
                          type="button"
                          className="-m-2 p-2 text-gray-400 hover:text-gray-500 focus:outline-none"
                          onClick={() => setCartOpen(false)}
                        >
                          <span className="sr-only">Close panel</span>
                          <XIcon className="h-6 w-6 focus:ring-none" aria-hidden="true" />
                        </button>
                      </div>
                    </div>

                    <div className="mt-8">
                      <div className="flow-root">
                        {
                          cart.length > 0 ?

                            <ul role="list" className="-my-6 divide-y divide-gray-200">
                              {cart.map((product) => (
                                <li key={product.id + Math.random()} className="py-6 flex">
                                  <div className="relative flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden">
                                    <Image
                                      src={product.image}
                                      alt={product.title}
                                      layout="fill"
                                      objectFit="cover"
                                    />
                                  </div>

                                  <div className="ml-4 flex-1 flex flex-col">
                                    <div className='mb-2'>
                                      <div className="flex justify-between text-base font-medium text-gray-900">
                                        <h3>
                                          <Link href={`/products/${product.handle}`} passHref>
                                            <a onClick={() => setCartOpen(false)}>{product.title}</a>
                                          </Link>
                                        </h3>
                                        <p className="ml-4">{formatter.format(product.variantPrice)}</p>
                                      </div>
                                      {product.variantTitle != 'Default Title' &&
                                      <p className="mt-1 text-sm text-gray-500">{product.variantTitle}</p>
                                    }
                                    </div>
                                    <div className="flex-1 flex items-center justify-between text-sm">
                                      <div className="flex text-gray-500 flex justify-center items-center border divide-x divide-solid">
                                        <button 
                                          className='flex items-center justify-center transition-all rounded-sm text-black py-1 px-2'
                                          onClick={() => decreaseQuantity(product.id)}
                                        ><MinusIcon className='h-3 w-3' /></button>
                                          <div className='py-1 px-3 grow-1'><span className='sr-only'>Qty </span>{product.variantQuantity}</div>
                                        <button 
                                          className='flex items-center justify-center transition-all rounded-sm text-black py-1 px-2'
                                          onClick={() => {
                                            setHandle(product.handle)                                            
                                            increaseQuantity(product.id, quantity)
                                          }}
                                          ><PlusIcon className='h-3 w-3' /></button>
                                      </div>

                                      <div className="flex">
                                        <button
                                          onClick={() => removeCartItem(product.id)}
                                          type="button"
                                          className="font-medium text-gray-500 hover:text-gray-800">
                                          Remove
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              ))}
                            </ul> :
                            <div>
                              <p>Nothing in your cart!</p>
                            </div>
                        }

                      </div>
                    </div>
                  </div>
                  {
                    cart.length > 0 ?
                      <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <p>Subtotal</p>
                          <p>{formatter.format(cartTotal)}</p>
                        </div>
                        <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                        <div className="mt-6">
                          <a
                            href={checkoutUrl}
                            className="flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-black hover:bg-gray-800"
                          >
                            Checkout
                          </a>
                        </div>
                        <div className="mt-6 flex justify-center text-sm text-center text-gray-500">
                          <p>
                            or{' '}
                            <button
                              type="button"
                              className="font-medium hover:text-gray-800"
                              onClick={() => setCartOpen(false)}
                            >
                              Continue Shopping<span aria-hidden="true"> &rarr;</span>
                            </button>
                          </p>
                        </div>
                      </div> : null
                  }

                </div>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}