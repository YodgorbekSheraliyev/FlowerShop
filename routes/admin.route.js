const { Router } = require("express");
const router = Router();

const {
  getLoginPage,
  login,
  getRegisterPage,
  register,
  createFlower,
  deleteFlower,
  editFlower,
  deleteComment,
  editReservation,
} = require("../controllers/admin.controller");

router.get("/admins/auth/login", getLoginPage);

router.post("/admins/auth/login", login);

router.get("/admins/auth/register", getRegisterPage);
router.post("/admins/auth/register", register);

router.post("/admins/flower/create", createFlower);
router.post("/admins/flower/delete/:id", deleteFlower);
router.post("/admins/flower/edit/:id", editFlower);

router.post("/admins/comment/delete/:id", deleteComment);
router.post("/admins/reservation/edit/:id/:resid", editReservation);

router.get("/admins/dashboard", getDashboardPage);

module.exports = router;
