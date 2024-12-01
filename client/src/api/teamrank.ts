export interface SeasonTeamStat {
  id: number;
  team: {
    name: string;
  };
  season: string;
  matches_played: number;
  wins: number;
  draws: number;
  losses: number;
  points: number;
  goals_for: number;
  goals_against: number;
}

export const fetchSeasonStats = async (
  season: string
): Promise<SeasonTeamStat[]> => {
  try {
    const response = await fetch(`/api/teamrank/${season}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch season stats: ${response.statusText}`);
    }
    const data: SeasonTeamStat[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error in fetchSeasonStats:", error);
    throw error;
  }
};
