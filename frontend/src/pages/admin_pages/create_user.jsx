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
import validation_helper from '../../helper/validation_helper'


function CreateUser() {
  const [formData, setFormData] = useState({
      username: '',
      email: '',
      password: '',
      role: '',
      name: '',
      phone: ''
  })
  let loggedInUser = JSON.parse(localStorage.getItem('user'))
  //console.log(loggedInUser)
  const { username, email, password, role, name, phone } = formData
  let [errors, setErrors] = useState({})
  const [isClient, setisClient] = useState(false)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.user
  )

  const [validated, setValidated] = useState(false);
  //console.log(message.status === 401)
  useEffect(() => {
    if (!loggedInUser) {
      return navigate('/unauthorized')
    }
    
    if (isError) { 
      if (message.errors !== undefined) {
        setErrors(validation_helper.validateFormError(message))
      } else {
          setErrors(() => {})
      }
      
      toast.error(message.error)
    }
      
    if (isSuccess) {
      navigate('/admin')
      toast.success('User added successfully...!')
    }
    if (role === 'Client') {
      setisClient(true)
    } else {
      setisClient(false)
    }
    //console.log(message.status === 401)
    dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch, loggedInUser, role])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState, [e.target.name]: e.target.value,
    }))
  }
  

  const onRoleChange = (e) => {
    if (errors !== undefined && errors.role) {
      errors.role = ''
    }
    setFormData((prevState) => ({
      ...prevState, [e.target.name]: e.target.value,
    }))
  }



  const onSubmit = (e) => {
    e.preventDefault()
    const userData = {
      username,
      email,
      password,
      role,
      name,
      phone
    }
    setValidated(true);
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
          <Form onSubmit={onSubmit} validated={validated} noValidate>
            <Form.Group className="mb-3">
              <Form.Label>Enter username</Form.Label>
            <Form.Control type="text" name='username' value={username} placeholder="Enter Username" onChange={onChange} required />
            {errors !== undefined && errors.username && 
                <Form.Control.Feedback type="invalid" className='validation_text'>
                  {errors.username}
                </Form.Control.Feedback>} 
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Enter Email</Form.Label>
            <Form.Control type="email" name='email' value={email} placeholder="Enter Email" onChange={onChange} required />
            {errors !== undefined && errors.email && 
                <Form.Control.Feedback type="invalid" className='validation_text'>
                  {errors.email}
                </Form.Control.Feedback>} 
            </Form.Group>
        
            <Form.Group className="mb-3">
              <Form.Label>Enter Password</Form.Label>
            <Form.Control type="password" name='password' value={password} placeholder="Password" onChange={onChange} required />
            {errors !== undefined && errors.password && 
                <Form.Control.Feedback type="invalid" className='validation_text'>
                  {errors.password}
              </Form.Control.Feedback>} 

          </Form.Group>
          
          {isClient && 
          <Form.Group className="mb-3">
              <Form.Label>Enter Client Name</Form.Label>
            <Form.Control type="text" name='name' value={name} placeholder="Client Name" onChange={onChange} required />
            {errors !== undefined && errors.name && 
                <Form.Control.Feedback type="invalid" className='validation_text'>
                  {errors.name}
                </Form.Control.Feedback>} 
            </Form.Group>}
          {isClient && 
          <Form.Group className="mb-3">
              <Form.Label>Enter Client Phone</Form.Label>
            <Form.Control type="text" name='phone' value={phone} placeholder="Client Phone Number" onChange={onChange} required />
            {errors !== undefined && errors.phone && 
                <Form.Control.Feedback type="invalid" className='validation_text'>
                  {errors.phone}
                </Form.Control.Feedback>} 
            </Form.Group>}
        
          <Form.Group className="mb-1">
            <Form.Label>Select User Role Type</Form.Label>
            <select className='custom-select' value={role} name='role' onChange={onRoleChange}>
              <option value='' disabled={true} selected>Select Role</option>
              <option value='Admin'>Admin</option>
              <option value='Client'>Client</option>
            </select>
          </Form.Group>  

          <Form.Group className="mb-3">
            {errors !== undefined && errors.role && 
              <Form.Label style={{color: "red"}}>{ errors.role} </Form.Label>} 
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