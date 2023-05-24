import { NotFoundError } from "./errors/index.js";

export const getPagination = (totalItems, size, page) => {
  const totalPage = Math.ceil(totalItems / size);

  if (totalPage < page) {
    throw new NotFoundError({ message: "Page out of range" });
  }

  return {
    totalItems,
    totalPage,
    next: page + 1 > totalPage ? null : page + 1,
    previous: page === 1 ? null : page - 1,
  };
};
