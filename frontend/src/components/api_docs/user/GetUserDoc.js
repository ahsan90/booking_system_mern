import { Card } from "react-bootstrap"

function GetUserDoc() {
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
        API for Getting an User By ID
      </h4>
      <Card>
        <Card.Body>
          <Card.Title style={{
            textAlign: "left",
            borderBottom: "1px solid gray",
            padding: "3px",
          }}>Endpoint: <span className="text-danger">/api/users/{'{id}'}</span></Card.Title>
          <Card.Text>
            <div className='row'>
              <div className='col-sm'>
                <h6>Request Method(type: json): <span className="p-1 bg-primary text-white rounded">GET</span></h6>
                <h6>A user must be authenicated as an Admin/Client (if client then he/she is only allowed get his own user details) user to get an user by Id (send Bearer token as Authorization header)</h6>
                <h6>Parameter:</h6>
                <ul>
                  <li>{':id'}</li>
                </ul>
              </div>
              <div className='col-sm'>
                <h6>Response Type: json (Object)</h6>
                <h6>Type: Object(json); StatusCode: 200</h6>
                <ul>
                  <li>_id</li>
                  <li>username</li>
                  <li>email</li>
                  <li>avatar</li>
                  <li>createAt</li>
                  <li>updated</li>
                  <li>role (Object)</li>
                  <li>profile (Object)</li>
                </ul>
              </div>
            </div>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  )
}

export default GetUserDoc