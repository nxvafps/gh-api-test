require("dotenv").config();
const { calculateChangesPerUser } = require("./github-api");

calculateChangesPerUser("nxvafps", "pr-test-repo").then((contributions) => {
  console.log("Contributions per user:", contributions);
});
