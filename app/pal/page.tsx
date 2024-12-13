"use client"

import { useState, useEffect, useRef, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useAnimation, useInView } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import Nav from './nav';
import Header from './Header';
import Background from './Backgroud';
import { useRouter } from 'next/compat/router';
import { Heading, Flex, Text, Button,  Avatar, RevealFx, Arrow } from '@/components/once-ui/components';
import PostList from './PostList';


export default function PalPage() {

  const [locale, setLocale] = useState('en');
  const router = useRouter();

  useEffect(() => {
    if (router && router.locale) {
      setLocale(router.locale);
    }
  }, [router])

  return (
    <div className="overflow-x-hidden">
      <RevealFx ><Header locale={locale}/></RevealFx>
      <main className="relative flex min-h-dvh flex-col border-b border-border/40">
        <div className="container flex-1">
          <div className="space-y-16 py-16 md:space-y-20 md:py-20 lg:space-y-24 lg:py-24">
            <section className="flex flex-col gap-6 py-8 text-center">
              <RevealFx >
                <h1 
                  className="text-3xl font-medium sm:text-4xl md:text-5xl lg:text-6xl">
                    Hello and Welcome to 
                  <span className="whitespace-nowrap bg-gradient-to-r from-[#ff4ea3] to-[#ff5e5b] bg-clip-text font-semibold text-transparent">Dev Palma</span>
                </h1>
              </RevealFx>
              <RevealFx delay={0.1}>
                <p className="text-balance text-center text-muted-foreground sm:text-xl">Built using Nextjs 14, shadcn and tailwind.</p>
              </RevealFx>
            </section>
            <PostList  />
          </div>
        </div>
      </main>
      <Background />
      <Nav />
    </div>
  )
}
