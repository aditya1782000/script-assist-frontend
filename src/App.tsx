import { RouterProvider } from "react-router-dom";
import "./App.scss";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { router } from "./navigation/router";
import { MantineProvider } from "@mantine/core";
import { theme } from "./theme";
import { ToastContainer } from "react-toastify";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      cacheTime: 1000 * 60 * 15,
    },
  },
});
export default function App() {
  return (
    <MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ToastContainer />
      </QueryClientProvider>
    </MantineProvider>
  );
}
