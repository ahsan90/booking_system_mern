import { useState, useEffect } from 'react'
import { FaUser } from 'react-icons/fa'
import './admin.css'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import {create_user, reset} from '../../features/user/userSlice'
import Spinner from '../../components/Spinner'


function CreateUser() {
  const [formData, setFormData] = useState({
      username: '',
      email: '',
      password: '',
      role: ''
  })

  const { username, email, password, role } = formData
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.user
  )

  useEffect(() => {
    if (isError) {
      /* if (message.errors !== undefined) {
        message.errors.forEach(element => {
          toast.error(element.msg)
        });
      } */
      //console.log(message)
      toast.error(message.error)
    }
    if (isSuccess) {
      navigate('/')
    }
    dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState, [e.target.name]: e.target.value,
    }))
  }

  //let loggedInUser = JSON.parse(localStorage.getItem('user'))
  //console.log(loggedInUser)

  const onSubmit = (e) => {
    e.preventDefault()
    
    const userData = {
      username,
      email,
      password,
      role
    }
    //console.log(role)
    
    dispatch(create_user(userData))
  }

  if (isLoading) {
    return <Spinner/>
  }

  return (
      <>
        <div className='mt-5 create-user'>
          <section>
          <h1><FaUser /> Create an user</h1>
          </section>
          <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Enter username</Form.Label>
              <Form.Control type="text" name='username' value={username} placeholder="Enter Username" onChange={onChange}/>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Enter Email</Form.Label>
              <Form.Control type="email" name='email' value={email} placeholder="Enter Email" onChange={onChange}/>
            </Form.Group>
        
            <Form.Group className="mb-3">
              <Form.Label>Enter Password</Form.Label>
              <Form.Control type="password" name='password' value={password} placeholder="Password" onChange={onChange}/>
            </Form.Group>
        
            <Form.Group className="mb-3">
            <select className='custom-select' value={role} name='role' onChange={onChange}>
              <option value='' disabled={true} selected>Select Role</option>
              <option value='Admin'>Admin</option>
              <option value='Client'>Client</option>
            </select>
          </Form.Group>  
          
            <Form.Group className=" mt-3 d-grid gap-2">
              <Button type='submit' variant='primary'>Submit</Button>
            </Form.Group>
          </Form>
        </div>
      </>
  )
}

export default CreateUser