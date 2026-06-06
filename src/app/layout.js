import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "@/app/globals.css"; // Ensure your global styles stay imported!

export const metadata = {
  title: "SportNest | Sports Facility Booking Portal",
  description: "Reserve premium football turfs, badminton courts, and matching play slots instantly.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#020617] min-h-screen flex flex-col justify-between">
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}