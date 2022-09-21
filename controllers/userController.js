const Song = require('../models/Song');
const User = require('../models/User');

module.exports = {
  getUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },

  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select('-__v')
      .populate('songs')
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

  createUser(req, res) {
    User.create({
        name: req.body.name
    })
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(500).json(err));
  },

  updateUser(req, res) {
      User.findOneAndUpdate(
          { _id: req.params.userId }, 
          {
            name: req.body.name,
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

    deleteUser(req, res) {
        User.findOneAndRemove({ _id: req.params.userId })
            .then((user) =>
                !user
                ? res.status(404).json({ message: 'No user with that ID' })
                : Song.deleteMany( { name: user.name })
                  .then((songs) => 
                    !songs
                    ? res.status(404).json({ message: 'No songs for that user' })
                    : res.json(user)
                  )
                )
            .catch((err) => res.status(500).json(err));
    }
};
