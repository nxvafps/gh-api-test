import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

interface PullRequest {
  number: number;
  merged_at: string | null;
}

interface Commit {
  sha: string;
  author?: {
    login: string;
  };
  commit: {
    author: {
      name: string;
      date: string;
    };
  };
}

interface CommitDetails {
  stats: {
    additions: number;
    deletions: number;
    total: number;
  };
}

interface UserContributions {
  [username: string]: {
    additions: number;
    deletions: number;
    total: number;
  };
}

interface UserCommitContributions {
  [username: string]: Array<{
    additions: number;
    deletions: number;
    total: number;
    commitSha: string;
    date: string;
  }>;
}

const headers = {
  Authorization: `token ${process.env.GITHUB_PERSONAL_ACCESS_TOKEN}`,
  Accept: "application/vnd.github.v3+json",
};

const fetchMergedPullRequests = async (
  owner: string,
  repo: string,
  fromDate: string | null = null,
  toDate: string | null = null
): Promise<PullRequest[]> => {
  let url = `https://api.github.com/repos/${owner}/${repo}/pulls?state=closed`;

  const response = await axios.get<PullRequest[]>(url, { headers });
  let prs = response.data.filter((pr) => pr.merged_at !== null);

  if (fromDate || toDate) {
    prs = prs.filter((pr) => {
      const mergedDate = new Date(pr.merged_at!);
      if (fromDate && toDate) {
        return (
          mergedDate >= new Date(fromDate) && mergedDate <= new Date(toDate)
        );
      } else if (fromDate) {
        return mergedDate >= new Date(fromDate);
      }
      return true;
    });
  }

  return prs;
};

const fetchCommitsForPullRequest = async (
  owner: string,
  repo: string,
  pullNumber: number
): Promise<Commit[]> => {
  const url = `https://api.github.com/repos/${owner}/${repo}/pulls/${pullNumber}/commits`;
  const response = await axios.get<Commit[]>(url, { headers });
  return response.data;
};

const fetchCommitDetails = async (
  owner: string,
  repo: string,
  commitSha: string
): Promise<CommitDetails> => {
  const url = `https://api.github.com/repos/${owner}/${repo}/commits/${commitSha}`;
  const response = await axios.get<CommitDetails>(url, { headers });
  return response.data;
};

const calculateChangesPerUser = async (
  owner: string,
  repo: string,
  fromDate: string | null = null,
  toDate: string | null = null
): Promise<UserCommitContributions> => {
  const mergedPRs = await fetchMergedPullRequests(
    owner,
    repo,
    fromDate,
    toDate
  );
  const userContributions: UserCommitContributions = {};

  for (const pr of mergedPRs) {
    const commits = await fetchCommitsForPullRequest(owner, repo, pr.number);

    for (const commit of commits) {
      const details = await fetchCommitDetails(owner, repo, commit.sha);
      const username = commit.author?.login || commit.commit.author.name;

      if (!userContributions[username]) {
        userContributions[username] = [];
      }

      userContributions[username].push({
        additions: details.stats.additions,
        deletions: details.stats.deletions,
        total: details.stats.total,
        commitSha: commit.sha,
        date: commit.commit.author.date,
      });
    }
  }

  return userContributions;
};

export {
  calculateChangesPerUser,
  // Adding type exports for potential consumers
  UserContributions,
  PullRequest,
  Commit,
  CommitDetails,
  UserCommitContributions,
};
