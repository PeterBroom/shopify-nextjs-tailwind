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

export default function ProductImageThumbs ({items}) {
  // build image map
  let imageMap = []

  items.map((item, index) => {
    const img = {
      key: index,
      url: item.node.originalSrc,
      thumb: item.node.originalSrc,
      width: item.node.width,
      height: item.node.height,
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