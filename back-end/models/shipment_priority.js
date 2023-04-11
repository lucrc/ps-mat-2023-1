'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ShipmentPriority extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of DataTypes lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      this.hasMany(models.Order, {
        foreignKey:'shipment_priority_id',       //Campo da tabela estrangeira
        sourceKey: 'id',            //Campo da tabela local
        as: 'orders'             //Nome do campo de associação (plural)
      })
    }
  }
  ShipmentPriority.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'ShipmentPriority',
    tableName: 'shipment_priorities'
  });
  return ShipmentPriority;
};