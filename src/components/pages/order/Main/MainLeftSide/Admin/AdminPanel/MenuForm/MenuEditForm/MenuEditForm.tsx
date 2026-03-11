import { useOrderContext } from "@/context/OrderContext";
import { useSuccessMessage } from "@/hooks/useSuccessMessage";
import Form from "../../Form/Form";
import { useParams } from "react-router-dom";
import { Menu } from "@/types/Menu";
import {
  getCategoriesFromMenuProducts,
  getMenuPrice,
} from "../MenuAddForm/helper";
import { Product } from "@/types/Product";
import { Category } from "@/types/Category";
import EditInfoMessage from "../../ProductForm/ProductEditForm/EditInfoMessage";
import SavingMessage from "../../ProductForm/ProductEditForm/SavingMessage";
import { useState } from "react";

export default function MenuEditForm() {
  // state
  const [valueOnFocus, setValueOnFocus] = useState<string>();
  const { handleMenuEdit, titleMenuEditRef, menuSelected, setMenuSelected } =
    useOrderContext();
  const { isSubmitted: isSaved, displaySuccessMessage } = useSuccessMessage();
  const { username } = useParams();

  // comportements

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;

    let menuPrice: number = menuSelected.price;
    let menuCategories: Category[] = menuSelected.categories || [];

    if (name === "products") {
      // Toujours recalculer le prix à partir des produits sélectionnés
      menuPrice = getMenuPrice(value as unknown as Product[]);
      menuCategories = getCategoriesFromMenuProducts(
        value as unknown as Product[],
      );
    }

    if (name === "price") {
      menuPrice = value as unknown as number; // car "value" (de event.target) est par défaut TOUJOURS de type string (même si c'est pas vrai dans la vraie vie)
    }

    const menuBeingUpdated: Menu = {
      ...menuSelected,
      [name]: value,
      price: menuPrice,
      categories: menuCategories,
    };

    setMenuSelected(menuBeingUpdated); // je modifie l'apparence du formulaire
    username && handleMenuEdit(menuBeingUpdated, username); // je modifie les menus dans MenusCatalogue
  };

  const handleOnFocus = (
    event: React.FocusEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const valueOnFocus = event.target.value;
    setValueOnFocus(valueOnFocus);
  };

  const handleOnBlur = (
    event: React.FocusEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const valueOnBlur = event.target.value;
    if (valueOnFocus !== valueOnBlur) {
      console.log("ça a changé !!");
      displaySuccessMessage();
    }
  };

  // affichage
  return (
    <Form
      product={menuSelected}
      onChange={handleChange}
      onFocus={handleOnFocus}
      onBlur={handleOnBlur}
      isMenu
      ref={titleMenuEditRef}
    >
      {isSaved ? <SavingMessage /> : <EditInfoMessage />}
    </Form>
  );
}
