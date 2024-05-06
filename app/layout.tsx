import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/header";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Re-forms",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <div className="grid grid-cols-1">
            <Header/>
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
