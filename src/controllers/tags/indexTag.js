import { Tag } from "../../models/index.js";
import { tagCollection } from "../../resources/index.js";
import { createDataResponse } from "../../utils/index.js";

const indexTag = async (req, res, next) => {
  try {
    const tags = await Tag.findAll();

    const tagsCollections = tagCollection(tags);

    const data = {
      tags: tagsCollections,
    };

    res.status(200).json(createDataResponse({ data, request: req }));
  } catch (error) {
    next(error);
  }
};

export { indexTag };
