import styled from "styled-components";
import { useOrderContext } from "@/context/OrderContext";
import { theme } from "@/theme/theme";
import { formatPrice } from "@/utils/maths";
import Card from "@/components/reusable-ui/Card";
import EmptyCatalogProductsAdmin from "./EmptyCataglogProductsAdmin";
import EmptyCatalogProductsClient from "./EmptyCatalogProductsClient";
import { checkIfProductIsClicked, getProductsToDisplay } from "./helper";
import {
  EMPTY_PRODUCT,
  IMAGE_COMING_SOON,
  IMAGE_NO_STOCK,
} from "@/enums/product";
import { getCategoryActive, isEmpty } from "@/utils/array";
import LoadingMessage from "./LoadingMessage";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { menuAnimation } from "@/theme/animations";
import { convertStringToBoolean } from "@/utils/string";
import RibbonAnimated, { ribbonAnimation } from "./RibbonAnimated";
import { useParams } from "react-router-dom";

export default function CatalogProducts() {
  const {
    menu,
    isModeAdmin,
    handleDelete,
    resetMenu,
    productSelected,
    setProductSelected,
    handleAddToBasket,
    handleDeleteBasketProduct,
    handleProductSelected,
    categories,
    categoryAll,
  } = useOrderContext();
  // state

  const { username } = useParams();

  // comportements (gestionnaires d'événement ou "event handlers")
  const handleCardDelete = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    idProductToDelete: string,
  ) => {
    event.stopPropagation();
    if (!username) return;
    handleDelete(idProductToDelete, username);
    handleDeleteBasketProduct(idProductToDelete, username);
    idProductToDelete === productSelected.id &&
      setProductSelected(EMPTY_PRODUCT);
  };

  const handleAddButton = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    idProductToAdd: string,
  ) => {
    event.stopPropagation();
    username && handleAddToBasket(idProductToAdd, username);
  };

  let cardContainerClassName = isModeAdmin
    ? "card-container is-hoverable"
    : "card-container";

  // affichage
  if (menu === undefined) return <LoadingMessage />;

  if (isEmpty(menu)) {
    if (!isModeAdmin) return <EmptyCatalogProductsClient />;
    if (username)
      return <EmptyCatalogProductsAdmin onReset={() => resetMenu(username)} />;
  }
  const activeCategory = getCategoryActive(categories);
  const productsToDisplay = getProductsToDisplay(
    categoryAll,
    menu,
    activeCategory,
  );

  return (
    <TransitionGroup component={CatalogProductsStyled} className="menu">
      {productsToDisplay.map(
        ({
          id,
          title,
          imageSource,
          price,
          isAvailable,
          isPublicised,
          categories,
        }) => {
          return (
            <CSSTransition classNames={"menu-animation"} key={id} timeout={300}>
              <div className={cardContainerClassName}>
                {convertStringToBoolean(isPublicised) && <RibbonAnimated />}
                <Card
                  title={title}
                  imageSource={imageSource ? imageSource : IMAGE_COMING_SOON}
                  leftDescription={formatPrice(price)}
                  hasDeleteButton={isModeAdmin}
                  onDelete={(event) => handleCardDelete(event, id)}
                  onClick={() => handleProductSelected(id)}
                  isHoverable={isModeAdmin}
                  isSelected={checkIfProductIsClicked(id, productSelected.id)}
                  onAdd={(event) => handleAddButton(event, id)}
                  overlapImageSource={IMAGE_NO_STOCK}
                  isOverlapImageVisible={
                    convertStringToBoolean(isAvailable) === false
                  }
                  categories={categories}
                />
              </div>
            </CSSTransition>
          );
        },
      )}
    </TransitionGroup>
  );
}

const CatalogProductsStyled = styled.div`
  background: transparent;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  /* grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); */
  grid-row-gap: 100px;
  padding: 20px 50px 150px;
  justify-items: center;
  overflow-y: scroll;
  margin-bottom: 220px;

  ${menuAnimation}

  .card-container {
    position: relative;
    height: 330px; // pour éviter une zone de click verticale bizarre qu'on voit qu'au pointeur de l'outil inspect du navigateur
    border-radius: ${theme.borderRadius.extraRound};

    &.is-hoverable {
      :hover {
        /* border: 1px solid red; */
        transform: scale(1.05);
        transition: ease-out 0.4s;
      }
    }
  }

  .ribbon {
    z-index: 2;
  }
  ${ribbonAnimation}
`;
