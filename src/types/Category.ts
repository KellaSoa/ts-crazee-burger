import { Color } from "@/theme/theme";

export type Category = {
  id: string;
  label: string;
  color: Color[keyof Color] | "";
  iconName: IconName;
  value?: string;
  isActive?: boolean;
};

export const ICON_NAMES = [
  "",
  "sandwich",
  "verre",
  "veggies",
  "dessert",
  "frites",
  "chocolateBar",
  "tasse chaude",
  "menu",
] as const;

export type IconName = (typeof ICON_NAMES)[number];
