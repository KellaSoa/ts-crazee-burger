// iconMap.ts
import { MdQuestionMark } from "react-icons/md";
import { FaHamburger } from "react-icons/fa";
import { RiDrinks2Line } from "react-icons/ri";
import { LuSalad, LuCakeSlice } from "react-icons/lu";
import { GiChocolateBar } from "react-icons/gi";
import { CiFries } from "react-icons/ci";
import { BsCupHotFill } from "react-icons/bs";
import { IoFastFoodOutline } from "react-icons/io5";
import { IconName } from "@/types/Category";
import { IconType } from "react-icons";

// nom technique : dictionnaire, mapping JS/TS, lookup table
// export const ICON_MAP: Record<IconName, IconType> = {
//     sandwich: FaHamburger,
//     verre: RiDrinks2Line,
//     veggies: LuSalad,
//     dessert: LuCakeSlice,
//     frites: LuCakeSlice, // même icône pour 2 noms différents
//     chocolateBar: GiChocolateBar,
// }

// // nom technique : fonction utiliaire / utils ou "factory".
// export const getCategoryIcon = (name: IconName): IconType =>
//     ICON_MAP[name] ?? MdQuestionMark

// ci-dessous, ça marche et ça réuni dans getCategoryIcon() à la fois la fonction utilitaire et le dictionnaire / mapping / lookup table.
export const getCategoryIcon = (iconName: IconName): IconType | null => {
  if (iconName === "sandwich") return FaHamburger;
  if (iconName === "verre") return RiDrinks2Line;
  if (iconName === "veggies") return LuSalad;
  if (iconName === "dessert") return LuCakeSlice;
  if (iconName === "frites") return CiFries;
  if (iconName === "chocolateBar") return GiChocolateBar;
  if (iconName === "tasse chaude") return BsCupHotFill;
  if (iconName === "menu") return IoFastFoodOutline;
  if (iconName === "") return null;
  return MdQuestionMark;
};
// attention, ça retourne nom pas un composant Icon mais la référence au composant Icon ☝️
