import { Fragment, useRef, useEffect, useState, useCallback } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'
import { PlusIcon } from '@heroicons/react/solid'
import { MinusIcon } from '@heroicons/react/solid'

import { getCartSubTotal } from '@/utils/helpers'
import Price from '@/components/Price'
import CheckOutButton from './CheckOutButton'
import Image from 'next/image'
import Link from 'next/link'
import { useUpdateCartQuantityContext, useCartContext, useMenuContext } from '@/context/Store'
import { formatter } from '@/utils/helpers'

export default function MiniCart() {
  const cancelButtonRef = useRef()
  const updateCartItemQuantity = useUpdateCartQuantityContext()
  const [cart, checkoutUrl] = useCartContext()
  const [cartOpen, setCartOpen] = useMenuContext()
  const [subtotal, setSubtotal] = useState(0)
  const [quantityDisabled, setQuantityDisabled] = useState(false)

  useEffect(() => {
    setSubtotal(getCartSubTotal(cart))
  }, [cart])
  
  function updateItem(id, quantity, quantityAvailable) {
    setQuantityDisabled(true)
    if (quantity >= 1 || quantity <= quantityAvailable) {
      updateCartItemQuantity(id, quantity)
      .then(() => {
        setQuantityDisabled(false)
      })
      .catch((err) => {
        console.error(`Error: ${err}`)
      });
    }
  }

  function deleteItem(id, quantity) {
    updateCartItemQuantity(id, quantity)
  }

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
                                <li key={product.variantId} className="py-6 flex">
                                  <div className="relative flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden">
                                    <Image
                                      src={product.productImage.originalSrc}
                                      alt={product.productTitle}
                                      // layout="fill"
                                      width={96}
                                      height={96}
                                      objectFit="cover"
                                    />
                                  </div>

                                  <div className="ml-4 flex-1 flex flex-col">
                                    <div className='mb-2'>
                                      <div className="flex justify-between text-base font-medium text-gray-900">
                                        <h3>
                                          <Link href={`/products/${product.handle}`} passHref>
                                            <a onClick={() => setCartOpen(false)}>{product.productTitle}</a>
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
                                          aria-label='Decrease quantity'
                                          disabled={quantityDisabled}
                                          className='flex items-center justify-center transition-all rounded-sm text-black py-1 px-2'
                                          onClick={async () => await updateItem(product.variantId, (product.variantQuantity-1), product.quantityAvailable)}
                                        ><MinusIcon className='h-3 w-3' /></button>
                                          <div className='py-1 px-3 grow-1'><span className='sr-only'>Qty </span>{product.variantQuantity}</div>
                                        <button 
                                          aria-label='Increase quantity'
                                          disabled={quantityDisabled}
                                          className='flex items-center justify-center transition-all rounded-sm text-black py-1 px-2'
                                          onClick={() => updateItem(product.variantId, (product.variantQuantity+1), product.quantityAvailable)}
                                        ><PlusIcon className='h-3 w-3' /></button>
                                      </div>

                                      <div className="flex">
                                        <button
                                          onClick={() => deleteItem(product.variantId, 0)}
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
                        <div className="flex justify-end text-base font-medium text-gray-900">
                          <p>Subtotal&nbsp;</p>
                          {subtotal === 0 ? null :
                            <Price
                              currency="£"
                              num={subtotal}
                            />
                          }
                        </div>
                        <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                        <div className="mt-6">
                          <CheckOutButton webUrl={checkoutUrl} />
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