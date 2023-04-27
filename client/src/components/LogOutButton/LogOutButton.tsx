import auth from "@src/utils/auth.js";

export default function LogOutButton() {
  return (
    <button
      className="btn btn-danger"
      onclick={() => {
        if (confirm("Êtes-vous sûr(e) de vouloir vous déconnecter ?"))
          auth.logOut();
      }}
    >
      <i className="bi bi-power"></i>
    </button>
  );
}