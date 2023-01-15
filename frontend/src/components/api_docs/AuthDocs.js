import { Card } from "react-bootstrap"

function AuthDocs() {
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
        API to login an user
      </h4>
      <Card>
        <Card.Body>
          <Card.Title style={{
            textAlign: "left",
            borderBottom: "1px solid gray",
            padding: "3px",
          }}>Endpoint: <span className="text-danger">/api/auth/login</span></Card.Title>
          <Card.Text>
            <div className='row'>
              <div className='col-sm'>
                <h6>Request Method(type: json): Post</h6>
                <h6>Request Body:</h6>
                <ul>
                  <li>
                    username_or_email: string
                  </li>
                  <li>
                    password: string of at least 6 characters long
                  </li>
                </ul>
              </div>
              <div className='col-sm'>
                <h6>Response Type: json (Object)</h6>
                <h6>Type: Object(json); StatusCode: 200</h6>
                <ul>
                  <li>
                    _id
                  </li>
                  <li>
                    role
                  </li>
                  <li>
                    username
                  </li>
                  <li>
                    email
                  </li>
                  <li>
                    token
                  </li>
                </ul>
              </div>
            </div>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  )
}

export default AuthDocs