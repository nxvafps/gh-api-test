require("dotenv").config();
const axios = require("axios");

const headers = {
  Authorization: `token ${process.env.GITHUB_PERSONAL_ACCESS_TOKEN}`,
  Accept: "application/vnd.github.v3+json",
};

const fetchMergedPullRequests = async (
  owner,
  repo,
  fromDate = null,
  toDate = null
) => {
  let url = `https://api.github.com/repos/${owner}/${repo}/pulls?state=closed`;

  const response = await axios.get(url, { headers });
  let prs = response.data.filter((pr) => pr.merged_at !== null);

  if (fromDate || toDate) {
    prs = prs.filter((pr) => {
      const mergedDate = new Date(pr.merged_at);
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

const fetchCommitsForPullRequest = async (owner, repo, pullNumber) => {
  const url = `https://api.github.com/repos/${owner}/${repo}/pulls/${pullNumber}/commits`;
  const response = await axios.get(url, { headers });
  return response.data;
};

const fetchCommitDetails = async (owner, repo, commitSha) => {
  const url = `https://api.github.com/repos/${owner}/${repo}/commits/${commitSha}`;
  const response = await axios.get(url, { headers });
  return response.data;
};

const calculateChangesPerUser = async (
  owner,
  repo,
  fromDate = null,
  toDate = null
) => {
  const mergedPRs = await fetchMergedPullRequests(
    owner,
    repo,
    fromDate,
    toDate
  );
  const userContributions = {};

  for (const pr of mergedPRs) {
    const commits = await fetchCommitsForPullRequest(owner, repo, pr.number);

    for (const commit of commits) {
      const details = await fetchCommitDetails(owner, repo, commit.sha);
      const username = commit.author?.login || commit.commit.author.name;

      if (!userContributions[username]) {
        userContributions[username] = { additions: 0, deletions: 0, total: 0 };
      }

      userContributions[username].additions += details.stats.additions;
      userContributions[username].deletions += details.stats.deletions;
      userContributions[username].total += details.stats.total;
    }
  }

  return userContributions;
};

module.exports = {
  calculateChangesPerUser,
};
