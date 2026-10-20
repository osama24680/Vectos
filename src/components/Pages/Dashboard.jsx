import React from "react";
import PageHead from "../PageHead";
import DashboardCharts from "../Dashboard/DashboardCharts.jsx";
import { pageTitle } from "../../helpers/PageTitle";

const Dashboard = () => {
  pageTitle("Dashboard");
  return (
    <>
      <PageHead
        eyebrow="Live monitoring"
        title="Sensor Dashboard"
        subtitle="Real-time readings streamed from the Vectos smart shoe — vital signs, motion and fall detection in one view."
        crumbs={[{ label: "Dashboard" }]}
      />
      <DashboardCharts />
    </>
  );
};

export default Dashboard;
