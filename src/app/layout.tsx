import type { Metadata } from "next";
import { FavoritesProvider } from "@/hooks/useFavorites";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "MovieFinder - Discover Popular Movies",
  description: "Browse trending movies, search details, and build your favorites list.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <FavoritesProvider>
          <Navbar />
          <main className="mainContent">{children}</main>
          <Footer />
        </FavoritesProvider>
      </body>
    </html>
  );
}
