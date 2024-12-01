export interface SeasonPlayerStat {
  id: number;
  player: {
    id: number;
    name: string;
  };
  season: string;
  total_goals: number;
  total_assists: number;
  total_played: number;
  total_yellow_cards: number;
  total_red_cards: number;
}

export const fetchPlayerStats = async (
  player1: string,
  player2: string,
  season: string
): Promise<SeasonPlayerStat[]> => {
  try {
    const response = await fetch(
      `/api/playerstats?player1=${encodeURIComponent(
        player1
      )}&player2=${encodeURIComponent(player2)}&season=${season}`
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch player stats: ${response.statusText}`);
    }
    const data: SeasonPlayerStat[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error in fetchPlayerStats:", error);
    throw error;
  }
};
