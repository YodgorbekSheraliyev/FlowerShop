module.exports = (sequelize, DataTypes) => {
    const Admin = sequelize.define("admin", {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        uniquie: true
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    }, {timestamps: true});
    // Admin.create({
    //   firstName: "Test",
    //   lastName: "Test",
    //   email: "test@gmail.com",
    //   password: "test"
    // })
  
    return Admin;
  };
  