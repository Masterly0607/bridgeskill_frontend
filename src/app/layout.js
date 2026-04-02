import "./globals.css";
import { Toaster } from "sonner";

export const metadata = {
  title: "BridgeSkill",
  description: "Job portal system for students, clients, and admins",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}