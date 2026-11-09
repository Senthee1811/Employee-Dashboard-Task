import { useState, useMemo, ChangeEvent, FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEmployees } from '../hooks/useEmployees';
import EmployeeTableCell from './EmployeeTableCell';
import {
  Search,
  Users,
  Building2,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Filter,
  Check,
  X,
  SearchX
} from 'lucide-react';

interface PaginationState {
  searchItem: string;
  currentPage: number;
}

const EmployeeTable: FC = () => {
  const navigate = useNavigate();
  const { employees, departments = [] } = useEmployees();

  // Search, filter, and pagination state
  const [pagination, setPagination] = useState<PaginationState>({
    searchItem: '',
    currentPage: 1
  });
  const [selectedDepartment, setSelectedDepartment] = useState<string>('All');
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);

  const { searchItem, currentPage: rawCurrentPage } = pagination;
  const employeesPerPage = 5;

  // Extract unique departments for filter dropdown
  const filterDepartments = useMemo(() => {
    const depts = new Set<string>();
    employees.forEach(e => {
      if (e.department?.trim()) depts.add(e.department.trim());
    });
    departments.forEach(d => {
      if (d?.trim()) depts.add(d.trim());
    });
    return Array.from(depts);
  }, [employees, departments]);

  // Department count metrics
  const uniqueDepartments = useMemo(() => {
    const depts = new Set(
      employees.map(e => e.department?.trim()).filter(Boolean)
    );
    return depts.size;
  }, [employees]);

  // Filter employees using search query and department filter
  const filteredEmployees = useMemo(() => {
    const query = searchItem.trim().toLowerCase();

    return employees.filter(employee => {
      // Department filter
      const matchesDepartment =
        selectedDepartment === 'All' ||
        employee.department?.toLowerCase() === selectedDepartment.toLowerCase();

      if (!matchesDepartment) return false;

      // Search query filter
      if (!query) return true;

      return [
        employee.name,
        employee.id,
        employee.email,
        employee.designation,
        employee.department
      ].some(value =>
        String(value ?? '')
          .toLowerCase()
          .includes(query)
      );
    });
  }, [employees, searchItem, selectedDepartment]);

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
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
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

  const handleSelectDepartment = (dept: string) => {
    setSelectedDepartment(dept);
    setPagination(prev => ({
      ...prev,
      currentPage: 1
    }));
    setIsFilterOpen(false);
  };

  const handleClearAllFilters = () => {
    setSelectedDepartment('All');
    setPagination(prev => ({
      ...prev,
      searchItem: '',
      currentPage: 1
    }));
    setIsFilterOpen(false);
  };

  // Handle page navigation
  const handlePageChange = (pageNumber: number) => {
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
        {/* Toolbar: Search input & Department Filter */}
        <div className="p-4 sm:p-5 border-b border-slate-200/80 bg-white flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="flex flex-1 items-center gap-3 w-full sm:max-w-xl">
            {/* Search Input */}
            <div className="relative flex-1">
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

            {/* Department Filter Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsFilterOpen(prev => !prev)}
                className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border text-sm font-medium transition-all cursor-pointer whitespace-nowrap ${
                  selectedDepartment !== 'All'
                    ? 'bg-indigo-50 border-indigo-200 text-indigo-700 shadow-xs'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
                title="Filter by Department"
              >
                <Filter className="w-4 h-4 text-slate-500" />
                <span>
                  {selectedDepartment === 'All' ? 'Filter' : selectedDepartment}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {/* Department Accordion / Popover */}
              {isFilterOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setIsFilterOpen(false)}
                  />
                  <div className="absolute right-0 top-full mt-2 w-56 bg-white border border-slate-200 rounded-2xl shadow-xl p-2 z-50 animate-fade-in">
                    <div className="px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 mb-1">
                      Filter by Department
                    </div>
                    <button
                      type="button"
                      onClick={() => handleSelectDepartment('All')}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition cursor-pointer ${
                        selectedDepartment === 'All'
                          ? 'bg-indigo-50 text-indigo-700 font-semibold'
                          : 'text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <span>All Departments</span>
                      {selectedDepartment === 'All' && (
                        <Check className="w-3.5 h-3.5 text-indigo-600" />
                      )}
                    </button>
                    {filterDepartments.map(dept => (
                      <button
                        key={dept}
                        type="button"
                        onClick={() => handleSelectDepartment(dept)}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition cursor-pointer ${
                          selectedDepartment === dept
                            ? 'bg-indigo-50 text-indigo-700 font-semibold'
                            : 'text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        <span className="truncate">{dept}</span>
                        {selectedDepartment === dept && (
                          <Check className="w-3.5 h-3.5 text-indigo-600" />
                        )}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Active Filter Indicators & Count */}
          <div className="flex items-center gap-2 self-start sm:self-center">
            {selectedDepartment !== 'All' && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
                <span>Dept: {selectedDepartment}</span>
                <button
                  type="button"
                  onClick={() => handleSelectDepartment('All')}
                  className="hover:text-indigo-900 cursor-pointer p-0.5 rounded-full"
                  title="Remove filter"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {(searchItem || selectedDepartment !== 'All') && (
              <p className="text-xs text-slate-500">
                Found <strong className="text-slate-800">{filteredEmployees.length}</strong> {filteredEmployees.length === 1 ? 'employee' : 'employees'}
              </p>
            )}
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
                  <td colSpan={5} className="px-6 py-16 text-center">
                    <div className="flex flex-col items-center justify-center max-w-sm mx-auto">
                      <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mb-3">
                        {searchItem || selectedDepartment !== 'All' ? (
                          <SearchX className="w-7 h-7" />
                        ) : (
                          <Users className="w-7 h-7" />
                        )}
                      </div>
                      <h3 className="text-base font-semibold text-slate-800">
                        {searchItem || selectedDepartment !== 'All'
                          ? 'No matching employees'
                          : 'No employees found'}
                      </h3>
                      <p className="text-xs text-slate-500 mt-1 mb-4">
                        {selectedDepartment !== 'All' && searchItem
                          ? `No employee records matched "${searchItem}" in the ${selectedDepartment} department.`
                          : selectedDepartment !== 'All'
                          ? `No employees currently found in the ${selectedDepartment} department.`
                          : searchItem
                          ? `No employee records matched "${searchItem}". Try checking for typos or searching with different keywords.`
                          : 'Your employee directory is currently empty. Get started by adding your first team member.'}
                      </p>
                      {searchItem || selectedDepartment !== 'All' ? (
                        <button
                          onClick={handleClearAllFilters}
                          className="px-4 py-2 text-xs font-medium rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition cursor-pointer"
                        >
                          Clear All Filters
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
