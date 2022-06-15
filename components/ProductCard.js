import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { formatter } from '@/utils/helpers'

const ProductCard = ({ product, priority }) => {
  const { handle, title } = product.node
  const { altText, originalSrc, width, height } = product.node.images.edges[0].node
  const minVariantPrice = product.node.priceRange?.minVariantPrice?.amount
  const maxVariantPrice = product.node.priceRange?.maxVariantPrice?.amount
  return (
    <Link
      href={`/products/${handle}`}
    >
      <a className="group">
      <div className="relative w-full aspect-w-1 aspect-h-1 sm:aspect-w-2 sm:aspect-h-3 rounded-lg overflow-hidden">
          <div className="group-hover:opacity-75">
            <Image 
              src={originalSrc}
              alt={altText ? altText : 'Product image'}
              width={width}
              height={height}
              // width={`${width}px`}
              // height={`${height}px`}
              layout="fill"
              className="object-cover"
              // lazy='true'
              priority={priority ? priority : {}}
            />
          </div>
        </div>
        <h3 className="mt-4 text-lg font-medium text-gray-900">{title}</h3>
        <p className="mt-1 text-sm text-gray-700">
          {maxVariantPrice && minVariantPrice !== maxVariantPrice && 'Starting from - '}
          {formatter.format(minVariantPrice)}
        </p>
      </a>
    </Link>
  )
}

export default ProductCard