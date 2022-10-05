import React from "react";
import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage.jsx";
import Home from "./components/Home/Home.jsx";
import Searchbar from "./components/Searchbar/Searchbar";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Route exact path={"/"} render={() => <LandingPage />} />
        <Route path={"/home"} render={() => <Searchbar />} />
        <Route exact path={"/home"} render={() => <Home />} />
      </div>
    </BrowserRouter>
  );
}

export default App;
