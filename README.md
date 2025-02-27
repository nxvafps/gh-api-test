# GitHub PR Statistics

This Node.js application fetches and analyzes pull request statistics from GitHub repositories, including merged PRs and commit statistics per user.

## Features

- Fetch merged pull requests from a repository
- Calculate changes (additions, deletions, total) per user
- Detailed commit analysis for each pull request
- Filter pull requests by date range

## Prerequisites

- Node.js (v12 or higher)
- npm (Node Package Manager)
- GitHub Personal Access Token

## Setup

1. Clone this repository:

   ```bash
   git clone https://github.com/nxvafps/gh-api-test.git
   cd gh-api-test
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory:
   ```bash
   GITHUB_PERSONAL_ACCESS_TOKEN=your_token_here
   ```

## How to Obtain a GitHub Personal Access Token

1. Go to GitHub.com and sign in to your account
2. Click on your profile picture in the top right corner
3. Go to `Settings`
4. Scroll down to `Developer settings` (at the bottom of the left sidebar)
5. Click on `Personal access tokens` → `Tokens (classic)`
6. Click `Generate new token` → `Generate new token (classic)`
7. Give your token a descriptive name
8. Select the following scopes:
   - `repo` (Full control of private repositories)
9. Click `Generate token`
10. **Important**: Copy the token immediately and store it safely. You won't be able to see it again!

## Usage

Modify the example usage in `index.js` with your target repository details. You can filter pull requests by date:

```javascript
// Get all contributions
calculateChangesPerUser("owner", "repo").then((contributions) => {
  console.log("All time contributions:", contributions);
});

// Get contributions since a specific date
calculateChangesPerUser("owner", "repo", "2023-01-01").then((contributions) => {
  console.log("Contributions since Jan 1, 2023:", contributions);
});

// Get contributions between two dates
calculateChangesPerUser("owner", "repo", "2023-01-01", "2023-12-31").then(
  (contributions) => {
    console.log("Contributions in 2023:", contributions);
  }
);
```

Then run the application:

```bash
node index.js
```

Date parameters should be provided in a format that JavaScript's Date constructor can parse (e.g., YYYY-MM-DD).

## Output

The application will output an object containing statistics for each user who has contributed to the repository through merged pull requests, including:

- Number of additions
- Number of deletions
- Total changes

## Environment Variables

- `GITHUB_PERSONAL_ACCESS_TOKEN`: Your GitHub personal access token

## License

ISC
