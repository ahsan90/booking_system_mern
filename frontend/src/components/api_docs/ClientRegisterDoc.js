import { Card } from "react-bootstrap"

function ClientRegisterDoc() {
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
        API for Client Registration
      </h4>
      <Card>
        <Card.Body>
          <Card.Title style={{
            textAlign: "left",
            borderBottom: "1px solid gray",
            padding: "3px",
          }}>Endpoint: <span className="text-danger">/api/profiles</span></Card.Title>
          <Card.Text>
            <div className='row'>
              <div className='col-sm'>
                <h6>Request Method(type: json): Post</h6>
                <h6>Request Body:</h6>
                <ul>
                  <li>username: string</li>
                  <li>email: string</li>
                  <li>password: string (at least 6 characters)</li>
                  <li>name: string</li>
                  <li>phone: string</li>
                </ul>
              </div>
              <div className='col-sm'>
                <h6>Response Type: json (Object)</h6>
                <h6>Type: Object(json); StatusCode: 201</h6>
                <ul>
                  <li>user(Object)</li>
                  <li>name</li>
                  <li>email</li>
                  <li>phone</li>
                </ul>
              </div>
            </div>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  )
}

export default ClientRegisterDoc