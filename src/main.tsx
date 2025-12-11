import { createRoot } from "react-dom/client";
import "./index.css";
import { ThemeProvider } from "styled-components";
import { theme } from "./theme";
import { RouterProvider } from "react-router-dom";
import { router } from "./routers/router";
import { OrderContextProvider } from "./context/OrderContext";

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find the root element");

createRoot(rootElement).render(
  <ThemeProvider theme={theme}>
    <OrderContextProvider>
      <RouterProvider router={router} />
    </OrderContextProvider>
  </ThemeProvider>
);
