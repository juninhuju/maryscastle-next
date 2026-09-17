import axios from 'axios';

const api = axios.create({
  baseURL: 'https://parseapi.back4app.com',
  headers: {
    'X-Parse-Application-Id': process.env.NEXT_PUBLIC_PARSE_APP_ID || '',
    'X-Parse-JavaScript-Key': process.env.NEXT_PUBLIC_PARSE_JS_KEY || '',
  },
});

export default api;