const redis = require('redis');
require('dotenv').config();
const client = redis.createClient({
  url: process.env.KV_URL
});
client.on('connect', () => {
  console.log('Connected to Redis');
});

client.on('error', (err) => {
  console.error(`Redis Error: ${err}`);
});

client.on('end',()=>{console.log("end")})

client.on('reconnecting', () => console.log('client is reconnecting'));
client.on('ready', () => console.log('client is ready'));
(async () => {
  await client.connect();
})();

module.exports = client;
