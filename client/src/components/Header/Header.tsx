import Dropdown from "./Dropdown.jsx";
import NavBarText from "./NavBarText.jsx";
import router from "@src/router.jsx";
import auth from "@src/utils/auth.js";

export default function Header() {
  const showIfUserAllowed = (element: HTMLElement) => {
    element.classList.add("d-none");
    auth.onUserChange((user) => {
      (user && user.role !== "USER")
        ? element.classList.remove("d-none")
        : element.classList.add("d-none");
    });
  };

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <router.link to="/" className="navbar-brand d-flex align-items-center gap-2">
            <img
              src={import.meta.env.VITE_LOGO_URL}
              alt="Logo"
              width="30"
              height="24"
              className="d-inline-block align-text-top"
            />
            <h1 className="m-0 white-space-pre-wrap fs-5">{import.meta.env.VITE_SITE_TITLE}</h1>
          </router.link>
          <button
            className="navbar-toggler"
            type="button"
            aria-controls="navbarText"
            aria-expanded="false"
            aria-label="Toggle navigation"
            data-bs-toggle="collapse"
            data-bs-target="#navbarText"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <Dropdown mainText="Matchs">
                <li>
                  <router.link to={"/matchs"} className="dropdown-item">Matchs</router.link>
                </li>
                <li $init={showIfUserAllowed}>
                  <router.link to={"/matchs/nouveau"} className="dropdown-item">Ajouter un match</router.link>
                </li>
              </Dropdown>
              <Dropdown mainText="Joueurs" $init={showIfUserAllowed}>
                <li>
                  <router.link to={"/joueurs"} className="dropdown-item">Liste</router.link>
                </li>
                <li>
                  <router.link to={"/joueurs/nouveau"} className="dropdown-item">Ajouter un joueur</router.link>
                </li>
              </Dropdown>
            </ul>
            <span className="navbar-text">
              <NavBarText
                user={auth.getUser()}
                onUserChange={auth.onUserChange}
                logOut={() => {
                  auth.logOut();
                  router.navigate("/connexion");
                }}
              />
            </span>
          </div>
        </div>
      </nav>
    </header>
  );
}
