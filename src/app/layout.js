import "./globals.css";
import { Toaster } from "sonner";
import { AuthProvider } from "@/components/common/auth-provider";
import { SiteHeader } from "@/components/layout/site-header";

export const metadata = {
  title: "BridgeSkill",
  description: "Job portal system for students, clients, and admins",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-slate-50 text-slate-900">
        <AuthProvider>
          <SiteHeader />
          {children}
          <Toaster richColors position="top-right" />
        </AuthProvider>
      </body>
    </html>
  );
}