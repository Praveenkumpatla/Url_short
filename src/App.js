import './App.css';
import {BrowserRouter,Switch,Route} from 'react-router-dom'
import Login from './Login';
import 'bootstrap/dist/css/bootstrap.min.css'
import Register from './Register';
import Dash from './Dash';
import Forgot from './Forgot';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login}/>
        <Route path="/register" exact component={Register}/>
        <Route path="/Dashboard/:id" exact component={Dash}/>
        <Route path="/Forgot/:id" exact component={Forgot}/>
      </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
