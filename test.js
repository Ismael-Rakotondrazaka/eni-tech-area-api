import { createAccessToken } from "./src/utils/tokens/createAccessToken.js";
import { hashPassword } from "./src/utils/strings/hashPassword.js";

console.log(
  createAccessToken({
    user: {
      id: 1,
      name: {
        first: "John",
        last: "Doe",
        fullName: "John Doe",
      },
      role: "student",
      email: "nichola@yahoo.com",
      matricula: 630,
    },
  })
);

console.log(hashPassword("password"));