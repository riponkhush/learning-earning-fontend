
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@material-tailwind/react";
import { MaterialTailwindControllerProvider } from "@/context";
import "../public/css/tailwind.css";
import AuthProvider from "./providers/AuthProvider";
import { Toaster } from "react-hot-toast";
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'
const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
      
        <AuthProvider>
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
              <ThemeProvider>
                <MaterialTailwindControllerProvider>
                <Toaster />
                  <App />
                </MaterialTailwindControllerProvider>
              </ThemeProvider>
            </BrowserRouter>
            </QueryClientProvider>
        </AuthProvider>
    
  </React.StrictMode>
);
