import { getMatchSeasons } from "@utils/api.js";
import RouterLink from "@routing/RouterLink.jsx";

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