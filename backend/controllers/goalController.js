import asyncHandler from 'express-async-handler';
import Goal from '../models/goalModel.js';
import User from '../models/userModel.js';

export const getGoals = asyncHandler(async (req, res) => {

    const goals = await Goal.find({user: req.user._id});

    res.status(200).json(goals);
});

export const setGoal = asyncHandler(async (req, res, next) => {
    if(!req.body || !req.body.text) {
        res.status(400);
        return next(new Error('Please add a text field'));
    }
    const goal = await Goal.create({
        text: req.body.text,
        user: req.user._id
    });

    res.status(200).json(goal);
});

export const updateGoal = asyncHandler(async (req, res) => {

    const goal = await Goal.findById(req.params.id);

    if (!goal) {
        res.status(400);
        throw new Error('Goal not found');
    }

    const user = await User.findById(req.user._id);

    //Check if user exists

    if(!user) {
        res.status(400);
        throw new Error('User not found');
    }

    //Check if logged in user matches goal user

    if(goal.user !== user._id) {
        res.status(401);
        throw new Error('Not authorized. Goal belongs to another user');
    }

    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {new:true});

    res.status(200).json(updatedGoal);
});

export const deleteGoal = asyncHandler(async (req, res) => {

       const goal = await Goal.findById(req.params.id);

    if (!goal) {
        res.status(400);
        throw new Error('Goal not found');
    }

        const user = await User.findById(req.user._id);

    //Check if user exists

    if(!user) {
        res.status(400);
        throw new Error('User not found');
    }

    //Check if logged in user matches goal user

    if(goal.user.toString() !== user.id) {

        res.status(401);
        throw new Error('Not authorized. Goal belongs to another user');
    }

    await goal.deleteOne({id: req.params.id});

    res.status(200).json(`${req.params.id}`);
});