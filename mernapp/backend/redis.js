const redis = require('redis');
require('dotenv').config();
const client = redis.createClient({
  host:'zayka2-hxg3zj.serverless.aps1.cache.amazonaws.com',
  post:6379
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
