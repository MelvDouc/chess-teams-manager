import { matches } from "@utils/api.js";
import RouterLink from "@routing/RouterLink.jsx";

export default async function MatchSeasonsPage() {
  const seasons = await matches.seasons();

  return (
    <>
      <ul>
        {(seasons ?? []).map((season) => (
          <li>
            <RouterLink href={`/matchs/${season}`}>{season - 1}&mdash;{season}</RouterLink>
          </li>
        ))}
      </ul>
      <p>
        <RouterLink href="/matchs/nouveau">Créer un match</RouterLink>
      </p>
    </>
  );
}