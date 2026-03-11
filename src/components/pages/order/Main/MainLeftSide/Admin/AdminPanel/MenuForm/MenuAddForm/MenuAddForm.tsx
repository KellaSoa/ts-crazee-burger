import { useOrderContext } from "@/context/OrderContext";
import { useSuccessMessage } from "@/hooks/useSuccessMessage";
import { replaceFrenchCommaWithDot } from "@/utils/maths";
import Form from "../../Form/Form";
import { useParams } from "react-router-dom";
import { displayToastNotification } from "@/utils/toast";
import { Menu } from "@/types/Menu";
import {
  getCategoriesFromMenuProducts,
  getMenuPrice,
  menuFormSchema,
} from "../MenuAddForm/helper";
import { Product } from "@/types/Product";
import { Category } from "@/types/Category";
import { EMPTY_MENU } from "@/enums/menu";
import SubmitButton from "../../SubmitButton";

export default function MenuAddForm() {
  // state
  const { handleAddMenu, newMenu, setNewMenu, titleMenuEditRef } =
    useOrderContext();
  const { isSubmitted, displaySuccessMessage } = useSuccessMessage();
  const { username } = useParams();

  // comportements
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!username) return;

    const menuToUpdate: Menu = {
      ...newMenu,
      id: crypto.randomUUID(),
      price: replaceFrenchCommaWithDot(newMenu.price),
    };

    // Validation avec Zod
    const result = menuFormSchema.safeParse(menuToUpdate);
    if (!result.success) {
      result.error.issues.map((error) => {
        displayToastNotification(`${error.message}`, "error", {
          position: "bottom-right",
        });
      });
      return;
    }

    handleAddMenu(menuToUpdate, username);
    setNewMenu(EMPTY_MENU);

    displaySuccessMessage();
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;

    let menuPrice: number = newMenu.price;
    let menuCategories: Category[] = newMenu.categories || [];

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

    const menuToUpdate: Menu = {
      ...newMenu,
      [name]: value,
      price: menuPrice,
      categories: menuCategories,
    };

    setNewMenu(menuToUpdate);
  };

  // affichage
  return (
    <Form
      product={newMenu}
      onSubmit={handleSubmit}
      onChange={handleChange}
      isMenu
      ref={titleMenuEditRef}
    >
      <SubmitButton
        isSubmitted={isSubmitted}
        label="Ajouter un nouveau menu"
        submitMessage="Menu ajouté avec succès"
      />
    </Form>
  );
}
