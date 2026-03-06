import { Chip } from "@/components/reusable-ui/Chip";
import { useOrderContext } from "@/context/OrderContext";
import styled from "styled-components";
import { theme } from "@/theme/theme";
import { CATEGORY_ALL } from "@/enums/categories";
import { useParams } from "react-router-dom";
import { Category } from "@/types/Category";
import { CATEGORY_MENUS } from "@/enums/menu";
import { useEffect } from "react";

export const Filters = () => {
  const { username } = useParams();

  const {
    categories,
    toggleCategoryById,
    categoryAll,
    toggleAllCategories,
    toggleMenusCategory,
    categoryMenus,
  } = useOrderContext();

  const toggleFilter = (categoryId: Category["id"]) => {
    if (categoryId === CATEGORY_ALL.id) {
      username && toggleAllCategories();
      return;
    }

    if (categoryId === CATEGORY_MENUS.id) {
      username && toggleMenusCategory();
      return;
    }

    username && toggleCategoryById(categoryId, username);
  };

  // pour faire démarrer le filtre "Menus" par défaut le temps des tests et du dev de la feature "onglet Menus"
  useEffect(() => {
    // toggleFilter(CATEGORY_ALL.id)
    toggleFilter(CATEGORY_MENUS.id);
  }, []);

  return (
    <FiltersStyled>
      <Chip
        className="filter"
        {...categoryAll}
        onClick={() => toggleFilter(CATEGORY_ALL.id)}
      />
      <Chip
        className="filter"
        {...categoryMenus}
        onClick={() => toggleFilter(categoryMenus.id)}
        color={
          categoryMenus.isActive ? theme.colors.white : categoryMenus.color
        }
        backgroundColor={theme.colors.purple}
        isActive={categoryMenus.isActive === true}
      />
      {categories.map((category) => {
        return (
          <Chip
            key={category.id}
            {...category}
            className="filter"
            onClick={() => toggleFilter(category.id)}
            color={category.color}
            isActive={category.isActive === true}
          />
        );
      })}
    </FiltersStyled>
  );
};

const FiltersStyled = styled.div`
  height: 2rem;
  display: flex;
  column-gap: 20px;
  padding: 20px 40px;
  margin: 50px 80px 30px;
  overflow-x: scroll;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE 10+ */
  background-color: transparent;
  background-color: ${theme.colors.white};
  border-radius: ${theme.borderRadius.extraRound};
  box-shadow: ${theme.shadows.medium};
  position: sticky;
  top: 30px;
  z-index: 10;

  .filter {
    cursor: pointer;
  }
`;
