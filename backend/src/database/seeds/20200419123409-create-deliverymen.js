module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      'deliverymans',
      [
        {
          name: 'Pedro Padro',
          email: 'pedro.prado@email.com.br',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'João da Silva',
          email: 'joao.silva@email.com.br',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Jessica Souza',
          email: 'jessica.souza@email.com.br',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Beatriz Torres',
          email: 'beatriz.torres@email.com.br',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: () => {},
};
