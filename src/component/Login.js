import React, { useState } from 'react';
import { Container, Row, Alert, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [errorEmail, setErrorEmail] = useState("")
    const [errorPassword, setErrorPassword] = useState("")

    const handelEmail = (useremail)=>{
        setEmail(useremail.target.value)
    }
    const handelPassword = (password)=>{
        setPassword(password.target.value) 
    }

    const handleSubmit = (submit)=>{
        submit.preventDefault()
    
        if(email === ""){
            setErrorEmail('your email not type')
        }
        if(password === ""){
            setErrorPassword('your email not type')
        }
    }
  return (
    <>
             <Container>
            <Row className='pt-3'>
                <Alert variant="success" className='text-center'>
                 <h1>Registration</h1>
                </Alert> 
            </Row>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control onChange={handelEmail} type="email" placeholder="Enter email" />
                    {
                        errorEmail ?
                        <Form.Text className="text-muted">
                            ! Enter your email.
                        </Form.Text>
                        :''
                    }
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control onChange={handelPassword} type="password" placeholder="Password" />
                    {
                        errorPassword ?
                        <Form.Text className="text-muted">
                        ! Enter a password.
                        </Form.Text>
                        :''
                    }
                </Form.Group>
                <Button onClick={handleSubmit} variant="primary" type="submit">
                    Submit
                </Button>
                <div className="text-center">
                  Don't have an account? <Link to='/registration'> Creat Account</Link>
                </div>
            </Form>
       </Container> 
    </>
  )
}

export default Login;
