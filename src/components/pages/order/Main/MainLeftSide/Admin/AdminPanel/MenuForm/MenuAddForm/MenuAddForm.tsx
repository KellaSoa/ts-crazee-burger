import { useOrderContext } from "@/context/OrderContext";
import { useSuccessMessage } from "@/hooks/useSuccessMessage";
import { replaceFrenchCommaWithDot } from "@/utils/maths";
import Form from "../../Form/Form";
import SubmitButton from "../../SubmitButton";
import { useParams } from "react-router-dom";
import { displayToastNotification } from "@/utils/toast";
import { Menu } from "@/types/Menu";
import { EMPTY_MENU } from "@/enums/menu";
import {
  getCategoriesFromMenuProducts,
  getMenuPrice,
  menuFormSchema,
} from "./helper";
import { Product } from "@/types/Product";
import { Category } from "@/types/Category";

export default function MenuAddForm() {
  // state
  const { handleAddMenu, newMenu, setNewMenu } = useOrderContext();
  const { isSubmitted, displaySuccessMessage } = useSuccessMessage();
  const { username } = useParams();

  // comportements
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!username) return;

    const newMenuToAdd: Menu = {
      ...newMenu,
      id: crypto.randomUUID(),
      price: replaceFrenchCommaWithDot(newMenu.price),
    };

    // Validation avec Zod
    const result = menuFormSchema.safeParse(newMenuToAdd);
    if (!result.success) {
      result.error.issues.map((error) => {
        displayToastNotification(`${error.message}`, "error", {
          position: "bottom-right",
        });
      });
      return;
    }

    handleAddMenu(newMenuToAdd, username);
    setNewMenu(EMPTY_MENU);

    displaySuccessMessage();
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;

    let menuPrice: number | string = newMenu.price;
    let menuCategories: Category[] = newMenu.categories || [];

    if (name === "products") {
      // Toujours recalculer le prix à partir des produits sélectionnés
      menuPrice = getMenuPrice(value as unknown as Product[]);
      menuCategories = getCategoriesFromMenuProducts(
        value as unknown as Product[],
      );
    }

    if (name === "price") {
      // Permettre la saisie manuelle, mais sera écrasée si on change les produits
      //menuPrice = Number(value.replace(',', '.')) // le vrai code à conserver. This is why : https://www.tella.tv/video/cmb986cqy000i0cl24lnp14l1/edit
      menuPrice = value;
    }

    const newMenuToUpdate = {
      ...newMenu,
      [name]: value,
      price: menuPrice,
      categories: menuCategories,
    };

    // @ts-expect-error
    setNewMenu(newMenuToUpdate);
  };

  // affichage
  return (
    <Form
      product={newMenu}
      onSubmit={handleSubmit}
      onChange={handleChange}
      isMenu
    >
      <SubmitButton
        isSubmitted={isSubmitted}
        label="Ajouter un nouveau menu"
        submitMessage="Menu ajouté avec succès"
      />
    </Form>
  );
}
