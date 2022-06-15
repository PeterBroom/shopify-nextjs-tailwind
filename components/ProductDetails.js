import { useState } from 'react'
import BackToProductButton from '@/components/BackToProductButton'
import ProductInfo from '@/components/ProductInfo'
import ProductForm from '@/components/ProductForm'

function ProductDetails({ productData }) {
  const allVariantOptions = productData.variants.edges?.map(variant => {
    const allOptions = {}

    variant.node.selectedOptions.map(item => {
      allOptions[item.name] = item.value
    })

    return {
      id: variant.node.id,
      title: variant.title,
      handle: variant.handle,
      image: variant.node.image?.originalSrc,
      options: allOptions,
      variantTitle: variant.node.title,
      variantPrice: variant.node.price,
      variantQuantity: 1
    }
  })

  const defaultValues = {}
  productData.options.map(item => {
    defaultValues[item.name] = item.values[0]
  })

  const [selectedVariant, setSelectedVariant] = useState(allVariantOptions[0])
  const [selectedOptions, setSelectedOptions] = useState(defaultValues)

  function setOptions(name, value) {
    setSelectedOptions(prevState => {
      return { ...prevState, [name]: value }
    })

    const selection = {
      ...selectedOptions,
      [name]: value
    }

    allVariantOptions.map(item => {
      if (JSON.stringify(item.options) === JSON.stringify(selection)) {
        setSelectedVariant(item)
      }
    })
  }

  return (
    <div className="flex flex-col h-full w-full">
      <ProductInfo 
        title={productData.title}
        description={productData.description}
        quantityAvailable={productData.variants.edges[0].node.quantityAvailable}
        price={selectedVariant.variantPrice}
      />
      <div className='grow'/>
      <ProductForm 
        title={productData.title}
        handle={productData.handle}
        variants={productData.variants.edges} 
        options={productData.options} 
        mainImg={productData.images.edges[0].node}
        quantityAvailable={productData.variants.edges[0].node.quantityAvailable}
        setOptions={setOptions}
        price={selectedVariant.variantPrice}
        allVariantOptions={allVariantOptions}
        selectedOptions={selectedOptions}
        selectedVariant={selectedVariant}
      />
      {/* <BackToProductButton /> */}
    </div>
  )
}

export default ProductDetails
