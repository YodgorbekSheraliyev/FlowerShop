const { Router } = require("express");
const router = Router();
const db = require("../models");
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
  // const {title, imageUrl, description, amount, price, status} = await req.body
  const flower = await Flower.create({...req.body}, {returning: true})
  return res.status(201).redirect('/admins/dashboard')
})

router.post('/admins/flower/delete/:id', async(req, res) => {
  const id = +req.params.id
  await Flower.destroy({where: {id}})
  return res.status(200).redirect('/admins/dashboard')
})

router.post('/admins/flower/edit/:id', async(req, res) => {
  const id = +req.params.id
  // await Flower.destroy({where: {id}})
  return res.status(200).redirect('/admins/dashboard')
})


router.post('/admins/flower/edit/:id/:resid', async (req, res) => {
  const id = req.params.id
  const resId = req.params.resid
    const flower = await Flower.findByPk(id)
    const reservation = await Reservation.findByPk(resId)
    console.log(reservation)
    // const {price, amount, status} = req.body
    // if(price == 0 || amount == 0 ){
    //   return res.redirect('/admins/dashboard')
    // }else{
    //   // await Flower.update({amount}, {where: {id: id}})
    //   // const reservation = await Reservation.
    //   await Reservation.update({price, productId:id, flowerId: id, amount, status}, {where:{id: resId, }})
    //    return res.redirect('/admins/dashboard')
    // }
})

router.get('/admins/dashboard', async (req, res) => {
  const flowers = await Flower.findAll({raw:true, include:['reservations'], nest: true, sort: ['id', 'ASC']})
  // console.log(flowers)
  const reservations = await Reservation.findAll({raw:true, include: ["flower"], nest:true})
  const allReservationsCount = await Reservation.count()

  async function Loop(){
  let total = 0
  let flowerCount = 0

  for(let i=0; i< reservations.length; i++){
    const reservation = reservations[i]
    const flower =  await Flower.findOne({where:{id : reservation.flowerId}})
    total += flower.price
  }
  
  for(let j=0; j< flowers.length; j++){
    const currentflower = flowers[j]
    const flower =  await Flower.findOne({where:{id : currentflower.id}})
    flowerCount += flower.amount
  }
  
  res.render('admin/dashboard', {
    title: "Dashboard",
    flowers: flowers,
    reservations: reservations,
    allFlowersCount: flowerCount,
    allReservationsCount,
    sum: total
  })
 }

 Loop()
})

router.get('/test', async(req, res) => {
  res.render('admin/test', {
    title: "Test"
  })
})

module.exports = router;
