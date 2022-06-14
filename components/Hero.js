import { useEffect } from 'react'
import Image from 'next/image'
import { motion, useAnimation } from 'framer-motion'
import { Logo } from './Logo'

export default function Hero() {
  const controls = useAnimation();

  useEffect(() => {
    controls.start((i) => ({
      opacity: [0,1],
      transition: {
        duration: 2,
        delay: i * 0.8
      }
    }));
  }, [controls]);

  return (
    <div className="relative bg-white overflow-hidden">
      <div className="absolute inset-0 after:content-[''] after:bg-slate-900/70 after:h-full after:w-full after:absolute">
        <Image
          className="h-full w-full object-cover"
          src="https://tailwindui.com/img/ecommerce-images/product-feature-02-full-width.jpg"
          alt="Hero image"
          // width={1358}
          // height={800}
          layout="fill"
          priority
        />
      </div>

      <div className="relative min-h-[500px] md:min-h-[500px] max-w-screen-xl px-4 mx-auto flex items-center justify-center">
        <div className='h-full flex items-center justify-center'>
          <div className='h-full mr-5 md:mr-10'>
            <Logo />
            </div>

          <h1 className="md:py-10 tracking-wide font-extrabold drop-shadow-xl">
            <motion.span 
              className="block will-change-[opacity] text-white text-2xl sm:text-5xl md:text-6xl mb-1 md:mb-4"
              custom={0}
              animate={controls}
            >Quill Stationary</motion.span>{" "}
            <motion.span
              className="block will-change-[opacity] text-slate-300 text-1xl sm:text-4xl md:text-4xl"
              custom={1} 
              animate={controls}
            >
              With NextJs and Tailwind
            </motion.span>
          </h1>
        </div>

      </div>
    </div>
  );
}
