import ClubForm from "@src/components/forms/ClubForm.jsx";
import { createClub } from "@src/utils/api.js";

export default function ClubCreatePage() {
  return (
    <>
      <h2>Ajouter un club</h2>
      <ClubForm
        club={null}
        handleSubmit={async (club) => {
          const createResult = await createClub(club);

          if (!createResult) {
            alert("Une erreur s'est produite.");
            return;
          }

          location.assign("/clubs");
        }}
      />
    </>
  );
}