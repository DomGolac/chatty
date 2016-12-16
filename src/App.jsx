import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { currentUser: {name: ""}, // optional. if currentUser is not defined, it means the user is Anonymous
                   messages: []
                 };
    this.socket = new WebSocket("ws://localhost:4000/socketserver");
    this.addMessage = this.addMessage.bind(this);
  }
  
  componentDidMount() {
    console.log("componentDidMount <App />");    
    this.socket.onopen = event => {
      console.log("Connected to web socket server");
    };
    this.socket.onmessage = event => {
      const message = JSON.parse(event.data);
      this.state.messages.push(message);
      this.setState({currentUser: {name: message.username}, messages: this.state.messages});
    };
  }

  addMessage(message) {
    message = JSON.stringify(message);
    this.socket.send(message);
  }

  render() {
    console.log("Rendering <App/>");
    return (
      <div className="wrapper">
        <nav>
          <h1>Chatty</h1>
        </nav>
        <MessageList messages={this.state.messages} />
        <ChatBar currentUser={this.state.currentUser} addMessage={this.addMessage}/>
      </div> 
    );
  }
}
export default App;