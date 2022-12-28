import React from "react";
import Form from 'react-bootstrap/Form';
import './style.css';

function NewRestaurant() {
    return (
        <div>
            <Form>
                <h2> Create new restaurant</h2>
                <div className='two_part'>
                    <div className="col-sm-3 background">
                        <lavel className="label-style">Restaurant logo</lavel>
                        <div className="col-sm-6">
                            <Form.Group controlId="formFileMultiple" className="mb-3">
                                <Form.Control type="file" multiple />
                            </Form.Group>
                        </div>
                    </div>
                    <div className="col-sm-9 background">
                        <h2 className="header-style"> Enter All restaurant Information:</h2>
                        <div>
                            <div className="input_field">
                                <Form.Label className="level-style">Restaurant name</Form.Label>
                                <Form.Control type="text" placeholder="Restaurant name"></Form.Control>
                            </div>
                            <div className="input_field two_part">
                                <div className="wid">
                                    <Form.Label className="level-style">Contact no.</Form.Label>
                                    <Form.Control type="text" placeholder="Contact no."></Form.Control>
                                </div>
                                <div className="wid">
                                    <Form.Label className="level-style">E-mail</Form.Label>
                                    <Form.Control type="email" placeholder="E-mail"></Form.Control>
                                </div>
                            </div>
                            <div className="input_field two_part">
                                <div className="wid">
                                    <Form.Label className="level-style">Select your city</Form.Label>
                                    <select>
                                        <option value="">Select here</option>
                                        <option value="chef">Chef</option>
                                    </select>
                                </div>
                                <div className="wid">
                                    <Form.Label className="level-style">Select your area</Form.Label>
                                    <select>
                                        <option value="">Select here</option>
                                        <option value="chef">Chef</option>
                                    </select>
                                </div>
                            </div>
                            <div className="input_field">
                                <Form.Group>
                                    <Form.Label className="level-style">Meta Tag</Form.Label>
                                    <Form.Control className="area" as="textarea" placeholder="Meat tag" rows={3} />
                                </Form.Group>
                            </div>
                            <div className="input_field">
                                <Form.Group>
                                    <Form.Label className="level-style">Meta description</Form.Label>
                                    <Form.Control className="area" as="textarea" placeholder="Meta description" rows={6}>
                                    </Form.Control>
                                </Form.Group>
                            </div>
                            <div className="input_field">
                                <Form.Group>
                                    <Form.Label className="level-style">Meta keyword</Form.Label>
                                    <Form.Control className="area" as="textarea" placeholder="Meta keyword" rows={3}>
                                    </Form.Control>
                                </Form.Group>
                            </div>
                            <div className="input_field">
                                <a className="btn btn-warning top-space"><i className="bi bi-save-fill"></i>Insert</a>
                                <br></br><br></br>
                            </div>
                        </div>
                    </div>
                </div>
            </Form>
        </div>
    );
}
export default NewRestaurant;