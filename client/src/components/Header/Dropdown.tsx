import router from "@src/router.jsx";

export default function Dropdown({
  mainText,
  links,
}: {
  mainText: string;
  links: {
    to: string;
    text: string;
  }[];
}) {
  return (
    <li className="nav-item dropdown">
      <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
        {mainText}
      </a>
      <ul className="dropdown-menu">
        {links.map(({ to, text }) => (
          <li>
            <router.link to={to} className="dropdown-item">
              {text}
            </router.link>
          </li>
        ))}
      </ul>
    </li>
  );
}
