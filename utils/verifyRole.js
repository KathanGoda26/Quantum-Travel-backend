export const verifySuperAdmin = (req, res, next) => {
  try {
    const user = req.user;

    if (!user || user.role !== 'superadmin') {
      return res.status(403).json({ message: 'Access denied. Superadmin only.' });
    }

    next(); // User is superadmin
  } catch (error) {
    return res.status(500).json({ message: 'Server error while verifying superadmin.' });
  }
};