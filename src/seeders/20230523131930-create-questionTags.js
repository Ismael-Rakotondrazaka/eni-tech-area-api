"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      "questionTags",
      [
        {
          id: 1,
          questionId: 8,
          tagId: 3,
        },
        {
          id: 2,
          questionId: 14,
          tagId: 7,
        },
        {
          id: 3,
          questionId: 5,
          tagId: 2,
        },
        {
          id: 4,
          questionId: 11,
          tagId: 9,
        },
        {
          id: 5,
          questionId: 2,
          tagId: 6,
        },
        {
          id: 6,
          questionId: 10,
          tagId: 4,
        },
        {
          id: 7,
          questionId: 7,
          tagId: 1,
        },
        {
          id: 8,
          questionId: 13,
          tagId: 5,
        },
        {
          id: 9,
          questionId: 3,
          tagId: 8,
        },
        {
          id: 10,
          questionId: 16,
          tagId: 10,
        },
        {
          id: 11,
          questionId: 9,
          tagId: 3,
        },
        {
          id: 12,
          questionId: 12,
          tagId: 7,
        },
        {
          id: 13,
          questionId: 6,
          tagId: 2,
        },
        {
          id: 14,
          questionId: 15,
          tagId: 9,
        },
        {
          id: 15,
          questionId: 4,
          tagId: 6,
        },
        {
          id: 16,
          questionId: 1,
          tagId: 4,
        },
        {
          id: 17,
          questionId: 16,
          tagId: 1,
        },
        {
          id: 18,
          questionId: 8,
          tagId: 5,
        },
        {
          id: 19,
          questionId: 2,
          tagId: 8,
        },
        {
          id: 20,
          questionId: 10,
          tagId: 10,
        },
      ],
      {}
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("questionTags", null, {});
  },
};
