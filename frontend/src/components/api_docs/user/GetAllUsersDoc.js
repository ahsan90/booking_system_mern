import { Card } from "react-bootstrap"

function GetAllUsersDoc() {
  return (
    <div>
      <Card>
        <Card.Body>
          <Card.Title style={{
            textAlign: "left",
            borderBottom: "1px solid gray",
            padding: "3px",
          }}>Endpoint: <span className="text-danger">/api/users</span></Card.Title>
          <Card.Text>
            <div className='row'>
              <div className='col-sm'>
                <h6>Request Method(type: json): <span className="p-1 bg-primary text-white rounded">GET</span></h6>
                <h6>A user must be authenicated as an Admin user to get all the users (send Bearer token as an Authorization header)</h6>
              </div>
              <div className='col-sm'>
                <h6>Response Type: json (Objects)</h6>
                <h6>Type: Array of Objects(json); StatusCode: 200</h6>
                <ul>
                  <li>users listing (array of objects)</li>
                </ul>
              </div>
            </div>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  )
}

export default GetAllUsersDoc