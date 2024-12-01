"use client";

import { SeasonTeamStat, fetchSeasonStats } from "@/api/teamrank";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [season, setSeason] = useState<string>("2024");
  const [teamStats, setTeamStats] = useState<SeasonTeamStat[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const loadStats = async (selectedSeason: string) => {
    setLoading(true);
    try {
      const data = await fetchSeasonStats(selectedSeason);
      setTeamStats(data);
    } catch (error) {
      console.error("Failed to load stats:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStats(season);
  }, [season]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">
        K-League 스탯 비교
      </h1>

      {/* 버튼 섹션 */}
      <div className="flex justify-center space-x-4 mb-8">
        <button
          onClick={() => router.push("/")}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
        >
          팀 순위
        </button>
        <button
          onClick={() => router.push("/playerstats")}
          className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg shadow hover:bg-gray-300 transition"
        >
          선수 스탯 비교
        </button>
        <button
          onClick={() => router.push("/teamstats")}
          className="px-6 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition"
        >
          팀 스탯 비교
        </button>
      </div>

      <div className="mb-8">
        <label
          htmlFor="season-select"
          className="block text-lg mb-2 text-center"
        >
          시즌 선택:
        </label>
        <select
          id="season-select"
          value={season}
          onChange={(e) => setSeason(e.target.value)}
          className="border rounded px-4 py-2"
        >
          <option value="2024">2024</option>
          <option value="2023">2023</option>
          <option value="2022">2022</option>
          <option value="2021">2021</option>
        </select>
      </div>

      {loading && <p className="mt-4 text-gray-500 text-center">Loading...</p>}

      {!loading && teamStats.length > 0 && (
        <div className="overflow-x-auto">
          <table className="mt-6 border-collapse border border-gray-300 w-full max-w-4xl text-center">
            <thead className="bg-gray-200">
              <tr>
                <th className="border px-4 py-2">순위</th>
                <th className="border px-4 py-2">팀</th>
                <th className="border px-4 py-2">경기 수</th>
                <th className="border px-4 py-2">승</th>
                <th className="border px-4 py-2">무</th>
                <th className="border px-4 py-2">패</th>
                <th className="border px-4 py-2">승점</th>
                <th className="border px-4 py-2">득점</th>
                <th className="border px-4 py-2">실점</th>
              </tr>
            </thead>
            <tbody>
              {teamStats
                .sort((a, b) => b.points - a.points)
                .map((teamStat, index) => (
                  <tr key={teamStat.id} className="hover:bg-gray-100">
                    <td className="border px-4 py-2">{index + 1}</td>
                    <td className="border px-4 py-2">{teamStat.team.name}</td>
                    <td className="border px-4 py-2">
                      {teamStat.matches_played}
                    </td>
                    <td className="border px-4 py-2">{teamStat.wins}</td>
                    <td className="border px-4 py-2">{teamStat.draws}</td>
                    <td className="border px-4 py-2">{teamStat.losses}</td>
                    <td className="border px-4 py-2">{teamStat.points}</td>
                    <td className="border px-4 py-2">{teamStat.goals_for}</td>
                    <td className="border px-4 py-2">
                      {teamStat.goals_against}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}

      {!loading && teamStats.length === 0 && (
        <p className="mt-4 text-gray-500 text-center">
          No data available for the selected season.
        </p>
      )}
    </div>
  );
}
