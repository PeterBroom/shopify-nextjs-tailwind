import Image from 'next/image'
import ProductForm from './ProductForm'
import RecommendedList from './RecommendedList'
import ProductImages from './product-images/ProductImages'

export default function ProductPageContent({ product }) {
  const imageItemsLength = product.images.edges.length
  return (
    <>
    <div className=''>
      <div className='lg:grid lg:grid-cols-2 lg:gap-8 max-w-3xl mx-auto px-4 lg:px-0'>
        <div className="col-span-1 relative mb-10 lg:mb-0 w-full max-w-md mx-auto bg-white overflow-hidden">
          <ProductImages items={product.images.edges} />
        </div>
        <div className={`col-span-1 relative w-full bg-white ${imageItemsLength > 1 ? 'pb-[60px]' : ''}`}>
          <ProductForm product={product} />
        </div>
      </div>
    </div>
    <RecommendedList current={product.id} products={product.collections.edges[0].node.products.edges} />
    </>
    )
}