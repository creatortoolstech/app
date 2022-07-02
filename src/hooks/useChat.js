import { useContext, useEffect, useState } from 'react';
import { ChatContext } from '../context';

const useChat = (chatId, limit = 50) => {
  const { client } = useContext(ChatContext)
  const [chatRoom, setChatRoom] = useState();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if(client && chatId) {
      try {
        client.getConversationBySid(chatId)
          .then(setChatRoom);
      } catch(err) {
        console.log('err', err);
      }
    }
  }, [client, chatId])

  useEffect(() => {
    const messageAdded = (msg) => {
      setMessages(m => m.concat([msg]));
    };

    if (chatRoom) {
      setLoading(true);
      chatRoom.getMessages(limit).then(msgs => {
        setMessages(msgs.items);
        setLoading(false);
      });
      chatRoom.on('messageAdded', messageAdded);
      return () => {
        chatRoom.off('messageAdded', messageAdded);
      };
    }
  }, [chatRoom]);

  const sendMessage = (text) => {
    if (text && chatRoom) {
      chatRoom.sendMessage(text);
    }
  }

  return [messages, sendMessage, { loading }];
}

export default useChat;