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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn" suppressHydrationWarning>
      <link rel="preload" as="image" href="/default.jpg" />
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
