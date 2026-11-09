/**
 * Returns consistent styling tokens based on department name.
 */
export const getDepartmentBadgeStyle = (department = '') => {
  const dept = department.toLowerCase().trim();

  if (dept.includes('eng') || dept.includes('dev') || dept.includes('software') || dept.includes('tech')) {
    return {
      bg: 'bg-blue-50',
      text: 'text-blue-700',
      border: 'border-blue-200/80',
      dot: 'bg-blue-500'
    };
  }
  if (dept.includes('design') || dept.includes('creative') || dept.includes('ui') || dept.includes('ux')) {
    return {
      bg: 'bg-fuchsia-50',
      text: 'text-fuchsia-700',
      border: 'border-fuchsia-200/80',
      dot: 'bg-fuchsia-500'
    };
  }
  if (dept.includes('product')) {
    return {
      bg: 'bg-purple-50',
      text: 'text-purple-700',
      border: 'border-purple-200/80',
      dot: 'bg-purple-500'
    };
  }
  if (dept.includes('market') || dept.includes('growth')) {
    return {
      bg: 'bg-indigo-50',
      text: 'text-indigo-700',
      border: 'border-indigo-200/80',
      dot: 'bg-indigo-500'
    };
  }
  if (dept.includes('sales') || dept.includes('rev')) {
    return {
      bg: 'bg-amber-50',
      text: 'text-amber-800',
      border: 'border-amber-200/80',
      dot: 'bg-amber-500'
    };
  }
  if (dept.includes('hr') || dept.includes('human') || dept.includes('people') || dept.includes('talent')) {
    return {
      bg: 'bg-emerald-50',
      text: 'text-emerald-700',
      border: 'border-emerald-200/80',
      dot: 'bg-emerald-500'
    };
  }
  if (dept.includes('finan') || dept.includes('account')) {
    return {
      bg: 'bg-teal-50',
      text: 'text-teal-700',
      border: 'border-teal-200/80',
      dot: 'bg-teal-500'
    };
  }
  if (dept.includes('operat') || dept.includes('legal')) {
    return {
      bg: 'bg-orange-50',
      text: 'text-orange-700',
      border: 'border-orange-200/80',
      dot: 'bg-orange-500'
    };
  }

  return {
    bg: 'bg-slate-100',
    text: 'text-slate-700',
    border: 'border-slate-200',
    dot: 'bg-slate-500'
  };
};

/**
 * Extract up to 2 uppercase initials from a full name.
 */
export const getInitials = (name = '') => {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '?';
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

/**
 * Deterministically pick an avatar background gradient for a given string.
 */
const GRADIENTS = [
  'from-indigo-500 to-blue-600',
  'from-emerald-500 to-teal-600',
  'from-purple-500 to-indigo-600',
  'from-rose-500 to-pink-600',
  'from-amber-500 to-orange-600',
  'from-cyan-500 to-blue-500',
  'from-violet-500 to-purple-600'
];

export const getAvatarGradient = (name = '') => {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return GRADIENTS[Math.abs(hash) % GRADIENTS.length];
};

