const { Schema, model } = require('mongoose');

const songSchema = new Schema(
    {
        song_name: {
            type: String, 
            required: true, 
            unique: true, 
            trim: true
        },
        artist: { 
            type: String, 
            required: true
        },
        genre: { 
          type: String, 
      },
    },
    {
      // toJSON: {
      //   virtuals: true,
      //   getters: true,
      // },
      id: false,
    }
);


// Initialize our Thought model
const Song = model('song', songSchema);

module.exports = Song;
