import { Color } from "@/theme/theme"

export type Category = {
  id: string
  label: string
  color: Color[keyof Color] | ""
  iconName: IconName
  value?: string
  isActive?: boolean
}

// attention, là c'est pas les catégorie labels, mais bien les icones qu'on représente via un label.
// je préfère ne pas créer de union type en static mais plutot en dynamique comme ça, je peux exploiter plus tard le array dans le multi select et j'ai de la flexibilité sur ce qu'est un IconType.
//export type IconName = "sandwich" | "verre" | "veggies" | "dessert" | "frites" | "chocolateBar"

//P.S. Je préfère dans IconName rajouter un "" dans les options possible plutot que de rendre dans Category iconName optionnel car sinon, je vais devoir toujours vérifier si
// category.iconName existe avec des "&&" avant de pouvoir afficher une icone et il ne sera pas réclamé lors de la manip de l'object alors que j'en ai toujours besoin
// dans l'appli. Donc faut surtout pas le rendre optionnel ici.
// Finalement, je vais le rendre optionnel car dans la fonction utils getCategoryIcon(), ça mess up bcp de chose et aussi avec ICON_MAP.

// les 6 icon names du ticket
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
] as const

export type IconName = (typeof ICON_NAMES)[number]

// Cours sur l'accès au "type de propriété" par indice
// type NameInfoType = {
//   familyName: string
//   middleName: string
//   firstname: string
// }

// export type User = {
//   name: NameInfoType
//   age: number
// }

// type Name = User["name"]

// // “Accède à toutes les entrées de ce tableau, avec n’importe quel index numérique.”
// // Ce procédé a un nom "indexed access types".
// // Un indexed access type permet d’accéder au type d’une propriété d’un type existant, en utilisant une clé.
// export type IconNames = (typeof ICON_NAMES)

// export type IconName01 = (typeof ICON_NAMES)[0] // "sandwich"
// export type IconName02 = (typeof ICON_NAMES)[1] // "verre"

// // ...

// export type IconName = (typeof ICON_NAMES)[number]
