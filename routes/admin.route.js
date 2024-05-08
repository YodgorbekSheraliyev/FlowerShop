const { Router } = require("express");
const router = Router();
const db = require("../models");
const { where } = require("sequelize");
const Admin = db.admin;
const Flower = db.flower;
const Reservation = db.reservation

router.get("/admins/auth/login", async (req, res) => {
  res.render("admins/auth/login", {
    title: "Login",
  });
});

router.post("/admins/auth/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.redirect("/admins/auth/login");
  } else {
    const admin = await Admin.findOne({ where: { email } });
    if (password === admin.password) {
      req.session.admin = admin;
      req.session.save((err) => {
        if (err) throw err;
        res.redirect("/admins/dashboard");
      });
    }
  }
  res.render("admin/login", {
    title: "Login",
  });
});

router.get("/admins/auth/register", async (req, res) => {
    res.render('admin/register')
});
router.post("/admins/auth/register", async (req, res) => {
    const{firstName, lastName, email, password} = req.body
    if(!firstName || !lastName || !email || !password){
        return res.redirect('/admins/auth/register')
    }else {
        await Admin.create(req.body)
        return res.redirect('/admins/dashboard')
    }
});

router.post('/admins/flower/create', async(req, res) => {
  const {title, imageUrl, description, amount, price, status} = await req.body
  const flower = await Flower.create(req.body, {returning: true})
  return res.status(201).redirect('/admins/dashboard')
})

router.delete('/admins/flower/delete/:id', async(req, res) => {
  const id = +req.params.id
  await Flower.destroy({where: {id}})
  return res.status(200).send({message: "deleted"})
})

router.get('/admins/dashboard', async (req, res) => {
  const flowers = await Flower.findAll({raw: true, include: ["reservations"], nest: true})
  const allFlowersCount = await Flower.count()
  const soldFlowers = await Flower.findAll({raw: true, where: {status: "delivered"}})
  let overallSum = 0


  // const revenue = soldFlowers
  // console.log(allFlowersCount)
  // console.log(overallSum)
  // soldFlowers
console.log(soldFlowers)
  res.render('admin/dashboard', {
    title: "Dashboard",
    flowers: flowers,
    allFlowersCount
  })
})

router.get('/test', async(req, res) => {
  res.render('admin/test', {
    title: "Test"
  })
})

module.exports = router;
