import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Zeerostock - Auth",
  description: "Authentication pages for Zeerostock",
};

export const dynamic = "force-dynamic";
export const dynamicParams = true;

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
