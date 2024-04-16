const { Router } = require("express");
const {
  signupUser,
  loginUser,  
} = require("../controller/user.controller");
const router = Router();

router.post("/register", signupUser);
router.post("/login", loginUser);
module.exports = router;
