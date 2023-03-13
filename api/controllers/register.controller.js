// const usersDB = {
//   users: require("../model/users.json"),
//   setUsers: function (data) {
//     this.users = data;
//   },
// };

const {prisma} = require('../db')
const logger = require('../controllers/logger.controller')
const fsPromises = require("fs").promises;
const path = require("path");
const bcrypt = require("bcrypt");
const { Role } = require('@prisma/client');

const handleNewUser = async (req, res) => {

    const { user,teacher_name, pwd } = req.body;
    var data = String(teacher_name)


    if (!user || !pwd)
      return res
        .status(400)
        .json({ message: "Username and password are required." });
    // check for duplicate usernames in the db
    const duplicate = await prisma.user.findFirst({ where: { username: user}});
    if (duplicate) return res.sendStatus(409); //Conflict
    try {
      //encrypt the password
      const hashedPwd = await bcrypt.hash(pwd, 10);
      //store the new user
      // const newUser = {
      //   username: user,
      //   roles: { Teacher: 2 },
      //   name: teacher_name,
      //   password: hashedPwd,
      // };
      const newUser = await prisma.user.create({data: {
        username: user.user,
        roles: Role.TEACHER,
        name: teacher_name.teacher_name,
        password: hashedPwd,
      }})
    
      console.log(newUser)
      // await usersDB.setUsers([...usersDB.users, newUser]);
      // await fsPromises.writeFile(
      //   path.join(__dirname, "..", "model", "users.json"),
      //   JSON.stringify(usersDB.users)
      // );
      // console.log(usersDB.users);
      res.status(201).json({ success: `New user ${user} created!` });
    } catch (err) {
      res.status(500).json({ message: err.message });
    //   await prisma.teacher.create({
    //     select: {
              
    //       teacher_name: true,
    //   }, 
    //   data: {
    //     teacher_name: teacher_name,
        
    //   }
    // })
    }
  
};

// const changePassword = async (req, res) => {
//   const { user,pwd} = req.body;
//   const duplicate = usersDB.users.find((person) => person.username === user);
//     if (duplicate){
//       try {
//         //encrypt the password
//         const hashedPwd = await bcrypt.hash(pwd, 10);
//         //store the new user
//         const newUser = {
//           username: user,
//           roles: { Teacher: 2 },
//           password: hashedPwd,
//         };
//         usersDB.users[userIndex].password = hashedPwd;
//         //usersDB.setUsers([...usersDB.users, newUser]);
//         await fsPromises.writeFile(
//           path.join(__dirname, "..", "model", "users.json"),
//           JSON.stringify(usersDB.users)
//         );
//         console.log(usersDB.users);
//         res.status(201).json({ success: `New password ${user} created!` });
//       } catch (err) {
//         res.status(500).json({ message: err.message });
//       }
//     } //Conflict
    
// };

const changePassword = async (req, res) => {
  const { user, pwd } = req.body;
  const userIndex = usersDB.users.findIndex((person) => person.username === user);
  if (userIndex !== -1) {
    try {
      // encrypt the new password
      const hashedPwd = await bcrypt.hash(pwd, 10);
      // update the password of the existing user
      usersDB.users[userIndex].password = hashedPwd;
      await fsPromises.writeFile(
        path.join(__dirname, "..", "model", "users.json"),
        JSON.stringify(usersDB.users)
      );
      console.log(usersDB.users);
      res.status(200).json({ success: `Password for ${user} updated!` });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  } else {
    res.status(404).json({ message: `User ${user} not found!` });
  }
};

module.exports = {handleNewUser,changePassword,};
