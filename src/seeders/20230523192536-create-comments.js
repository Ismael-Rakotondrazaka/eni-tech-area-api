"use strict";
const { faker } = require("@faker-js/faker");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const comments = [];

    for (let index = 0; index < 100; index++) {
      comments.push({
        id: index + 1,
        userId: faker.datatype.number({ min: 1, max: 10 }),
        answerId: faker.datatype.number({ min: 1, max: 20 }),
        content: faker.lorem.paragraph(),
      });
    }
    await queryInterface.bulkInsert("comments", comments, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("comments", null, {});
  },
};
