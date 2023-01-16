import { Card } from "react-bootstrap"

function CreateUserDoc() {
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
                <h6>Request Method(type: json): <span className="p-1 bg-success text-white rounded">POST</span></h6>
                <h6>Note: For creating an user A user must be authenicated first as an Admin user (send Bearer token along with)</h6>
                <h6>Request Body:</h6>
                <ul>
                  <li>role: string (coulbe either "Admin", "Client")</li>
                  <li>username: string</li>
                  <li>email: string</li>
                  <li>name: string (this field is must if role type is selected as "Client" otherwise not required)</li>
                  <li>phone: string (this field is must if role type is selected as "Client" otherwise not required)</li>
                </ul>
              </div>
              <div className='col-sm'>
                <h6>Response Type: json (Object)</h6>
                <h6>Type: Object(json); StatusCode: 201</h6>
                <ul>
                  <li>_id</li>
                  <li>username</li>
                  <li>email</li>
                </ul>
              </div>
            </div>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  )
}

export default CreateUserDoc