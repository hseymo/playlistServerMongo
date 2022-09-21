const { connect, connection } = require('mongoose');

connect(process.env.MONGODB_URI || 'mongodb://localhost/playlist', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;
