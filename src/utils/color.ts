import { theme } from "@/theme/theme";

export function applyOpacity(hexColor: string, opacity: number) {
  // Convertir la couleur hex en RGB
  let r = parseInt(hexColor.substring(1, 3), 16);
  let g = parseInt(hexColor.substring(3, 5), 16);
  let b = parseInt(hexColor.substring(5, 7), 16);

  // Appliquer l'opacité sur un fond blanc
  let newR = Math.round(r * opacity + 255 * (1 - opacity));
  let newG = Math.round(g * opacity + 255 * (1 - opacity));
  let newB = Math.round(b * opacity + 255 * (1 - opacity));

  // Convertir en hex
  return `#${newR.toString(16).padStart(2, "0")}${newG
    .toString(16)
    .padStart(2, "0")}${newB.toString(16).padStart(2, "0")}`;
}

export const isHexColor = (color: string): boolean => {
  return /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(color);
};

export const getBgColorToApply = (
  data: { color: string },
  isSelected: boolean,
  isFocused: boolean,
) => {
  let bgColor = "lightgrey";
  if ("color" in data) {
    bgColor = isSelected
      ? applyOpacity(data.color ?? theme.colors.redSecondary, 0.25)
      : isFocused
        ? applyOpacity(data.color ?? theme.colors.redSecondary, 0.1)
        : "transparent";
  } else {
    bgColor = isSelected
      ? "blue"
      : isFocused
        ? theme.colors.greyLight
        : "white";
  }
  return bgColor;
};
