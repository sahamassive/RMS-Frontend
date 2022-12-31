        <div>
            <div className="top-section">
                <div className="section_01">
                    <a href="/dashboard" className="btn btn-primary top-space"><i className="bi bi-house-door-fill"></i></a>
                    <a href="" className="btn btn-info top-space"><i className="bi bi-view-list"></i>All Order</a>
                    <a href="" className="btn btn-danger top-space"><i className="bi bi-plus-square"></i>New Order</a>
                    <a href="" className="btn btn-warning top-space"><i className="bi bi-arrow-left-right"></i>OnGoing Order</a>
                    <a href="" className="btn btn-success top-space"><i className="bi bi-question-square-fill"></i>Kitchen Status</a>
                    <a href="" className="btn btn-warning top-space"><i className="bi bi-arrow-90deg-up"></i>Online Order</a>
                    <a href="" className="btn btn-success top-space"><i className="bi bi-qr-code"></i>QR Order</a>
                    <a href="" className="btn btn-danger top-space"><i className="bi bi-x-square-fill"></i>Cancel Order</a>
                    <a href="" className="btn btn-info top-space"><i className="bi bi-alarm"></i>Today's Order</a>
                </div>
            </div>
            <div className="col-lg-12 grid-margin stretch-card">
                <div className="card">
                    <div className="card-body">
                        <div className="section_01">
                            <div className="col-md-7">
                                <h4 className="card-title">Quick Order:</h4>
                            </div>
                            <div className="col-md-5 inner-addon right-addon">
                                <Form.Control type="text" placeholder="Search"></Form.Control>
                            </div>
                        </div>
                        <div className="col-md-12 section_01">
                            <div className="col-md-2 section-border">
                                <Link onClick="">
                                <p className="menu-style">All</p>
                                </Link>
                                <Link onClick="">
                                <p className="menu-style">Breakfast</p>
                                </Link>
                                <Link onClick="">
                                <p className="menu-style">Lunch</p>
                                </Link>
                                <Link onClick="">
                                <p className="menu-style">Dinner</p>
                                </Link>
                            </div>
                            <div className="col-md-5 section-border">
                                <table className="table table-responsive table-bordered table-style">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <img className="food-image" src={
                                                    require("../../../homepage/assets/img/menu/cake.jpg")} alt="cake"></img>
                                                <p className="img-level">Cake <br></br> <span>$5</span></p>
                                            </td>
                                            <td>
                                                <img className="food-image" src={
                                                    require("../../../homepage/assets/img/menu/cake.jpg")} alt="cake"></img>
                                                <p className="img-level">Cake <br></br> <span>$5</span></p>
                                            </td>
                                            <td>
                                                <img className="food-image" src={
                                                    require("../../../homepage/assets/img/menu/cake.jpg")} alt="cake"></img>
                                                <p className="img-level">Cake <br></br> <span>$5</span></p>
                                            </td>
                                            <td>
                                                <img className="food-image" src={
                                                    require("../../../homepage/assets/img/menu/cake.jpg")} alt="cake"></img>
                                                <p className="img-level">Cake <br></br> <span>$5</span></p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <img className="food-image" src={
                                                    require("../../../homepage/assets/img/menu/cake.jpg")} alt="cake"></img>
                                                <p className="img-level">Cake <br></br> <span>$5</span></p>
                                            </td>
                                            <td>
                                                <img className="food-image" src={
                                                    require("../../../homepage/assets/img/menu/cake.jpg")} alt="cake"></img>
                                                <p className="img-level">Cake <br></br> <span>$5</span></p>
                                            </td>
                                            <td>
                                                <img className="food-image" src={
                                                    require("../../../homepage/assets/img/menu/cake.jpg")} alt="cake"></img>
                                                <p className="img-level">Cake <br></br> <span>$5</span></p>
                                            </td>
                                            <td>
                                                <img className="food-image" src={
                                                    require("../../../homepage/assets/img/menu/cake.jpg")} alt="cake"></img>
                                                <p className="img-level">Cake <br></br> <span>$5</span></p>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="col-md-5 section-border">
                                <div className="input_field">
                                    <div>
                                        <Form.Label className="level-style">Customer name</Form.Label>
                                        <input type="text" className="form-control" placeholder="Customer name"></input>
                                    </div>
                                </div>
                                <div className="input_field section_01">
                                    <div>
                                        <Form.Label className="level-style">Select waiter</Form.Label>
                                        <select className="select3">
                                            <option value="">Select here</option>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                        </select>
                                    </div>
                                    <div>
                                        <Form.Label className="level-style">Select table</Form.Label>
                                        <select className="select3">
                                            <option value="">Select here</option>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                        </select>
                                    </div>
                                    <div>
                                        <Form.Label className="level-style">Select order type</Form.Label>
                                        <select className="select3">
                                            <option value="">Select here</option>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <br></br>
                                    <table className="table table-responsive  table-hover table-bordered">
                                        <thead>
                                            <tr>
                                                <th>Item</th>
                                                <th>Variernt</th>
                                                <th>Unit Price</th>
                                                <th>Quantity</th>
                                                <th>Total Price</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>Burger</td>
                                                <td>mini</td>
                                                <td>$120</td>
                                                <td>
                                                    <i className="bi bi-plus icon-plus"></i>
                                                    1
                                                    <i className="bi bi-dash icon-minus"></i>
                                                </td>
                                                <td>$120</td>
                                                <td><a><i className="bi bi-x-circle icon-delete"></i></a></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <div className="section_01 btn-se">
                                        <a className="btn btn-primary top-space"><i className="bi bi-calculator"></i></a>
                                        <a className="btn btn-danger top-space"><i
                                                className="bi bi-x-octagon-fill"></i>Cancel</a>
                                        <a className="btn btn-warning top-space"><i className="bi bi-cart-x-fill"></i>Empty
                                            Cart</a>
                                        <a className="btn btn-success top-space"><i
                                                className="bi bi-check-square-fill"></i>Confirm Order</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>