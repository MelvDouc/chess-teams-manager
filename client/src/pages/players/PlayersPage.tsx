import PlayersTable from "@src/components/PlayersTable/PlayersTable.jsx";
import { playersCache } from "@src/utils/local-storage.js";

export default async function PlayersPage() {
  const players = await playersCache.get();

  return (
    <>
      <h2>Joueurs</h2>
      <PlayersTable players={players ?? []} clearCache={playersCache.clear} />
    </>
  );
}

// function getSortStringsFn<K extends keyof Player>(key: K) {
//   return (a: Player, b: Player) => (a[key] as string).localeCompare(b[key] as string);
// }

// function getSortNumbersFn<K extends keyof Player>(key: K) {
//   return (a: Player, b: Player) => (a[key] as number) - (b[key] as number);
// }

// function getSortNumbersOrNullFn<K extends keyof Player>(key: K) {
//   return (a: Player, b: Player) => (a[key] as number | null ?? 0) - (b[key] as number | null ?? 0);
// }

// const sortFns = {
//   ffeId: getSortStringsFn("ffeId"),
//   fideId: getSortNumbersOrNullFn("fideId"),
//   firstName: getSortStringsFn("firstName"),
//   lastName: getSortStringsFn("lastName"),
//   email: getSortStringsFn("email"),
//   rating: getSortNumbersFn("rating")
// } as const;
