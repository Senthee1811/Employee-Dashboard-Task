import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useEmployees } from "../hooks/useEmployees";
import {
  Pencil,
  ArrowLeft,
  User,
  Mail,
  Briefcase,
  Building2,
  ChevronDown,
  Check,
  UserX,
  Hash
} from "lucide-react";

const EmployeeUpdateForm = () => {
  const { employees, updateEmployee, departments = [] } = useEmployees();
  const { id } = useParams();
  const navigate = useNavigate();

  // Find the employee using the URL parameter
  const employee = employees.find(
    (employee) => employee.id === id
  );

  const [formData, setFormData] = useState({
    name: employee?.name || "",
    email: employee?.email || "",
    designation: employee?.designation || "",
    department: employee?.department || "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

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
            We couldn't locate any employee profile with identifier <strong className="font-mono text-slate-800">{id}</strong>.
          </p>
          <button
            onClick={() => navigate("/")}
            className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm transition cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Directory</span>
          </button>
        </div>
      </div>
    );
  }

  // Handle input changes
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const updatedEmployee = {
        name: formData.name,
        email: formData.email,
        designation: formData.designation,
        department: formData.department,
      };

      updateEmployee(id, updatedEmployee);
      navigate(`/employee/${id}`);
    } catch (error) {
      console.error("Error updating employee:", error);
      window.alert("Error updating employee. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Back Button */}
      <div className="mb-6">
        <button
          onClick={() => navigate(`/employee/${id}`)}
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors cursor-pointer group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Employee Details</span>
        </button>
      </div>

      {/* Main Form Card */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
        {/* Card Header */}
        <div className="p-6 sm:p-8 border-b border-slate-100 bg-linear-to-b from-slate-50/80 to-white">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-150 flex items-center justify-center text-amber-600 shadow-2xs">
                <Pencil className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                  Update Employee Profile
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                  Update personal info, job title, and team assignment
                </p>
              </div>
            </div>

            {/* ID Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200/80 text-xs font-semibold text-slate-700 self-start sm:self-center">
              <Hash className="w-3.5 h-3.5 text-slate-400" />
              <span>Editing:</span>
              <span className="font-mono text-indigo-600">{id}</span>
            </div>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Full Name */}
            <div className="space-y-1.5">
              <label
                htmlFor="name"
                className="block text-xs font-semibold uppercase tracking-wider text-slate-600"
              >
                Employee Name <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Employee name"
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition"
                />
              </div>
            </div>

            {/* Email Address */}
            <div className="space-y-1.5">
              <label
                htmlFor="email"
                className="block text-xs font-semibold uppercase tracking-wider text-slate-600"
              >
                Email Address <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Email address"
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition"
                />
              </div>
            </div>

            {/* Designation */}
            <div className="space-y-1.5">
              <label
                htmlFor="designation"
                className="block text-xs font-semibold uppercase tracking-wider text-slate-600"
              >
                Designation / Role <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <Briefcase className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  name="designation"
                  id="designation"
                  value={formData.designation}
                  onChange={handleChange}
                  required
                  placeholder="Designation"
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition"
                />
              </div>
            </div>

            {/* Department (Dropdown Selection) */}
            <div className="space-y-1.5">
              <label
                htmlFor="department"
                className="block text-xs font-semibold uppercase tracking-wider text-slate-600"
              >
                Department <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <Building2 className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <select
                  name="department"
                  id="department"
                  value={formData.department}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition appearance-none cursor-pointer"
                >
                  <option value="" disabled>
                    Select a department
                  </option>
                  {departments.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-6 border-t border-slate-100 flex flex-col-reverse sm:flex-row items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => navigate(`/employee/${id}`)}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 font-medium text-sm transition cursor-pointer text-center"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-medium text-sm shadow-sm hover:shadow transition-all cursor-pointer disabled:opacity-50"
            >
              <Check className="w-4 h-4" />
              <span>{isSubmitting ? 'Saving Changes...' : 'Save Changes'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeUpdateForm;
