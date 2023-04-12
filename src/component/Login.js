import React, { useState } from 'react'
import { Container, Row, Alert, Form, Button, Spinner, Modal } from 'react-bootstrap'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../firebaseconfig';
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
const Login = () => {
    const navigate = useNavigate();
    const {state} = useLocation();
  
    const [email, setEmail]= useState('')
    const [password, setPassword]= useState('')
    const [wrongPassword, setWrongPassword] = useState('')
    const [resetemail, setResetemail]= useState('')
    const [loading, setLoading]=useState(false)
    const [message, setMessage]= useState(true)

    const [errorEmail, setErrorEmail]=useState("")
    const [errorPassword, setErrorPassword]=useState("")
    const [errorResetemail, setErrorResetemail]= useState('')

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handelEmail = (e)=>{
        setEmail(e.target.value) 
    }
    const handelPassword = (e)=>{
        setPassword(e.target.value)
    }
    const auth = getAuth();
    const handleSubmit = (e)=>{
        e.preventDefault()
         if(email === ""){
            setErrorEmail('! Enter your email')
          }
          else if(password === ""){
            setErrorPassword('! Enter a password')
          }else{
            setLoading(true)
            signInWithEmailAndPassword(auth, email, password)
            .then((user) => {     
                setLoading(false)
                console.log(user)
                navigate("/home", {state:'WelCome to home page'});
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                if(errorCode.includes('password')){
                    setWrongPassword('password not match')
                    setLoading(false)
                }
            });
          }
    }
    const notify = () => toast(state);
    const notify2 = () => toast('please Check your Email');
    if(message){
        if(state){
            notify()
            setMessage(false)
        }
    }

    const handleResetEmail = (e)=>{
        setResetemail(e.target.value)
    }

    const handlePasswordReset= ()=>{
        if(resetemail ===""){
            setErrorResetemail('Please give your email')
        }else{
              sendPasswordResetEmail(auth, resetemail)
                .then(() => {
                   setShow(false)
                   notify2()
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log(error)
                });
        }
      
    }
  return (
    <>
       <Container>
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
                    {
                    wrongPassword ?
                    <Form.Text className="text-muted">
                    {wrongPassword}
                    </Form.Text>
                    : ""
                    }
                   
                </Form.Group>
                
                    {
                        loading ?
                        <Button  variant="primary" type="submit" className='px-5'>
                        <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                        </Spinner>
                        </Button>
                        : <Button onClick={handleSubmit} variant="primary" type="submit" className='px-5'>Submit</Button>
                    }
                
                <div className='text-center'>
                    <Form.Text id="passwordHelpBlock" muted>
                        Don't have an account? <Link to='/registration'> Creat Account</Link>
                    </Form.Text>
                </div>
                <div className='text-center'>
                    <Form.Text id="passwordHelpBlock" muted>
                         <Button  onClick={handleShow}>Forgot your password ?</Button>
                    </Form.Text>
                </div>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>Reset Password</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control onChange={handleResetEmail} type="email" placeholder="Enter email" />
                        {
                            errorResetemail ?
                            <h6>{errorResetemail}</h6>
                            :""
                        }
                    </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                    <Button variant="primary" onClick={handlePasswordReset}>Reset</Button>
                    </Modal.Footer>
                </Modal>
            </Form>
        </Container>
    </>
  )
}

export default Login
