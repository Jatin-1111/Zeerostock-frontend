export default function SidebarLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="flex-1 bg-[#EEFBF6]">{children}</div>;
}
