import React from "react";
import { Switch, Route } from 'react-router-dom';

function App() {
  return (<Switch>
    <Route exact={true} path="/">
      This is Home
    </Route>

    <Route exact path="/starred">
      This is Starred
    </Route>

    <Route>
      This is 404 page
    </Route>
  </Switch>);
}

export default App;
