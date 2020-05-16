import Reviewer from '../models/reviewer.js';

const getReviewerById = async (req, res) => {
  // await Reviewer.findById(req.params.id, function (err, reviewer) {

  /* Query by _id */
  /*
  await Reviewer.findById({ _id: req.params.id }, (err, reviewer) => {
    if (err) {
      return res
        .status(400)
        .json({ success: false, error: err });
    }

    if (!reviewer) {
      return res
        .status(404)
        .json({ success: false, error: 'Reviewer not found' });
    }
    return res.status(200).json({ success: true, data: reviewer });
  }).catch(err => console.log(err));
  */

  /* Query by ID or any other field possible */
  await Reviewer.findOne({ ID: req.params.id }, (err, reviewer) => { // the schema field name is case sensitive
    if (err) {
      return res.status(400).json({ success: false, error: err })
    }

    if (!reviewer) {
      return res
        .status(404)
        .json({ success: false, error: `Reviewer not found` })
    }
    return res.status(200).json({ success: true, data: reviewer })
  }).catch(err => console.log(err));
};

const getReviewers = async (req, res) => {
  await Reviewer.find({}, (err, reviewers) => {
    if (err) {
      return res
        .status(400)
        .json({ success: false, error: err });
    }
    if (!reviewers) { // empty
      return res
        .status(404)
        .json({ success: false, error: 'Reviewers not found' });
    }
    return res.status(200).json({ success: true, data: reviewers });
  }).catch(err => console.log(err));
};

const addReviewer = (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'You must provide a reviewer',
    });
  }

  const reviewer = new Reviewer(body);

  if (!reviewer) {
    return res.status(400).json({ success: false, error: err });
  }

  reviewer
    .save()
    .then(() => {
      return res.status(201).json({
        success: true,
        id: media._id,
        message: 'reviewer added!',
      });
    })
    .catch(err => {
      return res.status(400).json({
        err,
        message: 'reviewer not added!',
      })
    });
};

export default {
  getReviewerById,
  getReviewers,
  addReviewer
};