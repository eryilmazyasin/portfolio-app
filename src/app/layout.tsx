import type { Metadata } from "next";
import './globals.css';

import { ThemeProvider } from '@/providers/ThemeProvider';
import { getLocale } from 'next-intl/server';
import { Geist, Geist_Mono } from 'next/font/google';

import { getYearsOfExperience } from '@/lib/experience';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export function generateMetadata(): Metadata {
  const yearsOfExperience = getYearsOfExperience();

  return {
    title: "Yasin Eryılmaz — Frontend & Full-Stack Developer",
    description: `${yearsOfExperience}+ yıllık deneyime sahip Frontend ve Full-Stack geliştirici Yasin Eryılmaz'ın kişisel portfolyosu.`,
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Sunucu tarafında cookie'den dili ve json mesajlarını çekiyoruz
  const locale = await getLocale();
  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body
        className="min-h-full flex flex-col bg-background text-foreground"
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
