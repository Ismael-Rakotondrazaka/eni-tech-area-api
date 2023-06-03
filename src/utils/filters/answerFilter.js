import { BaseFilter } from "./baseFilter.js";

class AnswerFilter extends BaseFilter {
  safeParams = {
    questionId: ["eq"],
  };

  getAnswerFilters(req) {
    // eslint-disable-next-line no-unused-vars
    const { tags, ...sequelizeQueries } = this.tranform(req);
    return {
      ...(sequelizeQueries ?? null),
    };
  }
}

const answerFilter = new AnswerFilter();
export { AnswerFilter, answerFilter };
