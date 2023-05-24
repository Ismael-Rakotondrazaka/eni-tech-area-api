"use strict";
const { faker } = require("@faker-js/faker");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const users = [
      {
        id: 1,
        firstname: "John",
        lastname: "Doe",
        email: "john@doe.com",
        password: "00000000",
        role: "user",
        imageUrl: "https://i.pravatar.cc/300?u=1",
      },
      {
        id: 2,
        firstname: "Jane",
        lastname: "Smith",
        email: "jane@smith.com",
        password: "00000000",
        role: "admin",
        imageUrl: "https://i.pravatar.cc/300?u=2",
      },
    ];

    for (let i = 3; i <= 10; i++) {
      users.push({
        id: i,
        firstname: faker.name.firstName(),
        lastname: faker.name.lastName(),
        email: faker.internet.email(),
        password: "00000000",
        role: faker.helpers.arrayElement(["user", "admin"]),
        imageUrl: "https://i.pravatar.cc/300?u=" + i,
      });
    }
    await queryInterface.bulkInsert("users", users, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("users", null, {});
  },
};
