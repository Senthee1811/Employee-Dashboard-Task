import { useEmployees } from '../hooks/useEmployees';
import { useNavigate } from 'react-router-dom';
import { Eye, Pencil, Trash2, Mail } from 'lucide-react';
import { getDepartmentBadgeStyle, getInitials, getAvatarGradient } from '../utils/uiHelpers';

const EmployeeTableCell = ({
  name,
  designation,
  id,
  email,
  department
}) => {
  const navigate = useNavigate();
  const { removeEmployee } = useEmployees();

  const deptStyle = getDepartmentBadgeStyle(department);
  const initials = getInitials(name);
  const avatarGradient = getAvatarGradient(name);

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to remove ${name} (${id}) from the employee directory?`)) {
      removeEmployee(id);
    }
  };

  return (
    <tr className="border-b border-slate-100 hover:bg-slate-50/80 transition-colors group">
      {/* Employee ID */}
      <td className="px-6 py-4 whitespace-nowrap">
        <span className="font-mono text-xs font-semibold px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 border border-slate-200/80 inline-block shadow-2xs">
          {id}
        </span>
      </td>

      {/* Name and Email with Avatar */}
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center gap-3">
          <div
            className={`w-9 h-9 rounded-xl bg-gradient-to-tr ${avatarGradient} flex items-center justify-center text-white text-xs font-bold shadow-xs shrink-0`}
          >
            {initials}
          </div>
          <div className="min-w-0">
            <button
              onClick={() => navigate(`/employee/${id}`)}
              className="font-semibold text-sm text-slate-900 group-hover:text-indigo-600 transition-colors text-left truncate block hover:underline focus:outline-none cursor-pointer"
            >
              {name}
            </button>
            <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-0.5">
              <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="truncate max-w-xs">{email}</span>
            </div>
          </div>
        </div>
      </td>

      {/* Designation */}
      <td className="px-6 py-4 whitespace-nowrap">
        <span className="text-sm font-medium text-slate-700">
          {designation}
        </span>
      </td>

      {/* Department Badge */}
      <td className="px-6 py-4 whitespace-nowrap">
        <span
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${deptStyle.bg} ${deptStyle.text} ${deptStyle.border}`}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${deptStyle.dot}`} />
          {department || 'Unassigned'}
        </span>
      </td>

      {/* Action Buttons */}
      <td className="px-6 py-4 whitespace-nowrap text-right">
        <div className="flex items-center justify-end gap-1.5">
          <button
            onClick={() => navigate(`/employee/${id}`)}
            className="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors cursor-pointer"
            title="View Details"
            aria-label="View Details"
          >
            <Eye className="w-4 h-4" />
          </button>

          <button
            onClick={() => navigate(`/employee/edit/${id}`)}
            className="p-1.5 text-slate-500 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors cursor-pointer"
            title="Edit Employee"
            aria-label="Edit Employee"
          >
            <Pencil className="w-4 h-4" />
          </button>

          <button
            onClick={handleDelete}
            className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
            title="Delete Employee"
            aria-label="Delete Employee"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default EmployeeTableCell;
