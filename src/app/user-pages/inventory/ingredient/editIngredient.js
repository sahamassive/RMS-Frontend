import React, { useState, useEffect } from "react";
import "../style.css";
import {
  baseUrl,
  restaurant_id,
  axios,
  Swal,
  Form,
} from "../../constant/global";
import { useParams } from "react-router-dom";
import { check } from "../../constant/check";

const token = sessionStorage.getItem("token");

function EditIngredient() {
  const [name, setName] = useState();
  const params = useParams();

  useEffect(() => {
    axios.defaults.headers.common = { Authorization: `Bearer ${token}` };

    axios
      .get(`${baseUrl}/api/ingredient-edit/${params.id}`)

      .then((res) => {
        setName(res.data.ingredient);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [params.id]);

  const Update = async (event) => {
    event.preventDefault();

    const formdata = new FormData();
    formdata.append("ingredient", name);

    await axios
      .post(`${baseUrl}/api/ingredient-edit/${params.id}`, formdata)
      .then((response) => {
        Swal.fire({
          title: response.data.msg,
          icon: "success",
          confirmButtonText: "OK",
        });
      });
  };

  return (
    <div>
      <div className="col-lg-12 grid-margin stretch-card">
        <div className="card">
          <div className="card-body">
            <div className="btn-section">
              <h4 className="card-title">Edit Ingredeint Information</h4>
              <a
                className="btn-style btn btn-info"
                href="/inventory/ingredient-list"
              >
                <i className="bi bi-list-columns-reverse"></i>All Ingredients
              </a>
            </div>
            <div className="col-sm-12 background">
              <div>
                <div className="input_field two_part">
                  <div className="wid">
                    <Form.Label className="label-style">
                      Ingredient name
                    </Form.Label>
                    <Form.Control
                      value={name}
                      type="text"
                      placeholder="Ingredient Name"
                      onChange={(event) => {
                        setName(event.target.value);
                      }}
                    ></Form.Control>
                  </div>
                </div>
                <a className="btn btn-primary top-space" onClick={Update}>
                  <i className="bi bi-save-fill"></i>Update
                </a>
                <br></br>
                <br></br> <br></br>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditIngredient;
