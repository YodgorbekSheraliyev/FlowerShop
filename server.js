const express = require("express");
const dotenv = require("dotenv");
const exphbs = require("express-handlebars");
const session = require('express-session')
const flash = require('connect-flash')
const path = require('path')
const db = require('./models');

// Instances
const app = express();
const hbsEngine = exphbs.create({
  defaultLayout: "main",
  extname: ".hbs",
  helpers: function (date, format) {
    return moment(date).format(format);
  },
});

// Environment Variable
dotenv.config()

// Configurations
app.engine(".hbs", hbsEngine.engine)
app.set("view engine", '.hbs')
app.set('views', path.join('views'))

// Middlewares
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(session({resave: false, saveUninitialized: false, secret: "weergw"}))
app.use(flash())

// Static folders
app.use(express.static(path.join(__dirname, "public/css")))
app.use(express.static(path.join(__dirname, "public/js")))

// Routes
app.get('/', (req, res) => {
  res.redirect('/flowers/all')
})

app.use('/', require('./routes/flower.route'))
app.use('/', require('./routes/admin.route'))
app.use('/', (req, res) => {
  res.render('flowers/404', {
    title: "Page not found"
  })
})

// Port
const port = process.env.PORT || 3000

// Conntection to database
async function connectPSQL(){
  try {
    const connection = await db.sequelize.sync()
  } catch (error) {
    console.error(error.message)
  }
}
connectPSQL()

// Listeners
app.listen(port, () => console.log(`Server running on port: ${port}`))
