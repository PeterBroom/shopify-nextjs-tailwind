import ProductCard from "./ProductCard"


const RecommendedList = ({ products, current }) => {
  return (
    <div className="mt-20 bg-white border-solid border-gray-200 border-slate-200 border-y ">
      <div className="max-w-2xl mx-auto py-20 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-extrabold text-gray-900 mb-6">
          Recommended Products
        </h2>
        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {
            products.map(product => (
              product.node.id === current ? null : <ProductCard key={product.node.id} product={product} />
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default RecommendedList