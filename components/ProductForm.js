import { useState, useEffect } from 'react'
import { PlusIcon } from '@heroicons/react/solid'
import { MinusIcon } from '@heroicons/react/solid'
import { useAddToCartContext } from '@/context/Store'
import ProductOptions from './ProductOptions'

function ProductForm({title, handle, variants, price, setVariantPrice, selectedOptions, setOptions, setSelectedOptions, selectedVariant, allVariantOptions, quantityAvailable, options, mainImg}) {
  const [quantity, setQuantity] = useState(1)
  const [variant, setVariant] = useState(variants[0])
  const addToCart = useAddToCartContext()
  
  async function handleAddToCart() {

    if (quantity !== '') {
      addToCart({
        productTitle: title,
        productHandle: handle,
        productImage: mainImg,
        variantId: selectedVariant.id,
        variantPrice: price,
        variantTitle: selectedVariant.variantTitle,
        variantQuantity: quantity,
        quantityAvailable: variant.node.quantityAvailable
      })
    }
  }

  function updateQuantity(e) {
      if (e === 0) {
        return
      }

      if (e > Math.floor(quantityAvailable)) {
        return
      }

      if (e === '') {
        setQuantity('')
      } else {
        setQuantity(Math.floor(e))
      }
  }

  return (
    <div className="w-full h-full flex flex-col">
      <div className='grow'/>
        <div className="md:max-w-[40%] md:max-w-full flex flex-col">
          {options[0].values[0] !== 'Default Title' && options.map(({ name, values }) => (
            <ProductOptions
              key={`key-${name}`}
              name={name}
              values={values}
              selectedOptions={selectedOptions}
              setOptions={setOptions}
              selectedVariant={setVariantPrice}
              setSelectedOptions={setSelectedOptions}
              setVariant={setVariant}
              variants={allVariantOptions}
              available={quantityAvailable}
            />
          ))}
      </div>

      <div className="flex justify-start space-x-2 w-full my-4">
        <div className="flex-1 flex flex-row items-center justify-start text-sm">
          <p className='mr-4'>Quantity</p>
          <div className="flex text-gray-500 flex h-[2rem] justify-center items-center border divide-x divide-solid">
            <button 
              className='flex items-center justify-center transition-all rounded-sm text-black py-1 px-2'
              onClick={() => updateQuantity(quantity-1)}
            ><MinusIcon className='h-3 w-3' /></button>
            <div className='grow-1'>
              <label className="text-gray-500 text-sm sr-only">Qty.</label>
              <input
                type="text"
                inputMode="numeric"
                id="quantity"
                name="quantity"
                min="1"
                max={quantityAvailable}
                step="1"
                value={quantity}
                onChange={(e) => updateQuantity(e.target.value)}
                className="appearance-none max-w-[2rem] text-center text-sm m-0 p-0 text-gray-900 border-0 line-height-0 max-w-10 focus:ring-0"
              />
            </div>
            <button 
              className='flex items-center justify-center transition-all rounded-sm text-black py-1 px-2'
              onClick={() => updateQuantity(quantity+1)}
            ><PlusIcon className='h-3 w-3' /></button>
          </div>
        </div>
      </div>

      <button
        className="bg-black rounded-md text-white px-4 py-3 mt-3 hover:bg-gray-800"
        aria-label="cart-button"
        onClick={handleAddToCart}
      >
        Add to cart
      </button>
    </div>
  )
}

export default ProductForm
