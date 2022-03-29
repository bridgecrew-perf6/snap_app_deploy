const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient
const createRouter = require('./helpers/create_router')
const cors = require('cors')

const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cors())

MongoClient.connect(process.env.MONGODB_URI || 'mongodb://0.0.0.0:27017', {useUnifiedTopology : true})
.then((client) => {
  const db = client.db('scoreboard')
  const playersCollection = db.collection('players')
  const playersRouter = createRouter(playersCollection)
  app.use('/api/players', playersRouter)
})
.catch(console.error)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))
}

app.listen(PORT, function () {
  console.log(`Listening on port ${ this.address().port }`);
});