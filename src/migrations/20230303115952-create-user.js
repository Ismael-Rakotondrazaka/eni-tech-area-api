"use strict";
/** @type {import('sequelize-cli').Migration} */
export const up = async (queryInterface, Sequelize) => {
  await queryInterface.createTable("users", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    provider: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    providerId: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    firstname: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    lastname: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    description: {
      allowNull: true,
      type: Sequelize.STRING,
    },
    imageUrl: {
      allowNull: true,
      type: Sequelize.STRING,
    },
    channelId: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    email: {
      allowNull: false,
      type: Sequelize.STRING,
      unique: true,
    },
    gender: {
      type: Sequelize.STRING,
      required: false,
    },
    password: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  });
};
export const down = async (queryInterface) => {
  await queryInterface.dropTable("users");
};
