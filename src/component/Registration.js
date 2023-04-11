import React, { useState } from 'react'
import { Container, Row, Alert, Form, Button, Spinner } from 'react-bootstrap'
import { Link,  useNavigate } from 'react-router-dom'
import  "../firebaseconfig"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const Registration = () => {
    const navigate = useNavigate();
    const [user, setUser]= useState('')
    const [email, setEmail]= useState('')
    const [password, setPassword]= useState('')
    const [cfpassword, setCfpassword]= useState('')
    const [loading, setLoading]=useState(false)

    const [errorUser, setErrorUser]=useState("")
    const [errorEmail, setErrorEmail]=useState("")
    const [errorPassword, setErrorPassword]=useState("")
    const [errorCfpassword, setErrorCfpassword]=useState("")
    const [matchPassword, setMatchPassword]=useState("")

    const handelUser = (e)=>{
        setUser(e.target.value)
    }
    const handelEmail = (e)=>{
        setEmail(e.target.value) 
    }
    const handelPassword = (e)=>{
        setPassword(e.target.value)
    }
    const handelCfpassword = (e)=>{
        setCfpassword(e.target.value)
    }

    const handleSubmit = (e)=>{
        e.preventDefault()
        if(user === ""){
            setErrorUser('! Enter your names')
          }
          else if(email === ""){
            setErrorEmail('! Enter your email')
          }
          else if(password === ""){
            setErrorPassword('! Enter a password')
          }
          else if(cfpassword === ""){
            setErrorCfpassword('! confirm your password')
          }
          else if(password !== cfpassword){
            setMatchPassword('! Those passwords didn’t match. Try again.')
          }else{
            setLoading(true)
            const auth = getAuth();
            createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                // console.log(user)
                setLoading(false)
                navigate("/login",{state:"Account Created Successful"});

            })
            .catch((error) => { 
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(error)
                // ..
            });
          }
    }
   
  return (
    <>
       <Container>
            <Row>
                <Alert  variant='success' className='text-center'>
                    <h2>Rgistration</h2>
                </Alert>
            </Row>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>User Name</Form.Label>
                    <Form.Control onChange={handelUser} type="text" placeholder="Enter full name" />
                    {
                    errorUser ?
                    <Form.Text className="text-muted">
                        {errorUser}
                    </Form.Text>
                    : ""
                    }
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control onChange={handelEmail} type="email" placeholder="Enter email" />
                    {
                    errorEmail ?
                    <Form.Text className="text-muted">
                        {errorEmail}
                    </Form.Text>
                    : ""
                    }
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control onChange={handelPassword} type="password" placeholder="Password" />
                    {
                    errorPassword ?
                    <Form.Text className="text-muted">
                    {errorPassword}
                    </Form.Text>
                    : ""
                    }
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control onChange={handelCfpassword} type="password" placeholder="Confirm Password" />
                    {
                    errorCfpassword ?
                    <Form.Text className="text-muted">
                        {errorCfpassword}
                    </Form.Text>
                    : ""
                    }
                    {
                    matchPassword ?
                    <Form.Text className="text-muted">
                        {matchPassword}
                    </Form.Text>
                    : ""
                    }
                </Form.Group>
                <Button onClick={handleSubmit} variant="primary" type="submit" className='px-5'>
                {
                    loading ?
                    <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                    </Spinner>
                    : "Submit"
                }
                </Button>
                <div className='text-center'>
                    <Form.Text id="passwordHelpBlock" muted>
                        Alredy have an account? <Link to="/login">login</Link>
                    </Form.Text>
                </div>
            </Form>
        </Container>

    </>
  )
}

export default Registration
