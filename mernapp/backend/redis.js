const redis = require('redis');
require('dotenv').config();
const client = redis.createClient({
  host:process.env.REDIS_AWS_HOST,
  port:process.env.REDIS_AWS_PORT
});

client.on('connect', () => {
  console.log('Connected to Redis');
});

(async () => {
  await client.connect();
})();
client.on('error', (err) => {
  console.error(`Redis Error: ${err}`);
});

// client.on('reconnecting', () => console.log('client is reconnecting'));
// client.on('ready', () => console.log('client is ready'));

module.exports = client;
