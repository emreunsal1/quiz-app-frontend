import { BrowserRouter as Router } from "react-router-dom";
import RoutesWrapper from "./components/RoutesWrapper";

function App() {
  return (
    <div>
      <Router>
        <RoutesWrapper />
      </Router>
    </div>
  );
}

export default App;
