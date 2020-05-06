/**
 * CRUD operations
 * REST endpoints
 */


 const Media = require('../models/media')

createMedia = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a media',
        })
    }

    const media = new Media(body)

    if (!media) {
        return res.status(400).json({ success: false, error: err })
    }

    media
    .save()
    .then(() => {
        return res.status(201).json({
            success: true,
            id: media._id,
            message: 'media created!',
        })
    })
    .catch(error => {
        return res.status(400).json({
            error,
            message: 'media not created!',
        })
    })
}

updateMedia = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    Media.findOne({ _id: req.params.id }, (err, media) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Media not found!',
            })
        }
        media.name = body.name
        media.item_type = body.item_type
        media.folder_path = body.folder_path
        media.date = body.date
        media.size = body.size
        media.audit = body.audit
        media
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: media._id,
                    message: 'Media updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Media not updated!',
                })
            })
    })
}

deleteMedia = async (req, res) => {
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
}

getMedias = async (req, res) => {
    await Media.find({}, (err, medias) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!medias.length) {
            return res
                .status(404)
                .json({ success: false, error: `Media not found` })
        }
        return res.status(200).json({ success: true, data: medias })
    }).catch(err => console.log(err))
}

getMediaById = async (req, res) => {
    await Media.findOne({ _id: req.params.id }, (err, media) => {
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
}

module.exports = {
    createMedia,
    deleteMedia,
    getMedias,
    getMediaById,
}