"use strict";

import dotenv from "dotenv";
import Sequelize, { DataTypes } from "sequelize";

import createUserModel from "./User.js";
import createAnswerModel from "./Answer.js";
import createCommentModel from "./Comment.js";
import createNotificationModel from "./Notification.js";
import createQuestionModel from "./Question.js";
import createQuestionTagModel from "./QuestionTag.js";
import createUserTagModel from "./UserTag.js";
import createVoteModel from "./Vote.js";
import createChallengeModel from "./Challenge.js";
import createChallengeAnswerModel from "./ChallengeAnswer.js";

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
const Answer = createAnswerModel(sequelize, DataTypes);
const Comment = createCommentModel(sequelize, DataTypes);
const Notification = createNotificationModel(sequelize, DataTypes);
const Question = createQuestionModel(sequelize, DataTypes);
const QuestionTag = createQuestionTagModel(sequelize, DataTypes);
const UserTag = createUserTagModel(sequelize, DataTypes);
const Vote = createVoteModel(sequelize, DataTypes);
const Challenge = createChallengeModel(sequelize, DataTypes);
const ChallengeAnswer = createChallengeAnswerModel(sequelize, DataTypes);

db[User.name] = User;
db[Answer.name] = Answer;
db[Comment.name] = Comment;
db[Notification.name] = Notification;
db[Question.name] = Question;
db[QuestionTag.name] = QuestionTag;
db[UserTag.name] = UserTag;
db[Vote.name] = Vote;
db[Challenge.name] = Challenge;
db[ChallengeAnswer.name] = ChallengeAnswer;

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
export {
  sequelize,
  Sequelize,
  User,
  Answer,
  Comment,
  Notification,
  Question,
  QuestionTag,
  UserTag,
  Vote,
  Challenge,
  ChallengeAnswer
};
