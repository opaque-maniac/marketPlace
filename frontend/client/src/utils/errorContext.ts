import { createContext } from "react";

const ErrorContext = createContext<[boolean, (error: boolean) => void]>([
  false,
  () => {},
]);

export default ErrorContext;
