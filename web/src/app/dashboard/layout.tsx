import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { AgentsContextProvider } from "../context/agents/agents";
import { Header } from "./components/Header";
import { SideMenu } from "./components/SideMenu";
import { ReactQueryProvider } from "@/react-query-provider";
import { MenuContextProvider } from "../context/menu";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Expresso Labs Agents",
  description: "Dashboard to manage agents",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReactQueryProvider>
          <MenuContextProvider>
            <AgentsContextProvider>
              <div className="grid md:grid-cols-custom grid-cols-1 min-h-screen">
                <SideMenu />
                <div className="flex flex-col sm:w-full">
                  <Header />
                  <main className="flex-1 p-6 bg-gray-100">
                    {children}
                  </main>
                </div>
              </div>
            </AgentsContextProvider>
          </MenuContextProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
