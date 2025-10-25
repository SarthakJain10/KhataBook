import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: "KhataBook",
  description: "One Stop Finance Management Platform",
  icons: {
    icon: "/logo.jpg"
  }
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <link rel="icon" href="/logo.jpg" sizes="any" />
        </head>
        <body className={`${inter.className}`}>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Toaster richColors />
          {/* Footer */}
          <footer className="bg-gray-900 text-gray-300 mt-12">
            <div className="container mx-auto px-6 py-10">
              <Footer />
            </div>
          </footer>
        </body>
      </html>
    </ClerkProvider>
  );
}
