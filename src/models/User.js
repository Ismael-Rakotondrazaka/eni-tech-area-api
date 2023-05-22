"use strict";
import { Model } from "sequelize";

import { ServerError } from "../utils/errors/index.js";

export default (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // eslint-disable-next-line no-unused-vars
    static associate(models) {
      // define association here
      models.User.hasMany(models.Answer, {
        foreignKey: "userId",
      });

      models.User.hasMany(models.UserTag, {
        foreignKey: "userId",
      });

      models.User.hasMany(models.Vote, {
        foreignKey: "userId",
      });

      models.User.hasMany(models.Notification, {
        foreignKey: "userId",
      });

      models.User.hasMany(models.Comment, {
        foreignKey: "userId",
      });

      models.User.hasMany(models.Challenge, {
        foreignKey: "userId",
      });

      models.User.belongsToMany(models.Tag, {
        through: models.UserTag,
        // as: "UserQuestionTag",
        foreignKey: "userId",
        otherKey: "tagId",
      });

      models.User.belongsToMany(models.Tag, {
        through: models.UserTag,
        // as: "UserQuestionTag",
        foreignKey: "userId",
        otherKey: "tagId",
      });
    }
  }
  User.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
      },
      matricula: {
        type: DataTypes.INTEGER,
        allowNull: true, // We may not need it anymore because the app is used by anyone
        // unique: true,
      },
      firstname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      fullname: {
        type: DataTypes.VIRTUAL,
        get() {
          return `${this.firstname} ${this.lastname}`;
        },
        set() {
          throw new ServerError({
            message: "Do not try to set the 'fullname' value.",
            isPrivate: true,
            code: "E1_2",
          });
        },
      },
      gender: {
        type: DataTypes.STRING,
        allowNull: true, // We give to the user the ability to complete his profile later
      },
      email: {
        field: "email",
        type: DataTypes.STRING,
        /**
         * ! it's a constraint, not a validation. So error comes from the database
         * ! and the database try to insert data before the constraint is applied
         */
        unique: true,
        allowNull: false,
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      level: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      channelId: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      imageUrl: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "users",
      timestamps: true,
    }
  );

  return User;
};
