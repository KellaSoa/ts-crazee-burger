//@ts-nocheck
import styled from "styled-components";
import { useOrderContext } from "@/context/OrderContext";
import { theme } from "@/theme/theme";
import Admin from "./Admin/Admin";
import CatalogProducts from "./CatalogProducts/CatalogProducts";
import { Filters } from "./Filters";
import LoadingMessage from "./CatalogProducts/LoadingMessage";

export default function MainLeftSide() {
  const { isModeAdmin, menu } = useOrderContext();

  return (
    <MainLeftSideStyled>
      {menu === undefined ? (
        <LoadingMessage />
      ) : (
        <div className="filters-and-catalog-products">
          <Filters />
          <CatalogProducts />
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
