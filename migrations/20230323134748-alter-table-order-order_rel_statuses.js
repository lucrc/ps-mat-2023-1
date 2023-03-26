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
    await queryInterface.addConstraint('order_rel_statuses', {
      fields: ['order_id'],            //Campo(s) da tabela de origem
      type: 'foreign key',
      //nome chave estrangeira (deve ser único no BD)
      name: 'order_rel_statuses_order_fk',          
      references: {
        table: 'orders',              //Tabela estrangeira
        field: 'id'                   //Campo da tabela estrangeira
      },
      onDelete: 'RESTRICT',           //Não deixa apagar uma customer em uso no customer_tags
      onUpdate: 'CASCADE'             //Atualiza customer_id em customer_tags se id em customers mudar
    })

    await queryInterface.addConstraint('order_rel_statuses', {
      fields: ['order_status_id'],            //Campo(s) da tabela de origem
      type: 'foreign key',
      //nome chave estrangeira (deve ser único no BD)
      name: 'order_rel_statuses_order_status_fk',          
      references: {
        table: 'order_statuses',              //Tabela estrangeira
        field: 'id'                   //Campo da tabela estrangeira
      },
      onDelete: 'RESTRICT',           //Não deixa apagar uma customer em uso no customer_tags
      onUpdate: 'CASCADE'             //Atualiza customer_id em customer_tags se id em customers mudar
    })

    await queryInterface.addConstraint('order_rel_statuses', {
      fields: ['user_id'],            //Campo(s) da tabela de origem
      type: 'foreign key',
      //nome chave estrangeira (deve ser único no BD)
      name: 'order_rel_statuses_user_fk',          
      references: {
        table: 'users',              //Tabela estrangeira
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
    await queryInterface.removeConstraint('order_rel_statuses', 'order_rel_statuses_user_fk')
    await queryInterface.removeConstraint('order_rel_statuses', 'order_rel_statuses_order_status_fk')
    await queryInterface.removeConstraint('order_rel_statuses', 'order_rel_statuses_order_fk')
  }
};
