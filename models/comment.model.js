module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define("comment", {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      text: {
        type: DataTypes.STRING,
        allowNull: false,
      },
     
    }, {timestamps: true});
  
    return Comment;
};
  