import type {Metadata} from 'next';
import './globals.css';
import { Inter } from 'next/font/google'
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'] })


export const metadata: Metadata = {
  title: 'Spotify',
  description: 'Spotify',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
      <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <Script src="https://unpkg.com/@dotlottie/player-component@latest/dist/dotlottie-player.mjs" type="module"></Script>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
