import axios from 'axios';

const BASE_URL = 'https://sms-sender-6865.twil.io';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
  }
});

const sendGoodbaySMS = async (From, To) => {
  try {
    const response = await api.post('/send-goodbay', new URLSearchParams({ From, To }));
    alert("Goodbay SMS was sent.\nContent:\n" + JSON.stringify(response));
  } catch (error) {
    console.log(error);
  }
};


const sendSMS = async (To, Body) => {
    try {
      const response = await api.post('/send', new URLSearchParams({
        To,
        Body
      }));
      alert("SMS was sent.\nContent:\n" + JSON.stringify(response));
    } catch (error) {
      console.log(error);
    }
  };

export { sendGoodbaySMS, sendSMS };