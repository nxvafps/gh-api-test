import "dotenv/config";
import { calculateChangesPerUser, UserContributions } from "./github-api";

calculateChangesPerUser("nxvafps", "pr-test-repo")
  .then((contributions: UserContributions) => {
    console.log("Contributions per user:", contributions);
  })
  .catch((error: Error) => {
    console.error("Error fetching contributions:", error);
  });
