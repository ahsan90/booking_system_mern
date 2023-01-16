import { Card } from "react-bootstrap"

function DeleteUserDoc
() {
    return (
        <div>
            <h4
                className="mt-5"
                style={{
                    textAlign: "left",
                    borderBottom: "1px solid red",
                    padding: "3px",
                }}
            >
                API for Deleting an User
            </h4>
            <Card>
                <Card.Body>
                    <Card.Title style={{
                        textAlign: "left",
                        borderBottom: "1px solid gray",
                        padding: "3px",
                    }}>Endpoint: <span className="text-danger">/api/users/{"{id}"}</span></Card.Title>
                    <Card.Text>
                        <div className='row'>
                            <div className='col-sm'>
                                <h6>Request Method(type: json): <span className="p-1 bg-danger text-white rounded">DELETE</span></h6>
                                <h6>A user must be authenicated as an Admin user to delete an user (send Bearer token as an Authorization header)</h6>
                                <ul>Parameter
                                    <li>{"{id}"}</li>
                                </ul>
                            </div>
                            <div className='col-sm'>
                                <h6>Response Type: json (Object)</h6>
                                <h6>Type: id as a Object(json); StatusCode: 200</h6>
                                <ul>
                                    <li>id</li>
                                </ul>
                            </div>
                        </div>
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    )
}

export default DeleteUserDoc
