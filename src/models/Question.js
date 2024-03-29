"use strict";
import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class Question extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // eslint-disable-next-line no-unused-vars
    static associate(models) {
      // define association here
      models.Question.hasMany(models.QuestionTag, {
        foreignKey: "questionId",
      });

      models.Question.hasMany(models.Answer, {
        foreignKey: "questionId",
      });

      models.Question.belongsToMany(models.Tag, {
        through: models.QuestionTag,
        // as: "UserQuestionTag",
        foreignKey: "questionId",
        otherKey: "tagId",
      });
    }
  }

  Question.init(
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
    },
    {
      sequelize,
      modelName: "Question",
      tableName: "questions",
      timestamps: true,
    }
  );

  return Question;
};
