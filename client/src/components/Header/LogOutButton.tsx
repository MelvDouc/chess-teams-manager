import Modal from "@src/components/Modal/Modal.jsx";

export default function LogOutButton({ logOut }: {
  logOut: VoidFunction;
}) {
  return (
    <button
      className="btn btn-danger"
      title="Déconnexion"
      style={{
        transform: "scale(0.75)"
      }}
      onclick={() => Modal.setState({
        type: "success",
        message: "Êtes-vous sûr(e) de vouloir vous déconnecter ?",
        onClose: (returnValue) => {
          if (returnValue === "OK")
            logOut();
        }
      })}
    >
      <i className="bi bi-power"></i>
    </button>
  );
}