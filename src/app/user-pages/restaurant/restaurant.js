import React from "react";

function Restaurant() {
    const [allData, setAllData] = useState([]);
    useEffect(() => {
        const url = "https://jsonplaceholder.typicode.com/todos";
        fetch(url)
            .then((response) => response.json())
            .then((response) => {
                console.log(response)
                setAllData(response.data)
        })
    },[]);
    return (
        <div>
            <div className="col-lg-12 grid-margin stretch-card">
                <div className="card">
                    <div className="card-body">
                        <div className="btn-section">
                            <h4 className="card-title">Restaurant</h4>
                            <a className="btn-style btn btn-info" href="/restaurant/new-restaurant"><i
                                    className="bi bi-plus"></i>New Restaurant</a>
                        </div>
                        <div className="table-responsive">
                            <DataTable />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Restaurant;