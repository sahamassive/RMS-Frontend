import React, { useState } from "react";
import Form from 'react-bootstrap/Form';
import './style.css';
import axios, { all } from "axios";
import { baseUrl } from "../constant/global";

function NewRestaurant() {
    const [restaurantName, setRestaurantName] = useState();
    const [phoneNumber, setPhoneNumber] = useState();
    const [email, setEmail] = useState();
    const [city, setCity] = useState();
    const [area, setArea] = useState();
    const [metaTag, setMetaTag] = useState();
    const [metaDescription, setMetaDescription] = useState();
    const [metaKeywords, setMetaKeywords] = useState();
    const [image, setImage] = useState();
    const [preview, setPrview] = useState();

    const insert = async (e) => {
        e.preventDefault();
        //validate


        const formData = new FormData();
    
        formData.append("restaurant_name", restaurantName);
        formData.append("phone", phoneNumber);
        formData.append("email", email);
        formData.append("city", city);
        formData.append("area", area);
        formData.append("meta_tag", metaTag);
        formData.append("meta_description", metaDescription);
        formData.append("meta_keyword", metaKeywords);
        formData.append("image", image);

        await axios
            .post(`${baseUrl}/api/restaurant-insert`, formData)
            .then((response) => {
                alert(response.data.msg);
                console.log(response);
        });
    };
    const changeHandler = (event) => {
        setImage(event.target.files[0]);
        setPrview(URL.createObjectURL(event.target.files[0]));
    };
    return (
        <div>
            <div className="col-lg-12 grid-margin stretch-card">
                <div className="card">
                    <div className="card-body">
                    <div className="btn-section">
                        <h4 className="card-title">All Restaurant</h4>
                        <a className="btn-style btn btn-info" href="/restaurant/all"><i class="bi bi-card-list"></i> All Restaurant</a>
                    </div>
                        <div className="card-body">
                            <Form>
                                <div className='two_part'>
                                    <div className="col-sm-3 background">
                                        <label className="logo-label-style">Restaurant logo</label>
                                        <div className="col-sm-6">
                                            <Form.Group controlId="formFileMultiple" className="mb-3">
                                                <Form.Control
                                                    type="file"
                                                    multiple
                                                    onChange={changeHandler}
                                                />
                                            </Form.Group>
                                            <img src={preview} width="212rem"/>
                                        </div>
                                    </div>
                                    <div className="col-sm-9 background">
                                        <h2 className="header-style"> Enter All restaurant Information:</h2>
                                        <div>
                                            <div className="input_field">
                                                <Form.Label className="level-style">Restaurant name</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Restaurant name"
                                                    
                                                    onChange={(event) => {
                                                        setRestaurantName(event.target.value);
                                                    }}
                                                ></Form.Control>
                                            </div>
                                            <div className="input_field two_part">
                                                <div className="wid">
                                                    <Form.Label className="level-style">Contact no.</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="Contact no."
                                                        onChange={(event) => {
                                                            setPhoneNumber(event.target.value);
                                                        }}
                                                    ></Form.Control>
                                                </div>
                                                <div className="wid">
                                                    <Form.Label className="level-style">E-mail</Form.Label>
                                                    <Form.Control
                                                        type="email"
                                                        placeholder="E-mail"
                                                        onChange={(event) => {
                                                            setEmail(event.target.value);
                                                        }}
                                                    ></Form.Control>
                                                </div>
                                            </div>
                                            <div className="input_field two_part">
                                                <div className="wid">
                                                    <Form.Label className="level-style">Select your city</Form.Label>
                                                    <select
                                                    onChange={(event) => {
                                                        setCity(event.target.value);
                                                    }}
                                                    >
                                                        <option value="">Select here</option>
                                                        <option value="chef">Chef</option>
                                                    </select>
                                                </div>
                                                <div className="wid">
                                                    <Form.Label className="level-style">Select your area</Form.Label>
                                                    <select
                                                    onChange={(event) => {
                                                        setArea(event.target.value);
                                                    }}
                                                    >
                                                        <option value="">Select here</option>
                                                        <option value="chef">Chef</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="input_field">
                                                <Form.Group>
                                                    <Form.Label className="level-style">Meta Tag</Form.Label>
                                                    <Form.Control
                                                        className="area"
                                                        as="textarea"
                                                        placeholder="Meat tag"
                                                        onChange={(event) => {
                                                            setMetaTag(event.target.value);
                                                        }}
                                                        rows={3} />
                                                </Form.Group>
                                            </div>
                                            <div className="input_field">
                                                <Form.Group>
                                                    <Form.Label className="level-style">Meta description</Form.Label>
                                                    <Form.Control
                                                        className="area"
                                                        as="textarea"
                                                        placeholder="Meta description"
                                                        onChange={(event) => {
                                                            setMetaDescription(event.target.value);
                                                        }}
                                                        rows={6}>
                                                    </Form.Control>
                                                </Form.Group>
                                            </div>
                                            <div className="input_field">
                                                <Form.Group>
                                                    <Form.Label className="level-style">Meta keyword</Form.Label>
                                                    <Form.Control
                                                        className="area"
                                                        as="textarea"
                                                        placeholder="Meta keyword"
                                                        onChange={(event) => {
                                                            setMetaKeywords(event.target.value);
                                                        }}
                                                        rows={3}>
                                                    </Form.Control>
                                                </Form.Group>
                                            </div>
                                            <div className="input_field">
                                                <button onClick={insert} className="btn btn-warning top-space"><i
                                                        className="bi bi-save-fill"></i>Insert</button>
                                                <br></br><br></br>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default NewRestaurant;