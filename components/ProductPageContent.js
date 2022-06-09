import Image from 'next/image'
import ProductForm from './ProductForm'
import RecommendedList from './RecommendedList'
import CarouselComponent from './carousel/CarouselComponent'

export default function ProductPageContent({ product }) {
  const imageItemsLength = product.images.edges.length
  return (
    <>
    <div className=''>
      <div className='grid grid-cols-2 gap-8 max-w-3xl mx-auto'>
        <div className="col-span-1 relative w-full max-w-md bg-white overflow-hidden">
          <CarouselComponent carouselItems={product.images.edges} />
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