import { Category } from "@/types/Category"
import { theme } from "@/theme/theme"

const EMPTY: Category[] = []

const SMALL: Category[] = [
  {
    id: crypto.randomUUID(),
    label: "burger",
    color: theme.colors.primary,
    iconName: "sandwich",
    value: "burger",
    isActive: false
  },
]

const MEDIUM: Category[] = [
  {
    id: crypto.randomUUID(),
    label: "burger",
    color: theme.colors.primary,
    iconName: "sandwich",
    value: "burger",
    isActive: false
  },
  {
    id: crypto.randomUUID(),
    label: "drink",
    color: theme.colors.blue,
    iconName: "verre",
    value: "drink",
    isActive: false
  },
  {
    id: crypto.randomUUID(),
    label: "dessert",
    color: theme.colors.rose,
    iconName: "dessert",
    value: "dessert",
    isActive: false
  },
]

const LARGE: Category[] = [
  {
    id: crypto.randomUUID(),
    label: "burger",
    color: theme.colors.primary,
    iconName: "sandwich",
    value: "burger",
    isActive: false
  },
  {
    id: crypto.randomUUID(),
    label: "drink",
    color: theme.colors.blue,
    iconName: "verre",
    value: "drink",
    isActive: false
  },
  {
    id: crypto.randomUUID(),
    label: "dessert",
    color: theme.colors.rose,
    iconName: "dessert",
    value: "dessert",
    isActive: false
  },
  {
    id: crypto.randomUUID(),
    label: "salade",
    color: theme.colors.success,
    iconName: "veggies",
    value: "salade",
    isActive: false
  },
  {
    id: crypto.randomUUID(),
    label: "accompagnement",
    color: theme.colors.yellow,
    iconName: "frites",
    value: "accompagnement",
    isActive: false
  },
]


export const fakeCategories = {
  EMPTY,
  SMALL,
  MEDIUM,
  LARGE,
}
