import type { ReactNode } from "react";
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

// Кастомный тип для пропсов макета
interface LayoutProps extends React.PropsWithChildren {
  modal: ReactNode; // Сделали modal обязательным
}

export default function RootLayout({ children, modal }: LayoutProps) {
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
