'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PaymentMethod extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of DataTypes lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      this.hasMany(models.Order, {
        foreignKey:'payment_method_id',       //Campo da tabela estrangeira
        sourceKey: 'id',            //Campo da tabela local
        as: 'orders'             //Nome do campo de associação (plural)
      })
    }
  }
  PaymentMethod.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    description: {
      type: DataTypes.STRING(30),
      /*allowNull: false,*/
    },
    operator_fee: {
      type: DataTypes.DECIMAL(18, 2),
      /*allowNull: false,*/
    },
  }, {
    sequelize,
    modelName: 'PaymentMethod',
    tableName: 'payment_methods'
  });
  return PaymentMethod;
};