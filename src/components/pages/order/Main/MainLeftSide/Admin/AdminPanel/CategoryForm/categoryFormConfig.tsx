import { IoIosPricetag } from "react-icons/io";
import { PiPaintBucketFill } from "react-icons/pi";
import { BsFillCameraFill } from "react-icons/bs";
import {
  categoryIconsOptions,
  CategoryOptions,
  colorsOptions,
} from "@/enums/select";
import { Category } from "@/types/Category";

type BaseFileds = {
  id: string;
  name: string;
  value: string;

  Icon: JSX.Element;
  //version: string;
  className: string;
};

type CategoryTextInputConfig = BaseFileds & {
  version: string;
  placeholder: string;
};
type CategorySelectInputConfig = BaseFileds & {
  options: CategoryOptions;
  selectPlaceholder: string;
};
export const getCategoryTextInputsConfig = (
  newCategory: Category,
): CategoryTextInputConfig[] => [
  {
    id: "1",
    name: "label",
    value: newCategory.label,
    placeholder: "Nom de la catégorie (ex: salade)",
    Icon: <IoIosPricetag size={18} />,
    version: "minimalist",
    className: "category-label",
  },
];

export const getCategorySelectInputConfig = (
  newCategory: Category,
): CategorySelectInputConfig[] => [
  {
    id: "2",
    name: "color",
    value: newCategory.color,
    options: colorsOptions,
    Icon: <PiPaintBucketFill />,
    className: "category-color",
    selectPlaceholder: "Sélectionner une couleur",
  },
  {
    id: "3",
    name: "iconName",
    value: newCategory.iconName,
    options: categoryIconsOptions,
    Icon: <BsFillCameraFill />,
    className: "category-icon",
    selectPlaceholder: "Sélectionner une icône",
  },
];
