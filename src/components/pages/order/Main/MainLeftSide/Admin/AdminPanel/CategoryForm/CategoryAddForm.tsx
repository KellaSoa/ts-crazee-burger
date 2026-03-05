import { useOrderContext } from "@/context/OrderContext";
import { useSuccessMessage } from "@/hooks/useSuccessMessage";
import SubmitButton from "../SubmitButton";
import styled from "styled-components";
import { theme } from "@/theme/theme";
import CategoryPreview from "./CategoryPreview";
import TextInput from "@/components/reusable-ui/TextInput";
import SelectInput from "@/components/reusable-ui/SelectInput";
import {
  getCategorySelectInputConfig,
  getCategoryTextInputsConfig,
} from "./categoryFormConfig";
import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

import { EMPTY_CATEGORY } from "@/enums/categories";
import z from "zod";

const categoryIconSchema = z.enum([
  "sandwich",
  "verre",
  "veggies",
  "dessert",
  "frites",
  "chocolateBar",
]);

const categoryFormSchemaStrict = z.object({
  id: z.uuid(),
  label: z
    .string()
    .nonempty("Veuillez entrer un nom de catégorie")
    .min(2, "La catégorie doit contenir au moins 2 caractères")
    .max(20, "La catégorie ne peut pas dépasser 20 caractères")
    .regex(
      /^[\p{L}\s'-]+$/u,
      "La catégorie ne doit contenir que des lettres, des espaces, des tirets ou des apostrophes",
    ),
  color: z.string().min(1, "Veuillez choisir une couleur de catégorie"),
  icon: categoryIconSchema.optional(),
});

export default function CategoryAddForm() {
  // state
  const { newCategory, setNewCategory, handleAddCategory } = useOrderContext();
  const { isSubmitted, displaySuccessMessage } = useSuccessMessage();

  //@ts-ignore
  const { username } = useParams();
  const labelInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    labelInputRef && labelInputRef.current?.focus();
  }, []);
  // comportements
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!username) return;

    const newCategoryToAdd = {
      ...newCategory,
      id: crypto.randomUUID(),
    };

    const result = categoryFormSchemaStrict.safeParse(newCategoryToAdd);
    if (!result.success) {
      result.error.issues.map((error) => {
        alert(`${error.message}`);
      });
      return;
    }

    handleAddCategory(newCategoryToAdd, username);
    setNewCategory(EMPTY_CATEGORY);

    displaySuccessMessage();
  };

  const handleChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;
    console.log("name: ", name);
    console.log("value: ", value);
    setNewCategory({ ...newCategory, [name]: value });
  };

  const [labelFieldConfig] = getCategoryTextInputsConfig(newCategory);
  const [colorFieldConfig, iconFieldConfig] =
    getCategorySelectInputConfig(newCategory);

  // affichage
  return (
    <CategoryFormStyled onSubmit={handleSubmit}>
      <CategoryPreview
        id={newCategory.id}
        label={newCategory.label}
        color={newCategory.color}
        iconName={newCategory.iconName}
        className="category-preview"
      />
      <TextInput
        {...labelFieldConfig}
        onChange={handleChange}
        version="minimalist"
        ref={labelInputRef}
      />
      <SelectInput
        {...colorFieldConfig}
        options={colorFieldConfig.options}
        onChange={handleChange}
      />
      <SelectInput
        {...iconFieldConfig}
        id={iconFieldConfig.id}
        options={iconFieldConfig.options}
        className={iconFieldConfig.className}
        onChange={handleChange}
      />
      <div className="form-footer">
        <SubmitButton
          isSubmitted={isSubmitted}
          label="Créer une nouvelle catégorie"
          submitMessage="Nouvelle catégorie créée"
        />
      </div>
    </CategoryFormStyled>
  );
}

const CategoryFormStyled = styled.form`
  /* border: 2px solid black; */
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-template-rows: repeat(4, 1fr);
  height: 100%;
  width: 100%;
  grid-column-gap: 20px;
  grid-row-gap: 8px;

  .category-preview {
    grid-column: 1/2;
    border: 1px solid ${theme.colors.greyLight};
    border-radius: ${theme.borderRadius.round};
  }

  .form-footer {
    /* background: green; */
    grid-area: 4 / -2 / -1 / -1;
    display: flex;
    align-items: center;
    position: relative;
    top: 3px;
  }
`;
