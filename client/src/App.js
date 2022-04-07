import './App.css';
import { Route, Switch } from 'react-router-dom';
import Landing from 

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Landing} />
      </Switch>
    </div>
  );
}

export default App;
