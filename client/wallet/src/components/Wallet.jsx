import React from "react";
import UserUI from "./UserUI";
import SendMoney from "./SendMoney";
import axios from "axios";

class Wallet extends React.Component {
  state = { userName: "tal", balance: "..." };

  componentDidMount() {
    axios
      .get("http://localhost:8000/balance/" + this.state.userName)
      .then(res => {
        console.log(res);
        this.setState({ balance: res.data.balance });
      })
      .catch(err => {
        console.error(err);
      });
  }

  onBalanceChange(balance) {
    this.setState({ balance: balance });
  }

  render() {
    return (
      <div className="App">
        <UserUI userName={this.state.userName} balance={this.state.balance} />
        <SendMoney
          userName={this.state.userName}
          onBalanceChange={balance => {
            this.onBalanceChange(balance);
          }}
        />
      </div>
    );
  }
}

export default Wallet;
