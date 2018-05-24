const express = require('express');
const bodyParser = require('body-parser');
const massive = require('massive');

const connectionString = 'postgres://ggvlqohgxtggql:4341d4f8a97c37f7b01192200f8ad638735b4043696faad34d7f389f38b5bdfd@ec2-54-235-206-118.compute-1.amazonaws.com:5432/de1ch0p8lnsg23?ssl=true';

const app = express();
app.use(bodyParser.json());

const port = 3000;

app.get('/', (req, res) => {
  const db = req.app.get('db');
  db.getAllInjuries().then(injuries => {
    res.send(injuries);
  })
});

app.get('/incidents', (req, res) => {
  const db = req.app.get('db');
  const state = req.query.state;
  if (state) {
    db.getIncidentsByState({state: state}).then(incidents => {
      res.send(incidents);
    })
  } else {
    db.getAllIncidents().then(incidents => {
      res.send(incidents)
    })
  }
});

app.post('/incidents', (req, res) => {
  const incident = req.body; // look * below
  const db = req.app.get('db');
  db.createIncident(incident).then(results => {
    res.send(results)
  })
});

// ON POSTMAN for POST
// POST : localhost:3000/incidents
// body / raw / JSON(application/json)
// *{
// 	"state": "UT",
// 	"injuryid": 1,
// 	"causeid": 2
// }

massive(connectionString).then(connection => {
  app.set('db', connection);
  app.listen(port, () => {
    console.log('Started server on port', port);
  });
});