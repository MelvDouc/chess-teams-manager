import Table from "@src/components/Table/Table.jsx";
import RouterLink from "@src/routing/RouterLink.jsx";
import { getClubs } from "@src/utils/api.js";

export default async function ClubsPage() {
  const clubs = await getClubs();

  return (
    <>
      <section className="mb-3">
        <h2>Clubs</h2>
        <Table large>
          <thead>
            <tr>
              <th>Nom</th>
              <th>Adresse</th>
              <th>Tél.</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {(clubs ?? []).map(({ id, name, address, phone, email }) => (
              <tr>
                <td>{name}</td>
                <td>
                  <address>{address}</address>
                </td>
                <td>{phone}</td>
                <td>{email}</td>
                <td>
                  <Table.Actions>
                    <RouterLink href={`/clubs/${id}/modifier`} className="btn btn-primary">
                      <i className={"bi bi-pen-fill"}></i>
                    </RouterLink>
                  </Table.Actions>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </section>
      <section>
        <RouterLink href="/clubs/nouveau" className="btn btn-success">Ajouter un club</RouterLink>
      </section>
    </>
  );
}