//@ts-nocheck
import styled from "styled-components";
import { useOrderContext } from "@/context/OrderContext";
import { theme } from "@/theme/theme";
import Admin from "./Admin/Admin";
import CatalogProducts from "./CatalogProducts/CatalogProducts";
import { Filters } from "./Filters";
import LoadingMessage from "./CatalogProducts/LoadingMessage";
import CatalogMenus from "./CatalogMenus/CatalogMenus";

export default function MainLeftSide() {
  const { isModeAdmin, products, menus, categoryMenus } = useOrderContext();
  console.log("products:", products);
  return (
    <MainLeftSideStyled>
      {products === undefined ? (
        <LoadingMessage />
      ) : (
        <div className="filters-and-catalog-products">
          <Filters />
          {categoryMenus.isActive ? (
            <CatalogMenus menus={menus} />
          ) : (
            <CatalogProducts products={products} />
          )}
        </div>
      )}
      {isModeAdmin && <Admin />}
    </MainLeftSideStyled>
  );
}

const MainLeftSideStyled = styled.div`
  position: relative;
  overflow-y: hidden;
  display: grid;
  box-shadow: ${theme.shadows.strong};

  .filters-and-catalog-products {
    overflow-x: hidden;
  }
`;
