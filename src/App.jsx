import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.socket = new WebSocket("ws://localhost:4000/socketserver");
    this.sendMessage = this.sendMessage.bind(this);
    this.state = {
      data: {
        currentUser: {name: undefined},
        messages: [],
        notifications: [],
        count: 0
      }
    }
  }
  
  componentDidMount() {
    console.log("componentDidMount <App/>");    
    this.socket.onopen = event => {
      console.log("Connected to web socket server");
    };
    this.socket.onmessage = event => {
      let data = JSON.parse(event.data);
      this.state.data.currentUser.name = data.username;
      switch (data.type) {
        case "incomingMessage":
          this.state.data.messages.push(data);
        break;
        case "incomingNotification":
          this.state.data.notifications.push(data);
        break;
        case "incomingCount":
          this.state.data.count = data.count;
        break;
        default:
          throw new Error("Unknown event type: " + data.type);
      }
      this.setState({data: this.state.data});
    };
  }

  sendMessage(message) {
    message = JSON.stringify(message);
    this.socket.send(message);
  }

  render() {
    console.log("Rendering <App/>");
    return (
      <div className="wrapper">
        <nav>
          <h1>Chatty</h1>
          <div className="count"><h3>{this.state.data.count} Users Online</h3></div>
        </nav>
        <MessageList messages={this.state.data.messages} notifications={this.state.data.notifications} />
        <ChatBar currentUser={this.state.data.currentUser} sendMessage={this.sendMessage} />
      </div> 
    );
  }
}
export default App;