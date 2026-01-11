import MainLayoutWrapper from "@/components/shared/MainLayoutWrapper";
import Footer from "@/components/shared/Footer";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="min-h-screen">
        <MainLayoutWrapper>{children}</MainLayoutWrapper>
      </div>
      <Footer />
    </>
  );
}
