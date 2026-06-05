import type { Metadata } from "next"
import { Inter } from "next/font/google"

import { AuthProvider } from "@/hooks/use-auth"
import { ThemeProvider } from "@/hooks/use-theme"

import "./globals.css"

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: {
    default: "ObservaAcao",
    template: "%s | ObservaAcao",
  },
  description: "Acompanhamento e gestao de solicitacoes publicas municipais.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={inter.variable} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{var t=localStorage.getItem('observaacao-theme');if(t==='dark'||(!t&&matchMedia('(prefers-color-scheme: dark)').matches))document.documentElement.classList.add('dark')}catch(e){}",
          }}
        />
      </head>
      <body className="min-h-screen antialiased">
        <ThemeProvider><AuthProvider>{children}</AuthProvider></ThemeProvider>
      </body>
    </html>
  )
}
