const { createClient } = require("redis");

const redisClient = createClient({
    host : "localhost",
    port : 6379
});

redisClient.on('error', (err) => console.error('Redis error:', err));

async function connectRedis() {
  if (!redisClient.isOpen) await redisClient.connect();
  return redisClient;
}

module.exports = connectRedis;
