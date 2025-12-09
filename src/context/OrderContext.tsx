import {
  createContext,
  PropsWithChildren,
  useContext,
  useRef,
  useState,
} from "react";
import { useMenu } from "../hooks/useMenu";
import { useBasket } from "../hooks/useBasket";
import { EMPTY_PRODUCT } from "../enums/product";
import { findObjectById } from "@/utils/array";
import { BasketProductQuantity, MenuProduct } from "@/types/Product";
import { ADMIN_TAB_LABEL } from "@/enums/tabs";

type OrderContextType = {
  isModeAdmin: boolean;
  setIsModeAdmin: React.Dispatch<React.SetStateAction<boolean>>;

  isCollapsed: boolean;
  setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>;

  currentTabSelected: ADMIN_TAB_LABEL;
  setCurrentTabSelected: React.Dispatch<React.SetStateAction<ADMIN_TAB_LABEL>>;

  menu: MenuProduct[] | undefined;
  handleAdd: (newProduct: MenuProduct, username: string) => void;
  handleDelete: (idOfProductToDelete: string, username: string) => void;
  handleEdit: (productBeingEdited: MenuProduct, username: string) => void;
  resetMenu: (username: string) => void;

  newProduct: MenuProduct;
  setNewProduct: React.Dispatch<React.SetStateAction<MenuProduct>>;
  setMenu: React.Dispatch<React.SetStateAction<MenuProduct[] | undefined>>;

  productSelected: MenuProduct;
  setProductSelected: React.Dispatch<React.SetStateAction<MenuProduct>>;
  handleProductSelected: (idProductClicked: string) => void;

  titleEditRef: React.RefObject<HTMLInputElement>;

  basket: BasketProductQuantity[];
  setBasket: React.Dispatch<React.SetStateAction<BasketProductQuantity[]>>;
  handleAddToBasket: (idProductToAdd: string, username: string) => void;
  handleDeleteBasketProduct: (
    idBasketProductQuantity: string,
    username: string
  ) => void;
};

//1-create context
export const OrderContext = createContext<OrderContextType | undefined>(
  undefined
);

//2-install context
export const OrderContextProvider = ({ children }: PropsWithChildren) => {
  const [isModeAdmin, setIsModeAdmin] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [currentTabSelected, setCurrentTabSelected] = useState<ADMIN_TAB_LABEL>(
    ADMIN_TAB_LABEL.ADD
  );
  const [newProduct, setNewProduct] = useState<MenuProduct>(EMPTY_PRODUCT);
  const [productSelected, setProductSelected] =
    useState<MenuProduct>(EMPTY_PRODUCT);
  const titleEditRef = useRef<HTMLInputElement>(null);
  const { menu, setMenu, handleAdd, handleDelete, handleEdit, resetMenu } =
    useMenu();
  const { basket, setBasket, handleAddToBasket, handleDeleteBasketProduct } =
    useBasket();

  const handleProductSelected = async (idProductClicked: string) => {
    if (!menu) return;
    const productClickedOn = findObjectById(idProductClicked, menu);
    if (!productClickedOn) return;
    await setIsCollapsed(false);
    await setCurrentTabSelected(ADMIN_TAB_LABEL.EDIT);
    await setProductSelected(productClickedOn);
    titleEditRef.current?.focus();
  };

  const orderContextValue: OrderContextType = {
    isModeAdmin,
    setIsModeAdmin,
    isCollapsed,
    setIsCollapsed,
    currentTabSelected,
    setCurrentTabSelected,
    menu,
    setMenu,
    handleAdd,
    handleDelete,
    resetMenu,
    newProduct,
    setNewProduct,
    productSelected,
    setProductSelected,
    handleEdit,
    titleEditRef,
    basket,
    setBasket,
    handleAddToBasket,
    handleDeleteBasketProduct,
    handleProductSelected,
  };
  return (
    <OrderContext.Provider value={orderContextValue}>
      {children}
    </OrderContext.Provider>
  );
};
//3-use context
export const useOrderContext = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error(
      "useOrderContext must be used within an OrderContextProvider"
    );
  }
  return context;
};
