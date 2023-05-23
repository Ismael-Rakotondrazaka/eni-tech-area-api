"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      "answers",
      [
        {
          id: 1,
          userId: 4,
          questionId: 8,
          content:
            "You can use the useEffect hook to handle side effects in React.",
        },
        {
          id: 2,
          userId: 7,
          questionId: 14,
          content:
            "One of the best practices for API authentication is to use HTTPS and secure your endpoints with tokens.",
        },
        {
          id: 3,
          userId: 2,
          questionId: 5,
          content:
            "To optimize performance in a Node.js application, you can use techniques like caching and optimizing database queries.",
        },
        {
          id: 4,
          userId: 9,
          questionId: 11,
          content:
            "Django provides various deployment options, including using platforms like Heroku or deploying to your own server using Nginx and Gunicorn.",
        },
        {
          id: 5,
          userId: 3,
          questionId: 2,
          content:
            "TypeScript offers advantages such as static typing, better tooling, and improved code maintainability.",
        },
        {
          id: 6,
          userId: 10,
          questionId: 10,
          content:
            "In Express.js, you can use middleware functions and the error handling middleware to handle errors gracefully.",
        },
        {
          id: 7,
          userId: 6,
          questionId: 7,
          content:
            "SQL databases follow a structured schema and are suitable for complex queries, while NoSQL databases provide flexibility and scalability.",
        },
        {
          id: 8,
          userId: 1,
          questionId: 13,
          content:
            "Redux helps manage the state of a React application, provides a predictable state container, and enables efficient state updates.",
        },
        {
          id: 9,
          userId: 8,
          questionId: 3,
          content:
            "You can use tools like performance profiling and load testing to identify performance bottlenecks in your Node.js application.",
        },
        {
          id: 10,
          userId: 5,
          questionId: 16,
          content:
            "To handle asynchronous operations in JavaScript, you can use async/await, Promises, or callback functions.",
        },
        {
          id: 11,
          userId: 4,
          questionId: 8,
          content:
            "Another way to handle side effects in React is to use the useLayoutEffect hook, which runs synchronously after all DOM mutations.",
        },
        {
          id: 12,
          userId: 7,
          questionId: 14,
          content:
            "Implementing API authentication with JWT involves issuing tokens upon successful login and including them in subsequent requests for authorization.",
        },
        {
          id: 13,
          userId: 2,
          questionId: 5,
          content:
            "You can use performance monitoring tools like New Relic or profiling tools like Chrome DevTools to analyze and optimize your Node.js application.",
        },
        {
          id: 14,
          userId: 9,
          questionId: 11,
          content:
            "The deployment process for a Django application includes configuring the production environment, setting up the database, and handling static files.",
        },
        {
          id: 15,
          userId: 3,
          questionId: 2,
          content:
            "TypeScript provides type checking during development, which helps catch errors early and improves code reliability.",
        },
        {
          id: 16,
          userId: 10,
          questionId: 10,
          content:
            "Express.js allows you to define custom error handlers to handle different types of errors in your application.",
        },
        {
          id: 17,
          userId: 6,
          questionId: 7,
          content:
            "MongoDB is a popular NoSQL database that offers scalability and flexibility for handling large amounts of unstructured data.",
        },
        {
          id: 18,
          userId: 1,
          questionId: 13,
          content:
            "Redux simplifies state management by introducing a single source of truth and enabling predictable updates through reducers.",
        },
        {
          id: 19,
          userId: 8,
          questionId: 3,
          content:
            "Node.js offers non-blocking I/O and event-driven architecture, making it suitable for building scalable and high-performance applications.",
        },
        {
          id: 20,
          userId: 5,
          questionId: 16,
          content:
            "You can handle asynchronous operations in JavaScript using libraries like Axios for making API requests or using the fetch API.",
        },
      ],

      {}
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("answers", null, {});
  },
};
