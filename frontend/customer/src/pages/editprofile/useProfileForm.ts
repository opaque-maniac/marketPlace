import { useReducer } from "react";
import { Customer } from "../../utils/types";

const useProfileForm = (profile: Customer) => {
  interface State {
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    phone: string;
  }

  enum ActionType {
    CHANGE_FIRSTNAME = "CHANGE_FIRSNAME",
    CHANGE_LASTNAME = "CHANGE_LASTNAME",
    CHANGE_EMAIL = "CHANGE_EMAIL",
    CHANGE_ADDRESS = "CHANGE_ADDRESS",
    CHANGE_PHONE = "CHANGE_PHONE",
  }

  interface Action {
    type: ActionType;
    payload: string;
  }

  const initialState: State = {
    firstName: profile.firstName,
    lastName: profile.lastName,
    email: profile.email,
    address: profile.address ?? "",
    phone: profile.phone ?? "",
  };

  const reducer = (state: State, action: Action): State => {
    switch (action.type) {
      case ActionType.CHANGE_FIRSTNAME:
        return { ...state, firstName: action.payload };
      case ActionType.CHANGE_LASTNAME:
        return { ...state, lastName: action.payload };
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
