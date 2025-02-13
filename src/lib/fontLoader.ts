import localFont from "next/font/local";
import { Gabarito } from "next/font/google";

const myFont = localFont({
  src: "./../../public/fonts/LiAdorNoirrit.woff", // compressed
});


const GabaritoFont = Gabarito({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export function getFontClass(lang: string = "bn") {
  return lang == "en" ? GabaritoFont.className : myFont.className;
}
