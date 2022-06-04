/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import Image from 'next/image'

const navigation = [
  { name: 'Product', href: '#' },
  { name: 'Features', href: '#' },
  { name: 'Marketplace', href: '#' },
  { name: 'Company', href: '#' },
]

export default function Hero() {
  return (
    <div className="relative bg-white overflow-hidden">
      <div className="absolute inset-0">
        <Image
            className="h-full w-full object-cover"
            src='https://tailwindui.com/img/ecommerce-images/product-feature-02-full-width.jpg'
            alt="Background image"
            layout="fill"
        />
      </div>

      <div className="relative pt-6 pb-16 sm:pb-24">
        <main className="mt-16 mx-auto max-w-7xl px-4 sm:mt-24">
          <div className="mb-10 text-center">
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 drop-shadow-xl sm:text-5xl md:text-6xl">
              <span className="block text-white xl:inline">Shopify</span>{' '}
              <span className="block text-emerald-600 xl:inline">With NextJs and Tailwind</span>
            </h1>
          </div>

          <div className="p-10 text-center bg-white/80 max-w-4xl mx-auto">
            <p className="mt-3 max-w-md mx-auto text-base text-gray-700 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              This is a simple demonstation of an online shop using the wonderful &quot;Shopify store front&quot; API consumed by NextJs and styled with TailwindCSS.
            </p>
            <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
              
              <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                <a
                  target='_blank' rel='noreferrer'
                  href="https://github.com/PeterBroom/shopify-nextjs-tailwind"
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-500 md:py-4 md:text-lg md:px-10"
                >
                  View on GitHub
                </a>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
