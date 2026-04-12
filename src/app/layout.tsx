import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { CartProvider } from "@/context/CartContext";
import { Navbar } from "@/components/layout/Navbar";
import { cookies } from "next/headers";
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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // ดึง Session จากฝั่ง Server (Next.js 15 ต้องใช้ await cookies)
  const cookieStore = await cookies();
  const sessionStr = cookieStore.get("auth_session")?.value;
  const user = sessionStr ? JSON.parse(sessionStr) : null;

  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <CartProvider>
          <Navbar user={user} />
          <div className="pt-20">
            {children}
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
