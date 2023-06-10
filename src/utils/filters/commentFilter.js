import { BaseFilter } from "./baseFilter.js";

class CommentFilter extends BaseFilter {
  safeParams = {
    answerId: ["eq"],
  };

  getCommentFilters(req) {
    // eslint-disable-next-line no-unused-vars
    const { tags, ...sequelizeQueries } = this.tranform(req);
    return {
      ...(sequelizeQueries ?? null),
    };
  }
}

const commentFilter = new CommentFilter();
export { CommentFilter, commentFilter };
