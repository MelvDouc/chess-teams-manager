import ClubForm from "@src/components/ClubForm/ClubForm.jsx";
import { getClub, updateClub } from "@src/utils/api.js";

export default async function ClubUpdatePage({ id }: {
  id: number;
}) {
  const club = (await getClub(id))!;

  return (
    <>
      <h2>Modifier un club</h2>
      <ClubForm
        club={club}
        handleSubmit={async (c) => {
          const updateResult = await updateClub(club.id, c);

          if (!updateResult?.success) {
            alert("Une erreur s'est produite.");
            return;
          }

          location.assign("/clubs");
        }}
      />
    </>
  );
}