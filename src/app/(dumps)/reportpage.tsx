import { redirect } from "next/navigation";

export default function ReportsPage() {
  // This ensures /reports redirects to /reports/sales by default
  redirect("/reports/sales");
}
