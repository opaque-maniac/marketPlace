import { createContext, Dispatch, SetStateAction } from "react";

export const ErrorContext = createContext<
  [boolean, Dispatch<SetStateAction<boolean>>]
>([false, () => {}]);

export const ShowErrorContext = createContext<
  [null | string, Dispatch<SetStateAction<null | string>>]
>([null, () => {}]);
