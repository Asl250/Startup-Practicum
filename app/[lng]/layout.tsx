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
  title: "Startup Practicum - Next.js",
  description: "Startup Practicum - Next.js",
  icons: { icon : '/logo.svg'}
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
