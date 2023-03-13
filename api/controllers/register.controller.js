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
    // const duplicate = await prisma.user.findFirst({ where: { username: user}});
    // if (duplicate) return res.sendStatus(409); //Conflict
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
      const newUser = await prisma.user.create(
        
        {data: {
        
        username: user,
        roles: Role.TEACHER,
        name: teacher_name,
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
  try{
    const {username,pwd} = req.body;
    const hashedPwd = await bcrypt.hash(pwd, 10);
    const newUserPassword = await prisma.user.update({
          where:{
          username: req.body.user,},    
          data: {
            username:req.body.user,
            password: hashedPwd,
          },
      })
      console.log(newUserPassword)
      res.status(200).json({ success: `Password for ${req.body.user} updated!` });
  } catch(err){
    res.status(500).json({ message: err.message });
  }
  
};
const deleteUser = async (req, res) => {
  try{
    const data = req.body;
    
    const deleteUser = await prisma.user.delete({
          where:{
          username: req.body.user}
      })
      console.log(deleteUser)
      res.status(200).json({ success: `User for ${req.body.user} deleted` });
  } catch(err){
    res.status(500).json({ message: err.message });
  }};

module.exports = {handleNewUser,changePassword,deleteUser,};
