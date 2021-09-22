import React, { useEffect } from "react";
import { Header } from "@/components/Header";
import { RecoilRoot } from "recoil";
import { BrowserRouter } from "react-router-dom";
import { useHistory } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <RecoilRoot>
        <div className="App">
          <Header />
        </div>
      </RecoilRoot>
    </BrowserRouter>
  );
};

export default App;
