import { render } from "@testing-library/react";
import Converter from "./Converter";

test("renders Converter without crashing", () => {
  render(<Converter />);
});
