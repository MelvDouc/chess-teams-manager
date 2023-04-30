import { get } from "./api.js";
import { MatchesByTeamName, Player } from "@src/types.js";

function createLocalStorageCache<TData, TArgs extends any[]>({ key, getData }: {
  key: string;
  getData: (...args: TArgs) => Promise<TData>;
}) {
  return {
    get: async (...args: TArgs): Promise<TData> => {
      if (localStorage.getItem(key))
        return JSON.parse(localStorage.getItem(key)!);

      const data = await getData(...args);
      localStorage.setItem(key, JSON.stringify(data));
      return data;
    },
    clear: () => localStorage.removeItem(key)
  };
}

const playersCache = createLocalStorageCache({
  key: "db_players",
  getData: () => get<Player[]>("/players")
});

const matchesByTeamNameCache = createLocalStorageCache({
  key: "db_matches",
  getData: (season: number) => get<MatchesByTeamName[]>(`/matches/${season}`)
});

export {
  playersCache,
  matchesByTeamNameCache
};