const prisma = require('../config/prisma');

exports.createBooking = async (req, res) => {
  const { title, date } = req.body;

  if (!title)
    return res.status(400).json({ message: 'Title is required' });

  if (!date)
    return res.status(400).json({ message: 'Date is required' });

  const inputtedDate = new Date(date);
  const dateNow = new Date();

  if(inputtedDate.valueOf() < dateNow.valueOf()){
    return res.status(400).json({message: 'You should not choose previous date'});
  }

  try {
    const booking = await prisma.booking.create({
      data: {
        title,
        date: inputtedDate,
        userId: req.user.userId
      }
    });

    res.json(booking);
  } catch (error) {
    return res.status(500).json({ message: "Failed to create booking, please try again later" })
  }

};

exports.getBookings = async (req, res) => {

  try {
    const bookings = await prisma.booking.findMany({
      where: { userId: req.user.userId }
    });

    res.json(bookings);
  } catch (error) {
    return res.status(500).json({ message: "Failed to get booking, please try again later" })
  }

};

exports.getBookingbyID = async (req, res) => {
  const bookingID = parseInt(req.params.id);

  if(isNaN(bookingID)){
    return res.status(400).json({message: `Invalid booking ID`})
  }

  try {
    const bookingbyID = await prisma.booking.findFirst({
      where: {
        id: bookingID,
        userId: req.user.userId
      }
    });

    if (!bookingbyID) {
      return res.status(400).json({
        message: 'Booking not found'
      });
    }

    res.json(bookingbyID);
  } catch (error) {
    return res.status(500).json({ message: "Failed to get booking, please try again later" })
  }


};

exports.getBookingbyTitle = async (req, res) => {
  const searchTitle = req.query.searchTitle;

  try {
    const bookingbyTitle = await prisma.booking.findMany({
      where: {
        title: {
          contains: searchTitle
        },
        userId: req.user.userId
      }
    });

    res.json(bookingbyTitle);
  } catch (error) {
    return res.status(500).json({ message: "Failed to get booking, please try again later" })
  }

};

//UPDATE
exports.updateBookings = async (req, res) => {
  const { title, date } = req.body;
  const bookingID = parseInt(req.params.id);

  try {
    const findBookings = await prisma.booking.findFirst({
      where: {
        id: bookingID,
        userId: req.user.userId
      }
    })

    if (!findBookings) {
      return res.status(400).json({
        message: 'Booking not found'
      });
    }
  } catch (error) {
    return res.status(500).json({ message: "Failed to update booking, please try again later" })
  }

  if (!title)
    return res.status(400).json({ message: 'Title is required' });

  if (!date)
    return res.status(400).json({ message: 'Date is required' });

  const inputtedDate = new Date(date);
  const dateNow = new Date();

  if(inputtedDate.valueOf() < dateNow.valueOf()){
    return res.status(400).json({message: 'You should not choose previous date'});
  }

  try {
    const updateBookings = await prisma.booking.update({
      where: {
        id: bookingID
      },
      data: {
        title,
        date
      }
    });

    res.json(updateBookings);
  } catch (error) {
    return res.status(500).json({ message: "Failed to update booking, please try again later" })
  }


};

//DELETE
exports.deleteBookings = async (req, res) => {
  const bookingID = parseInt(req.params.id);

  try {
    const findBookings = await prisma.booking.findFirst({
      where: {
        id: bookingID,
        userId: req.user.userId
      }
    })

    if (!findBookings) {
      return res.status(400).json({
        message: 'Booking not found'
      });
    }
  } catch (error) {
    return res.status(500).json({ message: "Failed to delete booking, please try again later" })
  }

  try {
    const deleteBookings = await prisma.booking.delete({
      where: {
        id: bookingID
      }
    });

    res.json(deleteBookings);
  } catch (error) {
    return res.status(500).json({ message: "Failed to delete booking, please try again later" })
  }

};