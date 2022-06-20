const Router = require("express").Router;
const router = new Router();
const { body } = require("express-validator");
const formsController = require("../controllers/forms-controller");
const userController = require("../controllers/user-controller");
const authMiddleware = require("../middlewares/auth-middleware");

router.post(
  "/registration",
  body("email").isEmail(),
  body("password").isLength({ min: 3, max: 32 }),
  userController.registration
);
router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.post("/forms", formsController.createForm);
router.post("/answer", formsController.addAnswers);
router.post("/forms/user", formsController.getUserForms);
router.post("/forms/specific", formsController.getFormById);
router.get("/activate/:link", userController.activate);
router.get("/refresh", userController.refresh);
router.get("/users", authMiddleware, userController.getUsers);

module.exports = router;
