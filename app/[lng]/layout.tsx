import { ThemeProvider } from '@/components/providers/theme-provider'
import { languages } from '@/i18n/settings'
import { localization } from '@/lib/utils'
import type { ChildProps } from '@/types'
import { ClerkProvider } from '@clerk/nextjs'
import { dir } from 'i18next'
import type { Metadata } from "next";
import { Roboto, Space_Grotesk } from "next/font/google";
import "./globals.css";

const roboto  = Roboto({
  subsets: ["latin", "cyrillic"],
  weight: ["100", "300", "400", "500", "700",  "900"],
  variable: "--font-roboto",
})

const spaceGrotesk  = Space_Grotesk({
  subsets: ["latin"],
  weight: [ "300", "400", "500", "600", "700"],
  variable: "--font-space-grotesk",
})

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }))
}


export const metadata: Metadata = {
  metadataBase: new URL('https://startup.sammi.ac'),
  title: 'Sammi praktikum | Dasturlash kurslari',
  description:
    "Sammi Praktikum Next.js dasturlash kurslari, amaliyotlar, startup loyihalar va asosiysi sifatli ta'limdir.",
  authors: [{ name: 'Aslbek Rashidov', url: 'https://startup.sammi.ac' }],
  icons: { icon: '/logo.svg' },
  openGraph: {
    title: 'Sammi praktikum | Dasturlash kurslari',
    description:
      "Sammi Praktikum Next.js dasturlash kurslari, amaliyotlar, startup loyihalar va asosiysi sifatli ta'limdir.",
    type: 'website',
    url: 'https://startup.sammi.ac',
    locale: 'uz_UZ',
    images: 'https://media.graphassets.com/f4jkBWQ6SVaKwySKRNQT',
    countryName: 'Uzbekistan',
    siteName: 'Sammi',
    emails: 'info@gmail.com',
  },
  keywords:
    "Praktikum, Praktikum sammi, NextJS, NextJS to'liq kurs, NextJS kurs, NextJS dasturlash, Startup, Startup loyiha, Startup sammi, Sammi, Sammi praktikum, Sammi dasturlash, Sammi startup, Sammi kurs, Sammi kurslari, Sammi dasturlash kurslari, Sammi startup kurslari, Sammi startup loyihalari, Sammi startup loyiha, Sammi startup loyihasi, Sammi startup loyihasi dasturlash",
};

interface Props extends ChildProps {
  params: { lng: string}
}

function RootLayout( {children, params : { lng }} : Props){
  const local = localization(lng)
  
  return (
    <ClerkProvider localization={local}>
      <html lang={lng} dir={dir(lng)} suppressHydrationWarning>
        <body className={`${roboto.variable} ${spaceGrotesk.variable}`} suppressHydrationWarning>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange>
            {children}
          
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  
  );
}

export default RootLayout
