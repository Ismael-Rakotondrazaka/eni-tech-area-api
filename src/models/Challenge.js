"use strict";
import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class Challenge extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // eslint-disable-next-line no-unused-vars
    static associate(models) {
      // define association here
      models.Challenge.hasMany(models.ChallengeAnswer, {
        foreignKey: "challengeId",
      });

      models.Question.hasMany(models.ChallengeTag, {
        foreignKey: "challengeId",
      });

      models.Challenge.belongsTo(models.User, {
        foreignKey: "userId",
      });

      models.Challenge.belongsToMany(models.Tag, {
        through: models.ChallengeTag,
        // as: "UserQuestionTag",
        foreignKey: "questionId",
        otherKey: "tagId",
      });
    }
  }

  Challenge.init(
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
      },
      title: {
        type: DataTypes.TEXT,
        required: true,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      endAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Challenge",
      tableName: "challenges",
      timestamps: true,
    }
  );

  return Challenge;
};
