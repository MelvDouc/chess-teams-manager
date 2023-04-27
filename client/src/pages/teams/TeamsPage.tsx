import Table from "@src/components/Table/Table.jsx";
import RouterLink from "@src/routing/RouterLink.jsx";
import { get } from "@src/utils/api.js";
import { PublicEntities } from "@src/types.js";

export default async function TeamsPage() {
  const teams = await get<PublicEntities.Team[]>("/teams");

  return (
    <>
      <h2>Équipes</h2>
      <section className="mb-3">
        <Table large>
          <thead>
            <tr>
              <th>Nom</th>
              <th>Capitaine</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {(teams ?? []).map(({ captain, name }) => (
              <tr>
                <td>{name}</td>
                <td>{captain.first_name} {captain.last_name}</td>
                <td>
                  <Table.Actions>
                    <RouterLink href={`/equipes/${name}/modifier`} className="btn btn-primary">
                      <i className="bi bi-pencil-fill"></i>
                    </RouterLink>
                  </Table.Actions>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </section>
      <section>
        <RouterLink className="btn btn-success" href="/equipes/ajouter">Ajouter une équipe</RouterLink>
      </section>
    </>
  );
}