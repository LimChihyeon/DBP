"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // useRouter로 수정
import { fetchPlayerStats, SeasonPlayerStat } from "@/api/playerstats";

export default function PlayerStats() {
  const [player1, setPlayer1] = useState<string>("");
  const [player2, setPlayer2] = useState<string>("");
  const [season, setSeason] = useState<string>("2024");
  const [stats, setStats] = useState<SeasonPlayerStat[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const router = useRouter(); // useRouter 사용

  const handleCompare = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await fetchPlayerStats(player1, player2, season);
      setStats(data);
    } catch (err) {
      setError(
        "Failed to fetch player stats. Please check the player names and try again."
      );
      console.log(err);
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

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-4 text-center">선수 스탯 비교</h1>

      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <div className="mb-4">
          <label className="block text-gray-700">시즌:</label>
          <select
            value={season}
            onChange={(e) => setSeason(e.target.value)}
            className="border rounded px-4 py-2 w-full"
          >
            <option value="2024">2024</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
            <option value="2021">2021</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">선수 이름:</label>
          <input
            type="text"
            value={player1}
            onChange={(e) => setPlayer1(e.target.value)}
            className="border rounded px-4 py-2 w-full"
            placeholder="선수 이름 1"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">선수 이름:</label>
          <input
            type="text"
            value={player2}
            onChange={(e) => setPlayer2(e.target.value)}
            className="border rounded px-4 py-2 w-full"
            placeholder="선수 이름 2"
          />
        </div>
        <button
          onClick={handleCompare}
          className="bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-600 transition"
        >
          스탯 비교
        </button>
        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
      </div>

      {loading && <p className="mt-4 text-gray-500 text-center">Loading...</p>}

      {!loading && stats.length === 2 && (
        <div className="overflow-x-auto mt-8 w-full max-w-4xl">
          <table className="border-collapse border border-gray-300 w-full text-center">
            <thead className="bg-gray-200">
              <tr>
                <th className="border px-4 py-2"></th>
                <th className="border px-4 py-2">{stats[0].player.name}</th>
                <th className="border px-4 py-2">{stats[1].player.name}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-4 py-2">출장 경기 수</td>
                <td
                  className={`border px-4 py-2 ${highlightDifference(
                    stats[0].total_played,
                    stats[1].total_played
                  )}`}
                >
                  {stats[0].total_played}
                </td>
                <td
                  className={`border px-4 py-2 ${highlightDifference(
                    stats[1].total_played,
                    stats[0].total_played
                  )}`}
                >
                  {stats[1].total_played}
                </td>
              </tr>
              <tr>
                <td className="border px-4 py-2">득점</td>
                <td
                  className={`border px-4 py-2 ${highlightDifference(
                    stats[0].total_goals,
                    stats[1].total_goals
                  )}`}
                >
                  {stats[0].total_goals}
                </td>
                <td
                  className={`border px-4 py-2 ${highlightDifference(
                    stats[1].total_goals,
                    stats[0].total_goals
                  )}`}
                >
                  {stats[1].total_goals}
                </td>
              </tr>
              <tr>
                <td className="border px-4 py-2">도움</td>
                <td
                  className={`border px-4 py-2 ${highlightDifference(
                    stats[0].total_assists,
                    stats[1].total_assists
                  )}`}
                >
                  {stats[0].total_assists}
                </td>
                <td
                  className={`border px-4 py-2 ${highlightDifference(
                    stats[1].total_assists,
                    stats[0].total_assists
                  )}`}
                >
                  {stats[1].total_assists}
                </td>
              </tr>
              <tr>
                <td className="border px-4 py-2">누적 경고 수</td>
                <td
                  className={`border px-4 py-2 ${highlightDifference(
                    stats[0].total_yellow_cards,
                    stats[1].total_yellow_cards
                  )}`}
                >
                  {stats[0].total_yellow_cards}
                </td>
                <td
                  className={`border px-4 py-2 ${highlightDifference(
                    stats[1].total_yellow_cards,
                    stats[0].total_yellow_cards
                  )}`}
                >
                  {stats[1].total_yellow_cards}
                </td>
              </tr>
              <tr>
                <td className="border px-4 py-2">누적 퇴장 수</td>
                <td
                  className={`border px-4 py-2 ${highlightDifference(
                    stats[0].total_red_cards,
                    stats[1].total_red_cards
                  )}`}
                >
                  {stats[0].total_red_cards}
                </td>
                <td
                  className={`border px-4 py-2 ${highlightDifference(
                    stats[1].total_red_cards,
                    stats[0].total_red_cards
                  )}`}
                >
                  {stats[1].total_red_cards}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {!loading && stats.length !== 2 && (
        <p className="mt-4 text-gray-500 text-center">선수 이름 입력하세요.</p>
      )}

      <button
        onClick={() => router.push("/")}
        className="mt-8 bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
      >
        홈으로
      </button>
    </div>
  );
}
