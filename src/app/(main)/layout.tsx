import MainLayoutWrapper from "@/components/shared/MainLayoutWrapper";
import Footer from "@/components/shared/Footer";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <MainLayoutWrapper>{children}</MainLayoutWrapper>;
}
