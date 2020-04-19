module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      'recipients',
      [
        {
          name: 'Marcos Antônio',
          address: 'Av. Piracicamirim',
          address_number: 2982,
          city: 'Piracicaba',
          state: 'SP',
          zipcode: 13417780,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Rafael Silva',
          address: 'Rua Lazaro Gomes da Cruz',
          address_number: 998,
          city: 'Piracicaba',
          state: 'SP',
          zipcode: 13420722,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Ana Paula Arruda',
          address: 'Rua Francisco José Machado',
          address_number: 539,
          address_note: 'Bloco 2, Ap. 47',
          city: 'Piracicaba',
          state: 'SP',
          zipcode: 13420004,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Talita Campos',
          address: 'Rua Armando Chiquito',
          address_number: 35,
          city: 'Piracicaba',
          state: 'SP',
          zipcode: 13403331,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Marcos Antônio',
          address: 'Av. Piracicamirim',
          address_number: 2982,
          city: 'Piracicaba',
          state: 'SP',
          zipcode: '13417780',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Manoel de Oliveira',
          address: 'Rua Claudionor Barbiere',
          address_number: 165,
          city: 'Piracicaba',
          state: 'SP',
          zipcode: 13405296,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: () => {},
};
