"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      "users",
      [
        {
          id: 1,
          firstname: "John",
          lastname: "Doe",
          email: "johndoe@example.com",
          password: "password123",
          role: "user",
          imageUrl: "https://example.com/avatar1.jpg",
        },
        {
          id: 2,
          firstname: "Alice",
          lastname: "Smith",
          email: "alicesmith@example.com",
          password: "password456",
          role: "user",
          imageUrl: "https://example.com/avatar2.jpg",
        },
        {
          id: 3,
          firstname: "Michael",
          lastname: "Johnson",
          email: "michaeljohnson@example.com",
          password: "password789",
          role: "admin",
          imageUrl: "https://example.com/avatar3.jpg",
        },
        {
          id: 4,
          firstname: "Emily",
          lastname: "Brown",
          email: "emilybrown@example.com",
          password: "password987",
          role: "user",
          imageUrl: "https://example.com/avatar4.jpg",
        },
        {
          id: 5,
          firstname: "David",
          lastname: "Miller",
          email: "davidmiller@example.com",
          password: "password321",
          role: "user",
          imageUrl: "https://example.com/avatar5.jpg",
        },
        {
          id: 6,
          firstname: "Olivia",
          lastname: "Wilson",
          email: "oliviawilson@example.com",
          password: "password654",
          role: "user",
          imageUrl: "https://example.com/avatar6.jpg",
        },
        {
          id: 7,
          firstname: "James",
          lastname: "Taylor",
          email: "jamestaylor@example.com",
          password: "password123",
          role: "user",
          imageUrl: "https://example.com/avatar7.jpg",
        },
        {
          id: 8,
          firstname: "Sophia",
          lastname: "Anderson",
          email: "sophiaanderson@example.com",
          password: "password456",
          role: "user",
          imageUrl: "https://example.com/avatar8.jpg",
        },
        {
          id: 9,
          firstname: "Daniel",
          lastname: "Thomas",
          email: "danielthomas@example.com",
          password: "password789",
          role: "user",
          imageUrl: "https://example.com/avatar9.jpg",
        },
        {
          id: 10,
          firstname: "Mia",
          lastname: "Robinson",
          email: "miarobinson@example.com",
          password: "password987",
          role: "admin",
          imageUrl: "https://example.com/avatar10.jpg",
        },
      ],

      {}
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("users", null, {});
  },
};
