export interface RepoStats {
  stars: number;
  forks: number;
  updatedAt: string;
}

export async function fetchGitHubRepoStats(username = 'equalignorecase'): Promise<Record<string, RepoStats>> {
  const statsMap: Record<string, RepoStats> = {};

  try {
    const headers: Record<string, string> = {
      'User-Agent': 'Astro-Portfolio-App',
      'Accept': 'application/vnd.github.v3+json',
    };

    const token = typeof import.meta !== 'undefined' && import.meta.env ? (import.meta.env.GITHUB_TOKEN as string | undefined) : undefined;
    if (token) {
      headers['Authorization'] = `token ${token}`;
    }

    const res = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`, {
      headers,
    });

    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data)) {
        for (const repo of data) {
          if (repo && repo.name) {
            statsMap[repo.name.toLowerCase()] = {
              stars: repo.stargazers_count ?? 0,
              forks: repo.forks_count ?? 0,
              updatedAt: repo.updated_at ?? '',
            };
          }
        }
      }
    } else {
      console.warn(`[github-api] GitHub API returned status ${res.status}. Falling back to default stats.`);
    }
  } catch (err) {
    console.warn('[github-api] Failed to fetch GitHub repo stats at build time. Using defaults:', err);
  }

  return statsMap;
}
