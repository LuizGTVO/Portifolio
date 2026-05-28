import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Luiz Gustavo | Full Stack Developer",
  description: "Portfólio de Luiz Gustavo de Oliveira Menino, Full Stack Developer e estudante de Informática para Internet no IFSP. Projetos web modernos, responsivos e interativos.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#030303] text-foreground">
        {/* Global Noise Texture Overlay */}
        <svg className="fixed top-0 left-0 w-full h-full pointer-events-none opacity-[0.015] z-50" xmlns="http://www.w3.org/2000/svg">
          <filter id="noiseFilter">
            <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="3" stitchTiles="stitch"/>
          </filter>
          <rect width="100%" height="100%" filter="url(#noiseFilter)"/>
        </svg>

        {children}
      </body>
    </html>
  );
}
