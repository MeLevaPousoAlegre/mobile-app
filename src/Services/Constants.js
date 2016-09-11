const METEOR_SERVER = __DEV__ ? 'ws://127.0.0.1:3000/websocket' : 'ws://104.131.12.202/websocket'

console.warn('Will attempt to connect ws on', METEOR_SERVER)
export default {
  METEOR_SERVER,
  CLOUDINARY_API_SECRET: 'abcfalsjfal',
  CLOUDINARY_API_KEY: '000000000000000',
  CLOUDINARY_CLOUD: 'astrosomething',
};
