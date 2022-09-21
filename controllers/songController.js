const Song = require('../models/Song');
const User = require('../models/User');

module.exports = {
  getSongs(req, res) {
    Song.find()
      .then((songs) => res.json(songs))
      .catch((err) => res.status(500).json(err));
  },

  getSingleSong(req, res) {
    Song.findOne({ _id: req.params.songId })
      .select('-__v')
      .then((song) =>
        !song
          ? res.status(404).json({ message: 'No song with that ID' })
          : res.json(song)
      )
      .catch((err) => res.status(500).json(err));
  },

  createSong(req, res) {
    Song.create({
        song_name: req.body.song_name,
        artist: req.body.artist,
        genre: req.body.genre
    }).then((song) => {
        return User.findOneAndUpdate( 
            { name: req.body.name }, {
                $addToSet: { songs: song._id }
            }, { new: true}
        );
    }).then((user) =>
        !user
            ? res.status(404).json({
            message: 'Error creating song - no user with that ID' })
            : res.json(user)
    ).catch((err) => {
        console.log(err);
        res.status(500).json(err);
  })
},

  updateSong(req, res) {
      Song.findOneAndUpdate(
          { _id: req.params.songId }, 
          {
            song_name: req.body.song_name,
            artist: req.body.artist,
            genre: req.body.genre
          }, 
          { new: true }, 
          (err, result) => {
            if (result) {
              res.status(200).json(result);
              console.log(`Updated: ${result}`);
            } else {
              console.log(err);
              res.status(500).json({ message: 'error', err });
            }
          }
      )
  },

  deleteSong(req, res) {
    Song.findOneAndRemove({ _id: req.params.songId })
      .then((song) =>
        !song
          ? res.status(404).json({ message: 'No song with this id!' })
          : User.findOneAndUpdate(
              { songs: req.params.songId },
              { $pull: { songs: req.params.songId } },
              { new: true }
            )
      )
      .then((user) =>
        !user
          ? res.status(404).json({
              message: 'Error deleting song',
            })
          : res.json({ message: 'Song successfully deleted!' })
      )
      .catch((err) => res.status(500).json(err));
  },
};
