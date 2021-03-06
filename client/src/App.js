import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";
import Home from "./components/Home/Home";
import Creator from "./components/Creator/Creator";
import Details from "./components/Details/Details";
import Error from "./components/Error/Error";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/videogame" component={Creator}/>
        <Route exact path="/videogame/:id" component={Details}/>
        <Route component={Error} />
      </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
