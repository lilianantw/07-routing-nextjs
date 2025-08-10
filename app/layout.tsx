import type { ReactNode, ReactElement } from "react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import "./globals.css";

// Настройка шрифтов
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Метаданные
export const metadata: Metadata = {
  title: "NoteHub",
  description: "Manage your notes efficiently",
};

// Кастомный тип LayoutProps с опциональным modal
interface CustomLayoutProps extends AppProps {
  children: ReactNode;
  modal?: ReactNode; // Опциональное модальное окно
}

export default function RootLayout({ children, modal }: CustomLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <TanStackProvider>
          <div className="container">
            <Header />
            <main>{children}</main>
            <Footer />
          </div>

          {modal}

          <div id="modal-root" />
        </TanStackProvider>
      </body>
    </html>
  );
}
