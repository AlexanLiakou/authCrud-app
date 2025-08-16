import axios from 'axios';
import {RegisterRequest, LoginRequest} from '../types/auth.ts'

const API_URL = '/api/users/';

export const registerUser = async (userData:RegisterRequest) => {
  const response = await axios.post(API_URL, userData);

  if(response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }

  return response.data;
};

export const loginUser = async (userData:LoginRequest) => {
  const response = await axios.post(API_URL + 'login', userData);

  if(response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }

  return response.data;
};

export const logoutUser = () => {
 localStorage.removeItem('user');
};