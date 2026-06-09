import { Montserrat, Open_Sans } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
});

export const metadata = {
  title: "FTR Global",
  description: "FTR Global",
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`antialiased ${montserrat.variable} ${openSans.variable}`}
      >
        <Header/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
