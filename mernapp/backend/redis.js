const redis = require('redis');
require('dotenv').config();
const client = redis.createClient({
  host: process.env.REDIS,
  port: 6379, // default Redis port
});
(async () => {
  await client.connect();
})();
client.on('connect', () => {
  console.log('Connected to Redis');
});

client.on('error', (err) => {
  console.error(`${process.env.REDIS} Redis Error: ${err}`);
});

module.exports = client;
