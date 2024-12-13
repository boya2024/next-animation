"use client"

import { useState, useEffect, useRef, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useAnimation, useInView } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import './index.css'

const skills = [
  "React", "Next.js", "Node.js", "TypeScript", "GraphQL", 
  "AWS", "Docker", "PostgreSQL", "MongoDB", "Redis",
  "React", "Next.js", "Node.js", "TypeScript", "GraphQL", 
  "AWS", "Docker", "PostgreSQL", "MongoDB", "Redis"
]

export default function MotionPage() {
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <section className="flex flex-col gap-6 py-8 text-center my-80">
        <motion.h1 
          className="text-3xl font-medium sm:text-4xl md:text-5xl lg:text-6xl"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.3,
            delay: 0.2,
            ease: [0, 0.71, 0.2, 1.01],
            type: "spring",
            stiffness:300,
          }}
          >
          Hello and Welcome to 
          <span className="whitespace-nowrap bg-gradient-to-r from-[#ff4ea3] to-[#ff5e5b] bg-clip-text font-semibold text-transparent">Dev Palma</span>
        </motion.h1>
        <p className="text-balance text-center text-muted-foreground sm:text-xl">Built using Nextjs 14, shadcn and tailwind.</p>
      </section>
      <div className='flex flex-row items-center justify-center flex-direction-row  gap-4'>
        <motion.span className=''
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.3,
            delay: 0.2,
            ease: [0, 0.71, 0.2, 1.01],
            type: "spring",
            stiffness:300,
          }}
        >hello</motion.span>
        <motion.span
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.3,
            delay: 0.2,
            ease: [0, 0.71, 0.2, 1.01],
            type: "spring",
            stiffness:300,
          }}
        >world</motion.span>
      </div>
      <div className='flex flex-row items-center justify-center flex-direction-row  gap-4'>
        <motion.span 
          initial={{ opacity: 0,y:60 }}
          animate={{ opacity: 1,y: 0, transition: { duration: 0.5, delay:0.5,type: "spring",stiffness:80, } }}>hello</motion.span>
        <motion.span 
        initial={{ opacity: 0,y:60 }}
        animate={{ opacity: 1,y: 0, transition: { duration: 0.5, delay:0.8,type: "spring",stiffness:80,   } }}>my</motion.span>
        <motion.span 
        initial={{ opacity: 0,y:60 }}
        animate={{ opacity: 1,y: 0, transition: { duration: 0.5, delay:1,type: "spring",stiffness:80,  } }}>best</motion.span>
        <motion.span 
        initial={{ opacity: 0,y:60 }}
        animate={{ opacity: 1,y: 0, transition: { duration: 0.5, delay:1.2 ,type: "spring",stiffness:80 } }}>friend</motion.span>
      </div>

      <section>
          <h2 className="text-2xl font-bold mb-4">Skills</h2>
          <motion.div 
            className="flex flex-wrap gap-2"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
            initial="hidden"
            animate="visible"
          >
            {skills.map((skill, index) => (
              <motion.div
                key={`${skill}-${index}`}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
              >
                <Badge variant="secondary" className="text-sm">
                  {skill}
                </Badge>
              </motion.div>
            ))}
          </motion.div>
        </section>
      
      </div>
  )
}
