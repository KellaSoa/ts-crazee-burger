import { FaHamburger } from "react-icons/fa";
import { BsFillCameraFill } from "react-icons/bs";
import { MdOutlineEuro } from "react-icons/md";
import { FiPackage } from "react-icons/fi";
import { GoMegaphone } from "react-icons/go";
import { isAvailableOptions, isPublicisedOptions } from "@/enums/select";
import { Product } from "@/types/Product";
import { IoPricetag } from "react-icons/io5";

export const getInputTextsConfig = (newProduct: Product) => [
  {
    id: "0",
    name: "title",
    value: newProduct.title,
    placeholder: "Nom du produit (ex: Super Burger)",
    Icon: <FaHamburger />,
    version: "minimalist",
    className: "title",
  },
  {
    id: "1",
    name: "imageSource",
    value: newProduct.imageSource,
    placeholder:
      "Lien URL d'une image (ex: https://la-photo-de-mon-produit.png)",
    Icon: <BsFillCameraFill />,
    version: "minimalist",
    className: "image-source",
  },
  {
    id: "2",
    name: "categories",
    value: newProduct.price ? newProduct.price : "",
    placeholder: "Categories",
    Icon: <IoPricetag />,
    version: "minimalist",
    className: "categories",
  },
  {
    id: "3",
    name: "price",
    value: newProduct.price ? newProduct.price : "",
    placeholder: "Prix",
    Icon: <MdOutlineEuro />,
    version: "minimalist",
    className: "price",
  },
];

export const getSelectInputConfig = (newProduct: Product) => [
  {
    id: "3",
    name: "isAvailable",
    value: newProduct.isAvailable.toString(),
    options: isAvailableOptions,
    Icon: <FiPackage />,
    className: "is-available",
  },
  {
    id: "4",
    name: "isPublicised",
    value: newProduct.isPublicised.toString(),
    options: isPublicisedOptions,
    Icon: <GoMegaphone />,
    className: "is-publicised",
  },
];
