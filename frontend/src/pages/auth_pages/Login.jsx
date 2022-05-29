import { useState, useEffect } from 'react'
import { FaSignInAlt } from 'react-icons/fa'
import './auth.css'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import Row from 'react-bootstrap/Row'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import {login, resetAuth} from '../../features/auth/authSlice'
import Spinner from '../../components/CustomSpinner'
import validation_helper from '../../helper/validation_helper'

function Login() {
  const [formData, setFormData] = useState({
      username_or_email: '',
      password: ''
  })
  const { username_or_email, password } = formData
  let [errors, setErrors] = useState({})
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )

  const [validated, setValidated] = useState(false);

  useEffect(() => {
    if (isError) {
      //console.log(message.errors)
      
      if (message.errors !== undefined) {
        //message.errors.forEach(element => {
          //toast.error(element.msg)
        setErrors(validation_helper.validateFormError({ message }))
        //});
      } else {
          setErrors(() => {})
      }
      toast.error(message.error)
    }
    if (isSuccess || user) {
      navigate('/')
    }
    dispatch(resetAuth())
  }, [user, isError, isSuccess, message, navigate, dispatch])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState, [e.target.name]: e.target.value,
    }))
  }
  
  const onSubmit = (e) => {
    e.preventDefault()
    const userData = {
      username_or_email,
      password
    }
    setValidated(true);
    dispatch(login(userData))
  }
  
  if (isLoading) {
    return <Spinner/>
  }

  return (
    <>
      <div className="mt-5 login login_boxshadow">
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
                  placeholder="Username/Email"
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
            <Button type="submit" variant="primary">
              Submit
            </Button>
          </Form.Group>
          <div>
            Not a member yet? <Link to='/register'>Register</Link>
          </div>
        </Form>
      </div>
    </>
  );
}

export default Login