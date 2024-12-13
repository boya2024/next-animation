'use client'

import { useEffect, useState } from 'react'
import styles from './scroll.module.css'

const sections = [
  { id: 'section1', title: '第一章' },
  { id: 'section2', title: '第二章' },
  { id: 'section3', title: '第三章' },
  { id: 'section4', title: '第四章' },
]

export default function Scroll() {
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      {
        rootMargin: '-20% 0px -80% 0px'
      }
    )

    sections.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [])

  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className={styles.container}>
      {/* 左侧导航菜单 */}
      <div className={styles.sidebar}>
        <nav className={styles.nav}>
          {sections.map(({ id, title }) => (
            <button
              key={id}
              onClick={() => scrollToSection(id)}
              className={`${styles.navButton} ${
                activeSection === id ? styles.active : ''
              }`}
            >
              {title}
            </button>
          ))}
        </nav>
      </div>

      {/* 主要内容区域 */}
      <div className={styles.content}>
        {sections.map(({ id, title }) => (
          <section
            key={id}
            id={id}
            className={styles.section}
          >
            <h2>{title}内容</h2>
          </section>
        ))}
      </div>
    </div>
  )
}
