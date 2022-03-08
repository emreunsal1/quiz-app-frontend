import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./pages/Login";

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path={"/"}>
            <Login />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
