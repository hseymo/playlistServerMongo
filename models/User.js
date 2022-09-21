const { Schema, model } = require('mongoose');

// Schema to create User model
const userSchema = new Schema(
    {
        name: { 
            type: String, 
            required: true, 
            unique: true, 
            trim: true
        },
        songs: [
            {
                type: Schema.Types.ObjectId,
                ref: 'song',
              },
        ],
    },
    {
      toJSON: {
        virtuals: true,
      },
      id: false,
    }
  );

  userSchema
  .virtual('songCount')
// is this correct?? 
  .get(function () {
    return this.songs.length;
  })

// Initialize our User model
const User = model('user', userSchema);

module.exports = User;
