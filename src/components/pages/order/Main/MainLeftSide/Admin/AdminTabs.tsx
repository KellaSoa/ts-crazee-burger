import styled from "styled-components";
import Tab from "@/components/reusable-ui/Tab";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { theme } from "@/theme/theme";
import { useOrderContext } from "@/context/OrderContext";
import { getTabsConfig } from "./tabsConfig";
import { ADMIN_TAB_LABEL } from "@/enums/tabs";

export default function AdminTabs() {
  // state
  const {
    isCollapsed,
    setIsCollapsed,
    currentTabSelected,
    setCurrentTabSelected,
  } = useOrderContext();

  // comportements
  const selectTab = (tabSelected: ADMIN_TAB_LABEL) => {
    setIsCollapsed(false); // tu m'ouvres le pannel
    setCurrentTabSelected(tabSelected);
  };

  const tabs = getTabsConfig();

  const getClassNameToApply = (tabIndex: ADMIN_TAB_LABEL): string => {
    if (
      tabIndex === ADMIN_TAB_LABEL.MENU_ADD ||
      tabIndex === ADMIN_TAB_LABEL.MENU_EDIT
    )
      // pour que les onglets "menus" du panel admin apparaissent en violet quand on clique sur l'un d'entre eux.
      return currentTabSelected === tabIndex ? "is-products-tab-active" : "";

    return currentTabSelected === tabIndex ? "is-active" : ""; // sinon en fond noir pour les onglets "produits"
  };

  // affichage
  return (
    <AdminTabsStyled>
      <Tab
        index={ADMIN_TAB_LABEL.CHEVRON}
        label=""
        Icon={isCollapsed ? <FiChevronUp /> : <FiChevronDown />}
        onClick={() => setIsCollapsed(!isCollapsed)}
        className={isCollapsed ? "is-active" : ""}
      />
      {tabs.map((tab) => (
        <Tab
          key={tab.index}
          index={tab.index}
          label={tab.label}
          Icon={tab.Icon}
          onClick={() => selectTab(tab.index)}
          className={getClassNameToApply(tab.index)}
        />
      ))}
    </AdminTabsStyled>
  );
}

const AdminTabsStyled = styled.div`
  display: flex;
  position: absolute;
  top: -43px;
  left: 5%;

  .is-active {
    background: ${theme.colors.background_dark};
    border-color: ${theme.colors.background_dark};
    color: ${theme.colors.white};
  }

  .is-products-tab-active {
    background: ${theme.colors.purple};
    border-color: ${theme.colors.purple};
    color: ${theme.colors.white};
  }
  button {
    margin-left: 1px;
  }
`;
