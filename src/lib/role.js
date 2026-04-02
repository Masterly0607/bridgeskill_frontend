export const ROLES = {
  ADMIN: 1,
  STUDENT: 2,
  CLIENT: 3,
};

export function hasRequiredRole(userRoleId, allowedRoles = []) {
  return allowedRoles.includes(userRoleId);
}

// Why:

// avoid hardcoding role numbers everywhere
// cleaner permission logic