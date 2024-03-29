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
        allowNull: false,
      },
      tagId: {
        type: DataTypes.INTEGER,
        references: {
          model: "tags",
          key: "id",
        },
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
