import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function NoStaleQueryClientWrapper({ children }: Props) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: true,
        refetchInterval: 0,
        refetchOnMount: true,
        staleTime: 0,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
