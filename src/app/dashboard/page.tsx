import { redirect } from "next/navigation";

function Dashboard() {
  redirect("/dashboard/positions");
}

export default Dashboard;
