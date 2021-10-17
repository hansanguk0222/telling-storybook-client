import React, { useEffect } from "react";
import { Header } from "@/components/Header";
import { RecoilRoot } from "recoil";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Login } from "./components/Login";
import { Board } from "./components/Board";

const App = () => {
  return (
    <BrowserRouter>
      <RecoilRoot>
        <div className="App">
          <Header />
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route
              exact
              path="/novel/write"
              component={() => Board({ boardType: "소설" })}
            />
          </Switch>
        </div>
      </RecoilRoot>
    </BrowserRouter>
  );
};

export default App;
