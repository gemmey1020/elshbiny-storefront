import type { Metadata } from "next";
import { DashboardShell } from "@/components/dashboard/DashboardShell";

export const metadata: Metadata = {
  title: "Buyer Profile | بروفايل المشتري | Elshbiny",
  description: "Manage your Elshbiny buyer profile, quote history, and saved request actions.",
};

export default function Page() {
  return <DashboardShell />;
}
