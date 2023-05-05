import { deleteOne } from "@src/utils/api.js";

export default function DeletePlayerButton({ ffeId, clearCache }: {
  ffeId: string;
  clearCache: VoidFunction;
}) {
  return (
    <button
      className="btn btn-danger"
      onclick={async ({ target }) => {
        if (!confirm("Êtes-vous sûr(e) de vouloir supprimer ce joueur ?")) return;

        const deleteResult = await deleteOne(`/players/${ffeId}/delete`);
        if (!deleteResult || deleteResult.deletedCount < 1) return alert("Le joueur n'a pu être supprimé.");

        (target as HTMLButtonElement).closest("tr")!.remove();
        clearCache();
      }}
    >
      <i className="bi bi-trash-fill"></i>
    </button>
  );
}