import { NuqsAdapter } from "nuqs/adapters/next/app";
import ThemeProvider from "@/components/ui/ThemeProvider";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const myFont = localFont({
  src: "./../../public/fonts/Li Ador Noirrit Regular.ttf",
});

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
      <link rel="preload" as="image" href="/images/default.jpg" />
      <body
        className={`${myFont.className} antialiased selection:bg-indigo-400 selection:text-gray-950 dark:selection:bg-indigo-800 dark:selection:text-gray-200`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NuqsAdapter>{children}</NuqsAdapter>
        </ThemeProvider>
      </body>
    </html>
  );
}
