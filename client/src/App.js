import React from "react";
import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage.jsx";
import Home from "./components/Home/Home.jsx";
import Searchbar from "./components/Searchbar/Searchbar";
import CreateVideogame from "./components/CreateVideogame/CreateVideogame.jsx";
import Detail from "./components/Detail/Detail.jsx";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Route exact path={"/"} component={LandingPage} />
        <Route path={"/home"} component={Searchbar} />
        <Route exact path={"/home"} component={Home} />
        <Route exact path={"/videogame"} component={Searchbar} />
        <Route exact path={"/videogame"} component={CreateVideogame} />
        <Route exact path={"/videogame/:id"} component={Detail} />
      </div>
    </BrowserRouter>
  );
}

export default App;
