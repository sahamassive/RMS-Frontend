import React, { useState, useEffect } from "react";
import $ from "jquery";
import "datatables.net";
import { Line, Pie } from "react-chartjs-2";
import {
  baseUrl,
  axios,
  restaurant_id,
  Form,
} from "../user-pages/constant/global";
import Card from "react-bootstrap/Card";
import './style.css';
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
  const [yearWise, setYearWise] = useState({});
  const [trend, setTrend] = useState();
  const [todaySell, setTodaySell] = useState();
  const [todayItems, setTodayItems] = useState();
  const [todayIngredient, setTodayIngredient] = useState();
  const [monthIngredient, setMonthIngredient] = useState();

  const [table, setTable] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [chef, setChef] = useState();
  const [chefId, setChefId] = useState();

  const date = new Date();
  const monthName = date.toLocaleDateString("default", { month: "long" });
  const dayName = date.toLocaleDateString("default", { weekday: "long" });

  const getRandomColor = () => {
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);
    return `rgb(${red}, ${green}, ${blue})`;
  };

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
      setTodayIngredient(response.data.today_ingredient);
      setMonthIngredient(response.data.month_ingredient);
    });
  }, []);
  useEffect(() => {
    axios.defaults.headers.common = { Authorization: `Bearer ${token}` };

    axios.get(`${baseUrl}/api/chefs/${restaurant_id}`).then((response) => {
      setChef(response.data);
      //console.log(response.data);
    });
  }, []);
  const handleFilter = () => {
    axios.defaults.headers.common = { Authorization: `Bearer ${token}` };
    console.log(startDate);

    axios
      .get(
        `${baseUrl}/api/filter-data/${startDate}/${endDate}/${restaurant_id}`
      )
      .then((response) => {
        //console.log(response.data.today_items);
        console.log(response.data);

        setMonthIngredient(response.data);
      });
  };
  const handleFilterChef = () => {
    axios.defaults.headers.common = { Authorization: `Bearer ${token}` };
    setTodayIngredient();
    axios
      .get(`${baseUrl}/api/filter-chef-data/${chefId}/${restaurant_id}`)
      .then((response) => {
        //console.log(response.data.today_items);
        console.log(response.data);

        setTodayIngredient(response.data);
      });
  };
  const handleFilterSell = () => {
    axios.defaults.headers.common = { Authorization: `Bearer ${token}` };
    setTodayItems();
    axios
      .get(
        `${baseUrl}/api/filter-sell-data/${startDate}/${endDate}/${restaurant_id}`
      )
      .then((response) => {
        //console.log(response.data.today_items);
        console.log(response.data);

        setTodayItems(response.data);
      });
  };

  useEffect(() => {
    axios.defaults.headers.common = { Authorization: `Bearer ${token}` };
    axios.get(`${baseUrl}/api/tables/${restaurant_id}`).then((response) => {
      setTable(response.data);
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
              borderColor: "rgba(0,0,0,1)",
              borderWidth: 1,
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
        setYearWise({
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
              borderColor: "rgba(0,0,0,1)",
              borderWidth: 1,
            },
          ],
        });
      });
  }, []);

  return (
    <div>
      <div className="col-lg-12 grid-margin stretch-card">
        <div className="card">
          <div className="card-body">
            <div className="card-section">
              <div className="single-card">
                Today Total Sell
                <br></br>
                <strong>
                  <i className="bi bi-cash-stack"></i>{" "}
                  {todaySell ? todaySell.total : "0"} Tk.
                </strong>
              </div>
              <div className="single-card">
                Today Total Item Sell
                <br></br>
                <strong>
                  <i className="bi bi-clipboard2-data"></i>{" "}
                  {todaySell ? todaySell.items : "0"} items
                </strong>
              </div>
              <div className="single-card">
                Today Total Order
                <br></br>
                <strong>
                  <i class="bi bi-border-style"></i>{" "}
                  {todaySell ? todaySell.order_count : "0"} orders
                </strong>
              </div>
            </div>
            <div className="two_part">
              <div className="background-dashboard wid">
                <div className="trending">
                  {trend
                    ? trend.map((data, index) => (
                        <div className="background wid">
                          <Card key={index}>
                            <Card.Header>
                              <Badge variant="primary">
                                Trending #{index + 1}
                              </Badge>
                              <Badge variant="success">
                                {data.order_count} times
                              </Badge>
                            </Card.Header>
                            <Card.Img
                              variant="top"
                              width="50%"
                              src={`${baseUrl}/foods/small/${data.image}`}
                            />
                            <Card.Body>
                              <Card.Title>{data.name}</Card.Title>
                              <button variant="primary">$ {data.price}</button>
                            </Card.Body>
                          </Card>
                        </div>
                      ))
                    : null}
                </div>
              </div>
              <div className="background-dashboard wid">
                <h4 className="input_field order-id2 text-color2">
                  Sell Data for per Item:
                </h4>
                <div className="two_part">
                <div className="wid">
                <Form.Label className="label-style text-color">Start Date</Form.Label>
                    <Form.Control
                      id="field-style"
                  type="date"
                  value={startDate ? startDate : null}
                  onChange={(e) => {
                    setStartDate(e.target.value);
                  }}
                />
              </div>
              <div className="wid">
                <Form.Label className="label-style text-color">End Date</Form.Label>
                    <Form.Control
                    className="white-class"
                  type="date"
                  id="endDate"
                  value={endDate ? endDate : null}
                  onChange={(e) => {
                    setEndDate(e.target.value);
                  }}
                />
              </div>
                  <button
                    className="btn btn-primary btn-22"
                type="submit"
                onClick={() => {
                  handleFilterSell();
                }}
              >
                Submit
              </button>
                </div>
                <div className="table-responsive">
                  <table id="today-data" className="table-borderless wid">
                    <thead>
                      <tr className="order-id2 bg-coloring">
                        <th>Food</th>
                        <th>Order</th>
                        <th>Sell-Quantity</th>
                      </tr>
                    </thead>

                    <tbody>
                      {todayItems
                        ? todayItems.map((data) => (
                            <tr className="order-id2 text-color">
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
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="two_part">
              <div className="background-dashboard wid">
                <h4 className="input_field order-id2 btn-222">
                  Inventory Status({dayName})
                </h4>
                <div className="two_part">
                <div className="wid">
                <Form.Label className="label-style text-color">Select Chef</Form.Label>
                    <select
                      id="field-style"
                  onChange={(event) => {
                    setChefId(event.target.value);
                  }}
                >
                  <option>Select from here...</option>
                  {chef
                    ? chef.map((data) => (
                        <option value={data.emp_id}>
                          {data.emp_id}, {data.first_name} {data.last_name}
                        </option>
                      ))
                    : null}
                </select>
              </div>
                  <button
                    className="btn btn-primary btn-22"
              type="submit"
              onClick={() => {
                handleFilterChef();
              }}
            >
              Submit
            </button>
                </div>
                <div className="table-responsive">
                  <table id="today-data" className="table-borderless wid">
                    <thead>
                      <tr className="order-id2 bg-coloring">
                        <th>Ingredient Name</th>
                        <th>Distribution Quantity</th>
                        <th>Used Quantity</th>
                        <th>Return Quantiy</th>
                      </tr>
                    </thead>

                    <tbody>
                      {todayIngredient
                        ? todayIngredient.map((data) => (
                            <tr className="order-id2 text-color">
                              <td>{data.ingredient}</td>
                              <td>
                                {data.quantity}({data.unit})
                              </td>
                              <td>
                                {data.used_quantity}({data.unit})
                              </td>
                              <td>
                                {data.return_quantity}({data.unit})
                              </td>
                            </tr>
                          ))
                        : 0}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="background-dashboard wid">
                <h4 className="input_field order-id2 text-color2">
                  Inventory Status({monthName})
                </h4>

                <div className="two_part">
                <div className="wid">
                <Form.Label className="label-style text-color">Start Date</Form.Label>
                    <Form.Control
                      id="field-style"
                  type="date"
                  value={startDate ? startDate : null}
                  onChange={(e) => {
                    setStartDate(e.target.value);
                  }}
                />
              </div>
              <div className="wid">
                <Form.Label className="label-style text-color">End Date</Form.Label>
                    <Form.Control
                      className="white-class"
                  type="date"
                  id="endDate"
                  value={endDate ? endDate : null}
                  onChange={(e) => {
                    setEndDate(e.target.value);
                  }}
                />
              </div>
                  <button
                    className="btn btn-primary btn-22"
                type="submit"
                onClick={() => {
                  handleFilter();
                }}
              >
                Submit
              </button>
                </div>

                <div className="table-responsive">
                  <table id="today-data" className="table-borderless wid">
                    <thead>
                      <tr className="order-id2 bg-coloring">
                        <th>Ingredient Name</th>
                        <th>Distribution Quantity</th>
                        <th>Used Quantity</th>
                        <th>Return Quantiy</th>
                      </tr>
                    </thead>

                    <tbody>
                      {monthIngredient
                        ? monthIngredient.map((data) => (
                            <tr className="order-id2 text-color">
                              <td>{data.ingredient}</td>
                              <td>
                                {data.quantity}({data.unit})
                              </td>
                              <td>
                                {data.used_quantity}({data.unit})
                              </td>
                              <td>
                                {data.return_quantity}({data.unit})
                              </td>
                            </tr>
                          ))
                        : 0}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
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
                <Pie
                  data={yearWise ? yearWise : null}
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
              <div className="background-dashboard wid text-color">
                <h4 className="input_field order-id2 text-color2">
                  All Tables:
                </h4>
                <div className="table-responsive">
                  <table id="today-data" className="table-borderless wid">
                    <thead>
                      <tr className="order-id2 bg-coloring">
                        <th>Table name</th>
                        <th>Table Type</th>
                        <th>Status</th>
                        <th>Seat</th>
                      </tr>
                    </thead>

                    <tbody>
                      {table
                        ? table.map((data) => (
                            <tr className="order-id2 text-color">
                              <td>{data.table_name}</td>
                              <td>{data.table_type}</td>
                              <td>
                                {data.status == "free" ? (
                                  <button className="btn btn-primary" disabled>
                                    {data.status}
                                  </button>
                                ) : null}
                                {data.status == "busy" ? (
                                  <button className="btn btn-danger" disabled>
                                    {data.status}
                                  </button>
                                ) : null}
                              </td>
                              <td>{data.seat}</td>
                            </tr>
                          ))
                        : 0}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
