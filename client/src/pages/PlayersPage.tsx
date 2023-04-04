import RouterLink from "@routing/RouterLink.jsx";
import { players } from "@utils/api.js";

export default async function PlayersPage() {
  const allPlayers = await players.all();
  return (
    <>
      <table>
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
                <RouterLink href={`/joueurs/${ffeId}/modifier`}>Modifier</RouterLink>
                <button
                  onclick={async (e) => {
                    if (!confirm("Êtes-vous sûr(e) de vouloir supprimer ce joueur ?"))
                      return;
                    const deleteResult = await players.delete(ffeId);
                    if (deleteResult?.success) {
                      (e.target as HTMLButtonElement).closest("tr")!.remove();
                      return;
                    }
                    alert("Le joueur n'a pu être supprimé.");
                  }}
                >Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <p>
        <RouterLink href="/joueurs/nouveau">Ajouter un joueur</RouterLink>
      </p>
    </>
  );
}