import { Provider } from "react-wrap-balancer";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import ThemeProvider from "@/components/ui/ThemeProvider";
import type { Metadata } from "next";
import "./globals.css";
import { BANGLA } from "@/components/translations";
import { getFontClass } from "@/lib/fontLoader";

export const metadata: Metadata = {
  title: BANGLA.title,
  description: BANGLA.description,
  metadataBase: new URL("https://shohid24.pages.dev"),
  keywords: ["shohid24", "shohid 24", "শহীদ২৪", "জুলাই আন্দোলনে শহীদ", "Martyr list of July Movement", "July Massacre", "shohid.info"]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.svg" />
        <link rel="preload" as="image" href="/default.jpg" />
        <meta
          name="google-site-verification"
          content="WPPXho-ehsTzL41OYAECiVP8ilWMxfxjHtHwQUsu1FU"
        />
      </head>
      <body
        className={`${getFontClass("bn")} antialiased selection:bg-indigo-400 selection:text-gray-950 dark:selection:bg-indigo-800 dark:selection:text-gray-200`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NuqsAdapter>
            <Provider>{children}</Provider>
          </NuqsAdapter>
        </ThemeProvider>
      </body>
    </html>
  );
}
