'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of DataTypes lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      // this.hasMany(models.CustomerTag, {
      //   foreignKey:'tag_id',       //Campo da tabela estrangeira
      //   sourceKey: 'id',            //Campo da tabela local
      //   as: 'customers'             //Nome do campo de associação (plural)
      // })

      this.belongsToMany(models.Customer, {
        through: 'customer_tags',   //tabela intermediaria
        foreignKey: 'tag_id',       // chave estrangeira
        otherKey: 'customer_id',    // outra chave da tabeoa intermediaria
        as: 'customers'             // Nome do campo de assiciação  (plural)  
      })
    }
  }
  Tag.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    description: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    color: {
      type: DataTypes.STRING(8)
    },
    type: {
      type: DataTypes.ENUM('C', 'O'),
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Tag',
    tableName: 'tags'
  });
  return Tag;
};