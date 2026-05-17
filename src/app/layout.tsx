import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-heading",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dhaval Vadgama | Systems & AI Engineer, Branding Expert",
  description: "Personal portfolio of Dhaval Vadgama, a Systems Engineer building scalable products, a Branding Expert obsessed with premium UI/UX, and an AI Engineer pushing boundaries.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${outfit.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-black text-white relative" suppressHydrationWarning>
        {/* Global ambient glow inside an overflow-hidden wrapper to prevent bottom scroll stretching */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
          <div className="glow-bg top-[-20vw] left-[-10vw]" />
          <div className="glow-bg bottom-[-20vw] right-[-10vw] !bg-violet-500/20" />
        </div>
        
        {children}
      </body>
    </html>
  );
}
