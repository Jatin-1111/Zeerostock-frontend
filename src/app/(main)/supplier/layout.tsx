import SupplierSidebar from "@/components/shared/SupplierSidebar";

export default function SupplierLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-white">
      <SupplierSidebar />
      <main className="flex-1">{children}</main>
    </div>
  );
}
