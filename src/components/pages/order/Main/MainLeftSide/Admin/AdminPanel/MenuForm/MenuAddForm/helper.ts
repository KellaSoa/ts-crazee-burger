import { Category } from "@/types/Category";
import { Product } from "@/types/Product";
import z from "zod";

export const getMenuPrice = (products: Product[]) => {
  return products
    ? products.reduce(
        (acc, product) => acc + Number(product.price.toFixed(2)),
        0,
      )
    : 0;
};

export const getCategoriesFromMenuProducts = (
  products: Product[],
): Category[] => {
  if (!products) return [];
  const categoriesMap = new Map<string, Category>();
  products.forEach((product) => {
    if (product.categories && Array.isArray(product.categories)) {
      product.categories.forEach((category: Category) => {
        if (!categoriesMap.has(category.id)) {
          categoriesMap.set(category.id, category);
        }
      });
    }
  });
  return Array.from(categoriesMap.values());
};

export const menuFormSchema = z.object({
  id: z.uuid(),
  price: z
    .number()
    .nonnegative("Le prix doit être un nombre positif ou 0")
    .nullable(),
  imageSource: z.string().optional(),
  title: z.string().optional(),
  quantity: z.number().int().positive().optional(), // Peut être absent, mais s'il est présent, il doit être un entier positif
  isAvailable: z
    .union([z.boolean(), z.string()])
    .transform((val) =>
      val === "true" ? true : val === "false" ? false : val,
    ),
  isPublicised: z
    .union([z.boolean(), z.string()])
    .transform((val) =>
      val === "true" ? true : val === "false" ? false : val,
    ),
  categories: z.array(
    z.object({
      id: z.string(),
      label: z.string(),
      color: z.string(),
      iconName: z.string(),
    }),
  ),
  products: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      price: z.number(),
      imageSource: z.string().optional(),
      isAvailable: z
        .union([z.boolean(), z.string()])
        .transform((val) =>
          val === "true" ? true : val === "false" ? false : val,
        ),
      isPublicised: z
        .union([z.boolean(), z.string()])
        .transform((val) =>
          val === "true" ? true : val === "false" ? false : val,
        ),
    }),
  ),
});
