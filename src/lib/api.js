import axios from 'axios';
import config from '../conf';

export const getCreatorByInsta = async (insta) => {
  const response = await axios({
    method: 'get',
    url: `${ config.API_ENDPOINT }/creator/${insta}`,
  });
  return response.data.creator;
}

export const createOrder = async (creatorId, fanId) => {
  const response = await axios({
    method: 'post',
    url: `${ config.API_ENDPOINT }/order`,
    data: {
      creatorId,
      fanId
    },
    headers: {
      Authorization: fanId
    }
  });
  return response.data;
}