import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { Toaster } from "sonner";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Zeerostock - B2B Marketplace for Surplus Inventory",
  description:
    "Connect with verified buyers and suppliers. Trade surplus inventory efficiently.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={`${poppins.className} antialiased h-full`}>
        <AuthProvider>
          {children}
          <Toaster
            position="bottom-right"
            expand={false}
            richColors
            closeButton
            duration={3500}
            toastOptions={{
              style: {
                padding: "16px",
                gap: "12px",
                width: "fit-content",
                minWidth: "200px",
                maxWidth: "500px",
              },
              className: "font-medium",
            }}
          />
        </AuthProvider>
      </body>
    </html>
  );
}
