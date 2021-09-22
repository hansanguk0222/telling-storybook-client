import React from "react";
import { Header } from "@/components/Header";
import { RecoilRoot } from "recoil";

const App = () => {
  return (
    <RecoilRoot>
      <div className="App">
        <Header />
      </div>
    </RecoilRoot>
  );
};

export default App;
