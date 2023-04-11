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
    await queryInterface.addConstraint('customer_tags', {
      fields: ['customer_id'],            //Campo(s) da tabela de origem
      type: 'foreign key',
      //nome chave estrangeira (deve ser único no BD)
      name: 'customer_tags_customers_fk',          
      references: {
        table: 'customers',              //Tabela estrangeira
        field: 'id'                   //Campo da tabela estrangeira
      },
      onDelete: 'RESTRICT',           //Não deixa apagar uma customer em uso no customer_tags
      onUpdate: 'CASCADE'             //Atualiza customer_id em customer_tags se id em customers mudar
    })

    await queryInterface.addConstraint('customer_tags', {
      fields: ['tag_id'],            //Campo(s) da tabela de origem
      type: 'foreign key',
      //nome chave estrangeira (deve ser único no BD)
      name: 'customer_tags_tags_fk',          
      references: {
        table: 'tags',                //Tabela estrangeira
        field: 'id'                   //Campo da tabela estrangeira
      },
      onDelete: 'RESTRICT',           //Não deixa apagar uma tag em uso no customer_tags
      onUpdate: 'CASCADE'             //Atualiza tag_id em customer_tags se id em tags mudar
    })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    (await queryInterface.removeConstraint('customer_tags', 'customer_tags_tags_fk'))
    await queryInterface.removeConstraint('customer_tags', 'customer_tags_customers_fk')

  }
};
