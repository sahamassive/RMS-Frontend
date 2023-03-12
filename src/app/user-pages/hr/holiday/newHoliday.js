import React from "react";
import "../style.css";
import {
  baseUrl,
  restaurant_id,
  axios,
  Swal,
  Form,
} from "../../constant/global";
import { check } from "../../constant/check";
function NewHoliday() {
  return (
    <div>
      <div className="col-lg-12 grid-margin stretch-card">
        <div className="card">
          <div className="card-body">
            <div className="btn-section">
              <h4 className="card-title">New Holiday:</h4>
              <a className="btn-style btn btn-info" href="/hr/holidays">
                <i class="bi bi-card-list"></i> All Holidays
              </a>
            </div>
            <div className="background">
              <div className="col-sm-12 background">
                <div className="input_field">
                  <div className="wid">
                    <Form.Label className="label-style">
                      Holiday name
                    </Form.Label>
                    <Form.Control type="text" placeholder="Holiday name" />
                  </div>
                </div>
                <div className="input_field two_part">
                  <div className="wid">
                    <Form.Label className="label-style">Start Date</Form.Label>
                    <Form.Control
                      type="date"
                      placeholder="Amount"
                    ></Form.Control>
                  </div>
                  <div className="wid">
                    <Form.Label className="label-style">End Date</Form.Label>
                    <Form.Control
                      type="date"
                      placeholder="Price"
                    ></Form.Control>
                  </div>
                  <div className="wid">
                    <Form.Label className="label-style">
                      Select holiday type
                    </Form.Label>
                    <select>
                      <option value="">Select from here</option>
                      <option value="chef">Govt. Holiday</option>
                      <option value="chef">Company Holiday</option>
                    </select>
                  </div>
                </div>
                <div className="input_field">
                  <Form.Group>
                    <Form.Label className="label-style">Description</Form.Label>
                    <Form.Control
                      className="area"
                      as="textarea"
                      placeholder="Description"
                      rows={3}
                    />
                  </Form.Group>
                </div>
                <a className="btn btn-warning top-space2">
                  <i className="bi bi-save-fill"></i>Insert
                </a>
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

export default NewHoliday;
