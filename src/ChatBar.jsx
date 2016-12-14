import React, {Component} from 'react';

class ChatBar extends Component {
  
  constructor(props) {
    super(props);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleKeyPress(target) {
    if (target.charCode === 13) {
      const username = document.getElementById("username").value;
      const content = document.getElementById("new-message").value;
      document.getElementById("new-message").value = "";
      const newMessage = {id: null, username: username, content: content};
      this.props.onSubmit(newMessage);
    }
  }

  render() {
    console.log("Rendering <ChatBar/>");
    return (
      <footer>
        <input id="username" type="text" placeholder="Anonymous" defaultValue={this.props.currentUser.name} />
        <input id="new-message" type="text" placeholder="Type a message and hit ENTER" 
        onKeyPress={this.handleKeyPress} />
      </footer>
    );
  }
}
export default ChatBar;