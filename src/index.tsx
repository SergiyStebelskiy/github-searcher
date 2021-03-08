import { StrictMode } from "react";
import { render } from "react-dom";
import "./index.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { routes } from "routes";
import { Provider } from "react-redux";
import store from "store";

render(
  <StrictMode>
    <Provider store={store}>
      <Router>
        <Switch>
          {routes.map(({ Component, ...spread }, index) => (
            <Route {...spread} key={index}>
              <Component />
            </Route>
          ))}
        </Switch>
      </Router>
    </Provider>
  </StrictMode>,
  document.getElementById("root")
);
