"use strict";
import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class Tag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // eslint-disable-next-line no-unused-vars
    static associate(models) {
      // define association here
      models.Tag.belongsToMany(models.User, {
        through: models.UserTag,
        // as: "UserQuestionTag",
        foreignKey: "tagId",
        otherKey: "userId",
      });

      models.Tag.belongsToMany(models.Question, {
        through: models.QuestionTag,
        // as: "UserQuestionTag",
        foreignKey: "tagId",
        otherKey: "questionId",
      });
    }
  }
  Tag.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      bgColor: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      textColor: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Tag",
      tableName: "tags",
      timestamps: true,
    }
  );

  return Tag;
};
