import router from "@src/router.jsx";
import auth from "@src/utils/auth.js";
import { deleteOne } from "@src/utils/api.js";
import { Player } from "@src/types.js";

export default function PlayersTable({ players, clearCache }: { players: Player[]; clearCache: VoidFunction }) {
  return (
    <table className="table table-striped table-bordered table-hover">
      <thead>
        <tr className="bg-primary text-light">
          <th>N° FFE</th>
          <th>N° FIDE</th>
          <th>NOM</th>
          <th>Prénom</th>
          <th>Email</th>
          <th>Tél</th>
          <th>Elo</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {players.map(({ ffeId, fideId, lastName, firstName, email, phone, rating, isAdmin }) => (
          <tr>
            <td>{ffeId}</td>
            <td>{fideId}</td>
            <td>{lastName}</td>
            <td>{firstName}</td>
            <td>{email}</td>
            <td>{phone}</td>
            <td>{rating}</td>
            <td>
              <div className="d-flex justify-content-center align-items-center gap-2">
                <router.link to={`/joueurs/${ffeId}/modifier`} className="btn btn-primary" title="Modifier">
                  <i className="bi bi-pen-fill"></i>
                </router.link>
                {auth.getUser()?.isAdmin && !isAdmin ? (
                  <button
                    className="btn btn-danger"
                    onclick={async ({ target }) => {
                      if (!confirm("Êtes-vous sûr(e) de vouloir supprimer ce joueur ?")) return;

                      const deleteResult = await deleteOne(`/players/${ffeId}/delete`);
                      if (!deleteResult || deleteResult.deletedCount < 1) return alert("Le joueur n'a pu être supprimé.");

                      (target as HTMLButtonElement).closest("tr")!.remove();
                      clearCache();
                    }}
                  >
                    <i className="bi bi-trash-fill"></i>
                  </button>
                ) : null}
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
