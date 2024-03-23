import React, { useState } from 'react';
import { Theme } from '@twilio-paste/core/theme';
import { Manager } from "@twilio/flex-ui";
import { Box, HelpText, Label, TextArea, Button, Stack, Input } from '@twilio-paste/core';
import { sendSMS } from '../../services/api';

const ChatPrompt = () => {
  const [message, setMessage] = useState({
    Body:'',
    To: ''
  });

  const handleMessageChange = (event) => {
    setMessage({
      ...message,
      [event.target.name]: event.target.value
    });
  };


  const handleSendMessage = async () => {
    // sending the message
    await sendSMS({
      To: to, 
      Body: message
    })
    // After sending the message, clear the input field
    setMessage('');
  };

  return (
    <Theme.Provider theme="dark">
        <Box style={{display: "flex", flexDirection: 'column', padding: "10px"}} className="chat-prompt">
          <Label>To:</Label>
          <Input 
              name="To"
              value={message.To} 
              onChange={handleMessageChange}
              />
          <Label htmlFor="message" required>Message (at least 120 characters)</Label>
          <TextArea
              name='Body'
              placeholder="Type your message here..."
              value={message.Body}
              onChange={handleMessageChange}
              rows={4} 
              cols={50}
              />
          <Button onClick={handleSendMessage} >Send</Button>
        </Box>
    </Theme.Provider>
  );
};

export default ChatPrompt;
