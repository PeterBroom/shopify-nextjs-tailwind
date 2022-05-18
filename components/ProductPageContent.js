import Image from 'next/image'
import ProductForm from './ProductForm'
import RecommendedList from './RecommendedList'

export default function ProductPageContent({ product }) {
  
  const images = []

  product.images.edges.map((image, i) => {
    images.push(
      <div key={`slide-${i}`}>
        <Image src={image.node.originalSrc} alt={image.node.altText} layout="fill" objectFit="cover" />
      </div>
    )
  })

//   SwiperCore.use([Navigation, Pagination])

  return (
    <div>
      <div className="flex flex-col justify-center items-center space-y-8 md:flex-row md:items-start md:space-y-0 md:space-x-4 lg:space-x-8 max-w-6xl w-11/12 mx-auto">
        <div className="w-full max-w-md border bg-white rounded-2xl overflow-hidden shadow-lg md:w-1/2">
          <div className="relative h-96 w-full">
            <div
              className="h-96 rounded-2xl"
            >
              {images}
            </div>
          </div>
        </div>
        <ProductForm product={product} />
      </div>
      <p className="pt-16 lg:px-5 space-y-8 md:space-x-4 lg:space-x-8 max-w-4xl w-11/12 mx-auto">{product.description}</p>
      <RecommendedList current={product.id} products={product.collections.edges[0].node.products.edges} />
    </div>
  )
}