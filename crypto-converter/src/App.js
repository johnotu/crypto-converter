import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Converter from "./containers/Converter";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/">
          <Converter />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
