import { createContext } from 'react';
import { EmployeeContextType } from '../types/employee';

export const EmployeeContext = createContext<EmployeeContextType | null>(null);

