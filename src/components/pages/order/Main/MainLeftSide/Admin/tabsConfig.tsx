import { AiOutlinePlus } from "react-icons/ai";
import { MdModeEditOutline } from "react-icons/md";
import EditForm from "./AdminPanel/EditForm/EditForm";
import HintMessage from "./AdminPanel/EditForm/HintMessage";
import AddForm from "./AdminPanel/AddForm/AddForm";
import { ADMIN_TAB_LABEL } from "@/enums/tabs";
import { TabType } from "@/types/Tab";

export const getTabsConfig = (hasAlreadyBeenClicked?: boolean): TabType[] => [
  {
    index: ADMIN_TAB_LABEL.ADD,
    label: "Ajouter un produit",
    Icon: <AiOutlinePlus />,
    Content: <AddForm />,
  },
  {
    index: ADMIN_TAB_LABEL.EDIT,
    label: "Modifier un produit",
    Icon: <MdModeEditOutline />,
    Content: hasAlreadyBeenClicked ? <EditForm /> : <HintMessage />,
  },
];

export const getTabSelected = (
  tabs: TabType[],
  currentTabSelected: ADMIN_TAB_LABEL
) => {
  return tabs.find((tab) => tab.index === currentTabSelected);
};
