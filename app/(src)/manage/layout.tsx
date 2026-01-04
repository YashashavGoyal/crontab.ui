import type { Metadata } from "next";
import "../../globals.css";

export const metadata: Metadata = {
  title: "Chronicle - Manage Cron Jobs",
  description: "Chronicle helps you easily create, manage, and visualize cron expressions for scheduling tasks.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
    </>
  );
}
