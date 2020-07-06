/**
 * CRUD operations
 */
import Media from '../models/media.js';
import multer from 'multer';
import MAX_FILE_SIZE from '../config.js';
import child from 'child_process';

const FILE_PATH = './uploads';

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, FILE_PATH),
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

    // TODO: ffmpeg -i inputFile -b:v 64k -vcodec libx264 -s 960x540 outputFile

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

    const thumbnailPath = `${FILE_PATH}/thumbnails/thumbnail_${media._id}.png`;

    if (body.type === "image") {
      // 调整视频大小的方法，同样适用于调整图像大小
      // child.exec(`ffmpeg -i ${FILE_PATH}/${file.filename} -vf scale = 320：240 ${FILE_PATH}/thumbnails/thumbnail_${media._id}.png`,
      //   err => {
      //     if (err) {
      //       console.log(err);
      //     }
      //   });

      // 添加水印
      child.exec(`magick convert ${FILE_PATH}/${file.filename} /watermark.png -gravity center -geometry +5+10 -composite ${thumbnailPath}`,
        err => {
          if (err) {
            console.log(err);
          }
        })
    } else if (body.type === "application") {

      // magick convert test.pdf[0] -trim +repage -resize 250x250^ -crop 250x300+0+0 resPDF.png
      // magick convert test.pdf[0-7] -thumbnail 140x140 -background white +smush 20 -bordercolor white -border 10 testRes.png

      child.exec(`magick convert ${FILE_PATH}/${file.filename}[0] -trim +repage -resize 250x250^ -crop 250x300+0+0 ${thumbnailPath}`,
        err => {
          if (err) {
            console.log(err);
          }
        })
    } else if (body.type === "video") {
      child.exec(`ffmpeg -i ${FILE_PATH}/${file.filename} -vframes 1 -an -s 750x425 -ss 1 ${thumbnailPath}`,
        err => {
          if (err) {
            console.log(err);
          }
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

const getMediaFileById = async (req, res) => { // FILE_PATH id: _id

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

    res.download(media.path, err => {
      if (err) {
        return res
          .status(400)
          .json({ success: false, error: err });
      }
    });

    // return res.status(200).json({ success: true, data: media });
  }).catch(err => console.log(err));



};

const getThumbnailById = (req, res) => {
  res.download(`${FILE_PATH}/thumbnails/thumbnail_${req.params.id}.png`, err => {
    if (err) {
      // Handle error, but keep in mind the response may be partially-sent
      // so check res.headersSent
      console.log(err);
    }
  });
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

const getAllDocsMedia = async (req, res) => {
  await Media.find({ $or: [{ type: "application" }, { type: "image" }] }, (err, medias) => {
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

const getAllTBMedia = async (req, res) => {
  await Media.find({ $or: [{ type: "video" }, { type: "audio" }] }, (err, medias) => {
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
  getAllDocsMedia,
  getAllTBMedia,

  getMediaById,

  getMediaFileById,
  getThumbnailById,
};