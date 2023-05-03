import PlayersTables from "@src/components/PlayersTables/PlayersTables.jsx";
import router from "@src/router.jsx";
import { playersCache } from "@src/utils/local-storage.js";
// import { Player } from "@src/types.js";

export default async function PlayersPage() {
  const players = await playersCache.get();

  return (
    <>
      <section className="mb-3">
        <h2>Joueurs</h2>
        <router.link to="/joueurs/nouveau" className="btn btn-success">Ajouter un joueur</router.link>
      </section>
      <section>
        {(Array.isArray(players) && players.length)
          ? <PlayersTables
            players={players}
            clearCache={playersCache.clear}
          />
          : <p>Liste des joueurs indisponible.</p>}
      </section>
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