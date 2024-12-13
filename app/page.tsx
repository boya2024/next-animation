'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { motion,useAnimation } from "framer-motion"
import { useState,useRef,useEffect } from "react"
import { Menu, X } from 'lucide-react'
import { useInView } from 'react-intersection-observer';
import { SVGProps } from 'react';

export default function Component() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  
  const FeaturesRef = useRef(null);
  const TestimonialsRef = useRef(null);
  const PricingRef = useRef(null);
  const ContactRef = useRef(null);
  
  const controls = useAnimation();
  const [refInView, inView] = useInView();

  useEffect(() => {
    if (inView) {
      controls.start({
        y: 0,
        opacity: 1,
        transition: { duration: 0.5 },
      });
    }
  }, [controls, inView]);

  const scrollToAnchor = (ref: React.RefObject<HTMLElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  }


  return (
    <div className="flex flex-col min-h-screen">
            <header className="px-4 lg:px-6 h-14 flex items-center sticky top-0 bg-white z-50 shadow-md">
        <Link className="flex items-center justify-center" href="#">
          <MountainIcon className="h-6 w-6 text-blue-600" />
          <span className="ml-2 text-xl font-bold text-blue-600">TechNet Accelerator</span>
        </Link>
        <nav className="ml-auto hidden md:flex gap-4 sm:gap-6">
          <div className="cursor-pointer text-sm font-medium hover:text-blue-600 transition-colors"  onClick={() => scrollToAnchor(FeaturesRef)}>
            Features
          </div>
          <div className="cursor-pointer text-sm font-medium hover:text-blue-600 transition-colors" onClick={() => scrollToAnchor(TestimonialsRef)}>
            Testimonials
          </div>
          <div className="cursor-pointer text-sm font-medium hover:text-blue-600 transition-colors"  onClick={() => scrollToAnchor(PricingRef)}>
            Pricing
          </div>
          <div className="cursor-pointer text-sm font-medium hover:text-blue-600 transition-colors"  onClick={() => scrollToAnchor(ContactRef)}>
            Contact
          </div>
        </nav>
        <Button
          className="ml-auto md:hidden"
          variant="ghost"
          size="icon"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </header>
      {isMobileMenuOpen && (
        <motion.div
          className="md:hidden bg-white shadow-md sticky top-[50px] z-50"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <nav className="flex flex-col p-4">
            <div
              className="cursor-pointer text-sm font-medium hover:text-blue-600 transition-colors py-2"
              onClick={() => {setIsMobileMenuOpen(false); scrollToAnchor(FeaturesRef)}}
            >
              Features
            </div>
            <div
              className="cursor-pointertext-sm font-medium hover:text-blue-600 transition-colors py-2"
              onClick={() => {setIsMobileMenuOpen(false); scrollToAnchor(TestimonialsRef)}}
            >
              Testimonials
            </div>
            <div
              className="cursor-pointer text-sm font-medium hover:text-blue-600 transition-colors py-2"
              onClick={() => {setIsMobileMenuOpen(false); scrollToAnchor(PricingRef)}}
            >
              Pricing
            </div>
            <div
              className="cursor-pointer text-sm font-medium hover:text-blue-600 transition-colors py-2"
              onClick={() => {setIsMobileMenuOpen(false); scrollToAnchor(ContactRef)}}
            >
              Contact
            </div>
          </nav>
        </motion.div>
      )}
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-r from-blue-600 to-blue-800">
          <motion.div
            className="container px-4 md:px-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-white">
                  Accelerate Your Global Network
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-200 md:text-xl">
                  Empower your overseas enterprise with lightning-fast, reliable network solutions.
                </p>
              </div>
              <div className="space-x-4">
                <Button className="bg-white text-blue-600 hover:bg-gray-100">Get Started</Button>
                <Button variant="outline" className="text-white border-white hover:bg-white/10">
                  Learn More
                </Button>
              </div>
            </div>
          </motion.div>
        </section>
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
          <motion.div
            className="container px-4 md:px-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 text-blue-800">
              Why Choose Us?
            </h2>
            <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
              <motion.div variants={itemVariants} className="flex flex-col items-center space-y-2 border-gray-200 p-4 rounded-lg bg-white shadow-md">
                <RocketIcon className="h-10 w-10 text-blue-600" />
                <h3 className="text-xl font-bold text-blue-800">Lightning Speed</h3>
                <p className="text-gray-600 text-center">Experience unparalleled network acceleration for your global operations.</p>
              </motion.div>
              <motion.div variants={itemVariants} className="flex flex-col items-center space-y-2 border-gray-200 p-4 rounded-lg bg-white shadow-md">
                <ShieldCheckIcon className="h-10 w-10 text-blue-600" />
                <h3 className="text-xl font-bold text-blue-800">Enhanced Security</h3>
                <p className="text-gray-600 text-center">Protect your data with our advanced security protocols and encryption.</p>
              </motion.div>
              <motion.div variants={itemVariants} className="flex flex-col items-center space-y-2 border-gray-200 p-4 rounded-lg bg-white shadow-md">
                <GlobeIcon className="h-10 w-10 text-blue-600" />
                <h3 className="text-xl font-bold text-blue-800">Global Reach</h3>
                <p className="text-gray-600 text-center">Connect seamlessly across continents with our extensive network infrastructure.</p>
              </motion.div>
            </div>
          </motion.div>
        </section>
        <section id="how-it-works" ref={FeaturesRef} className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 text-blue-800">
              How It Works
            </h2>
            <motion.div
              // initial={{ y: 1000, opacity: 0 }}
              animate={controls}
              className="grid gap-10 md:grid-cols-2 lg:grid-cols-3"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <motion.div variants={itemVariants} className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-blue-600">1</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Connect</h3>
                <p className="text-gray-600">Integrate our solution with your existing network infrastructure.</p>
              </motion.div>
              <motion.div variants={itemVariants} className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-blue-600">2</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Optimize</h3>
                <p className="text-gray-600">Our AI-powered system continuously optimizes your network performance.</p>
              </motion.div>
              <motion.div variants={itemVariants} className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-blue-600">3</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Accelerate</h3>
                <p className="text-gray-600">Experience dramatically improved network speeds and reliability.</p>
              </motion.div>
            </motion.div>
          </div>
        </section>
        <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 text-blue-800">
              What Our Clients Say
            </h2>
            <motion.div
              ref={TestimonialsRef}
              className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <motion.div variants={itemVariants}>
                <Card>
                  <CardHeader>
                    <CardTitle>Amazing Speed Boost</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">"Our global team's productivity skyrocketed after implementing TechNet Accelerator. The difference in speed is night and day."</p>
                    <p className="mt-2 font-semibold">- Sarah J., CTO at GlobalTech</p>
                  </CardContent>
                </Card>
              </motion.div>
              <motion.div variants={itemVariants}>
                <Card>
                  <CardHeader>
                    <CardTitle>Reliable and Secure</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">"We've seen a significant reduction in downtime and security threats. TechNet Accelerator has been a game-changer for our operations."</p>
                    <p className="mt-2 font-semibold">- Michael L., Head of IT at SecureNet</p>
                  </CardContent>
                </Card>
              </motion.div>
              <motion.div variants={itemVariants}>
                <Card>
                  <CardHeader>
                    <CardTitle>Exceptional Support</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">"The customer support team at TechNet Accelerator is top-notch. They're always there to help, no matter the time zone."</p>
                    <p className="mt-2 font-semibold">- Elena R., Operations Manager at WorldWide Inc.</p>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </section>
        <section id="pricing" className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 text-blue-800">
              Flexible Pricing Plans
            </h2>
            <motion.div
              ref={PricingRef}
              className="grid gap-8 md:grid-cols-3"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <motion.div variants={itemVariants}>
                <Card className="flex flex-col h-full">
                  <CardHeader>
                    <CardTitle>Starter</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-4xl font-bold mb-2">$99<span className="text-lg font-normal">/month</span></p>
                    <ul className="space-y-2 mb-4">
                      <li>Up to 100 Mbps acceleration</li>
                      <li>5 global locations</li>
                      <li>24/7 email support</li>
                    </ul>
                    <Button className="w-full">Get Started</Button>
                  </CardContent>
                </Card>
              </motion.div>
              <motion.div variants={itemVariants}>
                <Card className="flex flex-col h-full border-blue-600">
                  <CardHeader className="bg-blue-600 text-white">
                    <CardTitle>Professional</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-4xl font-bold mb-2">$299<span className="text-lg font-normal">/month</span></p>
                    <ul className="space-y-2 mb-4">
                      <li>Up to 500 Mbps acceleration</li>
                      <li>15 global locations</li>
                      <li>24/7 priority support</li>
                      <li>Advanced security features</li>
                    </ul>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">Get Started</Button>
                  </CardContent>
                </Card>
              </motion.div>
              <motion.div variants={itemVariants}>
                <Card className="flex flex-col h-full">
                  <CardHeader>
                    <CardTitle>Enterprise</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-4xl font-bold mb-2">Custom</p>
                    <ul className="space-y-2 mb-4">
                      <li>Custom acceleration speeds</li>
                      <li>Unlimited global locations</li>
                      <li>24/7 dedicated support</li>
                      <li>Custom security solutions</li>
                      <li>API access</li>
                    </ul>
                    <Button className="w-full">Contact Sales</Button>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </section>
        <section id="contact" className="w-full py-12 md:py-24 lg:py-32 bg-blue-600">
          <motion.div
            ref={ContactRef}
            className="container px-4 md:px-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-white">
                  Ready to Accelerate?
                </h2>
                <p className="mx-auto max-w-[600px] text-gray-200 md:text-xl">
                  Join thousands of enterprises already benefiting from our network acceleration solutions.
                </p>
              </div>
              <Button
                className="bg-white text-blue-600 hover:bg-gray-100"
                onClick={() => setIsOpen(true)}
              >
                Start Your Free Trial
              </Button>
            </div>
          </motion.div>
        </section>
      </main>
      <footer className="w-full py-6 bg-gray-800 text-white">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">About Us</h3>
              <p className="text-sm text-gray-400">TechNet Accelerator is a leading provider of network acceleration solutions for global enterprises.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
              <ul className="space-y-1 text-sm">
                <li><Link href="#features" className="hover:text-blue-400 transition-colors">Features</Link></li>
                <li><Link href="#testimonials" className="hover:text-blue-400 transition-colors">Testimonials</Link></li>
                <li><Link href="#pricing" className="hover:text-blue-400 transition-colors">Pricing</Link></li>
                <li><Link href="#contact" className="hover:text-blue-400 transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Legal</h3>
              <ul className="space-y-1 text-sm">
                <li><Link href="#" className="hover:text-blue-400 transition-colors">Terms of Service</Link></li>
                <li><Link href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</Link></li>
                <li><Link href="#" className="hover:text-blue-400 transition-colors">Cookie Policy</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Connect</h3>
              <ul className="space-y-1 text-sm">
                <li><Link href="#" className="hover:text-blue-400 transition-colors">Twitter</Link></li>
                <li><Link href="#" className="hover:text-blue-400 transition-colors">LinkedIn</Link></li>
                <li><Link href="#" className="hover:text-blue-400 transition-colors">Facebook</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700">
            <p className="text-xs text-center text-gray-400">© 2024 TechNet Accelerator. All rights reserved.</p>
          </div>
        </div>
      </footer>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-lg p-6 w-full max-w-md"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            <h2 className="text-2xl font-bold mb-4">Start Your Free Trial</h2>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                <input type="text" id="name" name="name" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input type="email" id="email" name="email" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
              </div>
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-700">Company</label>
                <input type="text" id="company" name="company" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
              </div>
              <Button type="submit" className="w-full">Submit</Button>
            </form>
            <button
              onClick={() => setIsOpen(false)}
              className="mt-4 text-sm text-gray-500 hover:text-gray-700"
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}

function GlobeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="2" x2="22" y1="12" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  )
}

function MountainIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  )
}

function RocketIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </svg>
  )
}

function ShieldCheckIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  )
}