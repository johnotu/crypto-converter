import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Converter from "./containers/Converter";
import ExchangeRates from "./containers/ExchangeRates";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/exchange-rates">
          <ExchangeRates />
        </Route>
        <Route path="/">
          <Converter />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
