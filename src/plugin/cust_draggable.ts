module.exports = function ({ addUtilities }) {
  addUtilities({
    ".draggable": {
      "-webkit-app-region": "drag",
    },
  });
};
