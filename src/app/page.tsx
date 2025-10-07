import { redirect } from "next/navigation";
export default function Home() {
  // This ensures /reports redirects to /reports/sales by default
  redirect("/dashboard");
}
