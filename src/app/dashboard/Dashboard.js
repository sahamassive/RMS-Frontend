import React, { useState, useEffect } from "react";
import $ from "jquery";
import "datatables.net";
import { Line, Pie } from "react-chartjs-2";
import { baseUrl, axios, restaurant_id } from "../user-pages/constant/global";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import CardDeck from "react-bootstrap/CardDeck";
const loginType = sessionStorage.getItem("loginType");
const token = sessionStorage.getItem("token");

if (loginType == "Super-Admin" || loginType == "Admin") {
} else {
  window.location.href = "/";
}

function Dashboard() {
  const [chartDataMonthWise, setChartDataMonthWise] = useState({});
  const [chartDataDayWise, setChartDataDayWise] = useState({});
  const [comparison, setComparison] = useState({});
  const [trend, setTrend] = useState();
  const [todaySell, setTodaySell] = useState();
  const [todayItems, setTodayItems] = useState();
  useEffect(() => {
    axios.defaults.headers.common = { Authorization: `Bearer ${token}` };

    axios
      .get(`${baseUrl}/api/trending-order/${restaurant_id}`)
      .then((response) => {
        console.log(response);
        setTrend(response.data);
      });
  }, []);

  useEffect(() => {
    axios.defaults.headers.common = { Authorization: `Bearer ${token}` };

    axios.get(`${baseUrl}/api/today-data/${restaurant_id}`).then((response) => {
      console.log(response.data.today_items);
      setTodaySell(response.data.today_sell);
      setTodayItems(response.data.today_items);
    });
  }, []);
  useEffect(() => {
    axios.defaults.headers.common = { Authorization: `Bearer ${token}` };

    axios
      .get(`${baseUrl}/api/total-sales-month-wise/${restaurant_id}`)
      .then((response) => {
        setChartDataMonthWise({
          labels: response.data.data_label,
          datasets: [
            {
              label: "Data",
              data: response.data.data,
              backgroundColor: "rgba(75,192,192,1)",
            },
          ],
        });
      });
  }, []);
  useEffect(() => {
    axios.defaults.headers.common = { Authorization: `Bearer ${token}` };

    axios
      .get(`${baseUrl}/api/total-sales-day-wise/${restaurant_id}`)
      .then((response) => {
        setChartDataDayWise({
          labels: response.data.data_label,
          datasets: [
            {
              label: "Data",
              data: response.data.data,
              backgroundColor: [
                "rgba(255, 99, 132, 0.6)",
                "rgba(54, 162, 235, 0.6)",
                "rgba(255, 206, 86, 0.6)",
                "rgba(75, 192, 192, 0.6)",
                "rgba(153, 102, 255, 0.6)",
                "rgba(255, 159, 64, 0.6)",
                "rgba(255, 0, 255, 0.6)",
              ],
            },
          ],
        });
      });
  }, []);
  useEffect(() => {
    axios.defaults.headers.common = { Authorization: `Bearer ${token}` };

    axios
      .get(`${baseUrl}/api/year-wise-comparison/${restaurant_id}`)
      .then((response) => {
        const datasets = response.data.data_label.map((label, index) => ({
          label: label,
          data: response.data.data[index],
          borderColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
            Math.random() * 255
          )}, ${Math.floor(Math.random() * 255)}, 1)`,
          fill: false,
        }));

        setComparison({
          labels: response.data.data_label,
          datasets: datasets,
        });
      });
  }, []);
  $.DataTable = require("datatables.net");
  $(document).ready(function () {
    $("#today-data").DataTable();
  });
  return (
    <div className="background">
      <div className="two_part">
        <div className="background-dashboard wid">
          <div className="trending">
            {trend
              ? trend.map((data, index) => (
                  <div>
                    <Card key={index}>
                      <Card.Header>
                        <Badge variant="primary">Trending #{index + 1}</Badge>
                        <Badge variant="success">
                          {data.order_count} times
                        </Badge>
                      </Card.Header>
                      <Card.Img
                        variant="top"
                        height="200rem"
                        src={`${baseUrl}/foods/small/${data.image}`}
                      />
                      <Card.Body>
                        <Card.Title>{data.name}</Card.Title>
                        <Card.Text>{data.description}</Card.Text>
                        <button variant="primary">$ {data.price}</button>
                      </Card.Body>
                    </Card>
                  </div>
                ))
              : null}
          </div>
          <div className="trending">
            <div>
              <Card>
                <Card.Body>
                  <Card.Title>
                    Today Total Sell: {todaySell ? todaySell.total : null}
                  </Card.Title>
                  <Card.Title>
                    Today Total Item Sell {todaySell ? todaySell.items : null}
                  </Card.Title>
                  <Card.Title>
                    Today Total Order {todaySell ? todaySell.order_count : null}
                  </Card.Title>

                  <button variant="primary">$</button>
                </Card.Body>
              </Card>
            </div>
          </div>
        </div>
        <div className="background-dashboard wid">
          <div className="table-responsive table-style table-background">
            <table id="today-data" className="table table-striped table-style">
              <thead>
                <tr>
                  <th>Food</th>

                  <th>Order</th>
                  <th>Sell Quantity</th>
                </tr>
              </thead>

              <tbody>
                {todayItems
                  ? todayItems.map((data) => (
                      <tr>
                        <td>
                          <img
                            src={`${baseUrl}/foods/small/${data.image}`}
                            width="80px"
                            height="50px"
                          />
                          {data.name}
                        </td>
                        <td>{data.item_count}</td>
                        <td>{data.quantity}</td>
                      </tr>
                    ))
                  : 0}
                {/* <tr>
                  <td>name</td>
                  <td>name</td>
                  <td>name</td>
                </tr> */}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <h3>Today Order</h3>

      <div className="two_part">
        <div className="background-dashboard wid">
          <Line
            data={chartDataMonthWise ? chartDataMonthWise : null}
            options={{
              title: {
                display: true,
                text: "Month Wise Sales Report",
                fontSize: 20,
              },
              legend: {
                display: false,
                position: "right",
              },
            }}
          />
        </div>
        <div className="background-dashboard wid">
          <Pie
            data={chartDataDayWise ? chartDataDayWise : null}
            options={{
              title: {
                display: true,
                text: "Daily Sales Report",
                fontSize: 20,
              },
              legend: {
                display: true,
                position: "right",
              },
            }}
          />
        </div>
      </div>
      <div className="two_part">
        <div className="background-dashboard wid">
          <Line
            data={comparison ? comparison : null}
            options={{
              title: {
                display: true,
                text: "Year Wise Sales Report",
                fontSize: 20,
              },
              legend: {
                display: true,
                position: "right",
              },
              scales: {
                xAxes: [
                  {
                    display: false,
                  },
                ],
              },
            }}
          />
        </div>

        <div className="background-dashboard wid">
          <Pie
            data={chartDataDayWise ? chartDataDayWise : null}
            options={{
              title: {
                display: true,
                text: "Daily Sales Report",
                fontSize: 20,
              },
              legend: {
                display: true,
                position: "right",
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
