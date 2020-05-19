/**
 * Create REST endpoints
 */
import express from 'express';
import media_ctrl from '../controllers/media-ctrl.js'; // { createMedia, updateMedia, deleteMedia, getMediaById, getMedias }

const router = express.Router();

router.post('/', media_ctrl.createMedia); // /media
router.get('/', media_ctrl.getAllMedia); // /medias
router.get('/:id', media_ctrl.getMediaById);
router.put('/:id', media_ctrl.updateMedia);
router.delete('/:id', media_ctrl.deleteMedia);

export default router;