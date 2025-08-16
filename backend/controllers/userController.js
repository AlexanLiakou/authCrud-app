import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

//Generate JWT

const generateToken = (id) => {
  return jwt.sign({id}, process.env.JWT_SECRET,{expiresIn: '30d'});
}

export const registerUser = asyncHandler (async (req, res) => {


  if(!req.body || !req.body.name || !req.body.email || !req.body.password) {
    res.status(400);
    throw new Error('Please add all fields');
  }

  //Check if user already exists

  const {name, email, password} = req.body;

  const userExists = await User.findOne({email});

  if(userExists) {
    res.status(400);
    throw new Error('This user already exists');
  }

  //Hash the user's password input

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user

  const user = await User.create({
    name,
    email,
    password: hashedPassword
  });

  if(user) {
    res.status(201);
    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user.id)
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

export const loginUser = asyncHandler (async (req, res) => {
  
 if(!req.body || !req.body.email || !req.body.password) {
    res.status(400);
    throw new Error('Please add all fields');
  }

  const {email, password} = req.body;

  const user = await User.findOne({email});

  if(user && (await bcrypt.compare(password, user.password))) {
    res.status(200);
    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user.id)
    });
  } else {
    res.status(400);
    throw new Error('Invalid credentials');
  }
});

export const getLoggedInUser = asyncHandler (async (req, res) => {

  if(!req.user) {
    res.status(400);
    throw new Error('No user id found');
  }

  const { _id, name, email } = req.user;

  res.status(200);
  res.json({
    id: _id,
    name,
    email
  });
});