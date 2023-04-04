import Login from "./component/Login";
import Registration from "./component/Registration";
import { createBrowserRouter, RouterProvider,  Route, createRoutesFromElements } from "react-router-dom";
const router = createBrowserRouter(
  createRoutesFromElements(
     <Route>
      <Route path="/" element={<Registration/>} />
      <Route path="/registration" element={<Registration/>} />
      <Route path="/login" element={<Login/>} />
    </Route>
  )
);

function App() {

  return (
   
   <>
     <RouterProvider router={router} />
   </>
  );
}

export default App;
