import { Product } from "./Product"
import { Category } from "@/types/Category"

export type Menu = {
  id: string
  title: string
  imageSource: string // image de couverture
  products: Product[] // les produits qui composent le products
  price: number // somme des prix des produits
  quantity?: number // voir si on garde ou non
  categories: Category[]
  isAvailable: boolean
  isPublicised: boolean
  oldPrice?: number
}
