import { isEmpty } from "@/utils/array";
import { useOrderContext } from "@/context/OrderContext";
import EmptyBasket from "./EmptyBasket";
import BasketItems from "./BasketItems";

export default function BasketBody() {
  const { basket, products } = useOrderContext();

  return (
    <>
      {isEmpty(basket) ? (
        <EmptyBasket isLoading={products === undefined} />
      ) : (
        <BasketItems />
      )}
    </>
  );
}
