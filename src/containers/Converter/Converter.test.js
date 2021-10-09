import { render, screen } from "@testing-library/react";
import Converter from "./Converter";

import coins from "../../offline-coin-data.json";

describe("Converter", () => {
  test("renders Converter component", () => {
    render(<Converter coins={coins} />);
  });
});
