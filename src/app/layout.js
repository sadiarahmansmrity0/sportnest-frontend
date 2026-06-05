import { Geist, Geist_Mono } from "next/font/google";
import { ToastContainer } from "react-toastify";
import Navbar from "@/components/Navbar";                                                               
import Footer from "@/components/Footer";
import "react-toastify/dist/ReactToastify.css";
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
  title: "SportNest | Premium Sports Facility Booking Management Portal",
  description: "Explore and reserve football turfs, badminton courts, swimming lanes, and tennis courts seamlessly.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-gray-50 text-gray-900 flex flex-col`}>
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <ToastContainer position="top-right" autoClose={3000} theme="colored" />
      </body>
    </html>
  );
}