import { render } from "@testing-library/react";
import ExchangeRates from "./ExchangeRates";

import coins from "../../offline-coin-data.json";

describe("ExchangRates", () => {
  test("renders ExchangeRates component", () => {
    render(<ExchangeRates coins={coins} />);
  });
});
