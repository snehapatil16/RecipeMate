import express from 'express';
import { createUser, getAllUsers, getUser, updateUser, deleteUser } from './users-controller.js';

const router = express.Router();

router.post('/', createUser);
router.get('/', getAllUsers);
router.get('/:id', getUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;