"use strict";
const { faker } = require("@faker-js/faker");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const tags = [
      {
        id: "1",
        name: "React".toUpperCase(),
        textColor: "white",
      },
      {
        id: "2",
        name: "Angular".toUpperCase(),
        textColor: "white",
      },
      {
        id: "3",
        name: "Vue.js".toUpperCase(),
        textColor: "white",
      },
      {
        id: "4",
        name: "TypeScript".toUpperCase(),
        textColor: "white",
      },
      {
        id: "5",
        name: "JavaScript".toUpperCase(),
        textColor: "white",
      },
      {
        id: "6",
        name: "HTML".toUpperCase(),
        textColor: "white",
      },
      {
        id: "7",
        name: "CSS".toUpperCase(),
        textColor: "white",
      },
      {
        id: "8",
        name: "Node.js".toUpperCase(),
        textColor: "white",
      },
      {
        id: "9",
        name: "Express.js".toUpperCase(),
        textColor: "white",
      },
      {
        id: "10",
        name: "Python".toUpperCase(),
        textColor: "white",
      },
      {
        id: "11",
        name: "Django".toUpperCase(),
        textColor: "white",
      },
      {
        id: "12",
        name: "Flask".toUpperCase(),
        textColor: "white",
      },
      {
        id: "13",
        name: "Java".toUpperCase(),
        textColor: "white",
      },
      {
        id: "14",
        name: "Spring Boot".toUpperCase(),
        textColor: "white",
      },
      {
        id: "15",
        name: "Ruby".toUpperCase(),
        textColor: "white",
      },
      {
        id: "16",
        name: "Ruby on Rails".toUpperCase(),
        textColor: "white",
      },
      {
        id: "17",
        name: "PHP".toUpperCase(),
        textColor: "white",
      },
      {
        id: "18",
        name: "Laravel".toUpperCase(),
        textColor: "white",
      },
      {
        id: "19",
        name: "C#".toUpperCase(),
        textColor: "white",
      },
      {
        id: "20",
        name: "ASP.NET".toUpperCase(),
        textColor: "white",
      },
      {
        id: "21",
        name: "Go".toUpperCase(),
        textColor: "white",
      },
    ];

    await queryInterface.bulkInsert(
      "tags",
      [
        ...tags.map((tag) => ({
          ...tag,
          bgColor: faker.helpers.arrayElement([
            "dark",
            "gray",
            "red",
            "pink",
            "grape",
            "violet",
            "indigo",
            "blue",
            "cyan",
            "green",
            "lime",
            "yellow",
            "orange",
            "teal",
          ]),
        })),
      ],
      {}
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("tags", null, {});
  },
};
