import { JetBrains_Mono as FontMono, Noto_Sans_SC as FontSans } from "next/font/google"
import localFont from 'next/font/local'

export const fontSans = FontSans({
  subsets: ["latin"]
})

export const fontMono = FontMono({
  subsets: ["latin"]
})

export const SmileySans = localFont({ src: './SmileySans-Oblique.otf.woff2', variable:'--font-smiley'})

export const ChillReunion = localFont({ src: './ChillReunion_Round.woff2', variable:'--font-chill' })