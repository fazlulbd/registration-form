import React, { useState } from 'react'
import { Button } from 'react-bootstrap';
import { getAuth, signOut } from "firebase/auth";
import {useLocation, useNavigate } from 'react-router-dom'

const Home = () => {
  const [message, setMessage]= useState(true)
  const navigate = useNavigate();
  const {state} = useLocation();
    let handleLogout = ()=>{
      const auth = getAuth();
      signOut(auth).then(() => {
        navigate("/login");
      }).catch((error) => {
       console.log(error)
      });
    }
    setTimeout(()=>{
      setMessage(false)
    },4000)
  return (
    <>
        {
         message ?
         <h2>{state}</h2>
         :''
        }
        
        <Button onClick={handleLogout} variant="dark">Log out</Button>
    </>
  )
}

export default Home
