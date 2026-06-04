const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const prisma = require('../config/prisma');

exports.register = async (req, res) => {
  const { email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  if (!email) return res.status(400).json({ message: "Email is required" });
  if (!email.match("[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}")) return res.status(400).json({ message: "Invalid format for Email" });

  if (!password) return res.status(400).json({ message: "Password is required" });
  if (password.length < 8) return res.status(400).json({ message: "Minimum 8 characters for Password" });


  const existingUser = await prisma.user.findUnique({
    where: { email }
  });

  if (existingUser) {
    return res.status(400).json({ message: "Email already registered" })
  }

  try {
    const user = await prisma.user.create({
      data: { email, password: hashedPassword }
    });

    const { password: _, ...safeUser } = user;
    res.json(safeUser);
  } catch (error) {
    return res.status(400).json({ message: "Failed to register, please try again later" })
  }

  // const user = await prisma.user.create({
  //   data: { email, password: hashedPassword }
  // });

  // const { password: _, ...safeUser } = user;
  // res.json(safeUser);
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) return res.status(404).json({ message: 'User not found' });

  const valid = await bcrypt.compare(password, user.password);

  if (!valid) return res.status(401).json({ message: 'Invalid password' });

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);

  res.json({ token });
};