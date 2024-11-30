import { ThemeProvider } from '@/components/providers/theme-provider'
import { languages } from '@/i18n/settings'
import { localization } from '@/lib/utils'
import type { ChildProps } from '@/types'
import { ClerkProvider } from '@clerk/nextjs'
import { dir } from 'i18next'
import type { Metadata } from "next";
import { Roboto, Space_Grotesk } from "next/font/google";
import "./globals.css";
import NextTopLoader from 'nextjs-toploader'
import { GoogleAnalytics } from '@next/third-parties/google'

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
  metadataBase: new URL('https://ask250.uz'),
  title: "Startup Practicum - Next.js",
  description: "Startup Practicum - Next.js",
  icons: { icon : '/favicon.icon'},
  authors: [{ name: 'Aslbek Rashidov', url: 'https://ask250.uz' }],
  openGraph: {
    images: './logo.svg',
    title: 'Dasturlash kurslari',
    description:
      "Next.js dasturlash kurslari, amaliyotlar, startup loyihalar va asosiysi sifatli ta'limdir.",
    type: 'website',
    url: 'https://ask250.uz',
    locale: 'uz_UZ',
    countryName: 'Uzbekistan',
    siteName: 'ASK250',
    emails: 'info@gmail.com',
  },
  keywords:
    "Praktikum, NextJS, NextJS to'liq kurs, NextJS kurs, NextJS dasturlash, Startup, Startup loyiha",
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
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange>
            <NextTopLoader
              color='#3182CE'
              initialPosition={0.5}
              crawlSpeed={200}
              height={3}
              crawl={true}
              showSpinner={false}
              easing='ease'
              speed={200}
              shadow='0 0 10px #3182CE,0 0 5px #3182CE'
            />
            {children}
          
          </ThemeProvider>
        </body>
        <GoogleAnalytics gaId="G-F26V696SWR" />
      </html>
    </ClerkProvider>
  
  );
}

export default RootLayout
