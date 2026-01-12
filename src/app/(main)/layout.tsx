import MainLayoutWrapper from "@/components/shared/MainLayoutWrapper";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <MainLayoutWrapper>{children}</MainLayoutWrapper>;
}
