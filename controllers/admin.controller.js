const db = require("../models");
const Admin = db.admin;
const Flower = db.flower;
const Reservation = db.reservation;
const Comment = db.comment;

const getLoginPage = async (req, res) => {
  res.render("admin/login", {
    title: "Login",
    error: req.flash("error"),
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  if (!email || !password) {
    req.flash("error", "Email va passwordni kiritsh talab qilinadi");
    return res.redirect("/admins/auth/login");
  } else {
    const admin = await Admin.findOne({ where: { email } });
    if (admin && password === admin.password) {
      req.session.admin = admin;
      req.session.save((err) => {
        if (err) throw err;
        res.redirect("/admins/dashboard");
      });
    }
    res.redirect("/admins/auth/login");
  }
};

const getRegisterPage = async (req, res) => {
  res.render("admin/register", {
    title: "Register",
    error: req.flash("error"),
  });
};

const register = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  if (!firstName || !lastName || !email || !password) {
    req.flash("error", "Barchasini to'lidiring !!!");
    return res.redirect("/admins/auth/register");
  } else {
    const existAdmin = await Admin.findOne({ where: { email } });
    if (existAdmin) {
      req.flash("error", "Bu akkaunt ro'yhatdan o'tgan !!!");
      return res.redirect("/admins/auth/register");
    }
    const admin = await Admin.create(req.body);
    req.session.admin = admin;
    req.session.save((err) => {
      if (err) throw err;
      return res.redirect("/admins/dashboard");
    });
  }
};

const createFlower = async (req, res) => {
  await Flower.create({ ...req.body });
  return res.status(201).redirect("/admins/dashboard");
};

const deleteFlower = async (req, res) => {
  const id = +req.params.id;
  await Flower.destroy({ where: { id } });
  return res.status(200).redirect("/admins/dashboard");
};

const editFlower = async (req, res) => {
  const id = +req.params.id;
  const { title, amount, description, imageUrl, price, status } = req.body;
  if (!title || !amount || !description || !imageUrl || !price || !status) {
    return res.status(400).redirect("/admins/dashboard");
  }
  await Flower.update(
    { title, amount, description, imageUrl, price, status },
    { where: { id } }
  );
  return res.status(200).redirect("/admins/dashboard");
};

const deleteComment = async (req, res) => {
  await Comment.destroy({ where: { id: req.params.id } });
  res.redirect("/admins/dashboard");
};
const editReservation = async (req, res) => {
  const id = req.params.id;
  const resId = req.params.resid;
  const flower = await Flower.findByPk(id);
  const reservation = await Reservation.findByPk(resId);
  const { amount, status } = req.body;
  const difference = amount - reservation.amount;
  if (status == "rejected") {
    if (reservation.status == "rejected") {
      return res.redirect("/admins/dashboard");
    }
    await Flower.update(
      { amount: flower.amount + reservation.amount },
      { where: { id } }
    );
    await Reservation.update({ status }, { where: { id: resId } });
    return res.redirect("/admins/dashboard");
  }
  if (amount > reservation.amount) {
    if (flower.amount < difference) {
      return res.redirect("/admins/dashboard");
    } else {
      await Flower.update(
        { amount: flower.amount - difference },
        { where: { id } }
      );
      await Reservation.update({ status, amount }, { where: { id: resId } });
      res.redirect("/admins/dashboard");
    }
  } else if (amount < reservation.amount) {
    await Flower.update(
      { amount: flower.amount + Math.abs(difference) },
      { where: { id } }
    );
    await Reservation.update({ status, amount }, { where: { id: resId } });
    res.redirect("/admins/dashboard");
  } else {
    await Reservation.update({ status, amount }, { where: { id: resId } });
    res.redirect("/admins/dashboard");
  }
};

const getDashboardPage = async (req, res) => {
  const flowers = await Flower.findAll({ raw: true });
  const reservations = await Reservation.findAll({
    raw: true,
    include: ["flower"],
    nest: true,
  });

  async function Loop() {
    let total = 0;
    let flowerCount = 0;
    let allReservationsCount = 0;
    let allFlowersSum = 0;

    for (let i = 0; i < reservations.length; i++) {
      const reservation = reservations[i];
      const flower = await Flower.findOne({
        where: { id: reservation.flowerId },
      });
      if (reservation.status == "delivered") {
        total += reservation.amount * flower.price;
        allReservationsCount += reservation.amount;
      }
    }

    for (let j = 0; j < flowers.length; j++) {
      const currentFlower = flowers[j];
      const [comments, reservations] = await Promise.all([
        Comment.findAll({ raw: true, where: { flowerId: currentFlower.id } }),
        Reservation.findAll({
          raw: true,
          where: { flowerId: currentFlower.id },
        }),
      ]);
      const flower = { ...currentFlower, reservations, comments };
      flowerCount += flower.amount;
      allFlowersSum += flower.amount * flower.price;
      flowers[j] = flower;
    }
    res.render("admin/dashboard", {
      title: "Dashboard",
      flowers: flowers,
      reservations: reservations,
      allFlowersCount: flowerCount,
      allReservationsCount,
      reservationSum: total,
      allFlowersSum,
    });
  }

  Loop();
};

module.exports = {
  getLoginPage,
  login,
  getRegisterPage,
  register,
  createFlower,
  deleteFlower,
  editFlower,
  deleteComment,
  editReservation,
  getDashboardPage,
};
