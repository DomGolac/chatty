import React, {Component} from 'react';
import Message from './Message.jsx';
import Notification from './Notification.jsx';

class MessageList extends Component {
  render() {
    console.log("Rendering <MessageList/>");
    return (
      <div id="message-list">
        {this.props.messages.map((message) => {
          return <Message 
            key={message.id} 
            username={message.username} 
            content={message.content} />;
        })
        }
        {this.props.notifications.map((notification) => {
          return <Notification 
            key={notification.id} 
            username={notification.username} 
            content={notification.content} />;
        })
        }
      </div>
    );
  }
}
export default MessageList;