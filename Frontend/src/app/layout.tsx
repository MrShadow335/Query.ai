import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'DocBot - Your AI-Powered Document Reading Assistant',
  description: 'Transform documents into instant insights with AI-powered analysis. Upload any document, email, or contract and get summaries and answers in seconds.',
  keywords: 'AI, document analysis, PDF reader, contract analysis, email parser',
  authors: [{ name: 'DocBot Team' }],
  creator: 'DocBot',
  publisher: 'DocBot',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://docbot.ai',
    title: 'DocBot - Your AI-Powered Document Reading Assistant',
    description: 'Transform documents into instant insights with AI-powered analysis.',
    siteName: 'DocBot',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DocBot - Your AI-Powered Document Reading Assistant',
    description: 'Transform documents into instant insights with AI-powered analysis.',
    creator: '@docbot',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}
