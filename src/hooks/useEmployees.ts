import { useContext } from "react";
import { EmployeeContext } from "../context/EmployeeContext";
import { EmployeeContextType } from "../types/employee";

export const useEmployees = (): EmployeeContextType => {
  const context = useContext(EmployeeContext);

  if (!context) {
    throw new Error("useEmployees must be used within an EmployeeProvider");
  }

  return context;
};
