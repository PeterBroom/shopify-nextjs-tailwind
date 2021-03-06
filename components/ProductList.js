
import ProductCard from "./ProductCard"

function ProductList({ products }) {
  products.sort((a, b) => {
    const titleA = a.node.title.toUpperCase()
    const titleB = b.node.title.toUpperCase()
    if (titleA < titleB) {
      return -1
    }
    if (titleA > titleB) {
      return 1
    }
    return 0
  })

  return (
    <div className="bg-white">
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-extrabold text-gray-900 mb-6">
          Products
        </h2>
          <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:gap-x-8">
          {
            products.map((product, i) => (
              <ProductCard key={product.node.id} product={product} priority={i === 0 ? true : false} />
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default ProductList
