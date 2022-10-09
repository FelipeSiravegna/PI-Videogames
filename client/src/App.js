import React from "react";
import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage.jsx";
import Home from "./components/Home/Home.jsx";
import Searchbar from "./components/Searchbar/Searchbar";
import CreateVideogame from "./components/CreateVideogame/CreateVideogame.jsx";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Route exact path={"/"} component={LandingPage} />
        <Route path={"/home"} component={Searchbar} />
        <Route exact path={"/home"} component={Home} />
        <Route path={"/videogame"} component={Searchbar} />
        <Route path={"/videogame"} component={CreateVideogame} />
      </div>
    </BrowserRouter>
  );
}

export default App;
