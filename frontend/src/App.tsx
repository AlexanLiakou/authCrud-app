import { BrowserRouter, Routes, Route } from "react-router-dom";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MainLayout from "./components/Layout/MainLayout";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {

  return (
    <>
      <BrowserRouter>
        <MainLayout>
          <Routes>    
              <Route path='/' element={<Dashboard/>}/>
              <Route path='/login' element={<Login/>}/>
              <Route path='/register' element={<Register/>}/>
          </Routes>
        </MainLayout>
      </BrowserRouter>
      <ToastContainer/>
    </>
  )
}

export default App
