// const usersDB = {
//   users: require("../model/users.json"),
//   setUsers: function (data) {
//     this.users = data;
//   },
// };
const logger = require("../controllers/logger.controller");
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");
require("dotenv").config();
const fsPromises = require("fs").promises;
const path = require("path");
const { prisma } = require("../db");

function getRoleId(role) {
  switch (role) {
    case 'ADMIN': return 1;
    case 'TEACHER': return 2;
    case 'STUDENT': return 3;
    default: throw new Error("Invalid role");
  }
}

const handleLogin = async (req, res) => {
  let { user, pwd } = req.body;
  // user = user.username;
  // pwd = pwd.password
  if (!user || !pwd)
    return res
      .status(400)
      .json({ message: "Username and password are required." });
  const foundUser = await prisma.user.findFirst({
    where: {
      username: user,
    },
    select: { username: true, password: true, roles: true, },
  });
  if (!foundUser) return res.sendStatus(401); //Unauthorized
  // evaluate password
  const match = await bcrypt.compare(pwd, foundUser.password);
  if (match) {
    logger.teacherLog.log("info", user + " action = login ");
    const roles = getRoleId(foundUser.roles)
    // create JWTs
    const accessToken = jwt.sign(
      {
        UserInfo: { username: foundUser.username, role: roles },
      },

      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "360000s" }
    );
    const refreshToken = jwt.sign(
      { username: foundUser.username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );
    // Saving refreshToken with current user
    // const otherUsers = prisma.user.fi(
    //   (person) => person.username !== foundUser.username
    // );
    // const currentUser = { ...foundUser, refreshToken };
    // usersDB.setUsers([...otherUsers, currentUser]);
    // await fsPromises.writeFile(
    //   path.join(__dirname, "..", "model", "users.json"),
    //   JSON.stringify(usersDB.users)
    // );
    const editedUser = await prisma.user.update({
      where: { username: foundUser.username },
      data: { refresh_token: refreshToken }
    })

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "None",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.json({ roles, accessToken });
  } else {
    res.sendStatus(401);
  }
};

module.exports = { handleLogin };
