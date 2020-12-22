module.exports = {
  up: async (queryInterface, Sequelize) => {
    const featuresList = [
      {
        name: 'navbar',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'table',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'grid',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'alert',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'modal',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'collapse',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'checkbox',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'dropdown',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    // Insert the features list
    const features = await queryInterface.bulkInsert('Features', featuresList, { returning: true });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Features', null, {});
  },
};
