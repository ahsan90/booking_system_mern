import { useState, useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { Form, Button } from 'react-bootstrap'
import validation_helper from '../../helper/validation_helper';
import Spinner from "react-bootstrap/Spinner";
//import "./admin.css";
import { toast } from "react-toastify";
import { create_user_profile } from '../../features/user/userSlice'
import {useParams} from 'react-router-dom'

function ClientProfileForm() {
  const {id} = useParams()
    const [formData, setFormData] = useState({
      name: "",
      phone: "",
    });
    const { loggedInUser } = useSelector((state) => state.auth);
    const { isLoading, singleUserDetails , isError, isSuccess, message } = useSelector(
      (state) => state.user
    );
    const dispatch = useDispatch();

    const { name, phone } = formData;
    let [errors, setErrors] = useState({});
    const [isClient, setisClient] = useState(false);

    const [validated, setValidated] = useState(false);
    //console.log(message.status === 401)
    useEffect(() => {
      
      if (isError) {
        //console.log(message.errors !== undefined)
        if (message.errors !== undefined) {
          setErrors(validation_helper.validateFormError(message));
          //console.log(message);
        } else {
          setErrors(() => {});
        }
        toast.error(message.error);
      }
    }, [loggedInUser, isError, message, dispatch]);

    const onChange = (e) => {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    };

    const onSubmit = (e) => {
      e.preventDefault();
      const profileData = {
        name,
        phone,
      };
      //console.log(userId);
      const userId = id
      setValidated(true);
      dispatch(create_user_profile({ userId, profileData }));
    };
  return (
    <div>
      <Form onSubmit={onSubmit} validated={validated} noValidate>
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

          <Form.Control.Feedback
            type="invalid"
            className="validation_text"
          ></Form.Control.Feedback>
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

          <Form.Control.Feedback
            type="invalid"
            className="validation_text"
          ></Form.Control.Feedback>
        </Form.Group>
        <Form.Group className=" mt-3 d-grid gap-2">
          <Button type="submit" variant="primary">
            {isLoading ? <Spinner animation="border" size="sm" /> : "Submit"}
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
}

export default ClientProfileForm