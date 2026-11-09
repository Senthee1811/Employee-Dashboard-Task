import { useParams, useNavigate } from "react-router-dom";
import { useEmployees } from "../hooks/useEmployees.js";
import {
  ArrowLeft,
  Pencil,
  Trash2,
  Mail,
  Building2,
  Briefcase,
  Hash,
  ShieldCheck,
  UserX
} from "lucide-react";
import { getDepartmentBadgeStyle, getInitials, getAvatarGradient } from "../utils/uiHelpers.js";

const EmployeeCard = () => {
  const navigate = useNavigate();
  const { employees, removeEmployee } = useEmployees();
  const { id } = useParams();

  // Find employee by ID
  const employee = employees.find(
    (employee) => employee.id === id
  );

  // Handle employee not found
  if (!employee) {
    return (
      <div className="max-w-md mx-auto text-center py-12">
        <div className="bg-white rounded-2xl border border-slate-200/90 p-8 shadow-xs">
          <div className="w-16 h-16 rounded-2xl bg-rose-50 text-rose-500 border border-rose-100 flex items-center justify-center mx-auto mb-4">
            <UserX className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">Employee Not Found</h2>
          <p className="text-sm text-slate-500 mt-2 mb-6">
            We couldn't locate any profile matching identifier <strong className="font-mono text-slate-800">{id}</strong>.
          </p>
          <button
            onClick={() => navigate("/")}
            className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm transition cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Employee Directory</span>
          </button>
        </div>
      </div>
    );
  }

  const deptStyle = getDepartmentBadgeStyle(employee.department);
  const initials = getInitials(employee.name);
  const avatarGradient = getAvatarGradient(employee.name);

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to remove ${employee.name} from the employee directory?`)) {
      removeEmployee(employee.id);
      navigate("/");
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Navigation Breadcrumb / Back button */}
      <div>
        <button
          onClick={() => navigate("/")}
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors cursor-pointer group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Employee Directory</span>
        </button>
      </div>

      {/* Main Profile Card */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
        {/* Decorative Top Banner */}
        <div className="h-32 bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-700 relative px-6">
          <div className="absolute right-6 top-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/20 backdrop-blur-md text-white border border-white/30 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Active Member
            </span>
          </div>
        </div>

        {/* Profile Info Header with Overlapping Avatar */}
        <div className="px-6 sm:px-8 pb-6 pt-0 relative">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between -mt-12 sm:-mt-14 mb-4 gap-4">
            {/* Avatar Circle */}
            <div
              className={`w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-gradient-to-tr ${avatarGradient} border-4 border-white shadow-md flex items-center justify-center text-white text-2xl sm:text-3xl font-extrabold shrink-0`}
            >
              {initials}
            </div>

            {/* Quick Actions in Header */}
            <div className="flex items-center gap-2 self-start sm:self-auto">
              <button
                onClick={() => navigate(`/employee/edit/${id}`)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-xs sm:text-sm shadow-xs transition cursor-pointer"
              >
                <Pencil className="w-4 h-4" />
                <span>Edit Profile</span>
              </button>

              <button
                onClick={handleDelete}
                className="p-2 rounded-xl border border-slate-200 text-slate-500 hover:text-rose-600 hover:bg-rose-50 hover:border-rose-200 transition cursor-pointer"
                title="Delete Employee"
                aria-label="Delete Employee"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Name & Basic Info */}
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              {employee.name}
            </h1>
            <p className="text-base text-slate-600 font-medium mt-0.5">
              {employee.designation}
            </p>
            <div className="mt-2.5 flex flex-wrap items-center gap-2">
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${deptStyle.bg} ${deptStyle.text} ${deptStyle.border}`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${deptStyle.dot}`} />
                {employee.department || 'Unassigned'}
              </span>

              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600 border border-slate-200/80 font-mono text-xs font-medium">
                <Hash className="w-3 h-3 text-slate-400" />
                {employee.id}
              </span>
            </div>
          </div>
        </div>

        {/* Details Section */}
        <div className="px-6 sm:px-8 py-6 border-t border-slate-100 bg-slate-50/40">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
            Employee Information
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Employee ID */}
            <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-medium text-slate-400">Employee ID</p>
                <p className="text-sm font-semibold text-slate-800 font-mono mt-0.5">
                  {employee.id}
                </p>
              </div>
            </div>

            {/* Email Address */}
            <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                <Mail className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-medium text-slate-400">Email Address</p>
                <a
                  href={`mailto:${employee.email}`}
                  className="text-sm font-semibold text-indigo-600 hover:underline truncate block mt-0.5"
                >
                  {employee.email}
                </a>
              </div>
            </div>

            {/* Designation */}
            <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600 shrink-0">
                <Briefcase className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-medium text-slate-400">Designation / Role</p>
                <p className="text-sm font-semibold text-slate-800 mt-0.5">
                  {employee.designation}
                </p>
              </div>
            </div>

            {/* Department */}
            <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                <Building2 className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-medium text-slate-400">Department</p>
                <p className="text-sm font-semibold text-slate-800 mt-0.5">
                  {employee.department}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 sm:px-8 py-4 border-t border-slate-100 bg-white flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={() => navigate("/")}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 font-medium text-xs sm:text-sm transition cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Directory</span>
          </button>

          <button
            onClick={() => navigate(`/employee/edit/${id}`)}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-xs sm:text-sm shadow-xs transition cursor-pointer"
          >
            <Pencil className="w-4 h-4" />
            <span>Edit Employee</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeCard;
