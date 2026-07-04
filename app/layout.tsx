import type { Metadata } from "next";
import { Lora, Playfair_Display } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  // TODO: Replace with your business name and description
  title: "Atelier & Co. — Interior Design",
  description:
    "Thoughtful interior design for spaces that feel lived-in, layered, and true to you.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${lora.variable} h-full antialiased`}
    >
      <body className="min-h-full font-body">{children}</body>
    </html>
  );
}
