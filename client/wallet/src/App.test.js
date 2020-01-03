import React from "react";
import App from "./App";
import ReactDOM from "react-dom";
import UserUI from "./components/UserUI";
import SendMoney from "./components/SendMoney";
import Wallet from "./components/Wallet";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from "enzyme";

configure({ adapter: new Adapter() });

// the tests run without the server but if we want real results we need to run the server

test("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
});

test("check User ui", () => {
  const userUI = shallow(<UserUI />);
  expect(userUI.find("h1").length).toEqual(2);
});

test("check Send money ui", () => {
  const userUI = shallow(<SendMoney />);
  expect(userUI.find("input").length).toEqual(2);
  expect(userUI.find("label").length).toEqual(2);
  expect(userUI.find("button").length).toEqual(1);
});
