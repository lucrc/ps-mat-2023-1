'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of DataTypes lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      this.belongsTo(models.City, {
        foreignKey: 'city_id',    //Nome do campo na tabela de ORIGEM
        targetKey: 'id',          //Nome do campo na tabela de DESTINO  
        as: 'city'                //Nome do atributo para exibição
      })

      // this.hasMany(models.CustomerTag, {
      //   foreignKey:'customer_id',       //Campo da tabela estrangeira
      //   sourceKey: 'id',            //Campo da tabela local
      //   as: 'tags'             //Nome do campo de associação (plural)
      // })
      this.belongsToMany(models.Tag, {
        through: 'customer_tags',   //tabela intermediaria
        foreignKey: 'customer_id',  // chave estrangeira
        otherKey: 'tag_id',         // outra chave da tabeoa intermediaria
        as: 'tags'                  // Nome do campo de assiciação  (plural)  
      })
      this.hasMany(models.Order, {
        foreignKey:'customer_id',       //Campo da tabela estrangeira
        sourceKey: 'id',            //Campo da tabela local
        as: 'orders'             //Nome do campo de associação (plural)
      })
    }
  }

  Customer.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    address: {
      type: DataTypes.TEXT
    },
    phone: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    is_whatsapp: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    city_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Customer',
    tableName: 'customers'
  });
  return Customer;
};