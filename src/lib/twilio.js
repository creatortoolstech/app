import axios from 'axios';
import config from '../conf';

export const getChatToken = async (userId) => {
  const response = await axios({
    method: 'get',
    url: `${ config.API_ENDPOINT }/chat/token`,
    headers: {
      Authorization: userId
    }
  });
  return response.data.token;
}

export const createChat = async (creatorId, fanId, userId) => {
  const response = await axios({
    method: 'post',
    url: `${ config.API_ENDPOINT }/chat/create`,
    data: {
      creatorId,
      fanId
    },
    headers: {
      Authorization: userId
    }
  });
  return response.data.chatId;
}