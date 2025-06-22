import type { Metadata } from "next";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import { Layout } from "@/components/Layout";

export const metadata: Metadata = {
  title: "Zero to Coder",
  description: "Programming learning platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
        <body>
            <Layout>
              <ToastContainer/>
              {children}
            </Layout>
        </body>
    </html>
  );
}
