import React, { useEffect, useState } from "react";
import TextInput from "@/components/reusable-ui/TextInput";
import SelectInput from "@/components/reusable-ui/SelectInput";
import styled from "styled-components";
import { getInputTextsConfig, getSelectInputConfig } from "./menuInputsConfig";
import { FormEvents } from "@/types/FormEvents";
import { MultipleSelect } from "@/components/reusable-ui/MultiSelect/MultipleSelect";
import { useOrderContext } from "@/context/OrderContext";
import { MultiValue } from "react-select";
import { IoPricetag } from "react-icons/io5";
import { Menu } from "@/types/Menu";
import { Product } from "@/types/Product";
import PriceAnimated from "./PriceAnimated";

export type MenuInputsProps = {
  menu: Menu;
} & FormEvents;

export const getMultiSelectedProductOptions = (products: Product[]) => {
  return products
    ? products.map((product) => {
        return {
          ...product,
          label: product.title, // "label" rajouté ici pour satisfaire aux props "options" qui exige au moins la propriété "label" dans le MultiSelect plus bas
          value: product.id, // "value" rajouté ici pour satisfaire aux props "options" qui exige au moins la propriété "value" dans le MultiSelect plus bas
        };
      })
    : [];
};

export const MenuInputs = React.forwardRef<HTMLInputElement, MenuInputsProps>(
  ({ menu, onChange, onFocus, onBlur }, ref) => {
    const { products } = useOrderContext();
    const [previousMenu, setPreviousMenu] =
      useState<Pick<Menu, "id" | "price">>(menu);
    const [isPriceAnimationVisible, setIsPriceAnimationVisible] =
      useState(false);
    const [addedProductPrice, setAddedProductPrice] = useState(0);

    type MultiSelectOption = { value: string; label: string };

    // Duck Typing : si au moins y'a un Product c'est ok, même si y'a plusse de propriétés que prévu dans le type attendu.
    const multiSelectProductOptions: (MultiSelectOption & Product)[] =
      getMultiSelectedProductOptions(products || []);

    const inputTexts = getInputTextsConfig(menu);
    const inputSelects = getSelectInputConfig(menu);

    // useEffet pour détecter l'augmentation du prix et calculer le prix du produit ajouté
    useEffect(() => {
      const isSameMenu = menu.id === previousMenu.id;
      const hasMenuPriceChanged = menu.price > previousMenu.price;
      const hasMenuAtLeastOneProduct = menu?.products?.length > 1;

      // en gros, faut 3 conditions pour activer l'animation du prix "mustActivatePriceAnimation"
      const mustActivatePriceAnimation =
        isSameMenu && hasMenuAtLeastOneProduct && hasMenuPriceChanged;

      if (mustActivatePriceAnimation) {
        const productPriceJustAdded = menu.price - previousMenu.price;
        setAddedProductPrice(productPriceJustAdded);
        setIsPriceAnimationVisible(true);
      }

      setPreviousMenu({
        price: menu.price,
        id: menu.id,
      });
    }, [menu.price, menu.id, previousMenu.price, previousMenu.id]);

    const onChangeMulti = (selectedProducts: MultiValue<Product>) => {
      const eventMulti = {
        target: {
          name: "products",
          value: selectedProducts,
        },
      } as unknown as React.ChangeEvent<HTMLInputElement | HTMLSelectElement>;
      onChange && onChange(eventMulti);
    };

    const handlePriceAnimationEnd = () => {
      setIsPriceAnimationVisible(false);
    };

    // affichage
    return (
      <MenuInputsStyled>
        <div className="first-row">
          {/* NAME */}
          <TextInput
            {...inputTexts[0]}
            onChange={onChange}
            version="minimalist"
            onFocus={onFocus}
            onBlur={onBlur}
            ref={ref && inputTexts[0].name === "title" ? ref : null}
          />
          {/* IMAGE URL */}
          <TextInput
            {...inputTexts[1]}
            onChange={onChange}
            version="minimalist"
            onFocus={onFocus}
            onBlur={onBlur}
          />
        </div>
        {/* PRODUCTS INCLUS DANS LE MENU */}
        <div className="products">
          <MultipleSelect
            menuPlacement="auto"
            options={multiSelectProductOptions}
            onChange={onChangeMulti}
            customIcon={IoPricetag}
            placeholder="Produits inclus dans le menu"
            value={menu.products}
            onFocus={onFocus}
            onBlur={onBlur}
          />
        </div>
        {/* PRICE */}
        <div className="price-container">
          <PriceAnimated
            isVisible={isPriceAnimationVisible}
            onAnimationEnd={handlePriceAnimationEnd}
            className="price-animated"
            price={addedProductPrice}
          />
          <TextInput
            {...inputTexts[3]}
            onChange={onChange}
            version="minimalist"
            onFocus={onFocus}
            onBlur={onBlur}
          />
        </div>
        {/* STOCK ET PUB */}
        {inputSelects.map((inputSelect) => (
          <SelectInput
            {...inputSelect}
            key={inputSelect.id}
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
          />
        ))}
      </MenuInputsStyled>
    );
  },
);

const MenuInputsStyled = styled.div`
  /* border: 1px solid red; */
  /* background: blue; */
  grid-area: 1 / 2 / -2 / 3;

  display: grid;
  grid-template-rows: repeat(3, 1fr);
  grid-template-columns: repeat(3, 1fr);
  grid-row-gap: 8px;
  grid-column-gap: 8px;

  // ROW 1
  .first-row {
    grid-area: 1/1/2/4;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 8px;

    .title {
      grid-template-areas: 1/1/2/2;
      /* border: 1px solid blue; */
    }

    .image-source {
      grid-template-areas: 1/2/-1/-1;
      /* border: 1px solid green; */
      /* overflow: hidden;  */
      min-width: 0; // hyper important pour empecher le Select de déborder sur la largeur.
    }
  }

  // ROW 2
  .products {
    grid-area: 2/1/-3/-1;
  }

  // ROW 3
  .price-container {
    grid-area: 3/1/4/2;
    position: relative;
    display: grid;
  }
`;
