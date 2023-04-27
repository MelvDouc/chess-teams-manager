import ClubForm from "@src/components/forms/ClubForm.jsx";
import { get, update } from "@src/utils/api.js";
import { PublicEntities } from "@src/types.js";

export default async function ClubUpdatePage({ id }: {
  id: number;
}) {
  const club = await get<PublicEntities.Club>(`/clubs/${id}`);

  if (!club)
    return (
      <p>Club non trouvé.</p>
    );

  return (
    <>
      <h2>Modifier un club</h2>
      <ClubForm
        club={club}
        handleSubmit={async (c) => {
          const updateResult = await update(`/clubs/${id}/update`, c);

          if (!updateResult?.success)
            return alert("Une erreur s'est produite.");

          location.assign("/clubs");
        }}
      />
    </>
  );
}