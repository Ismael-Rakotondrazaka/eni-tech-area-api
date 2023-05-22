"use strict";
import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class UserTag extends Model {
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
  UserTag.init(
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
      tagId: {
        type: DataTypes.INTEGER,
        references: {
          model: "tags",
          key: "id",
        },
        allowNull: false,
      },
      questionScore: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      challengeScore: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      modelName: "UserTag",
      tableName: "userTags",
      timestamps: true,
    }
  );

  return UserTag;
};
