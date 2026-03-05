import { Color, theme } from "@/theme/theme";
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

export const colorsOptions: Record<
  SelectLabel,
  Color[keyof Color] | CategoryColors
>[] = [
  { optionValue: theme.colors.primary, label: "orange" },
  { optionValue: theme.colors.blue, label: "bleu" },
  { optionValue: theme.colors.rose, label: "rose" },
  { optionValue: theme.colors.success, label: "vert" },
  { optionValue: theme.colors.yellow, label: "jaune" },
  { optionValue: theme.colors.red, label: "rouge" },
];

export const categoryIconsOptions: Record<CategoryIconsOptionsKey, IconName>[] =
  ICON_NAMES.map((iconName) => ({
    optionValue: iconName,
    label: iconName,
  }));
