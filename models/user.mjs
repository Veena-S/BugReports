export default function userModel(sequelize, dataTypes) {
  return sequelize.define('User', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: dataTypes.INTEGER,
    },
    email: {
      allowNull: false,
      type: dataTypes.STRING,
    },
    password: {
      allowNull: false,
      type: dataTypes.STRING,
    },
    createdAt: {
      allowNull: false,
      type: dataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: dataTypes.DATE,
    },
  });
}
