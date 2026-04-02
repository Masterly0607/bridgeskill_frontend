export function getDashboardRouteByRole(roleId) {
  switch (roleId) {
    case 1:
      return "/admin/dashboard";
    case 2:
      return "/student/dashboard";
    case 3:
      return "/client/dashboard";
    default:
      return "/";
  }
}
// Why:

// avoid repeating role redirect logic
// cleaner and reusable