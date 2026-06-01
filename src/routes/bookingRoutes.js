const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, bookingController.createBooking);
router.get('/', authMiddleware, bookingController.getBookings);
router.get('/search', authMiddleware, bookingController.getBookingbyTitle);
router.get('/:id', authMiddleware, bookingController.getBookingbyID);
router.put('/:id', authMiddleware, bookingController.updateBookings);
router.delete('/:id',authMiddleware,bookingController.deleteBookings);

module.exports = router;