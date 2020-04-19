module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      'orders',
      [
        {
          recipient_id: 1,
          deliveryman_id: 1,
          product: 'IPad 3',
          start_date: new Date(),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          recipient_id: 3,
          deliveryman_id: 1,
          product: 'IPhone XS',
          start_date: new Date(),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          recipient_id: 2,
          deliveryman_id: 4,
          product: 'MacBook Pro',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          recipient_id: 6,
          deliveryman_id: 3,
          product: 'Motorola X',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          recipient_id: 6,
          deliveryman_id: 3,
          product: 'Notebook Acer Aspire',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: () => {},
};
