import React, { useEffect } from "react";
import BarChart from "../../../components/charts/BarChart";

const labels = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "Augest",
  "September",
  "Octomber",
  "November",
  "December",
];
const values = [34, 71, 17, 18, 62, 44, 55, 43, 23, 18, 32, 66];

function Dashboard() {
  useEffect(() => {}, []);

  return (
    <>
      <BarChart
        title="Number of Student Register in Past Months"
        labels={labels}
        values={values}
      />
      <BarChart
        title="Number of Quiz Created in Past Months"
        labels={labels}
        values={values}
      />
    </>
  );
}

export default Dashboard;
