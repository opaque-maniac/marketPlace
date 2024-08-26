import { useReducer } from "react";
import { Product } from "../../utils/types";

const useProductForm = (product: Product) => {
  enum ActionType {
    UPDATE_NAME = "UPDATE_NAME",
    UPDATE_PRICE = "UPDATE_PRICE",
    UPDATE_DESCRIPTION = "UPDATE_DESCRIPTION",
    UPDATE_CATEGORY = "UPDATE_CATEGORY",
    UPDATE_DISCOUNT = "UPDATE_DISCOUNT",
    UPDATE_INVENTORY = "UPDATE_INVENTORY",
  }

  interface Action {
    type: ActionType;
    payload: string | number;
  }

  interface State {
    name: string;
    price: string;
    description: string;
    category: string;
    discount: string | number;
    inventory: string;
  }

  const initialState: State = {
    name: product.name,
    price: product.price.toString(),
    description: product.description,
    category: product.category,
    inventory: product.inventory.toString(),
    discount: product.discountPercentage.toString(),
  };

  const reducer = (state: State, action: Action): State => {
    switch (action.type) {
      case ActionType.UPDATE_NAME:
        return { ...state, name: action.payload as string };
      case ActionType.UPDATE_PRICE:
        return { ...state, price: action.payload as string };
      case ActionType.UPDATE_DESCRIPTION:
        return { ...state, description: action.payload as string };
      case ActionType.UPDATE_CATEGORY:
        return { ...state, category: action.payload as string };
      case ActionType.UPDATE_DISCOUNT:
        return { ...state, discount: action.payload as string };
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
