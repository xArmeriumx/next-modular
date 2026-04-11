import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { CartProvider } from "@/context/CartContext";
import { Navbar } from "@/components/layout/Navbar"; // ย้ายมาวางให้เป็นระเบียบด้านบน
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NextJS Modular App",
  description: "Best practices with OOP & Modular UI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <CartProvider>
          <Navbar />
          <div className="pt-20">
            {children}
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
