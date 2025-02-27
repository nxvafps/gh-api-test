# GitHub PR Contribution Counter

A TypeScript application that calculates and summarizes code contributions per user across merged pull requests in a GitHub repository.

## Features

- Fetches all merged pull requests from a specified repository
- Calculates lines added, deleted, and total changes per user
- Supports filtering by date range
- Uses GitHub's REST API
- Written in TypeScript with full type safety

## Prerequisites

- Node.js (v14 or higher recommended)
- npm
- GitHub Personal Access Token

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory with your GitHub token:
   ```
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

Run the application with:

```bash
npm start
```

To use in your own code:

```typescript
import { calculateChangesPerUser } from "./github-api";

// Basic usage
calculateChangesPerUser("owner", "repo").then((contributions) =>
  console.log(contributions)
);

// With date range
calculateChangesPerUser("owner", "repo", "2024-01-01", "2024-12-31").then(
  (contributions) => console.log(contributions)
);
```

## Output Format

The tool returns an object with user contributions in the following format:

```typescript
{
  "username": {
    additions: number,
    deletions: number,
    total: number
  }
}
```

## Available Scripts

- `npm start` - Compiles TypeScript and runs the application
- `npm run build` - Compiles TypeScript files

## Types

The project exports the following TypeScript interfaces:

- `UserContributions` - Contribution statistics per user
- `PullRequest` - GitHub pull request information
- `Commit` - Git commit information
- `CommitDetails` - Detailed commit statistics

## License

ISC
