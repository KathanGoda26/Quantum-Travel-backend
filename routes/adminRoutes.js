const express = require('express');
const router = express.Router();

const verifyToken = require('../utils/verifyToken');
const verifyRole = require('../utils/verifyRole');

const {
  loginAdmin,
  inviteAdmin,
  getAdmins,
  deleteAdmin
} = require('../controllers/admincontroller');

router.post('/api/v1', loginAdmin);

// Only superadmin can invite or delete other admins
router.post('/invite', verifyToken, verifyRole('superadmin'), inviteAdmin);
router.delete('/:id', verifyToken, verifyRole('superadmin'), deleteAdmin);

// Any logged-in admin can fetch list of admins
router.get('/', verifyToken, verifyRole('admin', 'superadmin'), getAdmins);

module.exports = router;