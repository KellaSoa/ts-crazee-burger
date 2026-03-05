import { Color, ColorKeys, theme } from "@/theme/theme";
import { ICON_NAMES, IconName } from "@/types/Category";

export const isAvailableOptions = [
  { optionValue: "true", label: "En stock" },
  { optionValue: "false", label: "En rupture" },
];

export const isPublicisedOptions = [
  { optionValue: "false", label: "Sans pub" },
  { optionValue: "true", label: "Avec pub" },
];

type CategoryColors = "orange" | "bleu" | "rose" | "vert" | "jaune" | "rouge";

type SelectLabel = "optionValue" | "label";

type CategoryIconsOptionsKey = SelectLabel;

type ColorOptions = Record<SelectLabel, Color[ColorKeys] | CategoryColors>[];
type CategoryIconsOptions = Record<CategoryIconsOptionsKey, IconName>[];

export type CategoryOptions = ColorOptions | CategoryIconsOptions;
export const colorsOptions: ColorOptions = [
  { optionValue: theme.colors.primary, label: "orange" },
  { optionValue: theme.colors.blue, label: "bleu" },
  { optionValue: theme.colors.rose, label: "rose" },
  { optionValue: theme.colors.success, label: "vert" },
  { optionValue: theme.colors.yellow, label: "jaune" },
  { optionValue: theme.colors.red, label: "rouge" },
];

export const categoryIconsOptions: CategoryIconsOptions = ICON_NAMES.map(
  (iconName) => ({
    optionValue: iconName,
    label: iconName,
  }),
);
