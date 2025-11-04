import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["400", "500", "600", "700"],
  display: "swap",

});

export const metadata = {
  title: "Serena - Clairvoyant Tarot Reader & Spiritual Guide",
  description: "Professional tarot readings and spiritual counselling with 25+ years of experience. Based in Queensland, Australia. Available via phone or video call.",
  icons: {
    icon: 'https://jvbt2klp0c.ufs.sh/f/Bki00QFJMYr9UuHHlmgdQ7SL6u9nmzqaCKBMV8wtF3bXRyWI',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
