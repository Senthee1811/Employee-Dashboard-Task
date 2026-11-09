import { FC } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { Users, UserPlus, Sparkles } from 'lucide-react';
import EmployeeTable from './components/EmployeeTable';
import EmployeeForm from './components/EmployeeForm';
import EmployeeCard from './components/EmployeeCard';
import EmployeeUpdateForm from './components/EmployeeUpdateForm';
import { useEmployees } from './hooks/useEmployees';
import './App.css';

const App: FC = () => {
  const location = useLocation();
  const { employees } = useEmployees();

  const isDirectory = location.pathname === '/';
  const isAddPage = location.pathname === '/add-employee';

  return (
    <div className="min-h-screen bg-slate-50/60 flex flex-col font-sans text-slate-800 antialiased">
      {/* Top Navigation Header */}
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo & Brand */}
          <Link
            to="/"
            className="flex items-center gap-3 group focus:outline-none"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg text-slate-900 tracking-tight">
                  StaffHub
                </span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-150">
                  Directory
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block">
                Employee Management & Profiles
              </p>
            </div>
          </Link>

          {/* Action buttons & Stats */}
          <nav className="flex items-center gap-3">
            <Link
              to="/"
              className={`px-3.5 py-2 rounded-xl text-sm font-medium transition-colors ${isDirectory
                  ? 'bg-slate-100 text-slate-900'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                }`}
            >
              All Employees
              <span className="ml-2 px-2 py-0.5 rounded-full text-xs font-semibold bg-slate-200/80 text-slate-700">
                {employees.length}
              </span>
            </Link>

            <Link
              to="/add-employee"
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all shadow-xs ${isAddPage
                  ? 'bg-indigo-700 text-white ring-2 ring-indigo-400/50'
                  : 'bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white shadow-indigo-500/20'
                }`}
            >
              <UserPlus className="w-4 h-4" />
              <span className="hidden sm:inline">Add Employee</span>
              <span className="sm:hidden">Add</span>
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content View */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
        <Routes>
          <Route path="/" element={<EmployeeTable />} />
          <Route path="/add-employee" element={<EmployeeForm />} />
          <Route path="/employee/:id" element={<EmployeeCard />} />
          <Route path="/employee/edit/:id" element={<EmployeeUpdateForm />} />
        </Routes>
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-200/80 bg-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-500" />
            <span>Modern Employee Directory & Operations</span>
          </div>
          <div>
            Total Team Members: <strong className="text-slate-700">{employees.length}</strong>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
