import History from '../models/history.js';

// TODO 如何复用：根据history中不同的key进行搜索，而不用写重复的函数？
// by mediaID, by reviewerID, by within a date range and by decision

const getHistoryByMediaId = async (req, res) => {
  /* Query by mediaID or any other field possible */
  await History.findOne({ mediaID: req.params.id }, (err, history) => { // the schema field name is case sensitive
    if (err) {
      return res
        .status(400)
        .json({ success: false, error: err })
    }

    if (!history) {
      return res
        .status(404)
        .json({ success: false, error: `History not found.` })
    }
    return res
      .status(200)
      .json({ success: true, data: history })
  }).catch(err => console.log(err));
};

const getHistoryByReviewerId = async (req, res) => {

  /* Query by ID <delete>or any other fields possible</delete> */

  // ! only find (first) one
  // await History.findOne({ reviewerID: req.params.id }, (err, history) => { // the schema field name is case sensitive
  //   if (err) {
  //     return res
  //       .status(400)
  //       .json({ success: false, error: err })
  //   }

  //   if (!history) {
  //     return res
  //       .status(404)
  //       .json({ success: false, error: `History not found!` })
  //   }
  //   return res
  //     .status(200)
  //     .json({ success: true, data: history })
  // }).catch(err => console.log(err));

  // ! want to find(aggregate) all by reviewerID
  await History.aggregate([
    { "$match": { reviewerID: parseInt(req.params.id) } },
  ], (err, history) => {
    if (err) {
      return res
        .status(400)
        .json({ success: false, error: err });
    }
    return res.status(200)
      .json({ success: true, data: history });
  }).catch(err => console.log(err));
};

const getHistory = async (req, res) => {
  await History.find({}, (err, history) => {
    if (err) {
      return res
        .status(400)
        .json({ success: false, error: err });
    }
    if (!history) { // empty
      return res
        .status(404)
        .json({ success: false, error: `History not found.` });
    }
    return res
      .status(200)
      .json({ success: true, data: history });
  }).catch(err => console.log(err));
};

const addHistory = (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: `You must provide a history!`,
    });
  }

  const history = new History(body);

  if (!history) {
    return res.status(400).json({ success: false, error: err });
  }

  history
    .save()
    .then(() => {
      return res.status(201).json({
        success: true,
        id: history._id,
        message: 'history added!',
      });
    })
    .catch(err => {
      return res.status(400).json({
        err,
        message: 'history not added!',
      })
    });
};

export default {
  getHistoryByMediaId,
  getHistoryByReviewerId,
  getHistory,
  addHistory
};