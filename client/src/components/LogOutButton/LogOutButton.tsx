import AlertBox from "@src/components/AlertBox/AlertBox.jsx";

export default function LogOutButton({ logOut, children }: {
  logOut: VoidFunction;
  children?: any;
}) {
  return (
    <button
      className="btn btn-danger"
      title="Déconnexion"
      style={{
        transform: "scale(0.75)"
      }}
      onclick={(e) => {
        e.preventDefault();
        AlertBox({
          type: "success",
          message: "Êtes-vous sûr(e) de vouloir vous déconnecter ?",
          onCancel: (closeFn) => closeFn(),
          postClose: logOut
        });
      }}
    >{children}</button>
  );
}