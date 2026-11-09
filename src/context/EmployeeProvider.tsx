import { useState, useEffect, ReactNode } from 'react';
import { EmployeeContext } from './EmployeeContext';
import { Employee, EmployeeFormData, EmployeeContextType } from '../types/employee';

const SEED_EMPLOYEES: Employee[] = [
  {
    id: 'EMP-0001',
    name: 'Sarah Connor',
    email: 'sarah.connor@company.com',
    designation: 'Senior Frontend Engineer',
    department: 'Engineering'
  },
  {
    id: 'EMP-0002',
    name: 'Marcus Vance',
    email: 'marcus.vance@company.com',
    designation: 'Staff Product Manager',
    department: 'Product'
  },
  {
    id: 'EMP-0003',
    name: 'Aaliyah Chen',
    email: 'aaliyah.chen@company.com',
    designation: 'Lead UI/UX Designer',
    department: 'Design'
  },
  {
    id: 'EMP-0004',
    name: 'David Rodriguez',
    email: 'd.rodriguez@company.com',
    designation: 'DevOps & Cloud Architect',
    department: 'Engineering'
  },
  {
    id: 'EMP-0005',
    name: 'Elena Rostova',
    email: 'elena.rostova@company.com',
    designation: 'Director of People & Culture',
    department: 'Human Resources'
  },
  {
    id: 'EMP-0006',
    name: 'Kofi Mensah',
    email: 'kofi.mensah@company.com',
    designation: 'Enterprise Sales Manager',
    department: 'Sales'
  },
  {
    id: 'EMP-0007',
    name: 'Sophia Patel',
    email: 'sophia.patel@company.com',
    designation: 'Growth Marketing Lead',
    department: 'Marketing'
  }
];

const DEFAULT_DEPARTMENTS: string[] = [
  'Engineering',
  'Design',
  'Product',
  'Marketing',
  'Sales',
  'Human Resources',
  'Finance'
];

const STORAGE_KEY = 'employee_dashboard_records';

interface EmployeeProviderProps {
  children: ReactNode;
}

export const EmployeeProvider = ({ children }: EmployeeProviderProps) => {
  const [employees, setEmployees] = useState<Employee[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed as Employee[];
        }
      }
    } catch (err) {
      console.error('Failed to parse employee records from localStorage:', err);
    }
    return SEED_EMPLOYEES;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(employees));
    } catch (err) {
      console.error('Failed to persist employee records to localStorage:', err);
    }
  }, [employees]);

  const addEmployee = (employee: Employee) => {
    setEmployees(prev => [...prev, employee]);
  };

  const updateEmployee = (id: string, updatedData: Partial<EmployeeFormData>) => {
    setEmployees(prev =>
      prev.map(employee =>
        employee.id === id
          ? { ...employee, ...updatedData }
          : employee
      )
    );
  };

  const removeEmployee = (id: string) => {
    setEmployees(prev =>
      prev.filter(employee => employee.id !== id)
    );
  };

  const departments: string[] = Array.from(
    new Set([
      ...DEFAULT_DEPARTMENTS,
      ...employees.map(e => e.department).filter(Boolean)
    ])
  );

  const value: EmployeeContextType = {
    employees,
    addEmployee,
    updateEmployee,
    removeEmployee,
    departments
  };

  return (
    <EmployeeContext.Provider value={value}>
      {children}
    </EmployeeContext.Provider>
  );
};

