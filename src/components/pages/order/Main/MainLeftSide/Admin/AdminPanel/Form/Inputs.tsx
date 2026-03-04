import React from "react";
import TextInput from "@/components/reusable-ui/TextInput";
import SelectInput from "@/components/reusable-ui/SelectInput";
import styled from "styled-components";
import { getInputTextsConfig, getSelectInputConfig } from "./inputConfig";
import { Product } from "@/types/Product";
import { FormEvents } from "@/types/FormEvents";
import MultiSelect from "@/components/reusable-ui/MultiSelect/Multiselect";
import { useOrderContext } from "@/context/OrderContext";

export type InputsProps = {
  product: Product;
} & FormEvents;

export const Inputs = React.forwardRef<HTMLInputElement, InputsProps>(
  ({ product, onChange, onFocus, onBlur }, ref) => {
    const inputTexts = getInputTextsConfig(product);
    const inputSelects = getSelectInputConfig(product);
    const { categories } = useOrderContext();

    const onChangeMulti = (selectedCategories: unknown) => {
      const eventMulti = {
        target: {
          name: "categories",
          value: selectedCategories,
        },
      } as React.ChangeEvent<HTMLInputElement | HTMLSelectElement>;
      onChange && onChange(eventMulti);
    };

    // affichage
    return (
      <InputsStyled>
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
        {/* CATEGORIES */}
        <div className="categories">
          {/*<TextInput
            {...inputTexts[2]}
            onChange={onChange}
            version="minimalist"
            onFocus={onFocus}
            onBlur={onBlur}
          />*/}
          <MultiSelect
            menuPlacement="auto"
            options={categories}
            onChange={onChangeMulti}
          />
        </div>
        {/* PRICE */}
        <TextInput
          {...inputTexts[3]}
          onChange={onChange}
          version="minimalist"
          onFocus={onFocus}
          onBlur={onBlur}
        />
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
      </InputsStyled>
    );
  },
);

const InputsStyled = styled.div`
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
  .categories {
    grid-area: 2/1/-3/-1;
  }

  // ROW 3
  .price {
    grid-area: 3/1/4/2;
  }
`;
