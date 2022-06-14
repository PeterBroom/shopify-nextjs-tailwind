import { useState } from 'react'
import Image from 'next/image'
import ProductForm from './ProductForm'
import RecommendedList from './RecommendedList'
import ProductImages from './product-images/ProductImages'
// import ProductImageThumbs from './product-images/ProductImageThumbs'

import ProductDetails from './ProductDetails'
export default function ProductPageContent({ productData }) {
  const imageItemsLength = productData.images.edges.length
  return (
    <>
    <div className=''>
      <div className='md:grid md:grid-cols-2 md:gap-8 max-w-3xl mx-auto px-4 lg:px-0'>
        <div className="col-span-1 relative mb-10 lg:mb-0 w-full max-w-md mx-auto bg-white overflow-hidden">
          <ProductImages items={productData.images.edges} />
        </div>
        <div className={`col-span-1 relative w-full bg-white ${imageItemsLength > 1 ? 'pb-[60px]' : ''}`}>
          <ProductDetails productData={productData} />
        </div>
      </div>
    </div>
    <RecommendedList current={productData.id} productData={productData.collections.edges[0].node.products.edges} />
    </>
    )
}