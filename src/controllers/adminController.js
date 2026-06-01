const prisma = require('../config/prisma');

exports.getAllUser = async (req, res) => {
  const userbyEmail = await prisma.user.findMany({
    select: {
      email : true,
      createdAt : true,
    },
  });

  res.json(userbyEmail);
};