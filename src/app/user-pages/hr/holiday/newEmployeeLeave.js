import React, { useState } from "react";
import "../style.css";
import {
  baseUrl,
  restaurant_id,
  axios,
  Swal,
  Form,
} from "../../constant/global";
import { check } from "../../constant/check";
import { useValidation } from "../../constant/useValidation"; 


function NewEmployeeLeave() {
  const [startingTime, setStartingTime] = useState();
  const [endingTime, setEndingTime] = useState();
  const [reason, setReason] = useState();
  const [employeeId, setEmployeeId] = useState();
  const [allData, setAllData] = useState();
  const token = sessionStorage.getItem("token");

  const { values, handleChange, errors, validate } = useValidation({
    type: "",
    employee: "",
    startDate: "",
    endDate: "",
    reason: "",
  });

  const typeFunction = (type) => {
    axios.defaults.headers.common = { Authorization: `Bearer ${token}` };
    axios.get(`${baseUrl}/api/get-employee/${type}`).then((response) => {
      setAllData(response.data);
      //console.log(response.data);
    });
  };
  const Insert = async (e) => {
    e.preventDefault();

    const isValid = validate();
    
    if (isValid) {
      const formData = new FormData();
      formData.append("restaurant_id", restaurant_id);
      formData.append("emp_id", employeeId);
      formData.append("reason", reason);
      formData.append("start_time", startingTime);
      formData.append("end_time", endingTime);
  
      axios.defaults.headers.common = { Authorization: `Bearer ${token}` };
      await axios
        .post(`${baseUrl}/api/leave-insert`, formData)
        .then((response) => {
          Swal.fire({
            title: response.data.msg,
            icon: "success",
            confirmButtonText: "OK",
          });
        }); 
    }
  };
  return (
    <div>
      <div className="col-lg-12 grid-margin stretch-card">
        <div className="card">
          <div className="card-body">
            <div className="btn-section">
              <h4 className="card-title">New Employee Leave:</h4>
              <a className="btn-style btn btn-info" href="/hr/leave">
                <i class="bi bi-card-list"></i> All Leave
              </a>
            </div>
            <div className="background">
              <div className="col-sm-12 background">
                <div className="input_field two_part">
                  <div className="wid">
                    <Form.Label className="label-style">
                      Select employee type
                    </Form.Label>
                    <select
                      name="type"
                      onBlur={handleChange}
                      onChange={(event) => {
                        typeFunction(event.target.value);
                      }}
                    >
                      <option value="">Select here</option>
                      <option value="chef">Chef</option>
                      <option value="waiter">Waiter</option>
                      <option value="delivery_men">Delivery Men</option>
                      <option value="salesmarketing">Sales & Marketing</option>
                      <option value="manager">Manager</option>
                      <option value="cleaner">Cleaner</option>
                    </select>
                    {errors.type && (
                      <span className="error">{errors.type}</span>
                    )}
                  </div>
                  <div className="wid">
                    <Form.Label className="label-style">
                      Select employee
                    </Form.Label>
                    <select
                      name="employee"
                      onBlur={handleChange}
                      onChange={(event) => {
                        setEmployeeId(event.target.value);
                      }}
                    >
                      <option value="">Select from here...</option>
                      {allData
                        ? allData.map((data) => (
                            <option value={data.emp_id}>
                              {data.emp_id}, {data.first_name} {data.last_name}
                            </option>
                          ))
                        : null}
                    </select>
                    {errors.employee && (
                      <span className="error">{errors.employee}</span>
                    )}
                  </div>
                </div>
                <div className="input_field two_part">
                  <div className="wid">
                    <Form.Label className="label-style">Start Date</Form.Label>
                    <Form.Control
                      name="startDate"
                      onBlur={handleChange}
                      type="date"
                      placeholder="Amount"
                      onChange={(event) => {
                        setStartingTime(event.target.value);
                      }}
                    ></Form.Control>
                    {errors.startDate && (
                      <span className="error">{errors.startDate}</span>
                    )}
                  </div>
                  <div className="wid">
                    <Form.Label className="label-style">End Date</Form.Label>
                    <Form.Control
                      name="endDate"
                      onBlur={handleChange}
                      type="date"
                      placeholder="Price"
                      onChange={(event) => {
                        setEndingTime(event.target.value);
                      }}
                    ></Form.Control>
                    {errors.endDate && (
                      <span className="error">{errors.endDate}</span>
                    )}
                  </div>
                </div>
                <div className="input_field">
                  <Form.Group>
                    <Form.Label className="label-style">
                      Reason of Leave
                    </Form.Label>
                    <Form.Control
                      name="reason"
                      onBlur={handleChange}
                      className="area"
                      as="textarea"
                      placeholder="Reason of Leave"
                      rows={3}
                      onChange={(event) => {
                        setReason(event.target.value);
                      }}
                    />
                    {errors.reason && (
                      <span className="error">{errors.reason}</span>
                    )}
                  </Form.Group>
                </div>
                <button onClick={Insert} className="btn btn-warning top-space2">
                  <i className="bi bi-save-fill"></i>Insert
                </button>
                <br></br>
                <br></br>
                <br></br>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewEmployeeLeave;
