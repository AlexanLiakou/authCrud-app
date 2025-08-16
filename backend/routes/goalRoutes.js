import express from 'express';
import { getGoals, setGoal, updateGoal, deleteGoal } from '../controllers/goalController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', protect,getGoals);

router.post('/', protect,setGoal);

router.put('/:id', protect,updateGoal);

router.delete('/:id', protect,deleteGoal);

//Alternative syntax for endpoints using the same route with different http method

// router.route('/').get(getGoals).post(setGoal);
// router.route('/:id').put(updateGoal).delete(deleteGoal);

export default router;