import { useReducer } from "react";
import { Seller } from "../../utils/types";

const useProfileForm = (profile: Seller) => {
  interface State {
    name: string;
    email: string;
    address: string;
    phone: string;
  }

  enum ActionType {
    CHANGE_NAME = "CHANGE_NAME",
    CHANGE_EMAIL = "CHANGE_EMAIL",
    CHANGE_ADDRESS = "CHANGE_ADDRESS",
    CHANGE_PHONE = "CHANGE_PHONE",
  }

  interface Action {
    type: ActionType;
    payload: string;
  }

  const initialState: State = {
    name: profile.name,
    email: profile.email,
    address: profile.address ?? "",
    phone: profile.phone ?? "",
  };

  const reducer = (state: State, action: Action): State => {
    switch (action.type) {
      case ActionType.CHANGE_NAME:
        return { ...state, name: action.payload };
      case ActionType.CHANGE_EMAIL:
        return { ...state, email: action.payload };
      case ActionType.CHANGE_ADDRESS:
        return { ...state, address: action.payload };
      case ActionType.CHANGE_PHONE:
        return { ...state, phone: action.payload };
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

export default useProfileForm;
