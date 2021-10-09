function Header({ screen, handleChangeScreen }) {
  return (
    <header className="mb-auto">
      <div>
        <h3 className="float-md-start mb-0">CryptoConverter</h3>
        <nav className="nav nav-masthead justify-content-center float-md-end">
          <span
            style={{ cursor: "pointer" }}
            className={`nav-link text-reset ${
              screen === "converter" ? "active" : ""
            }`}
            onClick={() => handleChangeScreen("converter")}
          >
            Converter
          </span>
          <span
            style={{ cursor: "pointer" }}
            className={`nav-link text-reset ${
              screen === "exchange-rates" ? "active" : ""
            }`}
            onClick={() => handleChangeScreen("exchange-rates")}
          >
            Exchange Rates
          </span>
        </nav>
      </div>
    </header>
  );
}

export default Header;
