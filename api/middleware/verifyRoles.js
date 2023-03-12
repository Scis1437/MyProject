function getRole(roleId) {
  switch (roleId) {
    case 1:
      return "ADMIN";
    case 2:
      return "TEACHER";
    case 3:
      return "STUDENT";
    default:
      return "USER";
  }
}

const verifyRoles = (...allwedRoles) => {
  return (req, res, next) => {
    console.info(req?.roles);
    if (!req?.roles) return res.sendStatus(401);
    const rolesArray = [...allwedRoles];
    // console.log(rolesArray);
    // console.log(req.roles);
    const result = [req.roles]
    .map(getRole)
    .some(role => rolesArray.includes(role))
    if (!result) return res.sendStatus(401);
    next();
  };
};

module.exports = verifyRoles;
