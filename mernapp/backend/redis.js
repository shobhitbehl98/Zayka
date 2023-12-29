const redis = require('redis');
require('dotenv').config();
const client = redis.createClient({
  host:process.env.REDIS,
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
