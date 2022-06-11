
  import { useEffect } from 'react'
  import { motion, useAnimation } from 'framer-motion'

  export const Logo = () => {
    const controls = useAnimation();
    useEffect(() => {
      const timer = setTimeout(() => {
        controls.start("finished");
      }, 1500);
      return () => {
        clearTimeout(timer);
      };
    }, [controls]);
    
    const svgVariants = {
      start: {
        opacity: 0
      },
      finished: {
        opacity: 1,
        transition: {
          duration: 1,
          ease: 'easeInOut'
        },
      }
    }
    
    const pathVariants = {
      finished: (i) => ({
        opacity: 1,
        pathLength: 1,
        transition: {
          duration: 0.5,
          delay: (i = 0 ? 2 : i * 0.2),
          // ease: 'linear'
        },
      }),
      start: {
        opacity: 0,
        pathLength: 0,
      }
    }

    const paths = [
      {
        d: "M4.83333 53.1667L38.6667 19.3333"
      },
      {
        d: "M21.75 36.25L42.2917 36.25"
      },
      {
        d: "M48.9133 29.58C51.6341 26.8592 53.1626 23.169 53.1626 19.3213C53.1626 15.4735 51.6341 11.7833 48.9133 9.06252C46.1925 6.34173 42.5024 4.8132 38.6546 4.8132C34.8068 4.8132 31.1166 6.34173 28.3958 9.06252L12.0833 25.375V45.9167H32.625L48.9133 29.58Z"
      }
    ]
    
    return (
      <div className='w-[60px] h-[60px] md:w-[120px] md:h-[120px]'>
        <motion.svg
          viewBox="0 0 58 58"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          variants={svgVariants}
          initial="start"
          animate="finished"
        >
          {paths.map((item, i) => (
            <motion.path
              key={i}
              d={item.d}
              initial="start"
              custom={i}
              stroke="white"
              strokeWidth="4.83333"
              strokeLinecap="round"
              strokeLinejoin="round"
              animate={controls}
              variants={pathVariants}
            />
          ))}
        </motion.svg>
      </div>
    )
  }
