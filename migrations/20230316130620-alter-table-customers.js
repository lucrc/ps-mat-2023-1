'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    //cria a chave estrangeira da tabela customers para a tabela cities
    await queryInterface.addConstraint('customers', {
      fields: ['city_id'],            //Campo(s) da tabela de origem
      type: 'foreign key',
      //nome chave estrangeira (deve ser único no BD)
      name: 'customers_cities_fk',          
      references: {
        table: 'cities',              //Tabela estrangeira
        field: 'id'                   //Campo da tabela estrangeira
      },
      onDelete: 'RESTRICT',           //Não deixa apagar uma city em uso no customer
      onUpdate: 'CASCADE'             //Atualiza city_id em customer sse id em cityu mudar
    })
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  async down (queryInterface, Sequelize) {
   //Reverte asalterações do up()
   await queryInterface.removeConstraint('customers', 'customer_cities_fk')
  }
};
