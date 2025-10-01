import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "./components/common/Navbar";
import Providers from "./providers";
import SidePanel from "./components/common/side_panel/SidePanel";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GearForge",
  description: "A tournament app", //Meta data to be changed
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>
          <NavBar />
          <SidePanel />
          {/* Keep top padding for fixed navbar; allow overflow for full-bleed sections */}
          <div className="pt-16 md:ml-60">{children}</div>
        </Providers>
      </body>
    </html>
  );
}