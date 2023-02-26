import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
const loginType = sessionStorage.getItem("loginType");

if (loginType == "Super-Admin" || loginType == "Admin") {
} else {
  window.location.href = "/";
}

function Dashboard() {
  const [chartData, setChartData] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/data");
      const data = await response.json();

      setChartData({
        labels: data.labels,
        datasets: [
          {
            label: "Data",
            data: data.data,
            backgroundColor: "rgba(75,192,192,1)",
          },
        ],
      });
    };

    fetchData();
  }, []);
  return <div>Hi</div>;
}

export default Dashboard;
