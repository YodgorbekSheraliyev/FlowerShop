const { Router } = require("express");
const { getFlowersPage, getFlowerPageById, buyFlower, commentOnFlower } = require("../controllers/flower.controller");

const router = Router();

router.get("/flowers/all", getFlowersPage);
router.get('/flowers/buy/:id', getFlowerPageById)

router.post('/flower/buy/:id', buyFlower)
router.post('/flowers/comment/:id', commentOnFlower)

module.exports = router;
