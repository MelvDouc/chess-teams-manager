import router from "@src/router.jsx";
import { get } from "@src/utils/api.js";

export default async function MatchSeasonsPage() {
  const seasons = await get<number[]>("/matches/seasons");

  return (
    <>
      <h2>Matchs par saison</h2>
      <ul>
        {(seasons ?? []).map((season) => (
          <li>
            <router.link to={`/matchs/${season}`}>
              {season - 1}-{season}
            </router.link>
          </li>
        ))}
      </ul>
    </>
  );
}
