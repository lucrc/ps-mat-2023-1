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

    await queryInterface.addConstraint('orders', {
      fields: ['customer_id'],            //Campo(s) da tabela de origem
      type: 'foreign key',
      //nome chave estrangeira (deve ser único no BD)
      name: 'orders_customer_fk',          
      references: {
        table: 'customers',              //Tabela estrangeira
        field: 'id'                   //Campo da tabela estrangeira
      },
      onDelete: 'RESTRICT',           //Não deixa apagar uma customer em uso no customer_tags
      onUpdate: 'CASCADE'             //Atualiza customer_id em customer_tags se id em customers mudar
    })

    await queryInterface.addConstraint('orders', {
      fields: ['channel_id'],            //Campo(s) da tabela de origem
      type: 'foreign key',
      //nome chave estrangeira (deve ser único no BD)
      name: 'orders_channel_fk',          
      references: {
        table: 'channels',              //Tabela estrangeira
        field: 'id'                   //Campo da tabela estrangeira
      },
      onDelete: 'RESTRICT',           //Não deixa apagar uma customer em uso no customer_tags
      onUpdate: 'CASCADE'             //Atualiza customer_id em customer_tags se id em customers mudar
    })

    await queryInterface.addConstraint('orders', {
      fields: ['carrier_id'],            //Campo(s) da tabela de origem
      type: 'foreign key',
      //nome chave estrangeira (deve ser único no BD)
      name: 'orders_carrier_fk',          
      references: {
        table: 'carriers',              //Tabela estrangeira
        field: 'id'                   //Campo da tabela estrangeira
      },
      onDelete: 'RESTRICT',           //Não deixa apagar uma customer em uso no customer_tags
      onUpdate: 'CASCADE'             //Atualiza customer_id em customer_tags se id em customers mudar
    })

    await queryInterface.addConstraint('orders', {
      fields: ['shipment_priority_id'],            //Campo(s) da tabela de origem
      type: 'foreign key',
      //nome chave estrangeira (deve ser único no BD)
      name: 'orders_shipment_priority_fk',          
      references: {
        table: 'shipment_priorities',              //Tabela estrangeira
        field: 'id'                   //Campo da tabela estrangeira
      },
      onDelete: 'RESTRICT',           //Não deixa apagar uma customer em uso no customer_tags
      onUpdate: 'CASCADE'             //Atualiza customer_id em customer_tags se id em customers mudar
    })

    await queryInterface.addConstraint('orders', {
      fields: ['payment_method_id'],            //Campo(s) da tabela de origem
      type: 'foreign key',
      //nome chave estrangeira (deve ser único no BD)
      name: 'orders_payment_method_fk',          
      references: {
        table: 'payment_methods',              //Tabela estrangeira
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
    await queryInterface.removeConstraint('orders', 'orders_payment_method_fk')
    await queryInterface.removeConstraint('orders', 'orders_shipment_priority_fk')
    await queryInterface.removeConstraint('orders', 'orders_carrier_fk')
    await queryInterface.removeConstraint('orders', 'orders_channel_fk')
    await queryInterface.removeConstraint('orders', 'orders_customer_fk')
  }
};
