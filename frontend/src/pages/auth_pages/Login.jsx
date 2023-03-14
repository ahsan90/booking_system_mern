import { useState, useEffect } from "react";
import { FaSignInAlt } from "react-icons/fa";
import "./auth.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Spinner from "react-bootstrap/Spinner";
import Row from "react-bootstrap/Row";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { login, resetAuth } from "../../features/auth/authSlice";
//import Spinner from "../../components/CustomSpinner";
import validation_helper from "../../helper/validation_helper";
import ROLES from "../../helper/allowedRoles";

function Login() {
  const [formData, setFormData] = useState({
    username_or_email: "",
    password: "",
  });
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { username_or_email, password } = formData;
  let [errors, setErrors] = useState({});
  const [fromPath, setFromPath] = useState({
    from: location.state?.from?.pathname || "/"
  })


  const { loggedInUser, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const [validated, setValidated] = useState(false);

  /* useEffect(() => {
    if (isSuccess && loggedInUser) {
      if (loggedInUser && loggedInUser.role === ROLES.Admin) {
        navigate("/admin");
      }
      
      if (loggedInUser && loggedInUser.role === ROLES.Client) {
        navigate(`/users/profile/${loggedInUser._id.toString()}`);
      } 
    }
  }, [isSuccess, navigate]); */

  useEffect(() => {
    if (isError) {
      //console.log(message?.errors)

      if (message?.errors !== undefined) {
        //message.errors.forEach(element => {
        setErrors(validation_helper.validateFormError({ message }));
        //});

      } else {
        setErrors(() => { });
      }
      toast.error(message?.error);

      navigate('/login')
    }
    if (isSuccess || loggedInUser !== null) {
      if (loggedInUser.role === ROLES.Admin) {
        fromPath.from = '/admin/users'
      }
      if (loggedInUser.role === ROLES.Client) {
        fromPath.from = `/users/profile/${loggedInUser._id}`
      }
      if (location.state?.from?.pathname) {
        fromPath.from = location.state?.from?.pathname;
      }

      navigate(fromPath.from, { replace: true });
    }
    dispatch(resetAuth());
  }, [isError, isSuccess, message, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const userData = {
      username_or_email,
      password,
    };
    setValidated(true);
    dispatch(login(userData));
    //navigate(from, { replace: true });
  };

  return (
    <>
      <div
        className="mt-5 login login_boxshadow"
        style={{ marginTop: "300px" }}
      >
        <section>
          <h1>
            <FaSignInAlt /> Login
          </h1>
        </section>
        <Form noValidate validated={validated} onSubmit={onSubmit}>
          <Row className="mb-3">
            <Form.Group md="4">
              <InputGroup hasValidation>
                <Form.Control
                  type="text"
                  placeholder="Username/Email (Case sensetive...)"
                  name="username_or_email"
                  value={username_or_email}
                  onChange={onChange}
                  aria-describedby="inputGroupPrepend"
                  required
                />
                {errors !== undefined && errors.username_or_email && (
                  <Form.Control.Feedback
                    type="invalid"
                    className="validation_text"
                  >
                    {errors.username_or_email}
                  </Form.Control.Feedback>
                )}
              </InputGroup>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group md="6">
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                value={password}
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
          </Row>
          <Form.Group className=" mt-3 d-grid gap-2">
            <Button type="submit" variant="primary" disabled={isLoading ? true : false}>
              {isLoading ?
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
                : 'Submit'}
            </Button>
          </Form.Group>
          <div>
            Not a member yet? <Link to="/register">Register</Link>
          </div>
        </Form>
      </div>
    </>
  );
}

export default Login;
