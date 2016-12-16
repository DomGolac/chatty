import React, {Component} from 'react';

class ChatBar extends Component {
  
  constructor(props) {
    super(props);
    this.handleNewMessage = this.handleNewMessage.bind(this);
    this.handleName = this.handleName.bind(this);
  }

  handleNewMessage(target) {
    if (target.charCode === 13) {
      let username = document.getElementById("username").value || document.getElementById("username").placeholder;
      let content = document.getElementById("new-message").value;
      document.getElementById("new-message").value = "";
      let newMessage = {type: "postMessage", username: username, content: content};
      this.props.sendMessage(newMessage);
    }
  }

  handleName(target) {
    let username = this.props.currentUser.name || document.getElementById("username").placeholder;
    let newUsername = document.getElementById("username").value || document.getElementById("username").placeholder;
    if (target.charCode === 13) {
      if (username !== newUsername) {
        document.getElementById("new-message").focus();
        let updatedUsername = {type: "postNotification",
                               username: newUsername,
                               content: `${username} has changed their name to ${newUsername}!`};
        this.props.sendMessage(updatedUsername); 

      } else {
        document.getElementById("new-message").focus();
      }
    }
  }

  render() {
    console.log("Rendering <ChatBar/>");
    return (
      <footer>
        <input id="username" type="text" placeholder="Anonymous" 
        onKeyPress={this.handleName} />
        <input id="new-message" type="text" placeholder="Type a message and hit ENTER"
        onKeyPress={this.handleNewMessage} />
      </footer>
    );
  }
}
export default ChatBar;