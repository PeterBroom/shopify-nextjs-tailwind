import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { wrap } from 'popmotion';
import styles from './Carousel.module.css'

const container = {
  enter: () => {
    return {
      opacity: 0
    };
  },
  center: {
    zIndex: 1,
    opacity: 1
  },
  exit: () => {
    return {
      zIndex: 0,
      opacity: 0
    };
  }
};

export default function Carousel ({carouselItems}) {
  // build image map
  let imageMap = []

  // let isMobile = window.matchMedia("(max-width: 700px)").matches;

  // const thumbDimensions = isMobile ? 30 : 60

  // const maxWidth = (carouselItems.carouselArray.length * (thumbDimensions + 24))

  carouselItems.map((item, index) => {
    const img = {
      key: index,
      url: item.node.originalSrc,
      thumb: item.node.originalSrc,
      width: 1920,
      height: 1080,
    }
    imageMap.push(img)
  })

  const [[page, direction], setPage] = useState([0, 0]);
  const imageIndex = wrap(0, imageMap.length, page);

  const goTo = (index) => {
    setPage([index, direction]);
  };

  return (
    <div className='h-full'>
        <div className='relative h-96 md:h-[30rem] rounded-lg flex flex-row flex-nowrap items-center justify-center overflow-hidden'>
            <AnimatePresence initial={false}>
            <motion.img
                className='absolute top-50 -translate-y-50 object-cover'
                src={imageMap[imageIndex].url}
                key={page}
                variants={container}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  opacity: { duration: 0.5 }
                }}
                layout='fill'
                alt={imageMap[imageIndex].alt}
            />
            </AnimatePresence>
        </div>
        {imageMap.length > 1 &&
        <div className='flex flex-row justify-center mt-4 gap-3'>
          {imageMap.map((item) => {
              return (
                <div
                  key={item.key}
                  className={`w-[44px] h-[44px] border transform-all cursor-pointer${item.key == imageIndex ? ' border-none' : ' border-white'}`}
                  onClick={() => goTo(item.key)}
                >
                  <Image
                    src={item.thumb}
                    className='object-cover h-auto'
                    width='44px'
                    height='44px'
                    alt=''
                  />
                </div>
            )})
          }
        </div>
        }
    </div>
  )
}