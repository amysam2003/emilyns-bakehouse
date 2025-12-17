export const emilynAdminOnly = (req, res, next) => {
  try {
    if (!req.emilynUser) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    if (req.emilynUser.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }
    next();
  } catch (error) {
    console.error("Admin-Side Error:", error);
    res.status(500).json({ message: "Server Error in Admin-Side" });
  }
};