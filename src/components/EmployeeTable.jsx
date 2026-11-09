import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEmployees } from '../hooks/useEmployees';
import EmployeeTableCell from './EmployeeTableCell';
import {
  Search,
  UserPlus,
  Users,
  Building2,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  X,
  SearchX,
  FilterIcon
} from 'lucide-react';

const EmployeeTable = () => {
  const navigate = useNavigate();
  const { employees } = useEmployees();

  const departments = employees.map(e => e.department).filter(Boolean);
  console.log(departments);

  // Search and pagination state
  const [pagination, setPagination] = useState({
    searchItem: '',
    currentPage: 1
  });

  const { searchItem, currentPage: rawCurrentPage } = pagination;
  const employeesPerPage = 5;
  const [isFilteropen, setFilteropen] = useState(false);

  // Department count metrics
  const uniqueDepartments = useMemo(() => {
    const depts = new Set(
      employees.map(e => e.department?.trim()).filter(Boolean)
    );
    return depts.size;
  }, [employees]);

  // Filter employees using all available fields
  const filteredEmployees = useMemo(() => {
    const query = searchItem.trim().toLowerCase();
    if (!query) return employees;

    return employees.filter(employee =>
      [
        employee.name,
        employee.id,
        employee.email,
        employee.designation,
        employee.department
      ].some(value =>
        String(value ?? '')
          .toLowerCase()
          .includes(query)
      )
    );
  }, [employees, searchItem]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredEmployees.length / employeesPerPage);

  // Keep the displayed page valid if employees are deleted or filtered
  const currentPage = Math.min(
    rawCurrentPage,
    Math.max(totalPages, 1)
  );

  const startIndex = (currentPage - 1) * employeesPerPage;
  const endIndex = startIndex + employeesPerPage;

  const currentEmployees = filteredEmployees.slice(
    startIndex,
    endIndex
  );

  // Handle search and reset pagination
  const handleSearch = (e) => {
    setPagination({
      searchItem: e.target.value,
      currentPage: 1
    });
  };

  const handleClearSearch = () => {
    setPagination(prev => ({
      ...prev,
      searchItem: '',
      currentPage: 1
    }));
  };

  // Handle page navigation
  const handlePageChange = (pageNumber) => {
    setPagination(prev => ({
      ...prev,
      currentPage: pageNumber
    }));
  };

  return (
    <div className="space-y-6">
      {/* Top Banner / Dashboard Overview */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Employee Directory
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage your organization's staff, view detailed profiles, and update information.
          </p>
        </div>

        {/* Action Button */}
        <button
          onClick={() => navigate('/add-employee')}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-medium text-sm shadow-sm hover:shadow transition-all cursor-pointer shrink-0"
        >
          <UserPlus className="w-4 h-4" />
          <span>Add New Employee</span>
        </button>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Total Employees
            </p>
            <p className="text-2xl font-bold text-slate-900 mt-0.5">
              {employees.length}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Departments
            </p>
            <p className="text-2xl font-bold text-slate-900 mt-0.5">
              {uniqueDepartments}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600">
            <Briefcase className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Filtered Results
            </p>
            <p className="text-2xl font-bold text-slate-900 mt-0.5">
              {filteredEmployees.length}
            </p>
          </div>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        {/* Toolbar: Search input */}
        <div className="p-4 sm:p-5 border-b border-slate-200/80 bg-white flex  sm:flex-row gap-3 items-center justify-between">
          <div className="relative w-full sm:max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchItem}
              onChange={handleSearch}
              className="w-full pl-10 pr-9 py-2 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:bg-white transition"
              placeholder="Search by name, ID, email, role, department..."
            />
            {searchItem && (
              <button
                onClick={handleClearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 rounded cursor-pointer"
                title="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            
            
          </div>

          {searchItem && (
            <p className="text-xs text-slate-500 self-start sm:self-center">
              Found <strong className="text-slate-800">{filteredEmployees.length}</strong> {filteredEmployees.length === 1 ? 'employee' : 'employees'}
            </p>
          )}
          {/* Filter Function */}
          <div className='relative flex flex-col gap-2'>
              <FilterIcon onClick={() => {setFilteropen(prev => !prev)}}/>
              {/* Department Accordion */}
              {
                isFilteropen && (
                  <div className={`${isFilteropen ? 'block' : 'hidden'} absolute top-10 -right-5 flex flex-col items-center justify-center max-w-md bg-white backdrop-blur-3xl shadow-2xl px-4 py-2 rounded-2xl z-50`}>
                    {
                      departments.map((department) => {
                        return (
                          <div className='flex flex-col items-center justify-center'>
                            <span className='text-sm hover:translate-x-2 transition-transform ease-in-out duration-200 hover:bg-gray-400/50 px-2 py-2'>{department}</span>
                          </div>
                        )
                      })
                    }
                  </div>
                )
              }

            </div>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200/80 text-xs font-semibold uppercase tracking-wider text-slate-500">
                <th className="px-6 py-3.5">Employee ID</th>
                <th className="px-6 py-3.5">Employee</th>
                <th className="px-6 py-3.5">Designation</th>
                <th className="px-6 py-3.5">Department</th>
                <th className="px-6 py-3.5 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {currentEmployees.length > 0 ? (
                currentEmployees.map(employee => (
                  <EmployeeTableCell
                    key={employee.id}
                    {...employee}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-16 text-center">
                    <div className="flex flex-col items-center justify-center max-w-sm mx-auto">
                      <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mb-3">
                        {searchItem ? (
                          <SearchX className="w-7 h-7" />
                        ) : (
                          <Users className="w-7 h-7" />
                        )}
                      </div>
                      <h3 className="text-base font-semibold text-slate-800">
                        {searchItem
                          ? 'No matching employees'
                          : 'No employees found'}
                      </h3>
                      <p className="text-xs text-slate-500 mt-1 mb-4">
                        {searchItem
                          ? `No employee records matched "${searchItem}". Try checking for typos or searching with different keywords.`
                          : 'Your employee directory is currently empty. Get started by adding your first team member.'}
                      </p>
                      {searchItem ? (
                        <button
                          onClick={handleClearSearch}
                          className="px-4 py-2 text-xs font-medium rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition cursor-pointer"
                        >
                          Clear Search Filter
                        </button>
                      ) : (
                        <button
                          onClick={() => navigate('/add-employee')}
                          className="px-4 py-2 text-xs font-medium rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white transition cursor-pointer"
                        >
                          Add First Employee
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination & Count Footer */}
        <div className="px-6 py-4 border-t border-slate-200/80 bg-slate-50/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-600">
            Showing{' '}
            <strong className="text-slate-900 font-semibold">
              {filteredEmployees.length === 0 ? 0 : startIndex + 1}
            </strong>
            {' – '}
            <strong className="text-slate-900 font-semibold">
              {Math.min(endIndex, filteredEmployees.length)}
            </strong>
            {' of '}
            <strong className="text-slate-900 font-semibold">
              {filteredEmployees.length}
            </strong>
            {' employees'}
          </p>

          {totalPages > 1 && (
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-600 hover:bg-white hover:text-slate-900 disabled:opacity-40 disabled:pointer-events-none transition cursor-pointer shadow-2xs"
                aria-label="Previous Page"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Previous</span>
              </button>

              <div className="flex items-center gap-1">
                {Array.from(
                  { length: totalPages },
                  (_, index) => index + 1
                ).map(page => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    disabled={currentPage === page}
                    className={`w-8 h-8 rounded-lg text-xs font-semibold flex items-center justify-center transition cursor-pointer ${
                      currentPage === page
                        ? 'bg-indigo-600 text-white shadow-xs'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-600 hover:bg-white hover:text-slate-900 disabled:opacity-40 disabled:pointer-events-none transition cursor-pointer shadow-2xs"
                aria-label="Next Page"
              >
                <span className="hidden sm:inline">Next</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployeeTable;
