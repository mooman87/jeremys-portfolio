import "./globals.scss";
import type { Metadata } from "next";
import PageReveal from "./components/PageReveal";
import {Space_Grotesk, Roboto} from "next/font/google";


const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["400", "500", "700"],
  display: "swap",
});

const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
  weight: ["400", "500", "700"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "Jeremy Lese",
  description: "My personal technical portfolio.",
  openGraph: {
    title: "Jeremy Lese",
    images: ["/og-image.png"]
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-reveal="init" className={`${spaceGrotesk.variable} ${roboto.variable}`}>
      <body>
        <PageReveal />
        <div className="reveal-root"> 
          {children}
        </div></body>
    </html>
  );
}
