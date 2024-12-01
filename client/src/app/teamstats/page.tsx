"use client";

import { useState } from "react";

type TeamStat = {
  team: { name: string };
  season: string;
  matches_played: number;
  wins: number;
  draws: number;
  losses: number;
  points: number;
  goals_for: number;
  goals_against: number;
};

export default function TeamStatsComparison() {
  const [team1, setTeam1] = useState<string>("");
  const [team2, setTeam2] = useState<string>("");
  const [season1, setSeason1] = useState<string>("2024");
  const [season2, setSeason2] = useState<string>("2024");
  const [stats, setStats] = useState<TeamStat[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const fetchTeamStats = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `/api/teamstats?team1=${encodeURIComponent(
          team1
        )}&season1=${season1}&team2=${encodeURIComponent(
          team2
        )}&season2=${season2}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch team stats");
      }
      const data = await response.json();
      setStats(data);
    } catch (err) {
      setError("Failed to fetch team stats. Please check the inputs.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const highlightDifference = (value1: number, value2: number) => {
    if (value1 > value2) {
      return "bg-green-100 font-bold";
    } else if (value1 < value2) {
      return "bg-red-100 font-bold";
    }
    return "";
  };

  const statKeys: {
    key: keyof Omit<TeamStat, "team" | "season">;
    label: string;
  }[] = [
    { key: "matches_played", label: "경기 수" },
    { key: "wins", label: "승" },
    { key: "draws", label: "무" },
    { key: "losses", label: "패" },
    { key: "points", label: "승점" },
    { key: "goals_for", label: "득점" },
    { key: "goals_against", label: "실점" },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">팀 스탯 비교</h1>

      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md mb-6">
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        <div className="mb-4">
          <label className="block text-gray-700">팀 1 이름:</label>
          <input
            type="text"
            value={team1}
            onChange={(e) => setTeam1(e.target.value)}
            className="border rounded px-4 py-2 w-full"
            placeholder="팀 이름 입력"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">팀 1 시즌:</label>
          <select
            value={season1}
            onChange={(e) => setSeason1(e.target.value)}
            className="border rounded px-4 py-2 w-full"
          >
            <option value="2024">2024</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
            <option value="2021">2021</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">팀 2 이름:</label>
          <input
            type="text"
            value={team2}
            onChange={(e) => setTeam2(e.target.value)}
            className="border rounded px-4 py-2 w-full"
            placeholder="팀 이름 입력"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">팀 2 시즌:</label>
          <select
            value={season2}
            onChange={(e) => setSeason2(e.target.value)}
            className="border rounded px-4 py-2 w-full"
          >
            <option value="2024">2024</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
            <option value="2021">2021</option>
          </select>
        </div>
        <button
          onClick={fetchTeamStats}
          className="bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-600 transition"
        >
          스탯 비교
        </button>
      </div>

      {loading && <p className="text-gray-500">Loading...</p>}

      {!loading && stats.length === 2 && (
        <div className="overflow-x-auto w-full max-w-4xl">
          <table className="border-collapse border border-gray-300 w-full text-center">
            <thead className="bg-gray-200">
              <tr>
                <th className="border px-4 py-2"></th>
                <th className="border px-4 py-2">
                  {stats[0].team.name} ({stats[0].season})
                </th>
                <th className="border px-4 py-2">
                  {stats[1].team.name} ({stats[1].season})
                </th>
              </tr>
            </thead>
            <tbody>
              {statKeys.map(({ key, label }) => (
                <tr key={key}>
                  <td className="border px-4 py-2">{label}</td>
                  <td
                    className={`border px-4 py-2 ${highlightDifference(
                      stats[0][key],
                      stats[1][key]
                    )}`}
                  >
                    {stats[0][key]}
                  </td>
                  <td
                    className={`border px-4 py-2 ${highlightDifference(
                      stats[1][key],
                      stats[0][key]
                    )}`}
                  >
                    {stats[1][key]}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!loading && stats.length === 0 && (
        <p className="text-gray-500">팀을 입력하세요.</p>
      )}

      <button
        onClick={() => (window.location.href = "/")}
        className="mt-8 bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
      >
        홈으로
      </button>
    </div>
  );
}
