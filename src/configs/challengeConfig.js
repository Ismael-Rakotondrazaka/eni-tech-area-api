const challengeConfig = {
  CHALLENGE_STATUS: ["success", "failure", "pending"],
  CHALLENGE_STATUS_ITEM: {
    SUCCESS: "success",
    FAILURE: "failure",
    PENDING: "pending",
  },
  DEFAULT_CHALLENGE_STATUS: "pending",
  CHALLENGE_STATUS_CUSTOMIZABLE: ["success", "failure"],
  CHALLENGE_DIFFICULTIES: ["easy", "medium", "difficult"],
  CHALLENGE_DIFFICULTY: {
    EASY: "easy",
    MEDIUM: "medium",
    DIFFICULT: "difficult",
  },
  CHALLENGE_DIFFICULTY_POINT: {
    EASY: 5,
    MEDIUM: 10,
    DIFFICULT: 15,
  },
};

export { challengeConfig };
