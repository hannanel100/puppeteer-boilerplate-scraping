const createCsvWriter = require("csv-writer").createObjectCsvWriter;

const csvWriter = createCsvWriter({
  path: "./specs.csv",
  header: [
    { id: "spec", title: "Spec Name" },
    { id: "flameRev", title: "Flame Rev" },
    { id: "actualRev", title: "Actual Rev" },
  ],
});

module.exports = csvWriter;
