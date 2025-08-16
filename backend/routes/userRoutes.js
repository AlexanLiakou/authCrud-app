import express from 'express';
import { registerUser, loginUser, getLoggedInUser } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', registerUser);
router.post('/login', loginUser);
router.get('/loggedin', protect, getLoggedInUser);

export default router;