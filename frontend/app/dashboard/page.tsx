"use client";
import { useGetOverviewQuery } from "@/app/services/analyticsApi";

const Dashboard = () => {
  const { data, isLoading } = useGetOverviewQuery();
  if (isLoading) {
    return (
      <div>
        <h1>Dashboard</h1>
        <p>Loading…</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Dashboardss</h1>
    </div>
  );
};

export default Dashboard;