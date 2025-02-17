const roleMiddleware = (allowedRoles) => {
  return (req, res, next) => {
    // console.log(allowedRoles);
    const { role } = req.user;
    // console.log("role", role);
    if (!allowedRoles.includes(role)) {
      return res.status(403).json({ message: "Access denied" });
    }
    next();
  };
};

export default roleMiddleware;
