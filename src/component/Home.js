import React, { useState } from 'react'
import { Button } from 'react-bootstrap';
import { getAuth, signOut,onAuthStateChanged } from "firebase/auth";
import {useLocation, useNavigate } from 'react-router-dom'

const Home = () => {
  const [message, setMessage]= useState(true)
  const [varifyemail, setVaryfyemail]= useState(false)
  const navigate = useNavigate();
  const {state} = useLocation();
  const auth = getAuth();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log(user.emailVerified)
      if(user.emailVerified){
        setVaryfyemail(true);
      }
      const uid = user.uid;
     
    } else {
      navigate('/login', {state:'plice login'})
      console.log('login kra nai')
    }
  });

    let handleLogout = ()=>{
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
        {
          varifyemail ?
          <Button onClick={handleLogout} variant="dark">Log out</Button>
          :
          <>
           <Button  variant="dark">p v your email</Button>
           <Button onClick={handleLogout} variant="dark">Log out</Button>
          </>
         
        }
       
       
    </>
  )
}

export default Home
