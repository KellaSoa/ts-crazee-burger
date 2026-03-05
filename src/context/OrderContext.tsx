import {
  createContext,
  PropsWithChildren,
  useContext,
  useRef,
  useState,
} from "react";
import { useProducts } from "@/hooks/useProducts";
import { useBasket } from "@/hooks/useBasket";
import { findObjectById } from "@/utils/array";
import { EMPTY_PRODUCT } from "@/enums/product";
import { BasketProductQuantity, Product } from "@/types/Product";
import { ADMIN_TAB_LABEL } from "@/enums/tabs";
import { useCategories } from "@/hooks/useCategories";
import { Category } from "@/types/Category";
import { DEFAULT_CATEGORY } from "@/enums/categories";

type OrderContextType = {
  isModeAdmin: boolean;
  setIsModeAdmin: React.Dispatch<React.SetStateAction<boolean>>;
  isCollapsed: boolean;
  setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  currentTabSelected: ADMIN_TAB_LABEL;
  setCurrentTabSelected: React.Dispatch<React.SetStateAction<ADMIN_TAB_LABEL>>;
  products: Product[] | undefined;
  setProducts: React.Dispatch<React.SetStateAction<Product[] | undefined>>;
  handleAdd: (newProduct: Product, username: string) => void;
  handleDelete: (idOfProductToDelete: string, username: string) => void;
  resetProducts: (username: string) => void;
  newProduct: Product;
  setNewProduct: React.Dispatch<React.SetStateAction<Product>>;
  productSelected: Product;
  setProductSelected: React.Dispatch<React.SetStateAction<Product>>;
  handleEdit: (productBeingEdited: Product, username: string) => void;
  titleEditRef: React.RefObject<HTMLInputElement>;
  basket: BasketProductQuantity[];
  setBasket: React.Dispatch<React.SetStateAction<BasketProductQuantity[]>>;
  handleAddToBasket: (idProductToAdd: string, username: string) => void;
  handleDeleteBasketProduct: (
    idBasketProduct: string,
    username: string,
  ) => void;
  handleProductSelected: (idProductClicked: string) => Promise<void>;
  hidePanel: () => void;
  categories: Category[];
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
  handleAddCategory: (newCategory: Category, username: string) => void;
  toggleCategoryById: (categoryIdToToggle: string, username: string) => void;
  categoryAll: Category;
  toggleAllCategories: () => void;
  toggleMenusCategory: () => void;
  categoryMenus: Category;
  newCategory: Category;
  setNewCategory: React.Dispatch<React.SetStateAction<Category>>;
};

// 1. Création du context
const OrderContext = createContext<OrderContextType | undefined>(undefined); // pas la peine de mettre null, undefined suffit amplement mais faut l'écrire explicitmeent car createContext attend forcément un argument.

// 2. Installation du context
export const OrderContextProvider = ({ children }: PropsWithChildren) => {
  const [isModeAdmin, setIsModeAdmin] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [currentTabSelected, setCurrentTabSelected] = useState<ADMIN_TAB_LABEL>(
    ADMIN_TAB_LABEL.PRODUCT_ADD,
  );
  const [newProduct, setNewProduct] = useState(EMPTY_PRODUCT);
  const [newCategory, setNewCategory] = useState(DEFAULT_CATEGORY);
  const [productSelected, setProductSelected] =
    useState<Product>(EMPTY_PRODUCT);
  const titleEditRef = useRef<HTMLInputElement>(null);
  const {
    products,
    setProducts,
    handleAdd,
    handleDelete,
    handleEdit,
    resetProducts,
  } = useProducts();
  const { basket, setBasket, handleAddToBasket, handleDeleteBasketProduct } =
    useBasket();
  const {
    categories,
    setCategories,
    handleAddCategory,
    toggleCategoryById,
    categoryAll,
    toggleAllCategories,
    toggleMenusCategory,
    categoryMenus,
  } = useCategories();

  const handleProductSelected = async (idProductClicked: string) => {
    if (!isModeAdmin || !products) return;
    const productClickedOn = findObjectById(idProductClicked, products);
    if (!productClickedOn) return;
    await setIsCollapsed(false);
    await setCurrentTabSelected(ADMIN_TAB_LABEL.PRODUCT_EDIT);
    await setProductSelected(productClickedOn);
    // titleEditRef.current && titleEditRef.current.focus() // ériture équivalente
    titleEditRef.current?.focus();
  };

  const hidePanel = () => {
    isModeAdmin && setIsCollapsed(!isCollapsed);
  };

  const orderContextValue: OrderContextType = {
    isModeAdmin,
    setIsModeAdmin,
    isCollapsed,
    setIsCollapsed,
    currentTabSelected,
    setCurrentTabSelected,
    products,
    setProducts,
    handleAdd,
    handleDelete,
    resetProducts,
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
    hidePanel,
    categories,
    handleAddCategory,
    setCategories,
    toggleCategoryById,
    categoryAll,
    toggleAllCategories,
    toggleMenusCategory,
    categoryMenus,
    newCategory,
    setNewCategory,
  };

  return (
    <OrderContext.Provider value={orderContextValue}>
      {children}
    </OrderContext.Provider>
  );
};

// 3. Consommation du context
export const useOrderContext = () => {
  const orderContextData = useContext(OrderContext);
  if (orderContextData === undefined)
    throw new Error(
      "useOrderContext() can only be used within OrderContextProvider",
    );

  return orderContextData;
};
