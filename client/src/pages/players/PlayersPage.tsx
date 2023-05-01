import router from "@src/router.jsx";
import { deleteOne } from "@src/utils/api.js";
import auth, { RoleIndex } from "@src/utils/auth.js";
import { playersCache } from "@src/utils/local-storage.js";

export default async function PlayersPage() {
  const players = await playersCache.get();
  const { role: currentUserRole, ffeId: currentUserFfeId } = auth.getUser()!;

  return (
    <>
      <h2>Joueurs</h2>
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
          {(players ?? []).map(({ ffeId, fideId, email, firstName, lastName, phone, rating, role }) => (
            <tr>
              <td>{ffeId}</td>
              <td>{fideId}</td>
              <td>{lastName}</td>
              <td>{firstName}</td>
              <td>{email}</td>
              <td>{phone ?? ""}</td>
              <td>{rating ?? 1199}</td>
              <td>
                <div className="d-flex justify-content-center align-items-center gap-2">
                  {(RoleIndex[currentUserRole] > RoleIndex[role] || currentUserFfeId === ffeId)
                    ? (<router.link
                      to={`/joueurs/${ffeId}/modifier`}
                      className="btn btn-primary"
                      title="Modifier"
                    >
                      <i className="bi bi-pencil-fill"></i>
                    </router.link>)
                    : null}
                  {(RoleIndex[currentUserRole] > RoleIndex[role])
                    ? (<button className="btn btn-danger" title="supprimer" onclick={(e) => delPlayer(e, ffeId)}>
                      <i className="bi bi-trash-fill"></i>
                    </button>)
                    : null}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-5">
        <router.link to="/joueurs/nouveau" className="btn btn-success">Ajouter un joueur</router.link>
      </div>
    </>
  );
}

async function delPlayer(e: Event, ffe_id: string): Promise<void> {
  if (!confirm("Êtes-vous sûr(e) de vouloir supprimer ce joueur ?"))
    return;

  if ((await deleteOne(`/players/${ffe_id}/delete`))?.success) {
    (e.target as HTMLButtonElement).closest("tr")!.remove();
    return;
  }

  alert("Le joueur n'a pu être supprimé.");
}