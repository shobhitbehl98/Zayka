const redis = require('redis');
require('dotenv').config();
const client = redis.createClient({
  url:process.env.KV_URL
});
(async () => {
  await client.connect();
})();
client.on('connect', () => {
  console.log('Connected to Redis');
});

client.on('error', (err) => {
  console.error(`Redis Error: ${err}`);
});

module.exports = client;
