'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // this.hasMany(models.OrderRelStatus, {
      //   foreignKey:'user_id',       //Campo da tabela estrangeira
      //   sourceKey: 'id',            //Campo da tabela local
      //   as: 'order_rel_statuses'             //Nome do campo de associação (plural)
      // })

      this.belongsToMany(models.Order, {
        through: 'order_rel_statuses',   //tabela intermediaria
        foreignKey: 'user_id',       // chave estrangeira
        otherKey: 'order_id',    // outra chave da tabeoa intermediaria
        as: 'orders'             // Nome do campo de assiciação  (plural)  
      })
      this.belongsToMany(models.OrderStatus, {
        through: 'order_rel_statuses',   //tabela intermediaria
        foreignKey: 'user_id',       // chave estrangeira
        otherKey: 'order_status_id',    // outra chave da tabeoa intermediaria
        as: 'order_statuses'             // Nome do campo de assiciação  (plural)  
      })
    }
  }
  User.init({
    id:{
      type: DataTypes.INTEGER,
      alllowNull: false,
      primaryKey: true,
      autoIncrement: true
    },     
    
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    verified_email: {
      type:DataTypes.BOOLEAN(100),
      allowNull: false,
      default: false
    },
    is_admin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      default: false
    },
    phone: {
      type: DataTypes.STRING(20),
      alllowNull: true
    },
    password: {
      type: DataTypes.STRING(200),
      alllowNull: false
    }
  }, {
    sequelize,
    modelName: 'User',
    tableName:'users',
    //Esconde o campo "password" no retrieve e no retrieveOne
    defaultScope: {
      attributes:{
        exclude:  ['password']
      }
    },
    scopes: {
      //Inclui o campo "password" (necessário no login)
      withPassword: {
        attributes:{
          include: ['password']
        }
      }
    }  
  });
  return User;
};