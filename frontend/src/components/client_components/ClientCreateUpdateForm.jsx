import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { Modal, Card } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  create_profile,
  update_profile,
  reset,
  resetProfile,
  get_profile,
} from "../../features/profile/profileSlice";
import validation_helper from "../../../src/helper/validation_helper";
import Spinner from "react-bootstrap/Spinner";
//import "./admin.css";
import { toast } from "react-toastify";

function ClientCreateUpdateForm({ profile = null }) {
  const dispatch = useDispatch();
  let [errors, setErrors] = useState({});
  const [isClient, setisClient] = useState(false);

  const [validated, setValidated] = useState(false);
  let { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.profile
  );

  //const { profile } = useSelector((state) => state.profile)
  
  const [formData, setFormData] = useState({
    username: "",
    email: profile? profile?.email : '',
    password: "",
    passwordConfirmed: "",
    role: "",
    name: profile ? profile?.name : '',
    phone: profile? profile?.phone : '',
  });

  const { username, email, password, passwordConfirmed, name, phone } =
    formData;

  //console.log(message.status === 401)

  useEffect(() => {
    if (isError) {
      if (message?.errors !== undefined) {
        setErrors(validation_helper.validateFormError({ message }));
      } else {
        setErrors(() => {});
      }
      toast.error(message?.error);
    }
    
  }, [isError, message, dispatch,]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const profilePayload = {
      username,
      email,
      password,
      name,
      phone,
    };
    if (password !== passwordConfirmed) {
      return toast.error("Password did not match");
    }

    setValidated(true);
    //console.log(profilePayload)
    if (profile) {
      const profileData = {
        name, email, phone
      }
      dispatch(update_profile({ profileData, id: profile._id }))
      errors = null
      message = null
    } else {
      dispatch(create_profile(profilePayload));
    }
    
  };
  const classForRegistrationScreen = profile? '' : "container-fluid dflex justify-content-center mt-4 col-lg-6 col-md-8 col-sm-12";
  return (
    <>
      <div className={classForRegistrationScreen}>
        <Card
          style={{ backgroundColor: "#f5f5f5" }}
          className="register_boxshadow"
        >
          <Card.Body>
            {profile ? (
              ""
            ) : (
              <h2>
                <FaUser />
                Client Registration
              </h2>
            )}

            <Form onSubmit={onSubmit} validated={validated} noValidate>
              {!profile && (
                <Form.Group className="mb-3">
                  <Form.Label>Enter username</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    value={username}
                    placeholder="Enter Username"
                    onChange={onChange}
                    required
                  />
                  {errors !== undefined && errors.username && (
                    <Form.Control.Feedback
                      type="invalid"
                      className="validation_text"
                    >
                      {errors.username}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>
              )}
              <Form.Group className="mb-3">
                <Form.Label>Enter Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={email}
                  placeholder="Enter Email"
                  onChange={onChange}
                  required
                />
                {errors !== undefined && errors.email && (
                  <Form.Control.Feedback
                    type="invalid"
                    className="validation_text"
                  >
                    {errors.email}
                  </Form.Control.Feedback>
                )}
              </Form.Group>

              {!profile && (
                <Form.Group className="mb-3">
                  <Form.Label>Enter Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={password}
                    placeholder="Password"
                    onChange={onChange}
                    required
                  />
                  {errors !== undefined && errors.password && (
                    <Form.Control.Feedback
                      type="invalid"
                      className="validation_text"
                    >
                      {errors.password}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>
              )}
              {!profile && (
                <Form.Group className="mb-3">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="passwordConfirmed"
                    value={passwordConfirmed}
                    placeholder="Confirm Password"
                    onChange={onChange}
                    required
                  />

                  {errors !== undefined && errors.confirmPassError && (
                    <Form.Control.Feedback
                      type="invalid"
                      className="validation_text"
                    >
                      {errors.confirmPassError}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>
              )}
              <Form.Group className="mb-3">
                <Form.Label>Enter Client Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={name}
                  placeholder="Client Name"
                  onChange={onChange}
                  required
                />
                {errors !== undefined && errors.name && (
                  <Form.Control.Feedback
                    type="invalid"
                    className="validation_text"
                  >
                    {errors.name}
                  </Form.Control.Feedback>
                )}
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Enter Client Phone</Form.Label>
                <Form.Control
                  type="text"
                  name="phone"
                  value={phone}
                  placeholder="Client Phone Number"
                  onChange={onChange}
                  required
                />
                {errors !== undefined && errors.phone && (
                  <Form.Control.Feedback
                    type="invalid"
                    className="validation_text"
                  >
                    {errors.phone}
                  </Form.Control.Feedback>
                )}
              </Form.Group>

              <Form.Group className=" mt-3 d-grid gap-2">
                <Button type="submit" variant="primary">
                  {isLoading ? (
                    <Spinner animation="border" size="sm" />
                  ) : (
                    "Submit"
                  )}
                </Button>
              </Form.Group>
              {!profile && (
                <div>
                  Already a member? <Link to="/login">Login</Link>
                </div>
              )}
            </Form>
          </Card.Body>
        </Card>
      </div>
    </>
  );
}

export default ClientCreateUpdateForm;
