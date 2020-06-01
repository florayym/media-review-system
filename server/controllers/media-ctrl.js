/**
 * CRUD operations
 */
import Media from '../models/media.js';
import multer from 'multer';
import MAX_FILE_SIZE from '../config.js';


/**
const path = require("path");
path.extname(file.originalname))

 */


const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, './uploads'),
  // filename: (req, file, cb) => cb(null, file.fieldname)
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb("Type file is not access", false);
  }
};

let upload = multer({
  storage: storage,
  // fileFilter: fileFilter,
  limits: {
    // For multipart forms, the max file size (in bytes), can be Infinity
    fileSize: MAX_FILE_SIZE
  }
}).single("media");

// Generate model fileds
function createFields(name, size, type, path) {
  return { name, size, type, path };
}

/**
 * 
 * TODO delete a uploaded file when inserting a document into MongoDB failed
 * 
 * @param {*} req 
 * @param {*} res 
 */
const uploadMedia = (req, res) => {
  upload(req, res, (err) => {
    const file = req.file;

    if (!file) {
      return res.status(400).json({
        success: false,
        error: `No file provided!`,
      });
    }

    const body = createFields(
      file.originalname,
      file.size,
      file.mimetype.split('\/')[0], // TODO what type should it be
      file.path
    );

    const media = new Media(body);

    if (!media) {
      // delete uploaded file
      return res.status(400).json({
        success: false,
        error: err
      });
    }

    media
      .save()
      .then(() => {
        return res.status(201).json({
          success: true,
          id: media._id,
          file: file,
          message: 'media uploaded & MongoDB document created!',
        });
      })
      .catch(err => {
        // delete uploaded file
        return res.status(400).json({
          err,
          message: 'media not created!',
        });
      });

  });
};

const updateMedia = async (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: `You must provide a body to update`,
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

const getAllMedia = async (req, res) => {
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
  uploadMedia,
  updateMedia,
  deleteMedia,
  getAllMedia,
  getMediaById,
};