"use strict";

import dotenv from "dotenv";
import Sequelize, { DataTypes } from "sequelize";

import createUserModel from "./User.js";
import createAdminModel from "./Admin.js";

dotenv.config();

const db = {};

const dbConnection = process.env.DB_CONNECTION;
const appEnv = process.env.APP_ENV;
// eslint-disable-next-line no-console
const logging = appEnv === "development" ? console.log : false;
const dbName = process.env.DB_NAME;

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbHost = process.env.DB_HOST;
const dbPort = process.env.DB_PORT;

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  dialect: dbConnection,
  host: dbHost,
  port: dbPort,
  logging,
});

const User = createUserModel(sequelize, DataTypes);

db[User.name] = User;
const Admin = createAdminModel(sequelize, DataTypes);

db[Admin.name] = Admin;

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
export { sequelize, Sequelize, User, Admin };
