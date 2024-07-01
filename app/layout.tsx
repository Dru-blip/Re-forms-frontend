import type { Metadata } from "next";
import { Poppins ,Roboto} from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/header";
import { Toaster } from "@/components/ui/sonner"

// const  roboto=Roboto({subsets:["latin"],weight:["400","700"]})
const poppins = Poppins({ subsets: ["latin"], variable: "--font-sans", weight: ["400","700"] });

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
      <body className={poppins.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
        >
          <div className="grid grid-cols-1">
            {/* <Header/> */}
            {children}
          </div>
          <Toaster richColors/>
        </ThemeProvider>
      </body>
    </html>
  );
}
