import { Analytics } from "@vercel/analytics/react";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "../styles/globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-display"
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-body"
});

export const metadata = {
  title: "Lilly Kitchen",
  description: "Minimal scaffold for the Lilly Kitchen web application.",
  icons: {
    icon: "/icon.png"
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
