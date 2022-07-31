import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { FaUser } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { get_allUsers, update_user } from "../../features/user/userSlice";
import { get_allProfiles } from "../../features/profile/profileSlice";
import validation_helper from "../../helper/validation_helper";
//import Spinner from ".././components/Spinner";
import Spinner from "react-bootstrap/Spinner";
//import "./admin.css";
import { toast } from "react-toastify";

function UserEditForm({ passedUser }) {
  const { users, user, roles, isLoading, isError, isSuccess, message } =
    useSelector((state) => state.user);
  const { profiles } = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  const { existingUser, setExistingUser } = useState({});

  /* const foundUser = users.filter(
    (x) => x._id === passedUser._id
  ); */
  const profile = profiles.filter((x) => x.user === passedUser._id);
  const [formData, setFormData] = useState({
    username: passedUser.username,
    email: passedUser.email,
    role: roles.filter((x) => x._id === passedUser.role)[0]?.roletype,
    name: profile.length > 0 ? profile[0].name : null,
    phone: profile.length > 0 ? profile[0].phone : null,
  });

  const { username, email, role, name, phone } = formData;

  let [errors, setErrors] = useState({});
  const [isClient, setisClient] = useState(false);

  const [validated, setValidated] = useState(false);

  useEffect(() => {
    if (isError) {
      //console.log(message.errors !== undefined)
      if (message.errors !== undefined) {
        setErrors(validation_helper.validateFormError(message));
        //console.log(message);
      } else {
        setErrors(() => {});
      }
      //toast.error(message.error);
    }
  }, [isError]);
  
  
  useEffect(() => {
    if (user) {
      dispatch(get_allUsers())
      dispatch(get_allProfiles())
    }
  }, [user])
 

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onRoleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const userData = {
      username,
      email,
      role,
      name,
      phone,
    };

    setValidated(true);
    //console.log(userData)
    const id = passedUser._id;
    dispatch(update_user({ id, userData }));
    //dispatch(get_allProfiles());
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

          {name && (
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
            </Form.Group>
          )}
          {phone && (
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
            </Form.Group>
          )}

          <Form.Group className="mb-1">
            <Form.Label>Select User Role Type</Form.Label>
            <select
              className="custom-select"
              value={role}
              name="role"
              onChange={onRoleChange}
              defaultValue={""}
            >
              <option value="" disabled={true}>
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
              {isLoading ? <Spinner animation="border" size="sm" /> : "Update"}
            </Button>
          </Form.Group>
        </Form>
      </div>
    </>
  );
}

export default UserEditForm;
