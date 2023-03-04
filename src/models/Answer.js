"use strict";
import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class Answer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // eslint-disable-next-line no-unused-vars
    static associate(models) {
      // define association here
      models.Answer.hasMany(models.Comment, {
        foreignKey: "answerId",
      });

      models.Answer.belongsTo(models.Question, {
        foreignKey: "questionId",
      });
    }
  }

  Answer.init(
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
      questionId: {
        type: DataTypes.INTEGER,
        references: {
          model: "questions",
          key: "id",
        },
      },
      content: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Answer",
      tableName: "answers",
      timestamps: true,
    }
  );

  return Answer;
};
