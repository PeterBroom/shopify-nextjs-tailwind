import { useState, useEffect, useContext } from "react"
import { formatter } from '../utils/helpers'
import ProductOptions from "./ProductOptions"
import { CartContext } from "../context/shopContext"
import axios from "axios"
import useSWR from 'swr'

// setup inventory fetcher
const fetchInventory = (url, id) =>
  axios
    .get(url, {
      params: {
        id: id,
      },
    })
    .then((res) => res.data)

export default function ProductForm({ product }) {
  const { data: productInventory } = useSWR(
    ['/api/available', product.handle],
    (url, id) => fetchInventory(url, id),
    { errorRetryCount: 3 }
  )

  const { data: productQuantity } = useSWR(
    ['/api/quantity', product.handle],
    (url, id) => fetchInventory(url, id),
    { errorRetryCount: 3 }
  )

  const [available, setAvailable] = useState(true)
  const [quantity, setQuantity] = useState(0)

  const { addToCart } = useContext(CartContext)

  const allVariantOptions = product.variants.edges?.map(variant => {
    const allOptions = {}

    variant.node.selectedOptions.map(item => {
      allOptions[item.name] = item.value
    })
    // console.log('variant', variant)

    return {
      id: variant.node.id,
      title: product.title,
      handle: product.handle,
      image: variant.node.image?.originalSrc,
      options: allOptions,
      variantTitle: variant.node.title,
      variantPrice: variant.node.priceV2.amount,
      variantQuantity: variant.node.quantityAvailable
    }
  })

  const defaultValues = {}
  product.options.map(item => {
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

  useEffect(() => {
    if (productInventory) {
      const checkAvailable = productInventory?.variants.edges.filter(item => item.node.id === selectedVariant.id)

      if (checkAvailable[0].node.availableForSale) {
        setAvailable(true)
      } else {
        setAvailable(false)
      }
    }
  }, [productInventory, selectedVariant])


  useEffect(() => {
    if (productQuantity) {
      const checkQuantity = productQuantity?.variants.edges.filter(item => item.node.id === selectedVariant.id)
      if (checkQuantity[0].node.quantityAvailable) {
        setQuantity(checkQuantity[0].node.quantityAvailable)
      } else {
        setQuantity(0)
      }
    }
  }, [productQuantity, selectedVariant])

  const [inventoryLoaded, setInventoryLoaded] = useState(false)
  useEffect(() => {
    if (productInventory) {
      setInventoryLoaded(true)
    }
  }, [productInventory])

  return (
    <div className="rounded-2xl p-4 shadow-lg flex flex-col w-full md:w-1/3">
      <h2 className="mb-3 text-2xl font-bold">{product.title}</h2>
      <span className="pb-3">{formatter.format(selectedVariant.variantPrice)}</span>
      {
        product.options[0].values[0] !== 'Default Title' &&
        product.options.map(({ name, values }) => (
          <ProductOptions
            key={`key-${name}`}
            name={name}
            values={values}
            selectedOptions={selectedOptions}
            setOptions={setOptions}
            selectedVariant={selectedVariant}
            productInventory={productInventory}
            available={available}
          />
        ))
      }
      <div className={`flex flex-col transition-opacity delay-300 ease-in ${inventoryLoaded === true ? 'opacity-1' : 'opacity-0'}`}>
        <div  className="text-sm text-gray-500 py-2 mb-3">
        {quantity ? 
          <p>{quantity} Available</p>
              :
          <p>None available</p>
          }
        </div>

        {
          available && quantity ?
            <button
              onClick={() => {
                addToCart(selectedVariant)
              }}
              className="bg-black rounded-lg text-white px-2 py-3 mt-3 hover:bg-gray-800">Add To Card
            </button> :
            <button
              className="rounded-lg text-white px-2 py-3 mt-3 bg-rose-800 cursor-not-allowed">
                Sold out!
            </button>
        }
        </div>
    </div>
  )
}