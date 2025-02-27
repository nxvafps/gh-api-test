import "dotenv/config";
import { calculateChangesPerUser, UserCommitContributions } from "./github-api";
import cron from "node-cron";

cron.schedule("* * * * *", async () => {
  try {
    const contributions: UserCommitContributions =
      await calculateChangesPerUser("nxvafps", "pr-test-repo");
    console.log(
      `[${new Date().toISOString()}] Contributions per user:`,
      contributions
    );
  } catch (error) {
    console.log(
      `[${new Date().toISOString()}] Error fetching contributions:`,
      error
    );
  }
});

console.log(`Cron job started.`);
// calculateChangesPerUser("nxvafps", "pr-test-repo")
//   .then((contributions: UserContributions) => {
//     console.log("Contributions per user:", contributions);
//   })
//   .catch((error: Error) => {
//     console.error("Error fetching contributions:", error);
//   });
