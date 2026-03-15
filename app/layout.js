import "./globals.css";
import MainHeader from "@/components/layout/MainHeader";

export const metadata = {
  title: "Pokedex",
  description: "Pokemon dashboard for discovery, team building, and journey tracking",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning className="antialiased">
        <MainHeader />
        {children}
      </body>
    </html>
  );
}
