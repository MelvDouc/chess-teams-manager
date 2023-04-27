import ClubForm from "@src/components/forms/ClubForm.jsx";
import { post } from "@src/utils/api.js";

export default function ClubCreatePage() {
  const form = ClubForm({
    club: null,
    handleSubmit: async (club) => {
      const insertedId = await post("/clubs/create", club);

      if (!insertedId)
        return alert("Le club n'a pas pu être créé.");
      location.assign("/clubs");
    }
  });

  return (
    <>
      <h2>Ajouter un club</h2>
      {form}
    </>
  );
}