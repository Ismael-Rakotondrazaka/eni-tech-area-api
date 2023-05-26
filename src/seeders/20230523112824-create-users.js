"use strict";
const { faker } = require("@faker-js/faker");
const { hashSync } = require("bcrypt");
const dotenv = require("dotenv");

dotenv.config();

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const users = [
      {
        id: 1,
        firstname: "John",
        lastname: "Doe",
        email: "john@doe.com",
        password: hashSync("password", +process.env.PASSWORD_SALT_ROUND),
        role: "user",
        imageUrl: "https://i.pravatar.cc/300?u=1",
      },
      {
        id: 2,
        firstname: "Jane",
        lastname: "Smith",
        email: "jane@smith.com",
        password: hashSync("password", +process.env.PASSWORD_SALT_ROUND),
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
        password: hashSync("password", +process.env.PASSWORD_SALT_ROUND),
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
