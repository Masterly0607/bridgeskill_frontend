import { useAuthStore } from "@/store/auth-store";

export const useAuth = () => {
  const { token, user, isAuthenticated, setAuth, clearAuth, hydrateAuth } =
    useAuthStore();

  return {
    token,
    user,
    isAuthenticated,
    setAuth,
    clearAuth,
    hydrateAuth,
  };
};
// Why:

// keeps imports cleaner in components/pages
// easier to read later