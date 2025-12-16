import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Panel - Zeerostock",
  description: "Zeerostock Admin Panel - For authorized personnel only",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
