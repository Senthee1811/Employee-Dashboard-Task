export const generateEmployeeId = (employees) => {
  const existingIds = new Set(
    employees.map(employee => employee.id)
  );

  let number = 1;
  let newId;

  do {
    newId = `EMP-${String(number).padStart(4, '0')}`;
    number++;
  } while (existingIds.has(newId));

  return newId;
};