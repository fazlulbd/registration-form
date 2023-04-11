import React from 'react'
import Registration from './component/Registration'
import Login from './component/Login';
import Home from './component/Home';
import {createBrowserRouter, RouterProvider, Route, createRoutesFromElements } from "react-router-dom";
import Header from './component/Header';

const router= createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Home/>} />
       <Route path="home" element={<Home/>} />
      <Route path="registration" element={<Registration />} />
      <Route path="login" element={<Login />} />
    </Route>
  )
)
const App = () => {
  return (
    <>
      <Header></Header>
       <RouterProvider router={router} />
    </>
  )
}

export default App
