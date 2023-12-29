// const redis = require('redis');
// require('dotenv').config();
// const client = redis.createClient({
//   url: process.env.KV_URL
// });
// // (async () => {
// //   await client.connect();
// // })();
// client.on('connect', () => {
//   console.log('Connected to Redis');
// });

// client.on('error', (err) => {
//   console.error(`Redis Error: ${err}`);
// });
//  client.connect();

// client.on('reconnecting', () => console.log('client is reconnecting'));
// client.on('ready', () => console.log('client is ready'));

// module.exports = client;
