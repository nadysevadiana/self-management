// utils/ScoreUtils.js
export const calculateScore = (answers) => {
    return Object.values(answers).reduce((acc, val) => acc + parseInt(val), 0);
  };
  