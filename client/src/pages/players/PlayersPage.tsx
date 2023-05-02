import PlayersTables from "@src/components/PlayersTables/PlayersTables.jsx";
import router from "@src/router.jsx";
import { playersCache } from "@src/utils/local-storage.js";

export default async function PlayersPage() {
  const players = await playersCache.get();

  return (
    <>
      <section className="mb-3">
        <h2>Joueurs</h2>
        <router.link to="/joueurs/nouveau" className="btn btn-success">Ajouter un joueur</router.link>
      </section>
      <section>
        <div>
          {(Array.isArray(players) && players.length)
            ? <PlayersTables
              players={players}
              clearCache={playersCache.clear}
            />
            : <p>Liste des joueurs indisponible.</p>}
        </div>
      </section>
    </>
  );
}