import { AiOutlinePlus } from "react-icons/ai";
import { MdModeEditOutline } from "react-icons/md";
//@ts-ignore
import ProductEditForm from "./AdminPanel/ProductForm/ProductEditForm/ProductEditForm";
//@ts-ignore
import HintMessage from "./AdminPanel/ProductForm/ProductEditForm/HintMessage";
//@ts-ignore
import ProductAddForm from "./AdminPanel/ProductForm/ProductAddForm/ProductAddForm";
import { TabType } from "@/types/Tab";
import { ADMIN_TAB_LABEL } from "@/enums/tabs";
import { IoFastFoodOutline, IoPricetag } from "react-icons/io5";
import CategoryAddForm from "./AdminPanel/CategoryForm/CategoryAddForm";
import MenuAddForm from "./AdminPanel/MenuForm/MenuAddForm/MenuAddForm";

export const getTabsConfig = (hasAlreadyBeenClicked?: boolean): TabType[] => [
  {
    index: ADMIN_TAB_LABEL.PRODUCT_ADD,
    label: "Ajouter un produit",
    Icon: <AiOutlinePlus />,
    Content: <ProductAddForm />,
  },
  {
    index: ADMIN_TAB_LABEL.PRODUCT_EDIT,
    label: "Modifier un produit",
    Icon: <MdModeEditOutline />,
    Content: hasAlreadyBeenClicked ? <ProductEditForm /> : <HintMessage />,
  },
  {
    index: ADMIN_TAB_LABEL.CATEGORY_ADD,
    label: "Créer une catégorie",
    Icon: <IoPricetag />,
    Content: <CategoryAddForm />,
  },
  {
    index: ADMIN_TAB_LABEL.MENU_ADD,
    label: "Créer un menu",
    Icon: <IoFastFoodOutline />,
    Content: <MenuAddForm />,
  },
];

export const getTabSelected = (
  tabs: TabType[],
  currentTabSelected: ADMIN_TAB_LABEL,
) => {
  console.log("Current tab selected:", currentTabSelected);
  return tabs.find((tab) => tab.index === currentTabSelected);
};
