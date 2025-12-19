import Sidebar from "@/components/shared/Sidebar";

export const dynamic = "force-dynamic";

export default function SidebarLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />
      <main className="flex-1">{children}</main>
    </div>
  );
}
