const {Sequelize, DataTypes} = require('sequelize')
const sequelize = new Sequelize("flowershop", "postgres", "5481",{
    dialect: "postgres",
    host: "localhost",
    port: 5432,
    
})

const db = {}
db.flower = require('./flower.model')(sequelize, DataTypes)
db.admin = require('./admin.model')(sequelize, DataTypes)
db.reservation = require('./reservation.model')(sequelize, DataTypes)
db.comment = require('./comment.model')(sequelize, DataTypes)
db.sequelize = sequelize



db.flower.hasMany(db.reservation, {as: "reservations", onDelete: "CASCADE", constraints: true})
db.flower.hasMany(db.comment, {as: "comments", onDelete: "CASCADE", constraints: true})

db.reservation.belongsTo(db.flower,{as: "flower", foreignKey: "flowerId"})
db.comment.belongsTo(db.flower,{as: "flower", foreignKey: "flowerId"})

module.exports = db
