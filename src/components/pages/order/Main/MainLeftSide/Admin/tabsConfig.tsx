import { AiOutlinePlus } from "react-icons/ai";
import { MdModeEditOutline } from "react-icons/md";
import ProductEditForm from "./AdminPanel/ProductForm/ProductEditForm/ProductEditForm";
import HintMessage from "./AdminPanel/ProductForm/ProductEditForm/HintMessage";
import ProductAddForm from "./AdminPanel/ProductForm/ProductAddForm/ProductAddForm";
import { TabType } from "@/types/Tab";
import { ADMIN_TAB_LABEL } from "@/enums/tabs";
import { IoFastFoodOutline, IoPricetag } from "react-icons/io5";
import CategoryAddForm from "./AdminPanel/CategoryForm/CategoryAddForm";
import MenuAddForm from "./AdminPanel/MenuForm/MenuAddForm/MenuAddForm";
import MenuEditForm from "./AdminPanel/MenuForm/MenuEditForm/MenuEditForm";

export const getTabsConfig = (hasAlreadyBeenClicked?: boolean): TabType[] => [
  {
    index: ADMIN_TAB_LABEL.PRODUCT_ADD,
    label: "Créer produit",
    Icon: <AiOutlinePlus />,
    Content: <ProductAddForm />,
  },
  {
    index: ADMIN_TAB_LABEL.PRODUCT_EDIT,
    label: "Modifier produit",
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
    label: "Créer menu",
    Icon: <IoFastFoodOutline />,
    Content: <MenuAddForm />,
  },
  {
    index: ADMIN_TAB_LABEL.MENU_EDIT,
    label: "Modifier menu",
    Icon: <MdModeEditOutline />,
    Content: <MenuEditForm />,
  },
];

export const getTabSelected = (
  tabs: TabType[],
  currentTabSelected: ADMIN_TAB_LABEL,
) => {
  return tabs.find((tab) => tab.index === currentTabSelected);
};
