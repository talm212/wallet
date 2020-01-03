import React from "react";
// import logo from "./logo.svg";
import Wallet from "./components/Wallet";
import "./App.css";

function App() {
  return (
    <React.Fragment>
      <link
        rel="stylesheet"
        href="https://www.w3schools.com/w3css/4/w3.css"
      ></link>
      <div className="App" class="w3-card-4">
        <Wallet />
      </div>
    </React.Fragment>
  );
}

export default App;
