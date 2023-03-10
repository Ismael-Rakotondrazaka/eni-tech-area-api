"use strict";
import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class ChallengeAnswer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // eslint-disable-next-line no-unused-vars
    static associate(models) {
      // define association here
      models.ChallengeAnswer.belongsTo(models.Challenge, {
        foreignKey: "challengeId",
      });
    }
  }

  ChallengeAnswer.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
      },
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
        allowNull: false,
      },
      challengeId: {
        type: DataTypes.INTEGER,
        references: {
          model: "challenges",
          key: "id",
        },
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        defaultValue: "pending",
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "ChallengeAnswer",
      tableName: "challengeAnswers",
      timestamps: true,
    }
  );

  return ChallengeAnswer;
};
