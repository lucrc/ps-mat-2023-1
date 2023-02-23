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
    tableName:'users'
  });
  return User;
};