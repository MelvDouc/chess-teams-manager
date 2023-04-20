import RouterLink from "@routing/RouterLink.jsx";
import { players } from "@utils/api.js";
import Table from "@components/Table/Table.jsx";

export default async function PlayersPage() {
  const allPlayers = await players.all();
  return (
    <>
      <h2>Joueurs</h2>
      <Table large={true}>
        <thead>
          <tr>
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
          {allPlayers!.map(({ ffeId, fideId, email, firstName, lastName, phone, rating }) => (
            <tr>
              <td>{ffeId}</td>
              <td>{fideId}</td>
              <td>{lastName}</td>
              <td>{firstName}</td>
              <td>{email}</td>
              <td>{phone ?? ""}</td>
              <td>{rating ?? 1199}</td>
              <td>
                <Table.Actions>
                  <RouterLink href={`/joueurs/${ffeId}/modifier`} className="btn btn-primary">
                    <i className="bi bi-pencil-fill"></i>
                  </RouterLink>
                  <button className="btn btn-danger" onclick={async (e) => deletePlayer(e, ffeId)}>
                    <i className="bi bi-trash-fill"></i>
                  </button>
                </Table.Actions>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div>
        <RouterLink href="/joueurs/nouveau" className="btn btn-success">Ajouter un joueur</RouterLink>
      </div>
    </>
  );
}

async function deletePlayer(e: Event, ffeId: string) {
  if (!confirm("Êtes-vous sûr(e) de vouloir supprimer ce joueur ?"))
    return;
  const deleteResult = await players.delete(ffeId);
  if (deleteResult?.success) {
    (e.target as HTMLButtonElement).closest("tr")!.remove();
    return;
  }
  alert("Le joueur n'a pu être supprimé.");
}