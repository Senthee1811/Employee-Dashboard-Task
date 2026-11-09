import { Employee } from '../types/employee';

export const generateEmployeeId = (employees: Employee[]): string => {
  const existingIds = new Set<string>(
    employees.map((employee) => employee.id)
  );

  let number = 1;
  let newId: string;

  do {
    newId = `EMP-${String(number).padStart(4, '0')}`;
    number++;
  } while (existingIds.has(newId));

  return newId;
};

