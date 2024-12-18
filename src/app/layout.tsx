import ThemeProvider from "@/components/ui/ThemeProvider";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { Inter } from 'next/font/google'

import "./globals.css";

const myFont = localFont({
  src: "./../../public/fonts/Li Ador Noirrit Regular.ttf",
});
const interFont = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "Shohid24 - Martyrs of July Student Movement",
  description:
    "A list of students killed under the regime of Bangladesh's Prime Minister, Sheikh Hasina, accused of fascist practices.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en,bn" suppressHydrationWarning>
      <body
        className={`${myFont.className} ${interFont.className} antialiased selection:bg-indigo-400 selection:text-gray-950 dark:selection:bg-indigo-800 dark:selection:text-gray-200`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
