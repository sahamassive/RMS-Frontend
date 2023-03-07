import React, { Component, useEffect, useState } from "react";
import "./style.css";
import $ from "jquery";
import "datatables.net";
import {
  baseUrl,
  restaurant_id,
  branch_id,
  axios,
  Swal,
  Form,
} from "../constant/global";
import ProgressBar from "react-bootstrap/ProgressBar";
const token = sessionStorage.getItem("token");
const loginType = sessionStorage.getItem("loginType");
const emp_id = sessionStorage.getItem("emp_id");

function CustomerDashboard() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");

  const Bot = () => {
    const sendMessage = async (message) => {
      const response = await axios.post(
        "http://localhost:3000/api/v1/bots/mybot/converse",
        {
          text: message,
        }
      );
      return response.data.messages[0].text;
    };

    return { sendMessage };
  };
  const bot = Bot();

  const handleChange = (event) => {
    setInputText(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const outputText = await bot.sendMessage(inputText);
    setOutputText(outputText);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={inputText} onChange={handleChange} />
        <button type="submit">Send</button>
        <p>{outputText}</p>
      </form>
    </div>
  );
}
export default CustomerDashboard;
