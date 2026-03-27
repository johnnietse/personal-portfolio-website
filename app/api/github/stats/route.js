import { NextResponse } from 'next/server';

export async function GET() {
  const token = process.env.GITHUB_TOKEN;

  if (!token) {
    return NextResponse.json({ error: 'GitHub Token Not Found' }, { status: 500 });
  }

  const query = `
    query {
      user(login: "johnnietse") {
        # Profile Data
        bio
        company
        location
        url
        followers { totalCount }
        following { totalCount }
        starredRepositories(first: 15, orderBy: {field: STARRED_AT, direction: DESC}) {
          totalCount
          nodes {
            name
            description
            url
            stargazerCount
            owner { login }
          }
        }
        
        # Organizations
        organizations(first: 10) {
          nodes {
            name
            login
            avatarUrl
            url
          }
        }
        
        # Core Stats 
        repoStats: repositories(first: 100, ownerAffiliations: [OWNER, ORGANIZATION_MEMBER]) {
          totalCount
          nodes {
            name
            isPrivate
            stargazerCount
            forkCount
            owner { login }
            languages(first: 10, orderBy: {field: SIZE, direction: DESC}) {
              edges {
                size
                node {
                  name
                  color
                }
              }
            }
          }
        }
        
        # Top repositories (Hall of Fame)
        topRepos: repositories(first: 12, ownerAffiliations: OWNER, orderBy: {field: STARGAZERS, direction: DESC}) {
          nodes {
            name
            isPrivate
            stargazerCount
            forkCount
            primaryLanguage { name }
            description
            url
            owner { login }
          }
        }

        # Contribution heatmap and breakdown 
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                color
                contributionCount
                date
              }
            }
          }
          totalCommitContributions
          totalIssueContributions
          totalPullRequestContributions
          totalPullRequestReviewContributions
          restrictedContributionsCount
        }

        # Activity Logic (For Terminal Feed)
        recentActivity: repositories(first: 20, ownerAffiliations: [OWNER, ORGANIZATION_MEMBER], orderBy: {field: UPDATED_AT, direction: DESC}) {
          nodes {
            name
            isPrivate
            owner { login }
            updatedAt
            defaultBranchRef {
              target {
                ... on Commit {
                  history(first: 3) {
                    nodes {
                      message
                      committedDate
                      abbreviatedOid
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  try {
    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });

    const data = await response.json();

    if (data.errors) {
      return NextResponse.json({ error: data.errors[0].message }, { status: 500 });
    }

    const user = data.data.user;

    // HIGH-LEVEL NDA PROTECTION LOGIC:
    // Any repository belonging to sensitized organizations or marked as private IS SCRUBBED.
    const isSensitized = (repo) => {
      const sensitizedOrgs = ['queens-autodrive', 'autodrive'];
      // Added safe navigation ?. to avoid TypeError if owner is missing
      return repo.isPrivate || (repo.owner?.login && sensitizedOrgs.includes(repo.owner.login.toLowerCase()));
    };

    const anonymizeName = (repo) => isSensitized(repo) ? "[RESTRICTED_ENGINEERING_NODE]" : repo.name;
    const anonymizeMessage = (repo) => isSensitized(repo) ? "COMMITTED_TO_RESTRICTED_INFRASTRUCTURE" : "";

    // Aggregate Language Data
    const languageMap = {};
    let totalSize = 0;
    user.repoStats.nodes.forEach(repo => {
      repo.languages.edges.forEach(edge => {
        const lang = edge.node.name;
        const color = edge.node.color;
        const size = edge.size;
        
        if (!languageMap[lang]) {
          languageMap[lang] = { name: lang, color: color, size: 0 };
        }
        languageMap[lang].size += size;
        totalSize += size;
      });
    });

    const languages = Object.values(languageMap)
      .sort((a, b) => b.size - a.size)
      .map(lang => ({
        ...lang,
        percentage: ((lang.size / totalSize) * 100).toFixed(2)
      }));

    // Flatten Recent Activity for Terminal (Strict NDA Enforcement)
    const activityLogs = [];
    user.recentActivity.nodes.forEach(repo => {
      if (repo.defaultBranchRef && repo.defaultBranchRef.target.history.nodes) {
        repo.defaultBranchRef.target.history.nodes.forEach(commit => {
          activityLogs.push({
            repo: anonymizeName(repo),
            message: isSensitized(repo) ? anonymizeMessage(repo) : commit.message,
            date: commit.committedDate,
            oid: commit.abbreviatedOid
          });
        });
      }
    });

    activityLogs.sort((a, b) => new Date(b.date) - new Date(a.date));

    // Engineering Velocity (Monthly Buckets)
    const monthlyVelocity = {};
    user.contributionsCollection.contributionCalendar.weeks.forEach(week => {
      week.contributionDays.forEach(day => {
        const date = new Date(day.date);
        const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        if (!monthlyVelocity[monthKey]) {
          monthlyVelocity[monthKey] = 0;
        }
        monthlyVelocity[monthKey] += day.contributionCount;
      });
    });

    const velocityData = Object.keys(monthlyVelocity)
      .sort()
      .map(month => ({
        label: month,
        value: monthlyVelocity[month]
      }));

    // Top repositories (IP Protected)
    const topRepos = user.topRepos.nodes
      .filter(repo => !isSensitized(repo))
      .slice(0, 5);

    // Kubernetes Upstream Intelligence
    const k8sIntelligence = [
      {
        project: "kubernetes-sigs/lws",
        impact: "Merged #763: Refactored structured logging in the controller. Resolved odd-argument log call bugs.",
        status: "MERGED",
        url: "https://github.com/kubernetes-sigs/lws/pull/763"
      },
      {
        project: "kubernetes-sigs/kubespray",
        impact: "PR #13090: Engineering environment prechecks for cgroup v1 compatibility within kubelet deployment.",
        status: "IN_REVIEW",
        url: "https://github.com/kubernetes-sigs/kubespray/pull/13090"
      },
      {
        project: "kubernetes-sigs/kubespray",
        impact: "PR #13073: Fixed functional bug ensuring node uncordoning post-cluster upgrade cycles.",
        status: "IN_REVIEW",
        url: "https://github.com/kubernetes-sigs/kubespray/pull/13073"
      }
    ];

    const stats = {
      profile: {
        bio: user.bio,
        company: user.company,
        location: user.location,
        followers: user.followers.totalCount,
        following: user.following.totalCount,
        starred: user.starredRepositories.totalCount,
        url: user.url,
        organizations: user.organizations.nodes,
        isK8sContributor: true
      },
      achievements: [
        { name: "Pull Shark", icon: "Shark", description: "PR_HANDSHAKE_MASTER" },
        { name: "Quickdraw", icon: "Target", description: "ISSUE_RESOLUTION_VELOCITY" }
      ],
      starredStreams: user.starredRepositories.nodes
        .filter(repo => {
          const sensitizedOrgs = ['queens-autodrive', 'autodrive'];
          return !(repo.owner?.login && sensitizedOrgs.includes(repo.owner.login.toLowerCase()));
        })
        .map(repo => ({
          name: repo.name,
          owner: repo.owner?.login || "UNKNOWN",
          stars: repo.stargazerCount,
          url: repo.url,
          description: repo.description
        })),
      totalRepos: user.repoStats.totalCount,
      totalStars: user.repoStats.nodes.reduce((acc, node) => acc + node.stargazerCount, 0),
      totalContributions: user.contributionsCollection.contributionCalendar.totalContributions,
      restrictedContributions: user.contributionsCollection.restrictedContributionsCount,
      totalCommits: user.contributionsCollection.totalCommitContributions,
      totalIssues: user.contributionsCollection.totalIssueContributions,
      totalPRs: user.contributionsCollection.totalPullRequestContributions,
      totalReviews: user.contributionsCollection.totalPullRequestReviewContributions,
      contributionCalendar: user.contributionsCollection.contributionCalendar,
      languages: languages,
      topRepos: topRepos,
      k8sIntelligence: k8sIntelligence,
      activityLogs: activityLogs.slice(0, 15),
      velocityData: velocityData.slice(-12)
    };

    return NextResponse.json(stats);
  } catch (err) {
    console.error('SERVER_ERROR_GITHUB_STATS:', err);
    return NextResponse.json({ error: 'Failed to fetch GitHub Intelligence', details: err.message }, { status: 500 });
  }
}
