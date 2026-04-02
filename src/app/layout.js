import "./globals.css";
import { Toaster } from "sonner";
import { AuthProvider } from "@/components/common/auth-provider";

export const metadata = {
  title: "BridgeSkill",
  description: "Job portal system for students, clients, and admins",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
          <Toaster richColors position="top-right" />
        </AuthProvider>
      </body>
    </html>
  );
}

// Why AuthProvider here?
// so auth can restore from localStorage when app starts.