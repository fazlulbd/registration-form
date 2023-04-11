import React, { useState } from 'react'
import { Container, Row, Alert, Form, Button, Spinner } from 'react-bootstrap'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../firebaseconfig';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
const Login = () => {
    const navigate = useNavigate();
    const {state} = useLocation();
  
    const [email, setEmail]= useState('')
    const [password, setPassword]= useState('')
    const [loading, setLoading]=useState(false)
    const [message, setMessage]= useState(true)

    const [errorEmail, setErrorEmail]=useState("")
    const [errorPassword, setErrorPassword]=useState("")

    const handelEmail = (e)=>{
        setEmail(e.target.value) 
    }
    const handelPassword = (e)=>{
        setPassword(e.target.value)
    }

    const handleSubmit = (e)=>{
        e.preventDefault()
         if(email === ""){
            setErrorEmail('! Enter your email')
          }
          else if(password === ""){
            setErrorPassword('! Enter a password')
          }else{
            setLoading(true)
            const auth = getAuth();
            signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                setLoading(false)
                navigate("/home", {state:'WelCome to home page'});
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(error)
            });
          }
    }
    const notify = () => toast(state);
    if(message){
        if(state){
            notify()
            setMessage(false)
        }
    }

  return (
    <>
       <Container>
       {/* <button onClick={notify}>Notify!</button> */}
        <ToastContainer />
            <Row>
                <Alert  variant='success' className='text-center'>
                    <h2>Login</h2>
                </Alert>
            </Row>
            <Form>
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
                        Don't have an account? <Link to='/registration'> Creat Account</Link>
                    </Form.Text>
                </div>
            </Form>
        </Container>
    </>
  )
}

export default Login
