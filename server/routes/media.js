const express = require('express');
const MediaCtrl = require('../controllers/media-ctrl');

const router = express.Router();

router.post('/media', MediaCtrl.createMedia)
router.put('/media/:id', MediaCtrl.updateMedia)
router.delete('/media/:id', MediaCtrl.deleteMedia)
router.get('/media/:id', MediaCtrl.getMediaById)
router.get('/medias', MediaCtrl.getMedias)

module.exports = router
