import router from "@src/router.jsx";
import { SERVER_URL } from "@src/utils/api.js";
import auth from "@src/utils/auth.js";
import { formatDate } from "@src/utils/date-formatter.js";
import { matchesByTeamNameCache } from "@src/utils/local-storage.js";

export default async function MatchesPage({ season }: {
  season: string;
}) {
  const matchesByTeamName = await matchesByTeamNameCache.get(+season);
  const role = auth.getUser()?.role;

  return (
    <>
      <h2>Matchs {+season - 1}-{season}</h2>
      <table className="table table-striped table-bordered table-hover">
        <thead>
          <tr className="bg-primary text-light">
            <th>Rd.</th>
            <th>Adversaire</th>
            <th>Adresse</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        {(matchesByTeamName ?? []).map(({ teamName, matches }) => (
          <>
            <tbody>
              <tr>
                <th colSpan={5} className="text-center bg-secondary text-light">{teamName}</th>
              </tr>
            </tbody>
            <tbody>
              {matches.map(({ round, opponent, address, city, zipCode, date }) => (
                <tr>
                  <td>{round}</td>
                  <td>{opponent}</td>
                  <td>
                    <address className="m-0">
                      <p className="m-0 white-space-pre-wrap">{address}</p>
                      <p className="m-0">{zipCode} {city}</p>
                    </address>
                  </td>
                  <td>{formatDate(new Date(date))}</td>
                  <td>
                    <div className="d-flex justify-content-center align-items-center gap-2">
                      {role !== undefined && role !== "USER" && (
                        <router.link
                          to={`/matchs/${season}/${round}/${teamName}/modifier`}
                          className="btn btn-primary"
                          title="Modifier"
                        >
                          <i className={"bi bi-pen-fill"}></i>
                        </router.link>
                      )}
                      <a
                        href={`${SERVER_URL}/matchs/${season}/${round}/${teamName}/feuille-de-match`}
                        target="_blank"
                        className="btn btn-warning"
                        title="Feuille de match"
                      >
                        <i className="bi bi-table"></i>
                      </a>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </>
        ))}
      </table>
    </>
  );
}