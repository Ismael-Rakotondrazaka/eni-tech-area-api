import { Op } from "sequelize";

export class BaseFilter {
  safeParams = {};

  operatorMap = {
    eq: Op.eq,
    like: Op.like,
    in: Op.in,
    gt: Op.gt,
    gte: Op.gte,
    lt: Op.lt,
    lte: Op.lte,
  };

  tranform(req) {
    let sequelizeQueries = {};
    for (const param of Object.keys(this.safeParams)) {
      const query = req.query[param];

      if (!query) continue;

      for (const operator of this.safeParams[param]) {
        let q = query[operator];

        if (!q) continue;

        const mappedOperator = this.operatorMap[operator];

        if (param === "tags") {
          q = q.split(",");
        }

        sequelizeQueries = {
          ...sequelizeQueries,
          [param]: {
            [mappedOperator]: q,
          },
        };
      }
    }

    return sequelizeQueries;
  }
}
