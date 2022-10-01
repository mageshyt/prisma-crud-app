const { prisma } = require("../prisma/index");

const { cookiesToToken } = require("../utils/cookiesToToken");

const bcrypt = require("bcrypt");

//! user sign up
const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.table(req.body);
    if (!name || !email || !password) {
      return res.status(400).json({ error: "Please fill all the fields" });
    }

    //! encrypting password
    const hashedPassword = await bcrypt.hash(password, 10);
    const isExist = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (isExist) {
      return res.status(200).json({ error: "User already exist" });
    }

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    // console.table(user)
    const cookie = cookiesToToken(user?.id, res);
    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.log(err);
    throw new Error("Something went wrong");
  }
};
// to find user

const findUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.table(req.body);

    if (!email || !password) {
      return res.status(400).json({ error: "Please fill all the fields" });
    }
    const user = await prisma.user
      .findUnique({
        where: {
          email, //! email is unique for each user
        },
      })
      .then((data) => data);

    if (!user) {
      return res.status(200).json({ error: "Invalid credentials" });
    }
    return res.status(200).json({ message: "User found successfully", user });
  } catch (err) {
    console.log(err);
    throw new Error("Something went wrong");
  }
};

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    //! check if email and password is empty
    if (!email || !password) {
      return res.status(400).json({ error: "Please fill all the fields" });
    }
    //! check if user exist
    const user = await prisma.user
      .findUnique({
        where: {
          email,
        },
      })
      .then((data) => data);

    if (!user) {
      return res.status(200).json({ error: "Invalid credentials" });
    }
    //! check if password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(200).json({ error: "Invalid credentials password" });
    }
    //! create token

    const cookie = cookiesToToken(user?.id, res);
    //! set cookie to browser storage
    res.status(200).json({ message: "User signed in successfully" });
  } catch (err) {
    console.log(err);
    throw new Error("Something went wrong");
  }
};

//! logout user
const logout = async (req, res) => {
  try {
    const getCookies = req.cookies;

    res.clearCookie("token");
    res.status(200).json({ message: "User logged out successfully" });
  } catch (err) {
    console.log(err);
    throw new Error("Something went wrong");
  }
};

//! get all user
const getAllUser = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json({ message: "All users", users });
  } catch (err) {
    console.log(err);
    throw new Error("Something went wrong");
  }
};

module.exports = {
  signup,
  findUser,
  signIn,
  logout,
  getAllUser,
};
