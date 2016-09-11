const SERVER_ADDRESS = __DEV__ ? '127.0.0.1' : '104.131.12.202'

export default {
  METEOR_SERVER: `ws://${SERVER_ADDRESS}:3000/websocket`,
  CLOUDINARY_API_SECRET: 'abcfalsjfal',
  CLOUDINARY_API_KEY: '000000000000000',
  CLOUDINARY_CLOUD: 'astrosomething',
};
