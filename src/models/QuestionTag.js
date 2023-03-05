"use strict";
import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class QuestionTag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // eslint-disable-next-line no-unused-vars
    static associate(models) {
      // define association here
      models.QuestionTag.belongsTo(models.Question, {
        as: "QuestionTag",
        foreignKey: "questionId",
      });
    }
  }
  QuestionTag.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
      },
      questionId: {
        type: DataTypes.INTEGER,
        references: {
          model: "questions",
          key: "id",
        },
      },
      tagName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "QuestionTag",
      tableName: "questionTags",
      timestamps: true,
    }
  );

  return QuestionTag;
};
