module.exports = (sequelize, DataTypes) => {
  const Flower = sequelize.define("flower", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING(25),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM(["available", "unavailable", "pending", "delivered", "rejected",]),
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {timestamps: true});

  return Flower;
};
