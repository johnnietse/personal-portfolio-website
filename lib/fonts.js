/**
 * Font Configuration — Single source of truth for all font loading
 * Uses next/font for optimized, self-hosted font delivery
 */
import { Geist, Geist_Mono } from 'next/font/google'

export const geist = Geist({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-geist',
  weight: ['300', '400', '500', '600', '700'],
  preload: true,
})

export const geistMono = Geist_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-geist-mono',
  weight: ['400', '500', '600', '700'],
  preload: true,
})
