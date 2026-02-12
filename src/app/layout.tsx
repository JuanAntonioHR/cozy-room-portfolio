import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";

const outfit = Outfit({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Juan Antonio | Web Developer & Designer",
  description:
    "Explore my interactive 3D portfolio: a cozy room inspired by retro and voxel aesthetics, built with React Three Fiber and Next.js.",
  keywords: [
    "web developer",
    "web designer",
    "three.js",
    "3d portfolio",
    "voxel art",
    "cozy room",
    "react three fiber",
    "next.js",
    "typescript",
  ],
  authors: [{ name: "Juan Antonio HR" }],
  creator: "Juan Antonio HR",
  publisher: "Juan Antonio HR",
  openGraph: {
    title: "Juan Antonio | Web Developer & Designer",
    description:
      "Explore my interactive 3D portfolio: a cozy room inspired by retro and voxel aesthetics, built with React Three Fiber and Next.js.",
    siteName: "Juan Antonio HR",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${outfit.className} antialiased`}>
        <TooltipProvider>{children}</TooltipProvider>
      </body>
    </html>
  );
}
