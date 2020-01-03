import React from "react";
import "./UserUI.css";

class UserUI extends React.Component {
  render() {
    return (
      <ul>
        <li>
          <lable>User: {this.props.userName}</lable>
        </li>
        <li>
          <lable className="balance">Balance: {this.props.balance}</lable>
        </li>
      </ul>
    );
  }
}

export default UserUI;
