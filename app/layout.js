import "../styles/globals.css";

export const metadata = {
  title: "Lilly Kitchen",
  description: "Minimal scaffold for the Lilly Kitchen web application."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* Shared application shell placeholder. */}
        {children}
      </body>
    </html>
  );
}
