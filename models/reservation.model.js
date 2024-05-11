module.exports = (sequelize, DataTypes) => {
    const Reservation = sequelize.define("reservation", {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      fullName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      region: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        default: 1
      },
      status: {
        type: DataTypes.ENUM(["pending", "delivered", "rejected",]),
        default: "pending"
      },
      productId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
     
    }, {timestamps: true});
  
    return Reservation;
  };
  