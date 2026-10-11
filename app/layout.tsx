import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "King Ice Cream",
  description: "Step inside the kingdom of ice cream.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Inter+Tight:wght@800;900&family=Playfair+Display:ital,wght@0,600;0,700;0,800;1,600&display=swap"
        />
      </head>
      <body style={{ fontFamily: "Inter, system-ui, sans-serif" }}>{children}</body>
    </html>
  )
}
