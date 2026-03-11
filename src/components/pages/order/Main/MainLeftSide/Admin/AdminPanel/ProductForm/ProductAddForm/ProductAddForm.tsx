import { useParams } from "react-router-dom";
import { useOrderContext } from "@/context/OrderContext";
import { EMPTY_PRODUCT } from "@/enums/product";
import { useSuccessMessage } from "@/hooks/useSuccessMessage";
import { replaceFrenchCommaWithDot } from "@/utils/maths";
import Form from "../../Form/Form";
import SubmitButton from "../../SubmitButton";

export default function ProductAddForm() {
  // state
  const { handleAdd, newProduct, setNewProduct } = useOrderContext();
  const { isSubmitted, displaySuccessMessage } = useSuccessMessage();
  const { username } = useParams();
  // comportements
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newProductToAdd = {
      ...newProduct,
      id: crypto.randomUUID(),
      price: replaceFrenchCommaWithDot(newProduct.price),
    };
    username && handleAdd(newProductToAdd, username);
    setNewProduct(EMPTY_PRODUCT);

    displaySuccessMessage();
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  // affichage
  return (
    <Form product={newProduct} onSubmit={handleSubmit} onChange={handleChange}>
      <SubmitButton
        isSubmitted={isSubmitted}
        label="Ajouter un nouveau produit au menu"
      />
    </Form>
  );
}
