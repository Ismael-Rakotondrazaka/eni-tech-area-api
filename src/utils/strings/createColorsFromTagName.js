import tinycolor from "tinycolor2";
import { tagConfig } from "../../configs/index.js";

const createColorsFromTagName = (tagName) => {
  const defaultColor = tagConfig.DEFAULT_COLORS[tagName];

  let bgColor;
  let textColor;

  if (defaultColor) {
    bgColor = defaultColor.bgColor;
    textColor = defaultColor.textColor;
  } else {
    const randomColor = tinycolor.random();
    bgColor = randomColor.toHexString();
    textColor = randomColor.isLight() ? "#000" : "#fff";
  }

  return {
    bgColor,
    textColor,
  };
};

export { createColorsFromTagName };
