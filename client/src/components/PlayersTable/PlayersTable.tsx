import router from "@src/router.jsx";
import { Player } from "@src/types.js";

export default function PlayersTable({ players }: { players: Player[] }) {
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
        {players.map(({ ffeId, fideId, lastName, firstName, email, phone, rating }) => (
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
                <router.link to={`/joueurs/${ffeId}/modifier`} className="btn btn-primary">
                  <i className="bi bi-pen-fill"></i>
                </router.link>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
