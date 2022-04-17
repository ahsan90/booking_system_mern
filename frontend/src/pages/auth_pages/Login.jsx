import { useState, useEffect } from 'react'
import { FaSignInAlt } from 'react-icons/fa'
import './auth.css'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import {login, reset} from '../../features/auth/authSlice'
import Spinner from '../../components/Spinner'

function Login() {
    const [formData, setFormData] = useState({
        username_or_email: '',
        password: ''
    })

  const { username_or_email, password } = formData
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    if (isSuccess || user) {
      navigate('/')
    }
    dispatch(reset())
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
    dispatch(login(userData))
  }

  if (isLoading) {
    return <Spinner/>
  }

  return (
      <>
          <div className='mt-5 login'>
            <section>
                  <h1><FaSignInAlt /> Login</h1>
            </section>
              <Form onSubmit={onSubmit}>
                  <Form.Group>
                    <Form.Control type="text" name='username_or_email' value={username_or_email} placeholder="Enter Username or Email" onChange={onChange}/>
                  </Form.Group>
                  <Form.Group>
                      <Form.Control className='mt-3' type="password" name='password' value={password} placeholder="Password" onChange={onChange}/>
                  </Form.Group>
                  <Form.Group className=" mt-3 d-grid gap-2">
                    <Button type='submit' variant='primary'>Submit</Button>
                  </Form.Group>
            </Form>
          </div>
      </>
  )
}

export default Login