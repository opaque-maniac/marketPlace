import { createContext, Dispatch, SetStateAction } from "react";

const ErrorContext = createContext<
  [boolean, Dispatch<SetStateAction<boolean>>]
>([false, () => {}]);

export default ErrorContext;
