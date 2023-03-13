import React, { useEffect, useState } from "react";
import "./style.css";
import { baseUrl, restaurant_id, axios, Swal, Form } from "../constant/global";
import { useValidation } from "../constant/useValidation"; 
import { check } from "../constant/check";

function NewTable() {
  const [tableName, setTablename] = useState();
  const [seat, setSeat] = useState();
  const [type, setType] = useState();
  const [allTableTypes, setAllTableTypes] = useState();

  const { values, handleChange, errors, validate } = useValidation({
    table: "",
    type: "",
    number: "",
  });

  useEffect(() => {
    axios
      .get(`${baseUrl}/api/table-type-list/${restaurant_id}`)
      .then((response) => {
        //console.log(allData);
        setAllTableTypes(response.data);
      });
  }, []);

  const Insert = async (event) => {
    event.preventDefault();

    const isValid = validate();
    
    if (isValid) { 
      const formData = new FormData();
      formData.append("restaurant_id", restaurant_id);
      formData.append("branch_id", "1");
      formData.append("table_name", tableName);
      formData.append("table_type", type);
      formData.append("seat", seat);
  
      axios.post(`${baseUrl}/api/table-insert`, formData).then((response) => {
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
              <h4 className="card-title">Insert New Table</h4>
              <a className="btn-style btn btn-info" href="/table/all-table">
                <i className="bi bi-card-list"></i> All Table
              </a>
            </div>
            <div className="col-sm-12 background">
              <div>
                <div className="input_field two_part">
                  <div className="wid">
                    <Form.Label className="label-style">Table Name</Form.Label>
                    <Form.Control
                      onChange={(event) => {
                        setTablename(event.target.value);
                      }}
                      type="text"
                      name="table"
                      onBlur={handleChange}
                      placeholder="Table Name"
                    ></Form.Control>
                    {errors.table && (
                      <span className="error">{errors.table}</span>
                    )}
                  </div>
                  <div className="wid">
                    <Form.Label className="label-style">
                      Number of Seat
                    </Form.Label>
                    <Form.Control
                      onChange={(event) => {
                        setSeat(event.target.value);
                      }}
                      type="number"
                      name='number'
                      onBlur={handleChange}
                      placeholder="Number of Seat"
                    ></Form.Control>
                    {errors.number && (
                      <span className="error">{errors.number}</span>
                    )}
                  </div>
                </div>
                <div className="input_field two_part">
                  <div className="wid">
                    <Form.Label className="label-style">Type</Form.Label>
                    <select
                    name='type'
                    onBlur={handleChange}
                      onChange={(event) => {
                        setType(event.target.value);
                      }}
                    >
                      <option>Select from here..</option>
                      {allTableTypes
                        ? allTableTypes.map((data) =>
                            data.status == "1" ? (
                              <option value={data.type}>{data.type}</option>
                            ) : null
                          )
                        : null}
                    </select>
                    {errors.type && (
                      <span className="error">{errors.type}</span>
                    )}
                  </div>
                </div>
                <button className="btn btn-warning top-space" onClick={Insert}>
                  <i className="bi bi-save-fill"></i>Insert
                </button>
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

export default NewTable;
