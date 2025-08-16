import { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import {toast} from 'react-toastify';
import {useSelector, useDispatch} from 'react-redux';
import {register, reset} from '../features/auth/authSlice.tsx'
import { RegisterRequest} from "../types/auth.ts";
import { RootState, AppDispatch } from "../app/store.ts";
import FormButton from "../components/UI/Buttons/FormButton";
import Spinner from "../components/UI/Spinner.tsx";

const Register = () => {

  const [formData, setFormData] = useState<RegisterRequest>(
    {
      name: '',
      email: '',
      password: '',
      password2: ''
    }
  );

  const {name, email, password, password2} = formData;

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

    if(password !== password2) {
      toast.error('Passwords dont match');
    } else {
      const userData : RegisterRequest = {
        name,
        email,
        password
      }      
      dispatch(register(userData));
    }
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
            <FaUser className="mr-[10px]"/> Register
          </h1>
          <p className="sm:text-[22px] text-[#828282] text-[18px]">Please create an account</p>
        </section>
        <section>
          <form className="sm:w-[70%] my-[0] mx-[auto] w-[90%]" onSubmit={onSubmit}>
            <div className="form-group mb-[10px]">
              <input className="w-[100%] border border-[#e6e6e6] border-solid p-[10px] rounded-[5px] mb-[10px] outline-none" type="text" id="name" name="name" value={name} placeholder="Enter your name" onChange={onChange}/>
            </div>
            <div className="form-group mb-[10px]">
              <input className="w-[100%] border border-[#e6e6e6] border-solid p-[10px] rounded-[5px] mb-[10px] outline-none" type="text" id="email" name="email" value={email} placeholder="Enter your email" onChange={onChange}/>
            </div>
            <div className="form-group mb-[10px]">
              <input className="w-[100%] border border-[#e6e6e6] border-solid p-[10px] rounded-[5px] mb-[10px] outline-none" type="text" id="password" name="password" value={password} placeholder="Choose a password" onChange={onChange}/>
            </div>
            <div className="form-group mb-[10px]">
              <input className="w-[100%] border border-[#e6e6e6] border-solid p-[10px] rounded-[5px] mb-[10px] outline-none" type="text" id="password2" name="password2" value={password2} placeholder="Confirm your password" onChange={onChange}/>
            </div>
            <div className="form-group">
              <FormButton type={'submit'}>Register</FormButton>
            </div>
          </form>
        </section>
      </div>
    </>
  )
}

export default Register;