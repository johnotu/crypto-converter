import { useLocation } from "react-router-dom";

function Header() {
  const pathName = useLocation().pathname;

  return (
    <header className="mb-auto">
      <div>
        <h3 className="float-md-start mb-0">CryptoConverter</h3>
        <nav className="nav nav-masthead justify-content-center float-md-end">
          <a
            className={`nav-link ${pathName === "/" ? "active" : ""}`}
            href="/"
          >
            Converter
          </a>
          <a
            className={`nav-link ${
              pathName === "/exchange-rates" ? "active" : ""
            }`}
            href="/exchange-rates"
          >
            Exchange Rates
          </a>
        </nav>
      </div>
    </header>
  );
}

export default Header;
