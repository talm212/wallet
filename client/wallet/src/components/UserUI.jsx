import React from "react";

class UserUI extends React.Component {
  render() {
    return (
      <div>
        <nav>
          <div>
            <h1>User: {this.props.userName}</h1>
            <h1 className="balance">Balance: {this.props.balance}</h1>
          </div>
        </nav>
      </div>
    );
  }
}

export default UserUI;
