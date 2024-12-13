"use client"

import { useState, useEffect, } from 'react'
import Link from 'next/link'
import { Moon, Sun, Github, Mail, Twitter, LinkIcon, } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectLabel,
} from "@/components/ui/select"
import { Label } from "@radix-ui/react-label";

export default function Header(props: { locale: string }) {
  const [darkMode, setDarkMode] = useState(false)

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

  return(
    <header className="sticky top-0 z-10 w-full border-b border-border/40 bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-8 py-4 flex items-center justify-between">
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
          {/* <Select>
            <SelectTrigger className="w-[90px]">
              <SelectValue placeholder="English" />
            </SelectTrigger>
            <SelectContent >
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="zh">中文</SelectItem>
            </SelectContent>
          </Select> */}
        </nav>
      </div>
    </header>
  )
}
