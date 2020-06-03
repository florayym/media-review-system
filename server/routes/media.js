/**
 * Create REST endpoints
 */
import express from 'express';
import media_ctrl from '../controllers/media-ctrl.js';

const router = express.Router();

router.post('/', media_ctrl.uploadMedia);

router.get('/', media_ctrl.getAllMedia);
router.get('/docs', media_ctrl.getAllDocsMedia);
router.get('/tbs', media_ctrl.getAllTBMedia);

router.get('/:id', media_ctrl.getMediaById);
router.put('/:id', media_ctrl.updateMedia);
router.delete('/:id', media_ctrl.deleteMedia);

router.get('/:id/file', media_ctrl.getMediaFileById);
router.get('/:id/thumbnail', media_ctrl.getThumbnailById);

export default router;