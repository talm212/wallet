import React from "react";
import axios from "axios";
import "./SendMoney.css";

class SendMoney extends React.Component {
  state = {
    resiver: null,
    amount: 0
  };

  makeTransition() {
    let props = this.props;
    console.log(props);
    axios
      .post("http://localhost:8000/send", {
        from: props.userName,
        to: this.state.resiver,
        amount: Number(this.state.amount)
      })
      .then(function(res) {
        props.onBalanceChange(res.data.balance);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <div>
          <label>Receiver</label>
          <input
            onChange={e => {
              this.setState({ resiver: e.target.value });
            }}
          ></input>
          <label>Amount</label>
          <input
            onChange={e => {
              this.setState({ amount: e.target.value });
            }}
          ></input>
        </div>
        <button
          className="myButton"
          type="button"
          onClick={() => {
            this.makeTransition();
          }}
        >
          Send
        </button>
      </div>
    );
  }
}

export default SendMoney;
