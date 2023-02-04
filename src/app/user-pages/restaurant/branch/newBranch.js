import React, { useState, useEffect } from "react";
import '../style.css';
import { baseUrl, restaurant_id, axios, Swal, Form } from "../../constant/global";
import countrydata from "../../Country/Countrydata.json";

function NewBranch() {
    const [restaurantName, setRestaurantName] = useState();
    const [restaurantID, setRestaurantID] = useState();
    const [phoneNumber, setPhoneNumber] = useState();
    const [email, setEmail] = useState();
    const [selectedCountry, setSelectedCountry] = useState("");
    const [selectedState, setSelectedState] = useState("");
    const [selectedCity, setSelectedCity] = useState("");
    const [address, setAddress] = useState();


    useEffect(() => {
        axios.get(`${baseUrl}/api/restaurants`).then((response) => {
            setRestaurantName(response.data);
        });
    }, []);

    const insert = async (e) => {
        e.preventDefault();
        //validate


        const formData = new FormData();
    
        formData.append("restaurant_id", restaurantID);
        formData.append("phone", phoneNumber);
        formData.append("email", email);
        formData.append("country", selectedCountry);
        formData.append("city", selectedCity);
        formData.append("state", selectedState);
        formData.append("address", address);

        await axios
            .post(`${baseUrl}/api/branch-insert`, formData)
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
                            <h4 className="card-title">Create New Branch</h4>
                            <a className="btn-style btn btn-info" href="/branchs">
                                <i className="bi bi-list-columns-reverse"></i>All Branch
                            </a>
                        </div>
                        <div>
                            <Form>
                                <div>
                                    <div className="background">
                                        <h2 className="header-style">Branch Information:</h2>
                                        <div>
                                            <div className="input_field two_part">
                                                <div className="wid">
                                                    <Form.Label className="label-style">Select Restaurant</Form.Label>
                                                    <select
                                                        className="select2"
                                                        onChange={(event) => {
                                                            setRestaurantID(event.target.value);
                                                        }}
                                                    >
                                                        <option value="">Select Section</option>
                                                        {restaurantName
                                                            ? restaurantName.map((data) => (
                                                                <option value={data.restaurant_id}>
                                                                    {data.restaurant_name}
                                                                </option>
                                                            ))
                                                            : null}
                                                    </select>
                                                </div>
                                                <div className="wid">
                                                    <Form.Label className="label-style">Contact no.</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="Contact no."
                                                        onChange={(event) => {
                                                            setPhoneNumber(event.target.value);
                                                        }}
                                                    ></Form.Control>
                                                </div>
                                                <div className="wid">
                                                    <Form.Label className="label-style">E-mail</Form.Label>
                                                    <Form.Control
                                                        type="email"
                                                        placeholder="E-mail"
                                                        onChange={(event) => {
                                                            setEmail(event.target.value);
                                                        }}
                                                    ></Form.Control>
                                                </div>
                                            </div>
                                            <div className="input_field">
                                                <Form.Label className="label-style">Address</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Address"
                                                    value={address}
                                                    onChange={(event) => {
                                                        setAddress(event.target.value);
                                                    }}
                                                ></Form.Control>
                                            </div>
                                            <div className="input_field two_part">
                                                <div className="wid">
                                                    <Form.Label className="label-style">Select your country</Form.Label>
                                                    <select
                                                        value={selectedCountry}
                                                        onChange={(event) =>
                                                            setSelectedCountry(event.target.value)
                                                        }
                                                    >
                                                        <option value="">Select a country</option>
                                                        {countrydata.map((country) => (
                                                            <option key={country.name} value={country.name}>
                                                                {country.name}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div className="wid">
                                                    <Form.Label className="label-style">Select your state</Form.Label>
                                                    <select
                                                        value={selectedState}
                                                        onChange={(event) =>
                                                            setSelectedState(event.target.value)
                                                        }
                                                        disabled={!selectedCountry}
                                                    >
                                                        <option value="">Select a state</option>
                                                        {selectedCountry &&
                                                            countrydata
                                                                .find(
                                                                    (country) => country.name === selectedCountry
                                                                )
                                                                .states.map((state) => (
                                                                    <option key={state.name} value={state.name}>
                                                                        {state.name}
                                                                    </option>
                                                                ))}
                                                    </select>
                                                </div>
                                                <div className="wid">
                                                    <Form.Label className="label-style">Select your city</Form.Label>
                                                    <select
                                                        id="city"
                                                        value={selectedCity}
                                                        onChange={(event) =>
                                                            setSelectedCity(event.target.value)
                                                        }
                                                        disabled={!selectedState}
                                                    >
                                                        <option value="">Select a city</option>
                                                        {selectedState &&
                                                            countrydata
                                                                .find(
                                                                    (country) => country.name === selectedCountry
                                                                )
                                                                .states.find(
                                                                    (state) => state.name === selectedState
                                                                )
                                                                .cities.map((city) => (
                                                                    <option key={city.id} value={city.name}>
                                                                        {city.name}
                                                                    </option>
                                                                ))}
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="input_field">
                                                <button onClick={insert} className="btn btn-warning"><i
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

export default NewBranch;