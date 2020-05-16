/**
 * CRUD operations
 */
import Media from '../models/media.js'; // , { findOne, findOneAndDelete, find }

const createMedia = (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'You must provide a media',
    });
  }

  const media = new Media(body);

  if (!media) {
    return res.status(400).json({ success: false, error: err });
  }

  console.log(media.reviewHisotry);

  media
    .save()
    .then(() => {
      return res.status(201).json({
        success: true,
        id: media._id,
        message: 'media created!',
      });
    })
    .catch(err => {
      return res.status(400).json({
        err,
        message: 'media not created!',
      });
    });
};

const updateMedia = async (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'You must provide a body to update',
    });
  }

  Media.findOne({ _id: req.params.id }, (err, media) => { // { name: req.params.id }
    if (err) {
      return res.status(404).json({
        err,
        message: 'Media not found!',
      });
    }
    media.name = body.name;
    media.size = body.size;
    media.type = body.type;
    media.path = body.path;
    //media.reviewHisotry = body.reviewHisotry;

  console.log(media.reviewHisotry);


    media
      .save()
      .then(() => {
        return res.status(200).json({
          success: true,
          id: media._id,
          message: 'Media updated!',
        });
      })
      .catch(error => {
        return res.status(404).json({
          error,
          message: 'Media not updated!',
        });
      });
  })
};

const deleteMedia = async (req, res) => {
  await Media.findOneAndDelete({ _id: req.params.id }, (err, media) => {
    if (err) {
      return res.status(400).json({ success: false, error: err })
    }

    if (!media) {
      return res
        .status(404)
        .json({ success: false, error: `Media not found` })
    }

    return res.status(200).json({ success: true, data: media })
  }).catch(err => console.log(err))
};

const getMediaById = async (req, res) => {
  await Media.findOne({ _id: req.params.id }, (err, media) => {
    if (err) {
      return res
        .status(400)
        .json({ success: false, error: err });
    }

    if (!media) {
      return res
        .status(404)
        .json({ success: false, error: `Media not found` });
    }
    return res.status(200).json({ success: true, data: media });
  }).catch(err => console.log(err));
};

const getMedia = async (req, res) => {
  await Media.find({}, (err, medias) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }
    // anything other than zero and '' will evaluate to true
    if (!medias.length) {
      return res
        .status(404)
        .json({ success: false, error: `Media not found` });
    }
    return res.status(200).json({ success: true, data: medias });
  }).catch(err => console.log(err));
};

export default {
  createMedia,
  updateMedia,
  deleteMedia,
  getMedia,
  getMediaById,
};