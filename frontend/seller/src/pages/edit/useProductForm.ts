import { useReducer } from "react";
import { Product } from "../../utils/types";

const useProductForm = (product: Product) => {
  enum ActionType {
    UPDATE_NAME = "UPDATE_NAME",
    UPDATE_BUYINGPRICE = "UPDATE_BUYINGPRICE",
    UPDATE_SELLINGPRICE = "UPDATE_SELLINGPRICE",
    UPDATE_DESCRIPTION = "UPDATE_DESCRIPTION",
    UPDATE_CATEGORY = "UPDATE_CATEGORY",
    UPDATE_INVENTORY = "UPDATE_INVENTORY",
  }

  interface Action {
    type: ActionType;
    payload: string | number;
  }

  interface State {
    name: string;
    buyingPrice: string;
    sellingPrice: string;
    description: string;
    category: string;
    inventory: string;
  }

  const initialState: State = {
    name: product.name,
    buyingPrice: product.buyingPrice.toFixed(2),
    sellingPrice: product.sellingPrice.toFixed(2),
    description: product.description,
    category: product.category,
    inventory: product.inventory.toString(),
  };

  const reducer = (state: State, action: Action): State => {
    switch (action.type) {
      case ActionType.UPDATE_NAME:
        return { ...state, name: action.payload as string };
      case ActionType.UPDATE_BUYINGPRICE:
        return { ...state, buyingPrice: action.payload as string };
      case ActionType.UPDATE_SELLINGPRICE:
        return { ...state, sellingPrice: action.payload as string };
      case ActionType.UPDATE_DESCRIPTION:
        return { ...state, description: action.payload as string };
      case ActionType.UPDATE_CATEGORY:
        return { ...state, category: action.payload as string };
      case ActionType.UPDATE_INVENTORY:
        return { ...state, inventory: action.payload as string };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, { ...initialState });

  return {
    state,
    dispatch,
    ActionType,
  };
};

export default useProductForm;
