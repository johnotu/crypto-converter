import { useEffect, useState } from "react";
import axios from "axios";

function ExchangeRates({ coins, handleChangeCoin, baseCoin }) {
  const [favouriteCurrencies, setFavouriteCurrencies] = useState(
    JSON.parse(localStorage.getItem("favourite-currencies")) || []
  );

  const [currentRates, setCurrentRates] = useState([]);

  const handleFavouriteCurrencies = (currency) => {
    const newFavs = favouriteCurrencies.includes(currency)
      ? favouriteCurrencies.filter((c) => c !== currency)
      : [currency, ...favouriteCurrencies];
    setFavouriteCurrencies(newFavs);
    localStorage.setItem("favourite-currencies", JSON.stringify(newFavs));
  };

  // Get current rates whenever base coin changes
  useEffect(() => {
    const getCurrentRate = async () => {
      const url = `${process.env.REACT_APP_COINAPI_BASE_URL}/exchangerate/${baseCoin.asset_id}?filter_asset_id=USD,EUR,CNY,GBP,JPY,CAD,AUD,HKD`;
      try {
        const { status, data } = await axios.get(url, {
          headers: { "X-CoinAPI-Key": process.env.REACT_APP_COINAPI_KEY },
        });
        if (status === 200) {
          // Take only
          setCurrentRates(data.rates);
        } else {
        }
      } catch (err) {
        console.log(err);
      }
    };
    getCurrentRate();
  }, [baseCoin]);

  return (
    <main className="px-3">
      <h1 className="display-4 mb-5">Exchange Rates</h1>
      <div className="col-md-12">
        <select
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
      <div className="">
        <table className="table mt-5">
          <thead>
            <tr>
              <th scope="col"></th>
              <th scope="col">Currency</th>
              <th scope="col">Rate</th>
            </tr>
          </thead>
          <tbody>
            {currentRates
              .sort((a, b) =>
                favouriteCurrencies.includes(a.asset_id_quote)
                  ? -1
                  : favouriteCurrencies.includes(b.asset_id_quote)
                  ? 1
                  : 0
              )
              .map((rate) => (
                <tr key={rate.asset_id_quote}>
                  <th scope="row">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill={
                        favouriteCurrencies.includes(rate.asset_id_quote)
                          ? "inherit"
                          : "none"
                      }
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-heart"
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        handleFavouriteCurrencies(rate.asset_id_quote)
                      }
                    >
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                    </svg>
                  </th>
                  <td>{rate.asset_id_quote}</td>
                  <td>{Number(rate.rate).toFixed(2)}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}

export default ExchangeRates;
