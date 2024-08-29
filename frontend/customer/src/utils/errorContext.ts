import { createContext } from "react";
import type { Dispatch, SetStateAction } from "react";

const ErrorContext = createContext<
  [boolean, Dispatch<SetStateAction<boolean>>]
>([false, () => {}]);

export const ShowErrorContext = createContext<
  [string | null, Dispatch<SetStateAction<string | null>>]
>([null, () => {}]);

export default ErrorContext;
