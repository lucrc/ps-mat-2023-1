'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderStatus extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of DataTypes lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      // this.hasMany(models.OrderRelStatus, {
      //   foreignKey:'order_status_id',       //Campo da tabela estrangeira
      //   sourceKey: 'id',            //Campo da tabela local
      //   as: 'order_rel_statuses'             //Nome do campo de associação (plural)
      // })

      this.belongsToMany(models.User, {
        through: 'order_rel_statuses',   //tabela intermediaria
        foreignKey: 'order_status_id',       // chave estrangeira
        otherKey: 'user_id',    // outra chave da tabeoa intermediaria
        as: 'users'             // Nome do campo de assiciação  (plural)  
      })
      this.belongsToMany(models.Order, {
        through: 'order_rel_statuses',   //tabela intermediaria
        foreignKey: 'order_status_id',       // chave estrangeira
        otherKey: 'order_id',    // outra chave da tabeoa intermediaria
        as: 'orders'             // Nome do campo de assiciação  (plural)  
      })
    }
  }
  OrderStatus.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    sequence: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'OrderStatus',
    tableName: 'order_statuses'
  });
  return OrderStatus;
};