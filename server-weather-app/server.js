// Require the framework and instantiate it
const fastify = require('fastify')()
const destinations = require('./destinations.json');

// our weather library
const Weather = require('weather');

// Declare a route
fastify.get('/destinations', async (request, reply) => {
  reply
    .code(200)
    .header('Content-Type', 'application/json; charset=utf-8')
    .send(destinations);
})

fastify.get('/destinations/:name', async (request, reply) => {
  const city = destinations.find(item => item.name == request.params.name);
  const weather = new Weather();
  const predictions = await weather.getWeatherByCity(city.name);
  const result = {
    ...city,
    weather: predictions,
  };

  reply
    .code(200)
    .header('Content-Type', 'application/json; charset=utf-8')
    .send(result);
})

// Run the server!
const start = async () => {
  try {
    await fastify.listen(3000)
    fastify.log.info(`server listening on ${fastify.server.address().port}`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()
