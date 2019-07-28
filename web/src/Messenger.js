import React from 'react';
import { Chat } from '@progress/kendo-react-conversational-ui';
import './Messenger.css';

const user = {
  id: 1,
  avatarUrl: 'https://via.placeholder.com/24/008000/008000.png',
};

const Messenger = () => {
  return (
    <Chat
      user={user}
      messages={[
        {
          author: user,
          suggestedActions: [
            {
              type: 'reply',
              value: 'Oh, really?',
            },
            {
              type: 'reply',
              value: 'Thanks, but this is boring.',
            },
          ],
          timestamp: new Date(),
          text:
            "Hello, this is a demo bot. I don't do much, but I can count symbols!",
        },
      ]}
      onMessageSend={console.log}
      // placeholder={'Type a message...'}
      // width={400}
    />
  );
};

export default Messenger;
