'use client'

import { motion, useAnimation, Variants } from 'framer-motion'
import { useEffect, useState } from 'react'

const AnimatedText = ({ text, delay = 0 }: { text: string; delay?: number }) => {
  const controls = useAnimation()

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.03,
        delayChildren: delay,
      },
    },
    unblur: {
      transition: {
        staggerChildren: 0.03,
        delayChildren: 0.1 + delay,
      },
    },
  } 

  const letterVariants: Variants = {
    hidden: { opacity: 0, x: -20, filter: 'blur(5px)' },
    visible: {
      opacity: 1,
      x: 0,
      filter: 'blur(5px)',
      transition: { duration: 0.1 },
    },
    unblur: {
      filter: 'blur(0px)',
      transition: { duration: 0.1 },
    },
  }

  useEffect(() => {
    const animate = async () => {
      await controls.start('visible')
      await controls.start('unblur')
    }
    animate()
  }, [controls])

  return (
    <motion.span
      variants={containerVariants}
      initial="hidden"
      animate={controls}
      className="inline-block"
    >
      {text.split('').map((char, index) => (
        <motion.span
          key={index}
          variants={letterVariants}
          className="inline-block"
          style={{ whiteSpace: 'pre' }}
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  )
}

export default function Component() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <nav className="p-4 flex justify-between items-center">
        <span className="text-sm text-gray-400">Asia/Jakarta</span>
        <div className="flex gap-6">
          {['Home', 'About', 'Work', 'Blog', 'Gallery'].map((item) => (
            <button
              key={item}
              className="text-sm px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              {item}
            </button>
          ))}
        </div>
        <span className="text-sm text-gray-400">10:07:01</span>
      </nav>

      <main className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-5xl md:text-7xl font-bold flex flex-col gap-2">
            <AnimatedText text="Design engineer" />
            <AnimatedText text="and builder"  delay={0.1} />
          </h1>
        </div>
      </main>
    </div>
  )
}