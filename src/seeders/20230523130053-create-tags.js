"use strict";
const { faker } = require("@faker-js/faker");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const tags = [
      {
        id: "1",
        name: "React",
        textColor: "#61DAFB",
        bgColor: "white",
      },
      {
        id: "2",
        name: "Angular",
        textColor: "#DD0031",
        bgColor: "white",
      },
      {
        id: "3",
        name: "Vue.js",
        textColor: "#41B883",
        bgColor: "white",
      },
      {
        id: "4",
        name: "TypeScript",
        textColor: "#3178C6",
        bgColor: "white",
      },
      {
        id: "5",
        name: "JavaScript",
        textColor: "#F7DF1E",
        bgColor: "white",
      },
      {
        id: "6",
        name: "HTML",
        textColor: "#E34F26",
        bgColor: "white",
      },
      {
        id: "7",
        name: "CSS",
        textColor: "#2965F1",
        bgColor: "white",
      },
      {
        id: "8",
        name: "Node.js",
        textColor: "#339933",
        bgColor: "white",
      },
      {
        id: "9",
        name: "Express.js",
        textColor: "#000000",
        bgColor: "white",
      },
      {
        id: "10",
        name: "Python",
        textColor: "#3776AB",
        bgColor: "white",
      },
      {
        id: "11",
        name: "Django",
        textColor: "#092E20",
        bgColor: "white",
      },
      {
        id: "12",
        name: "Flask",
        textColor: "#000000",
        bgColor: "white",
      },
      {
        id: "13",
        name: "Java",
        textColor: "#007396",
        bgColor: "white",
      },
      {
        id: "14",
        name: "Spring Boot",
        textColor: "#6DB33F",
        bgColor: "white",
      },
      {
        id: "15",
        name: "Ruby",
        textColor: "#CC342D",
        bgColor: "white",
      },
      {
        id: "16",
        name: "Ruby on Rails",
        textColor: "#CC0000",
        bgColor: "white",
      },
      {
        id: "17",
        name: "PHP",
        textColor: "#777BB4",
        bgColor: "white",
      },
      {
        id: "18",
        name: "Laravel",
        textColor: "#FF2D20",
        bgColor: "white",
      },
      {
        id: "19",
        name: "C#",
        textColor: "#239120",
        bgColor: "white",
      },
      {
        id: "20",
        name: "ASP.NET",
        textColor: "#512BD4",
        bgColor: "white",
      },
      {
        id: "21",
        name: "Go",
        textColor: "#00ADD8",
        bgColor: "white",
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
