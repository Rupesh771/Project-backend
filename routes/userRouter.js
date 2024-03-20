const router = require("express").Router();
const userController = require("../controllers/userController");
const upload = require("../Middleware/upload");
const fs = require("fs");
const auth = require("../Middleware/auth");

router.post(
  "/user/register",
  upload.single("image"),
  userController.userRegister
);
router.post("/user/login", userController.userlogin);
router.post("/email-send", userController.emailsend);
router.post("/change-password", userController.changepassword);
router.get("/displayuserbyuser/:id", userController.displayuserdatabyid);
router.put("/updateuser/:id", userController.Updateuser);

module.exports = router;
