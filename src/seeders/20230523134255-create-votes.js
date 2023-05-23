"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const votes = [];
    for (let index = 0; index < 100; index++) {
      votes.push({
        id: index + 1,
        answerId: Math.floor(Math.random() * 16) + 1,
        userId: Math.floor(Math.random() * 10) + 1,
        type: Math.random() > 0.5 ? "up" : "down",
      });
    }

    await queryInterface.bulkInsert("votes", votes, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("votes", null, {});
  },
};
