export default function bugModel( sequelize, dataTypes) {
  return sequelize.define('Bug', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: dataTypes.INTEGER,
      },
      problem: {
        allowNull: false,
        type: dataTypes.STRING,
      },
      errorText: {
        allowNull: true,
        type: dataTypes.STRING,
      },
      commit: {
        allowNull: true,
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
  })
}