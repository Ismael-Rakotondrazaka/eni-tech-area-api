const createBadge = (score) => {
  if (score < 100 || score === 0) {
    return null;
  } else if (score >= 100 && score < 250) {
    return "bronze";
  } else if (score >= 250 && score <= 500) {
    return "silver";
  } else return "gold";
};

export { createBadge };
