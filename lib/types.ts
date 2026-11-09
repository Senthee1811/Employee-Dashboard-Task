export interface Employee {
  id: string;
  name: string;
  email: string;
  designation: string;
  department: string;
}

export type EmployeeFormData = Omit<Employee, 'id'>;

export interface EmployeeContextType {
  employees: Employee[];
  addEmployee: (employee: Employee) => void;
  updateEmployee: (id: string, updatedData: Partial<EmployeeFormData>) => void;
  removeEmployee: (id: string) => void;
  departments: string[];
}
