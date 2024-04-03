const { Router } = require("express");
const {
  register,
  login,
  userProfile,
  logout,
} = require("../controller/user.controller");
const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get('/logout', logout);
router.get('/me', userProfile);
module.exports = router;
