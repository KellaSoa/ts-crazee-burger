import { theme } from "@/theme/theme"
import { Category } from "@/types/Category"

export const CATEGORY_ALL: Category = {
  id: "id-category-all",
  label: "Tous",
  color: theme.colors.greyDark,
  iconName: "",
  isActive: true,
}

// empty category by default
export const DEFAULT_CATEGORY: Category = {
  id: "id-icone-par-defaut",
  label: "",
  color: "",
  iconName: "",
}

export const EMPTY_CATEGORY: Category = {
  id: "",
  label: "",
  color: theme.colors.red,
  iconName: "",
}

export const IS_SELECTED_COLOR = {
  color: theme.colors.white,
  backgroundColor: theme.colors.background_dark,
  borderColor: theme.colors.dark,
}
