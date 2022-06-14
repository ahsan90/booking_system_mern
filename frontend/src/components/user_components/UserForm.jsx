import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { FaUser } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { create_user, get_allUsers, reset } from "../../features/user/userSlice";
import {get_allProfiles} from '../../features/profile/profileSlice'
import validation_helper from "../../helper/validation_helper";
import Spinner from "react-bootstrap/Spinner";
//import "./admin.css";
import { toast } from "react-toastify";

function UserForm() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
    name: "",
    phone: "",
  });
  
  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();

  const { username, email, password, role, name, phone } = formData;
  let [errors, setErrors] = useState({});
  const [isClient, setisClient] = useState(false);

  const [validated, setValidated] = useState(false);
  //console.log(message.status === 401)
  useEffect(() => {
    if (role === "Client") {
      setisClient(true);
    } else {
      setisClient(false);
    }
    if (isError) {
      //console.log(message.errors !== undefined)
      if (message.errors !== undefined) {
        setErrors(validation_helper.validateFormError({ message }));
        //console.log(message);
      } else {
        setErrors(() => {});
      }
      toast.error(message.error);
    }
    
  }, [role, isError, message, dispatch]);
  

  const onChange = (e) => {
    setFormData((prevState) => ({   
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onRoleChange = (e) => {
    if (errors !== undefined && errors.role) {
      errors.role = "";
    }
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(get_allProfiles())
    }
  }, [isSuccess, dispatch])

  const onSubmit = (e) => {
    e.preventDefault();
    const userData = {
      username,
      email,
      password,
      role,
      name,
      phone,
    };
    //console.log(user);
    setValidated(true);
    dispatch(create_user(userData));
  };
  return (
    <>
      <div className="">
        <Form onSubmit={onSubmit} validated={validated} noValidate>
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
              <Form.Control.Feedback type="invalid" className="validation_text">
                {errors.username}
              </Form.Control.Feedback>
            )}
          </Form.Group>
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
              <Form.Control.Feedback type="invalid" className="validation_text">
                {errors.email}
              </Form.Control.Feedback>
            )}
          </Form.Group>

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
              <Form.Control.Feedback type="invalid" className="validation_text">
                {errors.password}
              </Form.Control.Feedback>
            )}
          </Form.Group>

          {isClient && (
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
          )}
          {isClient && (
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
          )}

          <Form.Group className="mb-1">
            <Form.Label>Select User Role Type</Form.Label>
            <select
              className="custom-select"
              value={role}
              name="role"
              onChange={onRoleChange}
            >
              <option value="" disabled={true} selected>
                Select Role
              </option>
              <option value="Admin">Admin</option>
              <option value="Client">Client</option>
            </select>
          </Form.Group>

          <Form.Group className="mb-3">
            {errors !== undefined && errors.role && (
              <Form.Label style={{ color: "red" }}>{errors.role} </Form.Label>
            )}
          </Form.Group>

          <Form.Group className=" mt-3 d-grid gap-2">
            <Button type="submit" variant="primary">
              {isLoading ? <Spinner animation="border" size="sm" /> : "Submit"}
            </Button>
          </Form.Group>
        </Form>
      </div>
    </>
  );
}

export default UserForm;
