import { Category } from "./Category"

export type Product = {
  id: string
  imageSource: string
  title: string
  price: number
  quantity?: number //@TODO: à voir si quantity doit eêtre retiré ou non
  isAvailable: boolean
  isPublicised: boolean
  categories?: Category[]
}

export type BasketProductQuantity = {
  id: string
  quantity: number
}

export type BasketProduct = Product & BasketProductQuantity
