"use strict";
import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class ChallengeTag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // eslint-disable-next-line no-unused-vars
    static associate(models) {
      // define association here
      models.ChallengeTag.belongsTo(models.Challenge, {
        as: "ChallengeTag",
        foreignKey: "challengeId",
      });
    }
  }
  ChallengeTag.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
      },
      challengeId: {
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
      modelName: "ChallengeTag",
      tableName: "challengeTags",
      timestamps: true,
    }
  );

  return ChallengeTag;
};
