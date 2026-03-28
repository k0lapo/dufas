import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'

export const metadata: Metadata = {
  title: 'Dr. Ufadime Seyi-Akinnubi Foundation | Safe Mothers, Bright Smiles',
  description: 'Improving maternal and child health outcomes in underserved communities through integrated preventive dental services, maternal health screening, and health education.',
  generator: 'v0.dev',
  keywords: 'maternal health, child health, dental care, underserved communities, healthcare',
  openGraph: {
    title: 'Dr. Ufadime Seyi-Akinnubi Foundation',
    description: 'Safe Mothers, Bright Smiles - Maternal and Child Health Foundation',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
      </head>
      <body>{children}</body>
    </html>
  )
}
