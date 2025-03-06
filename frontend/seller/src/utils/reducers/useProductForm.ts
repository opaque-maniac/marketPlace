import { useReducer } from "react";
import { Product, Categories } from "../../utils/types";

const useProductForm = (product: Product) => {
  interface State {
    name: string;
    description: string;
    buyingPrice: string;
    sellingPrice: string;
    inventory: string;
    category: Categories;
  }

  enum ActionType {
    CHANGE_NAME = "CHANGE_NAME",
    CHANGE_DESCRIPTION = "CHANGE_DESCRIPTION",
    CHANGE_BUYINGPRICE = "CHANGE_BUYINGPRICE",
    CHANGE_SELLINGPRICE = "CHANGE_SELLINGPRICE",
    CHANGE_INVENTORY = "CHANGE_INVENTORY",
    CHANGE_CATEGORY = "CHANGE_CATEGORY",
  }

  interface Action {
    type: ActionType;
    payload: string;
  }

  const initialState: State = {
    name: product.name,
    description: product.description,
    buyingPrice: product.buyingPrice.toString(),
    sellingPrice: product.sellingPrice.toString(),
    category: product.category,
    inventory: product.inventory.toString(),
  };

  const reducer = (state: State, action: Action): State => {
    switch (action.type) {
      case ActionType.CHANGE_NAME:
        return { ...state, name: action.payload };
      case ActionType.CHANGE_DESCRIPTION:
        return { ...state, name: action.payload };
      case ActionType.CHANGE_BUYINGPRICE:
        return { ...state, buyingPrice: action.payload };
      case ActionType.CHANGE_SELLINGPRICE:
        return { ...state, sellingPrice: action.payload };
      case ActionType.CHANGE_CATEGORY:
        return { ...state, category: action.payload as Categories };
      case ActionType.CHANGE_INVENTORY:
        return { ...state, inventory: action.payload };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  return {
    state,
    dispatch,
    ActionType,
  };
};

export default useProductForm;
