import { createContext, Dispatch, SetStateAction } from "react";

const ValidationContext = createContext<
  [null | string, Dispatch<SetStateAction<string | null>>]
>([null, () => {}]);

export default ValidationContext;
