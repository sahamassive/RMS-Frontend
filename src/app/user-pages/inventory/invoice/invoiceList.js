import React, { useEffect, useState } from "react";
import $ from "jquery";
import "datatables.net";
import "../style.css";
import {
  baseUrl,
  restaurant_id,
  axios,
  Swal,
  Form,
} from "../../constant/global";
import { check } from "../../constant/check";

import Modal from "@mui/material/Modal";
const token = sessionStorage.getItem("token");

function InvoiceList() {
  const [allData, setAllData] = useState();
  const [invoiceModalStatus, setInvoiceModalStatus] = React.useState(false);
  const [supplierModal, setSupplierModal] = React.useState(false);
  const [detailsData, setDetailsData] = useState();
  const [supplier, setSupplier] = useState();
  const [restaurant, setRestaurant] = useState();

  const invoiceModalOpen = (invoice_id) => {
    axios.defaults.headers.common = { Authorization: `Bearer ${token}` };

    axios
      .get(`${baseUrl}/api/invoice-details/${invoice_id}`)
      .then((response) => {
        //console.log(response.data.supplier);
        setDetailsData(response.data.details);
        setSupplier(response.data.supplier);
      });
    setInvoiceModalStatus(true);
  };

  const invoiceModalClose = () => setInvoiceModalStatus(false);

  const getResturant = () => {
    axios.defaults.headers.common = { Authorization: `Bearer ${token}` };

    axios.get(`${baseUrl}/api/restaurant/${restaurant_id}`).then((response) => {
      console.log(response.data);
      setRestaurant(response.data);
    });
  };

  useEffect(() => {
    axios.defaults.headers.common = { Authorization: `Bearer ${token}` };

    axios.get(`${baseUrl}/api/invoices`).then((response) => {
      setAllData(response.data);
    });
    getResturant();
  }, []);

  const printModal = () => {
    var printContents = document.getElementById("invoiceDetails").innerHTML;
    var originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;

    window.print();

    document.body.innerHTML = originalContents;
  };

  $.DataTable = require("datatables.net");
  $(document).ready(function () {
    $("#inventory").DataTable();
  });

  return (
    <div>
      <div className="col-lg-12 grid-margin stretch-card">
        <div className="card">
          <div className="card-body">
            <div className="btn-section">
              <h4 className="card-title">All Invoices</h4>
              <a
                className="btn-style btn btn-info"
                href="/inventory/new-inventory"
              >
                <i className="bi bi-plus-square"></i>New Inventory
              </a>
            </div>
            <div className="table-responsive table-style table-background">
              {allData ? (
                <table
                  id="inventory"
                  className="table table-striped table-style"
                >
                  <thead>
                    <tr>
                      <th>SI.</th>
                      <th>Invoice ID</th>
                      <th>Supplier Name</th>
                      <th>Total price</th>
                      <th>Date</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allData.map((data, index) => (
                      <tr>
                        <td>{index + 1}</td>
                        <td>
                          <button
                            onClick={() => {
                              invoiceModalOpen(data.invoice_id);
                            }}
                            className="btn btn-outline-dark"
                          >
                            {data.invoice_id}
                          </button>
                        </td>
                        <td>
                          <button className="btn btn-outline-dark">
                            {data.supplier_name}
                          </button>
                        </td>
                        <td>{data.total_price}</td>
                        <td>{data.date}</td>
                        <td>
                          <a
                            className="btn btn-warning"
                            href={`/waste/edit-waste/${data.id}`}
                          >
                            <i className="bi bi-pencil-square"></i>Edit
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : null}
              <br></br>
            </div>
          </div>
        </div>
      </div>
      <Modal
        open={invoiceModalStatus}
        onClose={invoiceModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div id="invoiceDetails" className="emp-modal">
          <div className="btn-section">
            <div className="logo-section">
              <img
                className="logo2"
                src={require("../../../../assets/images/logo.png")}
                alt=""
              ></img>
              <p className="company_name2">
                <span className="res2">Restaurant</span> FOOD
              </p>
            </div>
            <div className="border-box">
              <span>
                <i className="icon-color bi bi-geo-alt-fill"></i>{" "}
                {restaurant ? restaurant.address : null}
              </span>{" "}
              <br></br> <br></br>
              <span>
                <i className="icon-color bi bi-telephone-outbound-fill"></i>{" "}
                {restaurant ? restaurant.phone : null}
              </span>{" "}
              <br></br>
              <span>
                <i className="icon-color bi bi-envelope-paper-fill"></i>{" "}
                {restaurant ? restaurant.email : null}
              </span>
            </div>
            <div>
              <span className="invoice">Invoice</span>
            </div>
          </div>
          <hr className="line-style"></hr>
          {detailsData ? (
            <div>
              <div className="btn-section">
                <span className="border-box3">Supplier</span>
                {supplier ? (
                  <div className="border-box2">
                    <h3>{supplier.supplier_name}</h3>
                    <span>{supplier.bazar_name}</span>
                    <span>
                      <i className="icon-color bi bi-envelope-paper-fill"></i>{" "}
                      {supplier.email}
                    </span>
                    <br></br>
                    <span>
                      <i className="icon-color bi bi-telephone-outbound-fill"></i>{" "}
                      {supplier.phone}
                    </span>
                    <br></br>
                    <span>
                      <i className="icon-color bi bi-geo-alt-fill"></i>{" "}
                      {supplier.address}
                    </span>
                  </div>
                ) : null}
                <div className="close-btn">
                  <a onClick={invoiceModalClose}>
                    <i className="bi bi-x-square"></i>
                  </a>
                </div>
                <div className="border-box2 position">
                  <p>
                    Invoice ID: <strong>{detailsData[0].invoice_id}</strong>
                  </p>
                  <p>
                    Date: <strong>{supplier ? supplier.date : null}</strong>
                  </p>
                </div>
              </div>
              <div>
                <div className="modal-table table-responsive table-background">
                  <table
                    id="branchs"
                    className="table table-striped table-hover"
                  >
                    <thead>
                      <tr>
                        <th>SI.</th>
                        <th>Ingredient Name</th>
                        <th>Unit</th>
                        <th>Amount</th>
                        <th>Price</th>
                        <th>Date</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {detailsData.map((data, index) => (
                        <tr>
                          <td>{index + 1}</td>
                          <td>{data.ingredient}</td>
                          <td>{data.unit}</td>
                          <td>{data.amount}</td>
                          <td>{data.price}</td>
                          <td>{supplier ? supplier.date : null}</td>
                          <td>
                            <a
                              className="btn btn-warning"
                              href={`/waste/edit-waste/${data.id}`}
                            >
                              <i className="bi bi-pencil-square"></i>Edit
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="table-style5 table-responsive">
                    <table className="table table-bordered table-hover">
                      <tbody>
                        <tr>
                          <td>Total Price</td>
                          <td>{supplier ? supplier.total_price : null}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
          <div className="d-grid gap-2 col-6 mx-auto two_part">
            <button className="btn btn-dark top-space" onClick={printModal}>
              <i className="bi bi-save-fill"></i>Print
            </button>
            <br></br>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default InvoiceList;
