import type { Metadata, Viewport } from "next";
import { Inter, Geist_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { LanguageProvider } from "@/components/LanguageProvider";
import { AppLayoutWrapper } from "@/components/AppLayoutWrapper";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "WannDev Porto",
    template: "%s | WannDev Porto",
  },
  description: "Creative portfolio for Ridwan Prakoso (WannDev) built with Next.js, Tailwind CSS, Laravel 11, and MySQL.",
  icons: {
    icon: [
      { url: "/favicon/favicon-32x32.png?v=2", sizes: "32x32", type: "image/png" },
      { url: "/favicon/favicon-16x16.png?v=2", sizes: "16x16", type: "image/png" },
      { url: "/favicon.ico?v=2" },
    ],
    shortcut: "/favicon.ico?v=2",
    apple: "/favicon/apple-touch-icon.png?v=2",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="id"
      className={`${inter.variable} ${geistMono.variable} ${spaceGrotesk.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png?v=2" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png?v=2" />
        <link rel="shortcut icon" href="/favicon.ico?v=2" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png?v=2" />
      </head>
      <body className={`${inter.className} min-h-full flex flex-col bg-[var(--background)] text-[var(--foreground)] selection:bg-zinc-200 selection:text-black dark:selection:bg-zinc-800 dark:selection:text-white`}>
        <ThemeProvider>
          <LanguageProvider>
            <AppLayoutWrapper>{children}</AppLayoutWrapper>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
