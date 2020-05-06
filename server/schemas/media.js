/**
 * media (all kinds of resources: video, audio, image, document)
 * table schema
 * 
 * 有必要每一种媒体资源各自拥有不同的schema吗，可以创建“继承”性质的
 */

const mongoose = require('mongoose')

module.exports = new mongoose.Schema(
    {
        name: { type: String, required: true} // unique?(folder_path/name)
        , item_type: {type: String, required: true}
        , folder_path: {type: String, required: true}
        , date: {type: Date, default: Date.now}
        , size: {type: Number, required: true} // size type int?
        , audit: {type: String, required: true} // audit type int?
    },
    {
        timestamps: true
    }
);