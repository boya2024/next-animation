import { Home, BookOpen, Code2, PenLine, Github, Mail, Sun } from 'lucide-react'
import Link from "next/link"
import { cn } from "@/lib/utils"
import { motion } from 'framer-motion';
export default function Component() {
  return (
    <motion.div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
      <nav className="flex items-center gap-2 bg-background rounded-full px-4 py-2 shadow-lg border">
        <Link
          href="#"
          className={cn(
            "p-2 hover:bg-muted rounded-full transition-colors",
            "text-muted-foreground hover:text-foreground"
          )}
        >
          <Home className="h-5 w-5" />
          <span className="sr-only">Home</span>
        </Link>
        <Link
          href="#"
          className={cn(
            "p-2 hover:bg-muted rounded-full transition-colors",
            "text-muted-foreground hover:text-foreground"
          )}
        >
          <BookOpen className="h-5 w-5" />
          <span className="sr-only">Documentation</span>
        </Link>
        <Link
          href="#"
          className={cn(
            "p-2 hover:bg-muted rounded-full transition-colors",
            "text-muted-foreground hover:text-foreground"
          )}
        >
          <Code2 className="h-5 w-5" />
          <span className="sr-only">Code</span>
        </Link>
        <Link
          href="#"
          className={cn(
            "p-2 hover:bg-muted rounded-full transition-colors",
            "text-muted-foreground hover:text-foreground"
          )}
        >
          <PenLine className="h-5 w-5" />
          <span className="sr-only">Edit</span>
        </Link>
        <div className="h-8 w-px bg-border mx-1" />
        <Link
          href="https://github.com"
          className={cn(
            "p-2 hover:bg-muted rounded-full transition-colors",
            "text-muted-foreground hover:text-foreground"
          )}
        >
          <Github className="h-5 w-5" />
          <span className="sr-only">GitHub</span>
        </Link>
        <Link
          href="https://x.com"
          className={cn(
            "p-2 hover:bg-muted rounded-full transition-colors",
            "text-muted-foreground hover:text-foreground"
          )}
        >
          <svg
            className="h-5 w-5"
            viewBox="0 0 24 24"
            aria-hidden="true"
            fill="currentColor"
          >
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
          <span className="sr-only">X</span>
        </Link>
        <Link
          href="mailto:example@example.com"
          className={cn(
            "p-2 hover:bg-muted rounded-full transition-colors",
            "text-muted-foreground hover:text-foreground"
          )}
        >
          <Mail className="h-5 w-5" />
          <span className="sr-only">Email</span>
        </Link>
        <button
          className={cn(
            "p-2 hover:bg-muted rounded-full transition-colors",
            "text-muted-foreground hover:text-foreground"
          )}
        >
          <Sun className="h-5 w-5" />
          <span className="sr-only">Toggle theme</span>
        </button>
      </nav>
    </motion.div>
  )
}