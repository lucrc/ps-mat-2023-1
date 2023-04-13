'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('products', {
      fields: ['supplier_id'],            //Campo(s) da tabela de origem
      type: 'foreign key',
      //nome chave estrangeira (deve ser único no BD)
      name: 'product_supplier_fk',          
      references: {
        table: 'suppliers',              //Tabela estrangeira
        field: 'id'                   //Campo da tabela estrangeira
      },
      onDelete: 'RESTRICT',           //Não deixa apagar uma customer em uso no customer_tags
      onUpdate: 'CASCADE'             //Atualiza customer_id em customer_tags se id em customers mudar
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('products', 'product_supplier_fk')

  }
};
