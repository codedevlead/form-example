import './globals.css'
import { Inter } from 'next/font/google'
import ThemeRegistry from './components/ThemeRegistry'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Formulario Dinámico',
  description: 'Prueba de formulario dinámico para cliente',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <ThemeRegistry>{children}</ThemeRegistry>
      </body>
    </html>
  )
}