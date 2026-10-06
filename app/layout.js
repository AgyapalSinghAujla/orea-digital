import { Bowlby_One_SC, Proza_Libre, Rammetto_One } from "next/font/google";
import "./globals.css";
import Header from "./Components/Header/Header";
import SmoothScrolling from "./Components/SmoothScrolling";

const bowlbyOneSC = Bowlby_One_SC({
  weight: ["400"],
  variable: "--font-bowlby-one-sc",
  subsets: ["latin"],
});

const rammettoOne = Rammetto_One({
  weight: ["400"],
  variable: "--font-rammetto-one",
  subsets: ["latin"],
});

const prozaLibre = Proza_Libre({
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-proza-libre",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "Orea Digital | Marketing Agency",
    template: "%s | Marketing Agency",
  },
  description: "Marketing Agency",
  openGraph: {
    title: "Orea Digital | Marketing Agency",
    description: "Marketing Agency",
    url: "https://next-learning-project-nine.vercel.app/",
    siteName: "GSAP Learning",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Orea Digital",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  keywords: [
    "GSAP",
    "GreenSock",
    "Web Development",
    "Animation",
    "JavaScript",
    "Learning",
  ],
  authors: [
    {
      name: "Agyapal Singh",
      url: "https://agyapal-singh-web-developer.vercel.app/",
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={` ${bowlbyOneSC.variable} ${prozaLibre.variable} ${rammettoOne.variable}`}
      >
        <Header />
        <SmoothScrolling>{children}</SmoothScrolling>
      </body>
    </html>
  );
}
