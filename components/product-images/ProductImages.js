import ProductImageItems from './ProductImageItems'

export default function ProductImages ({items}) {
  return (
    <div className='relative h-full'>
      <ProductImageItems items={items} />
    </div>
  )
}