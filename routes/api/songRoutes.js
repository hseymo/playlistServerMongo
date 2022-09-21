const router = require('express').Router();
const {
  getSongs,
  getSingleSong,
  createSong,
  updateSong,
  deleteSong
} = require('../../controllers/songController');

// WRITE

// /api/songs
router.route('/').get(getSongs).post(createSong);

// /api/songs/:songId
router.route('/:songId').get(getSingleSong);
router.route('/:songId').put(updateSong);
router.route('/:songId').delete(deleteSong);

module.exports = router;
