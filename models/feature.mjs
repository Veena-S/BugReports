export default function featureModel(sequelize, dataTypes) {
  return sequelize.define('Feature', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: dataTypes.INTEGER,
    },
    name: {
      allowNull: false,
      type: dataTypes.STRING,
    },
  });
}
