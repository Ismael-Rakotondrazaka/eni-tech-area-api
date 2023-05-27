import { faker } from "@faker-js/faker";

export const createRadomColor = () =>
  faker.helpers.arrayElement([
    "dark",
    "gray",
    "red",
    "pink",
    "grape",
    "violet",
    "indigo",
    "blue",
    "cyan",
    "green",
    "lime",
    "yellow",
    "orange",
    "teal",
  ]);
