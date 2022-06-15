import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { wrap } from 'popmotion';

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

export default function ProductImageItems ({items}) {
  // build image map
  let imageMap = []

  items.map((item, index) => {
    const altText = item.node.altText ? item.node.altText : 'Product image'
    const img = {
      key: index,
      url: item.node.originalSrc,
      thumb: item.node.originalSrc,
      width: item.node.width,
      height: item.node.height,
      altText: altText
    }
    imageMap.push(img)
  })
  const [[page, direction], setPage] = useState([0, 0]);
  const imageIndex = wrap(0, imageMap.length, page);

  const goTo = (index) => {
    setPage([index, direction]);
  };

  return (
    <div className='relative h-full'>
        <div className='relative w-full h-96 md:h-[30rem] rounded-lg flex flex-row flex-nowrap items-center justify-center overflow-hidden'>
            <AnimatePresence initial={false}>
              <motion.div
                className=''
                key={page}
                variants={container}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  opacity: { duration: 0.5 }
                }}
              >

                <Image
                    className='object-cover'
                    src={imageMap[imageIndex].url}
                    width={imageMap[imageIndex].width}
                    height={imageMap[imageIndex].height}
                    alt={imageMap[imageIndex].altText}
                    priority
                />
              </motion.div>
            </AnimatePresence>
        </div>
        {imageMap.length > 1 &&
        <div className='flex flex-row justify-center mt-4 gap-3'>
          {imageMap.map((item) => {
              return (
                <div
                  key={item.key}
                  className={`relative w-[44px] h-[44px] border transform-all cursor-pointer${item.key == imageIndex ? ' border-none' : ' border-white'}`}
                  onClick={() => goTo(item.key)}
                >
                  <Image
                    src={item.thumb}
                    className='object-cover h-auto'
                    width={44}
                    height={44}
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