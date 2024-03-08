import "./globals.css";

import { JetBrains_Mono } from "next/font/google";
import { themeEffect } from "./theme-effect";
import { Analytics } from "./analytics";
import { Header } from "./header";
import { Footer } from "./footer";
import { doge } from "./doge";

const jetBrainsMono = JetBrains_Mono({ subsets: ["latin"] });

export const metadata = {
  title: "SONG",
  description:
    "ACMer / Fullstack Engineer",
  openGraph: {
    title: "SONG",
    description:
      "ACMer / Fullstack Engineer",
    url: "https://blog.jackey.love",
    siteName: "SONG's blog",
  },
  twitter: {
    card: "summary_large_image",
    site: "@zhousongjie",
    creator: "@zhousongjie",
  },
  metadataBase: new URL("https://blog.jackey.love"),
};

export const viewport = {
  themeColor: "transparent",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${jetBrainsMono.className} antialiased`}
      suppressHydrationWarning={true}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(${themeEffect.toString()})();(${doge.toString()})();`,
          }}
        />
      </head>

      <body className="dark:text-gray-100 max-w-2xl m-auto">
        <main className="p-6 pt-3 md:pt-6 min-h-screen">
          <Header />
          {children}
        </main>

        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
