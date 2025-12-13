import BuyerSidebar from "@/components/shared/BuyerSidebar";

export default function BuyerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen">
      <BuyerSidebar />
      <main className="flex-1">{children}</main>
    </div>
  );
}
