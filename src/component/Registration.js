import React, { useState } from 'react';
import { Container, Row, Alert, Form, Button } from 'react-bootstrap';
import { Link, useNavigate  } from 'react-router-dom';
import '../firebaseconfig'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
const Registration = () => {
    const navigate = useNavigate();
    const [user, setUser]=useState('');
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [cfpassword, setCfPassword] = useState("")
    const [matchPassword, setMatchPassword] = useState("")

    const [errorUser, setErrorUser]=useState('');
    const [errorEmail, setErrorEmail] = useState("")
    const [errorPassword, setErrorPassword] = useState("")
    const [errorCfpassword, setErrorCfPassword] = useState("")


    const handelUser = (username)=>{
        setUser(username.target.value)  
    }
    const handelEmail = (useremail)=>{
        setEmail(useremail.target.value)
    }
    const handelPassword = (password)=>{
        setPassword(password.target.value) 
    }
    const handelCfPassword = (cfpassword)=>{
        setCfPassword(cfpassword.target.value) 
    }

    const handleSubmit = (submit)=>{
        submit.preventDefault()
        if(user === ""){
            setErrorUser(' ! Enter your names.')
        }
        if(email === ""){
            setErrorEmail('your email not type')
        }
        if(password === ""){
            setErrorPassword('your email not type')
        }
        else if(cfpassword === ""){
            setErrorCfPassword("your pass not match") 
        }
        else if(password !== cfpassword){
            setMatchPassword("your pass not match") 
        }
        else{
            const auth = getAuth();
                createUserWithEmailAndPassword(auth, email, password)
                .then((user) => {
                   console.log(user.user)
                   navigate("/login");
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log(error);
                });
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
                    <Form.Label>User Name</Form.Label>
                    <Form.Control onChange={handelUser} type="text" placeholder="Enter your full name" />
                    {
                        errorUser ?
                        <Form.Text className="text-muted">
                        ! Enter your names.
                        </Form.Text>
                        :''
                    }
                </Form.Group>
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
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control onChange={handelCfPassword} type="password" placeholder="Confirm Password" />
                    {
                        errorCfpassword ?
                        <Form.Text className="text-muted">
                             ! confirm your password.
                        </Form.Text>
                        :""
                    }
                    {
                        matchPassword ?
                        <Form.Text className="text-muted">
                        !Those passwords didn’t match. Try again.
                        </Form.Text>
                        : ''
                    }
                </Form.Group>
                <Button onClick={handleSubmit} variant="primary" type="submit">
                    Submit
                </Button>
                <div className='text-center'>
                    <Form.Text id="passwordHelpBlock" muted>
                            Alredy have an account? <Link to='/login'>login</Link>
                    </Form.Text>
                </div>
            </Form>
       </Container>  
    </>
  )
}

export default Registration;
