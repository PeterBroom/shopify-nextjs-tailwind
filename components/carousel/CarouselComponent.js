import Carousel from './Carousel'

export default function CarouselComponent ({carouselItems}) {
  return (
    <div className='relative h-full'>
      <Carousel carouselItems={carouselItems} />
    </div>
  )
}