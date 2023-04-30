import { get } from "./api.js";
import { MatchesByTeamName, Player } from "@src/types.js";

function createLocalStorageCache<TData, TArgs extends any[]>({ key, getData }: {
  key: string;
  getData: (...args: TArgs) => Promise<TData>;
}) {
  let data: TData | null = null;

  return {
    get: async (...args: TArgs): Promise<TData> => {
      if (data !== null)
        return data;

      if (localStorage.getItem(key))
        return data = JSON.parse(localStorage.getItem(key)!);

      data = await getData(...args);
      localStorage.setItem(key, JSON.stringify(data));
      return data;
    },
    clear: () => {
      data = null;
      localStorage.removeItem(key);
    }
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