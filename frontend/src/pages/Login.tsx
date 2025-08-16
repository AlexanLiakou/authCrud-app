import { useState, useEffect } from "react";
import { FaSignInAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import {toast} from 'react-toastify';
import {useSelector, useDispatch} from 'react-redux';
import {login, reset} from '../features/auth/authSlice.tsx'
import { LoginRequest} from "../types/auth.ts";
import { RootState, AppDispatch } from "../app/store.ts";
import FormButton from "../components/UI/Buttons/FormButton";
import Spinner from "../components/UI/Spinner.tsx";

const Login = () => {

  const [formData, setFormData] = useState(
    {
      email: '',
      password: '',
    }
  );

  const {email, password} = formData;
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const {user, isError, isLoading, isSuccess, message} = useSelector((state: RootState) => state.auth);

  const onChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setFormData(() =>({
      ...formData,
      [e.target.name]: e.target.value
    }));
  }

  const onSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
      const userData : LoginRequest = {
        email,
        password
      } 

      dispatch(login(userData));
  }

   useEffect (() => {

    if(isError) {
      toast.error(message);
    }

    if(isSuccess || user) {
      navigate("/");
    }

    dispatch(reset());

  }, [user, isError, isSuccess, message, navigate, dispatch]);

  return (
    <>
      {
        isLoading && <Spinner/>
      }
      <div className="container">
        <section className="px-[20px] mb-[50px] sm:text-[30px] font-[700] text-[24px]">
          <h1 className="flex items-start justify-center">
            <FaSignInAlt className="mr-[10px] mt-[3px]"/> Login
          </h1>
          <p className="sm:text-[22px] text-[#828282] text-[18px]">Access your account</p>
        </section>
        <section>
          <form className="sm:w-[60%] my-[0] mx-[auto] w-[90%]" onSubmit={onSubmit}>
            <div className="form-group mb-[10px]">
              <input className="w-[100%] border border-[#e6e6e6] border-solid p-[10px] rounded-[5px] mb-[10px] outline-none" type="text" id="email" name="email" value={email} placeholder="Enter your email" onChange={onChange}/>
            </div>
            <div className="form-group mb-[10px]">
              <input className="w-[100%] border border-[#e6e6e6] border-solid p-[10px] rounded-[5px] mb-[10px] outline-none" type="text" id="password" name="password" value={password} placeholder="Choose a password" onChange={onChange}/>
            </div>
            <div className="form-group">
              <FormButton type={'submit'}>Login</FormButton>
            </div>
          </form>
        </section>
      </div>
    </>
  )
}

export default Login;