import "./globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";

import RootContent from "./RootContent";
import { InitAdmin } from "@/api/auth/admin.api";
import { Metadata } from "next";

const montserrat = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: {
    default: "Driftly",
    template: "%s | Driftly",
  },
  description: "Social platform by Driftly",
  applicationName: "Driftly",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await InitAdmin();
  return (
    <html lang="en" className={`${montserrat.variable}`}>
      <body className="antialiased font-montserrat bg-color-background" suppressHydrationWarning>
        <ThemeProvider attribute="data-theme" defaultTheme="light">
          <RootContent>{children}</RootContent>
        </ThemeProvider>
      </body>
    </html>
  );
}
