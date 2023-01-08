import Form from 'react-bootstrap/Form';
import React, { useState, useEffect } from 'react';
//import csc  from 'country-state-city';
import { useFormik } from "formik";
import Select from "react-select";

function Address() { 
    let csc = require('country-state-city').default;
    const addressFromik = useFormik({
        initialValues: {
            country: "Bangladesh",
            state: null,
            city: null
        },
        onSubmit: (values) => console.log(JSON.stringify(values))
    });
    
    const countries = csc.getAllCountries();
    
    const updatedCountries = countries.map((country) => ({
        label: country.name,
        value: country.id,
        ...country
    }));
    const updatedStates = (countryId) =>
        csc
        .getStatesOfCountry(countryId)
        .map((state) => ({ label: state.name, value: state.id, ...state }));
    const updatedCities = (stateId) =>
        csc
        .getCitiesOfState(stateId)
        .map((city) => ({ label: city.name, value: city.id, ...city }));
    
    const { values, setFieldValue, setValues } = addressFromik;
    
    useEffect(() => {}, [values]);

    const [address1, setAddress1] = useState();
    const [address2, setAddress2] = useState();
    const [country, setCountry] = useState();
    const [city, setCity] = useState();
    const [state, setState] = useState();
    const [zipCode, setZipCode] = useState();
    return (
        <div className='background'>
            <div className="input_field">
                <div className="wid">
                    <Form.Label className="level-style">Address line 1</Form.Label>
                    <Form.Control
                        className="wid"
                        name="address1"
                        type="text"
                        placeholder="Address line 1"
                        onChange={(event) => {
                            setAddress1(event.target.value);
                        }}
                    />
                </div>
            </div>
            <div className="input_field">
                <div className="wid">
                    <Form.Label className="level-style">Address line 2</Form.Label>
                    <Form.Control
                        className="wid"
                        name="address2"
                        type="text"
                        placeholder="Address line 2"
                        onChange={(event) => {
                            setAddress2(event.target.value);
                        }}
                    />
                </div>
            </div>
            <div className="input_field two_part">
                <div className="wid">
                    <Form.Label className="level-style">Country</Form.Label>
                    <Select
                        id="country"
                        name="country"
                        label="country"
                        options={updatedCountries}
                        value={values.country}
                        onChange={(value) => {
                            setValues({ country: value, state: null, city: null }, false);
                        }}
                    />
                </div>
                <div className="wid">
                    <Form.Label className="level-style">State</Form.Label>
                    <Select
                        id="state"
                        name="state"
                        options={updatedStates(values.country ? values.country.value : null)}
                        value={values.state}
                        onChange={(value) => {
                            setValues({ state: value, city: null }, false);
                        }}
                    />
                </div>
            </div>
            <div className="input_field two_part">
                <div className="wid">
                    <Form.Label className="level-style">City</Form.Label>
                    <Select
                        id="city"
                        name="city"
                        options={updatedCities(values.state ? values.state.value : null)}
                        value={values.city}
                        onChange={(value) => setFieldValue("city", value)}
                    />
                </div>
                <div className="wid">
                    <Form.Label className="level-style">ZIP code</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Zip Code"
                        onChange={(event) => {
                            setZipCode(event.target.value);
                        }}
                    />
                </div>
            </div>
            <p className='btn-style2'>
                <button className='btn btn-secondary'>Previous</button> <button className='btn btn-info'>Next</button>
            </p>
            <p>{JSON.stringify(csc.get)}</p>
        </div>
    );
}

export default Address;