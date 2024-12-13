import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar";


const poppins = Poppins({
  weight: ['400', '500', '600', '700'],  // specify needed weights
  subsets: ['latin'],
  display: 'swap',
})


export const metadata: Metadata = {
  title: "Elite Labs",
  description: "Building Next Gen Technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className} antialiased`}
      >
            <div className="w-screen h-fit fixed left-0 top-3 px-0 z-40">

<Navbar  />
</div>
     
        {children}
      </body>
    </html>
  );
}
