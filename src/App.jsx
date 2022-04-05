import { BrowserRouter as Router } from "react-router-dom";
import RoutesWrapper from "./components/RoutesWrapper";
import { SocketContext, socket } from "./context";

function App() {
  return (
    <div>
      <SocketContext.Provider value={socket}>
        <Router>
          <RoutesWrapper />
        </Router>
      </SocketContext.Provider>
    </div>
  );
}

export default App;
