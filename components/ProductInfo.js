import Price from '@/components/Price'

function ProductInfo({ title, description, price, quantityAvailable }) {
  return (
    <>
      <h1 className="mb-3 text-2xl font-bold">
        {title}
      </h1>
      <span className='pb-3'>
      <Price
        currency="£"
        num={price}
      />
      </span>
      <p className="text-sm">
        {description}
      </p>

      <div className="text-sm text-gray-500 py-2 mb-3">
        {quantityAvailable && quantityAvailable <= 10 &&
          <p>{quantityAvailable} Available</p>
        }
        {quantityAvailable === 0 &&
          <p>None available</p>
        }
      </div>

    </>
  )
}

export default ProductInfo
