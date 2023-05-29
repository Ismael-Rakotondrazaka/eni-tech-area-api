"use strict";
import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class Vote extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // eslint-disable-next-line no-unused-vars
    static associate(models) {
      // define association here
      models.Vote.belongsTo(models.Answer, {
        foreignKey: "answerId",
      });
    }
  }

  Vote.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
      },
      answerId: {
        type: DataTypes.INTEGER,
        references: {
          model: "answers",
          key: "id",
        },
        allowNull: false,
        onDelete: "CASCADE",
      },
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Vote",
      tableName: "votes",
      timestamps: true,
    }
  );

  return Vote;
};
