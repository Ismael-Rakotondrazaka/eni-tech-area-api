"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      "questions",
      [
        {
          id: 1,
          userId: 5,
          title: "How to use React Hooks?",
          content:
            "I'm new to React Hooks and I'm not sure how to get started. Can someone provide an example?",
        },
        {
          id: 2,
          userId: 1,
          title: "What are the best practices for API authentication?",
          content:
            "I'm building a web application that requires API authentication. What are the recommended best practices for implementing this?",
        },
        {
          id: 3,
          userId: 2,
          title: "How to optimize performance in a Node.js application?",
          content:
            "My Node.js application is experiencing performance issues. What are some techniques and tools I can use to optimize its performance?",
        },
        {
          id: 4,
          userId: 1,
          title: "How to deploy a Django application to a production server?",
          content:
            "I have developed a Django application and I'm ready to deploy it to a production server. What are the steps involved in the deployment process?",
        },
        {
          id: 5,
          userId: 3,
          title: "What are the advantages of using TypeScript over JavaScript?",
          content:
            "I'm considering using TypeScript for my next project. What are the benefits and advantages of using TypeScript instead of plain JavaScript?",
        },
        {
          id: 6,
          userId: 1,
          title: "How to handle errors in an Express.js application?",
          content:
            "I'm building a REST API using Express.js and I want to implement error handling. What is the recommended approach for handling errors in Express.js?",
        },
        {
          id: 7,
          userId: 6,
          title: "What is the difference between SQL and NoSQL databases?",
          content:
            "I'm trying to understand the differences between SQL and NoSQL databases. Can someone explain the key distinctions between the two?",
        },
        {
          id: 8,
          userId: 1,
          title: "How to create responsive web design with CSS?",
          content:
            "I want to make my website responsive so that it works well on different devices. What are the techniques and best practices for creating responsive web design using CSS?",
        },
        {
          id: 9,
          userId: 1,
          title:
            "What are the security considerations when developing a web application?",
          content:
            "I'm developing a web application and I want to ensure it is secure. What are the important security considerations I should keep in mind during the development process?",
        },
        {
          id: 10,
          userId: 7,
          title: "How to implement data validation in a Node.js application?",
          content:
            "I need to validate user input in my Node.js application. What are the recommended approaches for implementing data validation?",
        },
        {
          id: 11,
          userId: 9,
          title: "What are the key features of React Native?",
          content:
            "I'm considering using React Native for mobile app development. What are the main features and advantages of React Native compared to other frameworks?",
        },
        {
          id: 12,
          userId: 4,
          title: "How to handle asynchronous operations in JavaScript?",
          content:
            "I'm struggling with managing asynchronous operations in JavaScript. What are the different techniques and patterns for handling async code?",
        },
        {
          id: 13,
          userId: 1,
          title: "What are the benefits of using Redux in a React application?",
          content:
            "I'm curious about integrating Redux into my React application. What are the advantages and benefits of using Redux for state management?",
        },
        {
          id: 14,
          userId: 1,
          title: "How to secure a REST API using JSON Web Tokens (JWT)?",
          content:
            "I'm building a REST API and I want to secure it using JSON Web Tokens (JWT). What are the steps involved in implementing JWT-based authentication?",
        },
        {
          id: 15,
          userId: 1,
          title:
            "What are the different types of testing in software development?",
          content:
            "I want to learn about the various types of testing used in software development. Can someone provide an overview of the different types and their purposes?",
        },
        {
          id: 16,
          userId: 1,
          title: "How to handle form validation in React?",
          content:
            "I'm building a form in a React application and I need to implement validation. What libraries or techniques can I use to handle form validation in React?",
        },
      ],
      {}
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("questions", null, {});
  },
};
