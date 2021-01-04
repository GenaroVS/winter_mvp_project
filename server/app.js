const express = require('express');
const app = express();
const allowCrossOrigin = require('./middleware/allowCrossOrigin');
const spot = require('./spotify/controllers.js');
const db = require('../database/postgres.js');

app.use(allowCrossOrigin);
app.use(express.json());
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../public')));
}

app.get('/newArtist', (req, res) => {
  var newArtist;
  db.selectArtist(1)
    .then(artists => {
      if (artists.length === 0) {
        spot.find()
          .then(artist => {
            newArtist = artist;
            return db.insertArtist(artist)
          })
          .then(response => {
            res.json(newArtist).end();
          })
          .catch(err => console.log(err));
      } else {
        res.json(artists[0]).end();
      }
    })
    .catch(err => console.log(err));
});

app.get('/prevArtists', (req, res) => {
  db.selectArtist(4)
    .then(artists => res.json(artists).end())
    .catch(err => console.log(err));
});

app.get('/leaderboard', (req, res) => {
  db.selectLB()
    .then(artists => {
      res.json(artists).end()
    })
    .catch(err => console.log(err));
});

app.put('/newLike/:id', (req, res) => {
  db.updateLikes(parseInt(req.params.id))
    .then(response => res.send('Likes Updated').end())
    .catch(err => console.log(err));
});

module.exports = app;