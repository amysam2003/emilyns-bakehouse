import jwt from "jsonwebtoken";
export const emilynAuthProtection = (req, res, next) => {
  let token = req.headers.authorization;
  if (!token || !token.startsWith("Bearer ")) {
    return res.status(401).json({ message: "An Unauthorized Access!" });
  }
  token = token.split(" ")[1];
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.emilynUser = verified; 
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid Token!" });
  }
};
export const emilynAdminOnly = (req, res, next) => {
  if (req.emilynUser.role !== "admin") {
    return res.status(403).json({
      message: "Sorry, go back to home page! Admin Access Required. This section is for Emilyn Bakehouse Admins Only",
    });
  }
  next();
};