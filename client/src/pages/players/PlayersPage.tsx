import PlayersTable from "@src/components/PlayersTable/PlayersTable.jsx";
import router from "@src/router.jsx";
import { playersCache } from "@src/utils/local-storage.js";

export default async function PlayersPage() {
  const players = await playersCache.get();

  return (
    <>
      <section className="mb-3">
        <h2>Joueurs</h2>
        <PlayersTable
          players={players ?? []}
          clearCache={playersCache.clear}
        />
      </section>
      <section>
        <router.link to="/joueurs/nouveau" className="btn btn-success">Ajouter un joueur</router.link>
      </section>
    </>
  );
}