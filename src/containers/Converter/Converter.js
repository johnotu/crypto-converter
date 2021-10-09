function Converter({
  handleChangeCoin,
  coins,
  rate,
  baseCoin,
  conversionError,
  quoteCoin,
}) {
  return (
    <main className="px-3">
      <h1 className="display-4 mb-5">Converter</h1>
      <form className="row g-3">
        <div className="col-md-5">
          <select
            data-testid="base-currencies"
            name="baseCoin"
            className="form-select"
            onChange={handleChangeCoin}
          >
            {coins.map((coin) => (
              <option
                value={`${coin.asset_id}***${coin.name}`}
                key={coin.asset_id}
              >
                {coin.name} ({coin.asset_id})
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-2">
          <p className="my-0">to</p>
        </div>
        <div className="col-md-5">
          <select
            data-testid="quote-currencies"
            name="quoteCoin"
            className="form-select"
            onChange={handleChangeCoin}
          >
            {coins.map((coin) => (
              <option
                value={`${coin.asset_id}***${coin.name}`}
                key={coin.asset_id}
              >
                {coin.name} ({coin.asset_id})
              </option>
            ))}
          </select>
        </div>
        {rate && (
          <div className="col-12">
            <p className="fs-3">
              1 {baseCoin.asset_id} ={" "}
              <span className="fw-bolder">{Number(rate).toFixed(2)} </span>
              {quoteCoin.asset_id}
            </p>
          </div>
        )}
        {conversionError && (
          <div className="col-12">
            <p className="">{conversionError}</p>
          </div>
        )}
      </form>
    </main>
  );
}

export default Converter;
