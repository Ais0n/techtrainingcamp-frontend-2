import Game from './Components/Game';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">

        <Switch>
          <Route path="/singleGame">
            <Game></Game>
          </Route>
          <Route path="/">
            {/* 开始界面可以直接在这里写，但最好还是写成以一个组件的形式 */}
            <div id=" id="wrapper>
              <button><Link to="/singleGame">Start Single Game</Link></button>
            </div>
          </Route>
        </Switch>
        <footer> This is the game for the bootcamp in ByteDance</footer>
      </div>
    </Router>
  );
}

export default App;
