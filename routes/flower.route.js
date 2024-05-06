const { Router, raw } = require("express");
const db = require('../models');
// const { where } = require("sequelize");

const router = Router();
const Flower = db.flower
const Reservation = db.reservation
const Comment = db.comment
// const {Sequelize} = require('sequelize')
// const sequelize = new Sequelize()
// const Reservation = sequelize.define("efe")


router.get("/flowers/all", async (req, res) => {
  const limit = 4;
  const countFlowers = await Flower.count();
  const totalPages = Math.ceil(countFlowers / limit);
  const currentPage = +req.query.page || 1;
  const isNotNextExist = currentPage >= totalPages ? true : false;
  const isNotPrevExist = currentPage <= 1 ? true : false;
  const nextPage = currentPage + 1;
  const prevPage = currentPage - 1;
  const flowers = await Flower.findAll({
    raw: true,
    limit,
    offset: (currentPage - 1) * limit,
  });
  res.render("flowers/all-flowers", {
    title: "All flowers",
    flowers,
    isNotNextExist,
    isNotPrevExist,
    nextPage,
    prevPage,
  });
});

router.get('/flowers/buy/:id', async (req, res) => {
  const flower = await Flower.findByPk(req.params.id, {raw: true,})
  console.log(flower)
  res.render("flowers/buy-flower", {
    title: "Buy flower",
    flower: flower,
    error: req.flash('error')
  })
})

router.post('/flower/buy/:id', async (req, res) => {
  const id = req.params.id
    const flower = await Flower.findByPk(id, {raw: true})
    const {fullName, phoneNumber, region} = req.body
    if(!fullName || phoneNumber.lenght <13  || !region){
      req.flash("error", "Barchasini to'ldiring iltimos!!!")
      return res.redirect('/flowers/buy/' + id)
    }
    if (flower.amount <1) {
      req.flash("error", "Bu gul sotib bo'lingan")
      return res.redirect('/flowers/all')
    }else{
      await Reservation.create({fullName, region, phone: phoneNumber, productId:id, flowerId: id, amount:1 })
       return res.redirect('/flowers/all')
    }
})

router.post('/flowers/comment/:id', async(req, res) => {
     const {email, comment} = req.body
     const id = +req.params.id
     if(!email || !comment){
      return res.redirect('/flowers/all')
     }
     await Comment.create({flowerId: id, text: comment, email})
     res.redirect('/flowers/all')
})

router.post("/admin/flower/create", async (req, res) => {
  const { title, imageUrl, description, amount, price, status } = req.body;
  const flower = await Flower.create({title, imageUrl, description, amount, price, status,});
  res.redirect('/admin/dashboard')
});

router.post('/admin/flower/delete/:id', async (req, res) => {
    const id = req.params.id
    const flower = await Flower.destroy({where: {id: id, }})
    return res.redirect('/flower/all')
})

module.exports = router;
