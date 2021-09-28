import { useEffect, useState } from "react";
import axios from "axios";

import Footer from "../components/Footer";
import Header from "../components/Header";

function Converter() {
  const [conversionData, setConversionData] = useState({
    fromCoin: "",
    toCoin: "",
  });
  const [coins, setCoins] = useState([]);
  const [rate, setRate] = useState(null);
  const [conversionError, setConversionError] = useState("");

  const handleChange = (e) =>
    setConversionData({ ...conversionData, [e.target.name]: e.target.value });

  useEffect(() => {
    const getAssets = async () => {
      const url = `${process.env.REACT_APP_COINAPI_BASE_URL}/assets`;
      try {
        const { data } = await axios.get(url, {
          headers: { "X-CoinAPI-Key": process.env.REACT_APP_COINAPI_KEY },
        });
        const cryptoAssets = data
          .filter((a) => a.type_is_crypto === 1)
          .slice(0, 200);
        setCoins(cryptoAssets);
        setConversionData({
          ...conversionData,
          fromCoin: cryptoAssets[0].asset_id,
          toCoin: cryptoAssets[0].asset_id,
        });
      } catch (err) {
        console.log(err);
      }
    };
    getAssets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const { fromCoin, toCoin } = conversionData;
    const getExchangeRate = async () => {
      const url = `${process.env.REACT_APP_COINAPI_BASE_URL}/exchangerate/${fromCoin}/${toCoin}`;
      try {
        const { status, data } = await axios.get(url, {
          headers: { "X-CoinAPI-Key": process.env.REACT_APP_COINAPI_KEY },
        });
        if (status === 200) {
          setRate(data.rate);
          setConversionError(null);
        } else {
          setRate(null);
        }
      } catch (err) {
        if (err && err.response && err.response.status === 550) {
          setRate(null);
          setConversionError(
            err.response.data.error ||
              "Selected quote coin is not available at the moment"
          );
        } else {
          console.log(err);
        }
      }
    };
    getExchangeRate();
  }, [conversionData]);

  return (
    <>
      <Header />
      <main className="px-3">
        <h1 className="display-4 mb-5">Converter</h1>
        <form className="row g-3">
          <div className="col-md-5">
            <select
              name="fromCoin"
              className="form-select"
              onChange={handleChange}
            >
              {coins.map((coin) => (
                <option value={coin.asset_id} key={coin.asset_id}>
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
              name="toCoin"
              className="form-select"
              onChange={handleChange}
            >
              {coins.map((coin) => (
                <option value={coin.asset_id} key={coin.asset_id}>
                  {coin.name} ({coin.asset_id})
                </option>
              ))}
            </select>
          </div>
          {rate && (
            <div className="col-12">
              <p className="fs-3">
                1 {conversionData.fromCoin} ={" "}
                <span className="fw-bolder">{Number(rate).toFixed(2)} </span>
                {conversionData.toCoin}
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
      <Footer />
    </>
  );
}

export default Converter;
