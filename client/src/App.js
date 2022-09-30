import "./App.css";
import { Route } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";

function App() {
  return (
    <div>
      <Route path={"/"} component={LandingPage} />
    </div>
  );
}

export default App;
