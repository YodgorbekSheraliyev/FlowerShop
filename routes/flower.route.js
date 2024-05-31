const { Router } = require("express");
const db = require('../models');

const router = Router();
const Flower = db.flower
const Reservation = db.reservation
const Comment = db.comment

router.get("/flowers/all", async (req, res) => {
  const admin = req.session.admin
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
    order: [["id","ASC"]]
  });
  res.render("flowers/all-flowers", {
    title: "All flowers",
    flowers,
    isNotNextExist,
    isNotPrevExist,
    nextPage,
    prevPage,
    admin
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
    const flower = await Flower.findByPk(id)
    const {fullName, phoneNumber, region, amount} = req.body
    if(!fullName || phoneNumber.length <13  || !region){
      req.flash("error", "Barchasini to'ldiring iltimos!!!")
      if(amount <=0){
        req.flash('error', "Gul miqdori 0 va undan kichik bo'la olmaydi")
      }
      return res.redirect('/flowers/buy/' + id)
    }
    if (flower.amount < amount){
      req.flash("error", "Bu miqdorda gul sotib ololmaysiz.")
      return res.redirect('/flowers/buy/' + id)
    }else{
      await Flower.update({amount: (flower.amount - amount)}, {where: {id: id}})
      await Reservation.create({fullName, region, phone: phoneNumber, productId:id, flowerId: id, amount, status: "pending"})
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


module.exports = router;
