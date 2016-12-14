import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.addMessage = this.addMessage.bind(this);
    this.state = { currentUser: {name: "BoB"}, // optional. if currentUser is not defined, it means the user is Anonymous
                    messages: [
                      {
                        id: 1,
                        username: "Bob",
                        content: "Has anyone seen my marbles?",
                      },
                      {
                        id: 2,
                        username: "Anonymous",
                        content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
                      }
                    ]
                  }
  }
  
  componentDidMount() {
    console.log("componentDidMount <App />");
    setTimeout(() => {
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
      const messages = this.state.messages.concat(newMessage);
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({messages: messages});
    }, 3000);
  }

  addMessage(newMessage) {
    newMessage.id = this.state.messages[this.state.messages.length - 1].id + 1;
    const messages = this.state.messages.concat(newMessage);
    this.setState({messages: messages});
  }

  render() {
    console.log("Rendering <App/>");
    return (
      <div className="wrapper">
        <nav>
          <h1>Chatty</h1>
        </nav>
        <MessageList messages={this.state.messages} />
        <ChatBar currentUser={this.state.currentUser} onSubmit={this.addMessage}/>
      </div> 
    );
  }
}
export default App;