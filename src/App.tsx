import React, { useEffect, Suspense } from "react";
import { Header } from "@/components/Header";
import { RecoilRoot } from "recoil";
import {
  BrowserRouter,
  Switch,
  Route,
  useLocation,
  Redirect,
} from "react-router-dom";
import { Login } from "./components/Login";
import { CreateBoardForm } from "./components/CreateBoardForm";
import { Board } from "@/components/Board";
import { BoardList } from "./components/BoardList";
import { CreateASMR } from "./components/CreateASMR";
import { AsmrList } from "./components/AsmrList";
import { Asmr } from "./components/Asmr";
import { Talk } from "./components/Talk";
const App = () => {
  return (
    <BrowserRouter>
      <RecoilRoot>
        <Suspense fallback={<></>}>
          <div className="App">
            <Header />
            <Switch>
              <Route exact path="/" component={Login} />
              <Route exact path="/login" component={Login} />
              <Route
                exact
                path="/novels/write"
                component={() => CreateBoardForm({ boardType: "소설" })}
              />
              <Route
                exact
                path="/reports/write"
                component={() => CreateBoardForm({ boardType: "독후감" })}
              />
              <Route
                exact
                path="/reports/:_id"
                component={() =>
                  Board({
                    _id: Number(
                      window.location.pathname.split("/")[
                        window.location.pathname.split("/").length - 1
                      ]
                    ),
                  })
                }
              />
              <Route
                exact
                path="/reports"
                component={() => BoardList({ boardType: "독후감" })}
              />
              <Route exact path="/asmrs/write" component={() => CreateASMR()} />
              <Route
                exact
                path="/asmrs/:_id"
                component={() =>
                  Asmr({
                    _id: Number(
                      window.location.pathname.split("/")[
                        window.location.pathname.split("/").length - 1
                      ]
                    ),
                  })
                }
              />
              <Route exact path="/voicerooms" component={() => Talk()} />
              <Route exact path="/asmrs" component={() => AsmrList()} />
            </Switch>
          </div>
        </Suspense>
      </RecoilRoot>
    </BrowserRouter>
  );
};

export default App;
