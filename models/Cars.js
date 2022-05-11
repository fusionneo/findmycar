const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Cars extends Model {}

Cars.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    CompleteCarModel: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Year: {
      type: DataTypes.INTEGER,
    },
    Model: {
      type: DataTypes.STRING,
    },
    MSRP: {
      type: DataTypes.INTEGER
    },
    cityGasMileage: {
      type: DataTypes.INTEGER,
    },
    highwayGasMileage: {
      type: DataTypes.INTEGER
    },
    avgGasMileage: {
      type: DataTypes.INTEGER
    },
    passengerCapacity: {
      type: DataTypes.INTEGER
    },
    bodyStyle: {
      type: DataTypes.STRING,
    },
    fogLamps: {
      type: DataTypes.BOOLEAN,
    },
    tirePressureMonitor: {
      type: DataTypes.BOOLEAN,
    },
    backUpCamera: {
      type: DataTypes.BOOLEAN,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: false,
    modelName: 'Cars',
  }
);

module.exports = Cars;
