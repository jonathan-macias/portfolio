import type { Metadata } from "next";
import { Archivo, Martian_Mono } from "next/font/google";
import Script from "next/script";
import { profile } from "@/data/profile";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  axes: ["wdth"],
});

const martianMono = Martian_Mono({
  variable: "--font-martian-mono",
  subsets: ["latin"],
  axes: ["wdth"],
});

const title = `${profile.name} — ${profile.title} (${profile.focus})`;

export const metadata: Metadata = {
  title,
  description: profile.tagline,
  authors: [{ name: profile.name }],
  openGraph: {
    title,
    description: profile.tagline,
    type: "profile",
  },
};

// Runs before hydration so the page never flashes the wrong theme.
const themeScript = `try{var t=localStorage.getItem('theme');if(t==='dark'||(!t&&matchMedia('(prefers-color-scheme: dark)').matches))document.documentElement.classList.add('dark')}catch(e){}`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${archivo.variable} ${martianMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <Script id="theme-init" strategy="beforeInteractive">
          {themeScript}
        </Script>
        <a
          href="#top"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-3 focus:z-50 focus:bg-fg focus:px-4 focus:py-2 focus:font-mono focus:text-label focus:uppercase focus:text-bg"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
