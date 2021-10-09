import { useEffect, useState } from "react";
import axios from "axios";

import bestCoins from "../../best-coins.json"; // A list of supported coins symbols

import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Converter from "../Converter/Converter";
import ExchangeRates from "../ExchangeRates/ExchangeRates";

function Home() {
  const [screen, setScreen] = useState("converter");
  const [baseCoin, setBaseCoin] = useState({});
  const [quoteCoin, setQuoteCoin] = useState({});
  const [coins, setCoins] = useState([]);
  const [rate, setRate] = useState(null);
  const [conversionError, setConversionError] = useState("");

  const handleChangeScreen = (screen) => setScreen(screen);

  const handleChangeCoin = (e) => {
    const { name, value } = e.target;
    const coinData = value.split("***");
    if (name === "baseCoin") {
      setBaseCoin({ asset_id: coinData[0], name: coinData[1] });
    } else {
      setQuoteCoin({ asset_id: coinData[0], name: coinData[1] });
    }
  };

  // Get coin data
  useEffect(() => {
    const getAssets = async () => {
      const url = `${
        process.env.REACT_APP_COINAPI_BASE_URL
      }/assets?filter_asset_id=${bestCoins.join(",")}`;
      try {
        const { data } = await axios.get(url, {
          headers: { "X-CoinAPI-Key": process.env.REACT_APP_COINAPI_KEY },
        });

        setCoins(data);
        setBaseCoin(data[0]);
        setQuoteCoin(data[0]);
      } catch (err) {
        console.log(err);
      }
    };
    getAssets();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Get exchange rate whenever base coin or quote coin is changed
  useEffect(() => {
    const getExchangeRate = async () => {
      const url = `${process.env.REACT_APP_COINAPI_BASE_URL}/exchangerate/${baseCoin.asset_id}/${quoteCoin.asset_id}`;
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
  }, [baseCoin, quoteCoin]);

  return (
    <>
      <Header screen={screen} handleChangeScreen={handleChangeScreen} />
      {screen === "converter" && (
        <Converter
          handleChangeCoin={handleChangeCoin}
          coins={coins}
          rate={rate}
          baseCoin={baseCoin}
          conversionError={conversionError}
          quoteCoin={quoteCoin}
        />
      )}
      {screen === "exchange-rates" && (
        <ExchangeRates
          handleChangeCoin={handleChangeCoin}
          coins={coins}
          baseCoin={baseCoin}
        />
      )}
      <Footer />
    </>
  );
}

export default Home;
