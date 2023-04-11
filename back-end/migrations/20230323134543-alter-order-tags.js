'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addConstraint('order_tags', {
      fields: ['order_id'],            //Campo(s) da tabela de origem
      type: 'foreign key',
      //nome chave estrangeira (deve ser único no BD)
      name: 'order_tags_order_fk',          
      references: {
        table: 'orders',              //Tabela estrangeira
        field: 'id'                   //Campo da tabela estrangeira
      },
      onDelete: 'RESTRICT',           //Não deixa apagar uma customer em uso no customer_tags
      onUpdate: 'CASCADE'             //Atualiza customer_id em customer_tags se id em customers mudar
    })
    await queryInterface.addConstraint('order_tags', {
      fields: ['tag_id'],            //Campo(s) da tabela de origem
      type: 'foreign key',
      //nome chave estrangeira (deve ser único no BD)
      name: 'order_tags_tag_fk',          
      references: {
        table: 'tags',              //Tabela estrangeira
        field: 'id'                   //Campo da tabela estrangeira
      },
      onDelete: 'RESTRICT',           //Não deixa apagar uma customer em uso no customer_tags
      onUpdate: 'CASCADE'             //Atualiza customer_id em customer_tags se id em customers mudar
    })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    await queryInterface.removeConstraint('order_tags', 'order_tags_tag_fk')
    await queryInterface.removeConstraint('order_tags', 'order_tags_order_fk')
  }
};
