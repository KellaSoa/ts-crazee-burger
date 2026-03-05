import { isEmpty } from "@/utils/array";
import { useOrderContext } from "@/context/OrderContext";
import EmptyBasket from "./EmptyBasket";
import BasketProducts from "./BasketProducts";

export default function BasketBody() {
  const { basket, products } = useOrderContext();

  return (
    <>
      {isEmpty(basket) ? (
        <EmptyBasket isLoading={products === undefined} />
      ) : (
        <BasketProducts />
      )}
    </>
  );
}
