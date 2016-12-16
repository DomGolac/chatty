import React, {Component} from 'react';

class ChatBar extends Component {
  
  constructor(props) {
    super(props);
    this.handleNewMessage = this.handleNewMessage.bind(this);
    this.handleName = this.handleName.bind(this);
  }

  handleNewMessage(target) {
    if (target.charCode === 13) {
      const username = document.getElementById("username").value || document.getElementById("username").placeholder;
      const content = document.getElementById("new-message").value;
      document.getElementById("new-message").value = "";
      const newMessage = {username: username, content: content};
      this.props.addMessage(newMessage);
    }
  }

  handleName(target) {
    if (target.charCode === 13) {
      document.getElementById("new-message").focus();
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