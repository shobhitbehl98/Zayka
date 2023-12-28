const redisClient = require('./redis');
async function cacheMiddleware(req, res, next) {
  const key = req.originalUrl;
  try{
  const val = await redisClient.get(key);
  if(val){
    return res.json(JSON.parse(val));
  }else{
    console.log(`no data for ${key}`)
  }
  next();
}catch(e){
  console.log(e);
}
  // redisClient.get(key, (err, data) => {
  //   if (err) {
  //     console.error(`Redis GET Error: ${err}`);
  //     return next();
  //   }

  //   if (data) {
  //     // Cached data found
  //     console.log('Data retrieved from cache');
  //     return res.json(JSON.parse(data));
  //   }

  //   // Continue to the route handler and cache the data afterward
  //   next();
  // });
}

module.exports = cacheMiddleware;
