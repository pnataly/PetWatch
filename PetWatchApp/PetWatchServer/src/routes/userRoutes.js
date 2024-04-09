const express = require('express');

const userController = require('../controllers/userController');


const router = express.Router();

router.get('/:userId', userController.getUserById);
router.get('/activity/:userId', userController.getUserActivityLog);
router.get('/expenses/:userId', userController.getUserExpensesArrays);
router.get('/upcoming/:userId', userController.getUserUpcomingEvents);
router.get('/notes/:userId', userController.getUserNotes);

router.post('/register', userController.register);

router.post('/login', userController.login);

// router.put('/:userId', userController.upload.single('imageUrl'), userController.updateUserById);

// router.post('/contact', userController.postContactMessage);

// router.post('/reset-password-request', userController.requestPasswordReset);

// router.post('/reset-password-code', userController.resetPasswordCode);

// router.post('/reset-password', userController.resetPassword);

module.exports = router;

