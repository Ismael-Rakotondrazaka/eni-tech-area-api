import { BaseFilter } from "./baseFilter.js";

class QuestionFilter extends BaseFilter {
  safeParams = {
    title: ["eq", "like"],
    tags: ["in"],
  };

  getQuestionTagFilters(req) {
    const sequelizeQueries = this.tranform(req);

    if (!sequelizeQueries.tags) return null;

    return {
      id: { ...sequelizeQueries.tags },
    };
  }

  getQuestionFilters(req) {
    // eslint-disable-next-line no-unused-vars
    const { tags, ...sequelizeQueries } = this.tranform(req);
    return {
      ...(sequelizeQueries ?? null),
    };
  }
}

export default new QuestionFilter();
