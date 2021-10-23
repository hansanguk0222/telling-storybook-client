import React, { useEffect, Suspense } from "react";
import { Header } from "@/components/Header";
import { RecoilRoot } from "recoil";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Login } from "./components/Login";
import { Board } from "./components/Board";
import { BoardList } from "./components/BoardList";

const App = () => {
  return (
    <BrowserRouter>
      <RecoilRoot>
        <Suspense fallback={<></>}>
          <div className="App">
            <Header />
            <Switch>
              <Route exact path="/login" component={Login} />
              <Route
                exact
                path="/novel/write"
                component={() => Board({ boardType: "소설" })}
              />
              <Route
                exact
                path="/reports"
                component={() => BoardList({ boardType: "독후감" })}
              />
            </Switch>
          </div>
        </Suspense>
      </RecoilRoot>
    </BrowserRouter>
  );
};

export default App;
