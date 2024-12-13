'use client'

import { useEffect, useRef, useState } from "react"
import { motion, useAnimation, useInView } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Github, Mail, Twitter, LinkIcon, Moon, Sun, } from 'lucide-react'
import Link from "next/link"
import Image from "next/image"

function Section({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const controls = useAnimation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [isInView, controls])

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default function Component() {

  const [darkMode, setDarkMode] = useState(false)

  const skills = [
    "React", "Next.js", "Node.js", "TypeScript", "GraphQL", 
    "AWS", "Docker", "PostgreSQL", "MongoDB", "Redis"
  ]

  const workExperience = () => {
    var list = []
    for(var i = 0; i < 16; i++){
      list.push({
        company: `Tech Company ${i}`,
        role: "Senior Finance",
        period: "May 2022 - Jan 2024",
        logo: <LinkIcon/>
      })
    }
    return list
  }

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-10 w-full border-b border-border/40 bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            {/* <Image src="/placeholder.svg" alt="Dev Palma Logo" width={32} height={32} /> */}
            <span className="text-xl font-bold text-gray-900 dark:text-white">Dev Palma</span>
          </Link>
          <nav className="flex items-center space-x-4">
            <Link href="/about" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
              About
            </Link>
            <button 
              onClick={toggleDarkMode} 
              className="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              <span className="sr-only">Toggle theme</span>
            </button>
            <Link href="https://github.com" className="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </Link>
            <select className="bg-transparent text-gray-600 dark:text-gray-300 border-none">
              <option value="en">En</option>
              <option value="es">Es</option>
            </select>
          </nav>
        </div>
      </header>
      <div className="max-w-3xl mx-auto space-y-12">
        <Section className="flex justify-between items-start">
          <div>
            <motion.h1 
              className="text-4xl font-bold mb-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              Hi, 我叫 Sam{" "}
              <motion.span
                initial={{ opacity: 0, rotate: -45 }}
                animate={{ opacity: 1, rotate: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="inline-block"
              >
                👋
              </motion.span>
            </motion.h1>
            <motion.p
              className="text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              👨‍💻 擅长唱跳RAP篮球, 练习时长两年半, 包括但不限于姬霓太美 🔗
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Image
              src="/placeholder.svg"
              alt="Avatar"
              width={120}
              height={120}
              className="rounded-full"
            />
          </motion.div>
        </Section>

        <Section>
          <h2 className="text-2xl font-bold mb-4">About</h2>
          <p className="text-muted-foreground">
            Lorem ipsum dolor sit amet consectetur aditur Lorem ipsum dolor sit amet consectetur aditur 
            Lorem ipsum dolor sit amet consectetur aditur Lorem ipsum dolor sit amet consectetur aditur 
          </p>
        </Section>

        <Section>
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
                key={skill}
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
        </Section>

        <Section>
          <h2 className="text-2xl font-bold mb-6">Work Experience</h2>
          <div className="space-y-6">
            {workExperience().map((work, index) => (
              <motion.div
                key={work.company}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <Card className="p-4">
                  <div className="flex items-center gap-4">
                    <Image
                      src={"/placeholder.svg"}
                      alt={work.company}
                      width={48}
                      height={48}
                      className="rounded-full"
                    />
                    <div>
                      <h3 className="font-semibold">{work.company}</h3>
                      <p className="text-sm text-muted-foreground">{work.role}</p>
                      <p className="text-sm text-muted-foreground">{work.period}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </Section>

        <Section>
          <div className="flex justify-center gap-4">
            {[
              { icon: Github, href: "#" },
              { icon: Twitter, href: "#" },
              { icon: Mail, href: "#" },
              { icon: LinkIcon, href: "#" },
              { icon: Sun, href: "#" }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={item.href}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <item.icon className="w-5 h-5" />
                </Link>
              </motion.div>
            ))}
          </div>
        </Section>
      </div>
      <div className="absolute inset-x-0 top-[10rem] -z-10 transform-gpu blur-3xl sm:top-[5rem]" aria-hidden="true">
        <div className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-3/4 bg-gradient-to-tr from-[#80a2ff] to-[#9089fc] opacity-30 sm:left-[calc(50%+13rem)] sm:w-[72.1875rem]" 
          style={{clipPath: "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"}}>
        </div>
      </div>
      
      {/* 导航条 */}
      <motion.div className="pointer-events-none fixed inset-x-0 bottom-0 z-30 mx-auto mb-4 flex origin-bottom h-full max-h-14">
        <div className="fixed bottom-0 inset-x-0 h-16 w-full bg-background to-transparent backdrop-blur-lg [-webkit-mask-image:linear-gradient(to_top,black,transparent)] dark:bg-background"></div>
      </motion.div>

    </div>
  )
}