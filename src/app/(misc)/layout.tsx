import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";

export const dynamic = "force-dynamic";

export default function MiscLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="min-h-screen">
        <Header />
        {children}
      </div>
      <Footer />
    </>
  );
}
