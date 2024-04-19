import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import DataProvider from "./providers/DataProvider.tsx";
import { ReactFlowProvider } from "reactflow";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ReactFlowProvider>
      <DataProvider>
        <App />
      </DataProvider>
    </ReactFlowProvider>
  </React.StrictMode>
);
