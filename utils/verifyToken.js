import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  let token;
  
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(403).json({
      success: false,
      message: "No token provided",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({
      success: false,
      message: "Invalid token",
    });
  }
};

export const verifyUser = (req, res, next) => {
  verifyToken(req, res, () => {
    if (!req.user) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    next();
  });
};

export const isSuperAdmin = (req, res, next) => {
  if (!req.user) {
    return res
      .status(401)
      .json({ success: false, message: "Not authenticated" });
  }

  if (req.user.role !== "superadmin") {
    return res.status(403).json({ success: false, message: "Access Denied" });
  }
  next();
};

export const verifySuperAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY); // Keep secret key consistent

    if (decoded.role !== "superadmin") {
      return res.status(403).json({ success: false, message: "Superadmin access only" });
    }

    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ success: false, message: "Invalid or expired token" });
  }
};
