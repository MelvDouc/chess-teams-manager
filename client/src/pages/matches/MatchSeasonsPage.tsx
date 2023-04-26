import RouterLink from "@src/routing/RouterLink.jsx";
import { getMatchSeasons } from "@src/utils/api.js";

export default async function MatchSeasonsPage() {
  const seasons = await getMatchSeasons();

  return (
    <>
      <section>
        <h2>Par saison</h2>
        <ul>
          {(seasons ?? []).map((season) => (
            <li>
              <RouterLink href={`/matchs/${season}`}>{season - 1}-{season}</RouterLink>
            </li>
          ))}
        </ul>
      </section>
      <section>
        <RouterLink href="/matchs/nouveau" className="btn btn-success">Ajouter un match</RouterLink>
      </section>
    </>
  );
}