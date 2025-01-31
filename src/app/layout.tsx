import ThemeProvider from "@/components/ui/ThemeProvider";
import ProgressBar from "@/components/ProgressBar";
import { Provider } from "react-wrap-balancer";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { ENGLISH } from "@/components/translations";
import { getFontClass } from "@/lib/fontLoader";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: ENGLISH.title,
  description: ENGLISH.description,
  metadataBase: new URL("https://shohid24.pages.dev"),
  keywords: [
    "shohid24",
    "shohid 24",
    "শহীদ২৪",
    "জুলাই আন্দোলনে শহীদ",
    "Martyr list of July Movement",
    "July Massacre",
    "shohid.info",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.svg" />
        <link rel="preload" as="image" href="/default.jpg" />

        <meta charSet="utf-8" />
        <meta
          httpEquiv="last-modified"
          content={new Date().toISOString().split(":")[0] + ":00:00.000Z"}
        />

        <meta
          name="google-site-verification"
          content="WPPXho-ehsTzL41OYAECiVP8ilWMxfxjHtHwQUsu1FU"
        />
        <meta name="msvalidate.01" content="4BEF61FA980C565F3A8B089F8484F9F0" />
      </head>
      <body
        className={`${getFontClass("bn")} antialiased selection:bg-indigo-400 selection:text-gray-950 dark:selection:bg-indigo-800 dark:selection:text-gray-200`}
      >
        <ProgressBar />
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
