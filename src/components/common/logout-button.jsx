"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { useAuthStore } from "@/store/auth-store";
import { Button } from "@/components/ui/button";

export function LogoutButton() {
  const router = useRouter();
  const clearAuth = useAuthStore((state) => state.clearAuth);

  const handleLogout = () => {
    clearAuth();
    toast.success("Logged out successfully");
    router.push("/login");
  };

  return (
    <Button variant="outline" onClick={handleLogout}>
      Logout
    </Button>
  );
}