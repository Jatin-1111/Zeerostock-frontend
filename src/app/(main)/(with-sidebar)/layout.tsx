import Sidebar from "@/components/shared/Sidebar";

export default function SidebarLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen bg-[#EEFBF6]">
      <Sidebar />
      <main className="flex-1">{children}</main>
    </div>
  );
}
