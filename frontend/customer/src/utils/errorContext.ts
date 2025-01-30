import { createContext } from "react";
import type { Dispatch, SetStateAction } from "react";

export const ErrorContext = createContext<
  [boolean, Dispatch<SetStateAction<boolean>>]
>([false, () => {}]);

export const ShowErrorContext = createContext<
  [string | null, Dispatch<SetStateAction<string | null>>]
>([null, () => {}]);

export const ShowMessageContext = createContext<
  [string | null, Dispatch<SetStateAction<string | null>>]
>([null, () => {}]);
