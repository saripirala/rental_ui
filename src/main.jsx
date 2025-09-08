import React from "react";
import ReactDOM from "react-dom/client";
import RentalApp from "./RentalApp";   // ✅ your main app
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RentalApp />
  </React.StrictMode>
);
