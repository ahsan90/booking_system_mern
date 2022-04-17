import { useState } from 'react'
import { FaSignInAlt } from 'react-icons/fa'
import './auth.css'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

function Login() {
    const [formData, setFormData] = useState({
        username_or_email: '',
        password: ''
    })
    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState, [e.target.name]: e.target.value,
        }))
    }
    const onSubmit = (e) => {
        e.preventDefault()
    }
    const {username_or_email, password} = formData
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