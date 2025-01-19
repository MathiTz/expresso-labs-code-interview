import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { AgentsContextProvider } from "../context/agents/agents";
import { Header } from "./components/Header";
import { SideMenu } from "./components/SideMenu";
import { ReactQueryProvider } from "@/react-query-provider";

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
          <AgentsContextProvider>
            <div className="grid grid-cols-1 md:grid-cols-4 min-h-screen">
              <SideMenu />
              <div className="md:col-span-3 flex flex-col">
                <Header />
                {children}
              </div>
            </div>
          </AgentsContextProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
