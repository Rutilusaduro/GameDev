import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import ProfessorSim from "./ProfessorSim";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ProfessorSim />
  </StrictMode>
);
