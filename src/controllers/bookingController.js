const prisma = require('../config/prisma');

exports.createBooking = async (req, res) => {
  const { title, date } = req.body;

  if (!title)
    return res.status(404).json({ message: 'Title is required' });

  if (!date)
    return res.status(404).json({ message: 'Date is required' });

  const booking = await prisma.booking.create({
    data: {
      title,
      date: new Date(date),
      userId: req.user.userId
    }
  });

  res.json(booking);
};

exports.getBookings = async (req, res) => {
  const bookings = await prisma.booking.findMany({
    where: { userId: req.user.userId }
  });

  res.json(bookings);
};

exports.getBookingbyID = async (req, res) => {
  const bookingID = parseInt(req.params.id);

  const bookingbyID = await prisma.booking.findFirst({
    where: {
      id: bookingID,
      userId: req.user.userId
    }
  });

  if (!bookingbyID) {
    return res.status(404).json({
      message: 'Booking not found'
    });
  }

  res.json(bookingbyID);
};

exports.getBookingbyTitle = async (req, res) => {
  const searchTitle = req.query.searchTitle;

  const bookingbyTitle = await prisma.booking.findMany({
    where: {
      title: {
        contains: searchTitle
      },
      userId: req.user.userId
    }
  });

  res.json(bookingbyTitle);
};

//UPDATE
exports.updateBookings = async (req, res) => {
  const { title, date } = req.body;
  const bookingID = parseInt(req.params.id);

  const findBookings = await prisma.booking.findFirst({
    where: {
      id: bookingID,
      userId: req.user.userId
    }
  })

  if (!findBookings) {
    return res.status(404).json({
      message: 'Booking not found'
    });
  }

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
};

//DELETE
exports.deleteBookings = async (req, res) => {
  const bookingID = parseInt(req.params.id);

  const findBookings = await prisma.booking.findFirst({
    where: {
      id: bookingID,
      userId: req.user.userId
    }
  })

  if (!findBookings) {
    return res.status(404).json({
      message: 'Booking not found'
    });
  }

  const deleteBookings = await prisma.booking.delete({
    where: {
      id: bookingID
    }
  });

  res.json(deleteBookings);
};
