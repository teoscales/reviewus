import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "ReviewUs",
    template: "%s · ReviewUs",
  },
  description: "Rate your visit. Tap a star.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.className} min-h-full bg-white text-[#202124] antialiased`}>
        {children}
      </body>
    </html>
  );
}
